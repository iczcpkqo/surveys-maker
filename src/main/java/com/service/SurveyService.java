package com.service;

import com.util.ChartUtil;
import com.util.PDFUtil;
import com.util.firebaseUtil;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.gson.*;
import com.po.Result;
import javafx.util.Pair;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.*;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;


@Service
public class SurveyService {

    private static Gson gson = new Gson();
    private static JsonParser jsonParser = new JsonParser();

    @Autowired
    private firebaseUtil firebaseUtil;

    @Autowired
    private ChartUtil chartUtil;

    @Autowired
    private PDFUtil pdfUtil;


    public Result getSurveyByIdandTopics(String surveyId) {
        Map<String, Object> surveys = new HashMap<>();
        QuerySnapshot topics;
        try {
            if (StringUtils.isNotEmpty(surveyId)) {
                surveys = firebaseUtil.getByDocumentId("surveys", surveyId);
            }
            topics = firebaseUtil.queryByCollection("topics");
        } catch (ExecutionException e) {
            e.printStackTrace();
            return new Result("false", "failed to query data", null);
        } catch (InterruptedException e) {
            return new Result("false", "failed to query data", null);
        }
        JsonObject resultData = new JsonObject();
        JsonElement topicsElement = getTopicsElement(topics);

        if (surveys.size() > 0) {
            List<Map<String, Object>> surveysList = new ArrayList<>();
            surveysList.add(surveys);
            String s = gson.toJson(surveysList);
            JsonElement surveysElement = jsonParser.parseString(s);
            resultData.add("surveys", surveysElement);
        }

        resultData.add("topics", topicsElement);
        return new Result("true", "query data successful", resultData);
    }

    private JsonElement getTopicsElement(QuerySnapshot topics) {
        List<Map<String, Object>> resultArray = new ArrayList<>();
        for (QueryDocumentSnapshot document : topics.getDocuments()) {
            Map<String, Object> data = document.getData();
            data.put("id", document.getId());
            data.put("tit", data.get("topicTitle"));
            resultArray.add(data);
        }
        String s = gson.toJson(resultArray);
        JsonElement jsonElement = jsonParser.parseString(s);
        return jsonElement;
    }

    private JsonElement getSurveysElement(QuerySnapshot surveys) {
        List<Map<String, Object>> resultArray = new ArrayList<>();
        for (QueryDocumentSnapshot document : surveys.getDocuments()) {
            Map<String, Object> data = document.getData();
            data.put("id", document.getId());
            resultArray.add(data);
        }
        String s = gson.toJson(resultArray);
        JsonElement jsonElement = jsonParser.parseString(s);
        return jsonElement;
    }

    public Result saveSurvey(String surveyName, String[] topicIds) {
        List<Map<String, Object>> dataByField = firebaseUtil.getDataByField("surveys", "surveys_tit", surveyName);
        if (dataByField.size() > 0) {
            surveyName = surveyName + "(" + (dataByField.size() + 1) + ")";
        }
        List<String> topicIdsList = Arrays.stream(topicIds).distinct().collect(Collectors.toList());
        List<Map<String, Object>> topics = firebaseUtil.getDocumentContains("topics", topicIdsList);

        UUID uuid = UUID.randomUUID();
        Map<String, Object> docData = new HashMap<>();
        docData.put("surveys_tit", surveyName);
        docData.put("sels_topic", topics);
        docData.put("surveys_id", uuid.toString());
        docData.put("time", new Date());
        Result result = firebaseUtil.saveDocument("surveys", uuid.toString(), docData);
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("surveys_id", uuid.toString());
        result.setData(jsonObject);
        return result;
    }

    public Result getPersonalPDF(String id) {
        Map<String, Object> personalSurvey = firebaseUtil.getByDocumentId("personalSurveys", id);
        if (personalSurvey.size() <= 0) {
            return new Result("false", "there is no data", null);
        }

        Object fileName = personalSurvey.get("fileName");
        if (fileName != null) {
            return firebaseUtil.downloadPDF("pdfs", fileName.toString());
        }

        return createPDFByPersonalSurvey(personalSurvey, id);
    }

    private Result createPDFByPersonalSurvey(Map<String, Object> personalSurvey, String id) {
        List<Pair<String, Map<String, Integer>>> answers = calculateAnswers(personalSurvey);
        if (answers.size() <= 0) {
            return new Result("false", "no data", null);
        }

        List<Pair<String, File>> topicFiles = new ArrayList<>();
        for (Pair<String, Map<String, Integer>> answer : answers) {
            Pair<String, File> topicFile = new Pair<>(answer.getKey(), chartUtil.createPie(answer.getValue(), UUID.randomUUID().toString()));
            topicFiles.add(topicFile);
        }

        if (topicFiles.size() <= 0) {
            return new Result("false", "no data", null);
        }

        File file = pdfUtil.createPDF(topicFiles);
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("filePath", file.getAbsolutePath());
        jsonObject.addProperty("fileName", file.getName());
        personalSurvey.put("fileName", file.getName());
        firebaseUtil.updateDocument("personalSurveys", id, "fileName", file.getName());
        return new Result("true", "create file successful", jsonObject);
    }

    private List<Pair<String, Map<String, Integer>>> calculateAnswers(Map<String, Object> personalSurvey) {
        List<Pair<String, Map<String, Integer>>> answers = new ArrayList<>();
        Object selectedTopics = personalSurvey.get("selectedTopics");
        List topicsList = gson.fromJson(selectedTopics.toString(), List.class);
        if (topicsList.size() <= 0) {
            return answers;
        }
        for (Object o : topicsList) {
            JsonObject topicObject = (JsonObject) gson.toJsonTree(o);
            Pair<String, Map<String, Integer>> topicResultPair = new Pair<>(topicObject.get("topicTitle").toString().replace("\"", ""), countAnswers(topicObject.get("questions")));
            answers.add(topicResultPair);
        }
        return answers;
    }

    private Map<String, Integer> countAnswers(JsonElement questions) {
        Map<String, Integer> colors = new HashMap<>();
        List list = gson.fromJson(questions, List.class);
        if (list.size() <= 0) {
            return colors;
        }
        for (Object question : list) {
            JsonObject questionObject = (JsonObject) gson.toJsonTree(question);
            String answer = questionObject.get("answer").toString().replace("\"", "");
            if (StringUtils.isEmpty(answer)) {
                continue;
            }

            if (answer.equals("amber")) {
                Integer amber = colors.get("amber");
                if (amber == null) {
                    colors.put("amber", 1);
                } else {
                    colors.put("amber", amber + 1);
                }
            } else if (answer.equals("green")) {
                Integer green = colors.get("green");
                if (green == null) {
                    colors.put("green", 1);
                } else {
                    colors.put("green", green + 1);
                }
            } else if (answer.equals("red")) {
                Integer red = colors.get("red");
                if (red == null) {
                    colors.put("red", 1);
                } else {
                    colors.put("red", red + 1);
                }
            }

        }

        return colors;
    }


    public Result queryAllDocumentPage(String collection, Integer page, Integer number) {
        List<Map<String, Object>> results = firebaseUtil.getAllDocuments(collection);

        if (results.size() <= 0) {
            JsonObject jsonObject = new JsonObject();
            jsonObject.addProperty("total", results.size());
            jsonObject.addProperty("pageAmount", results.size() / 20 + 1);
            return new Result("false", "no data", new JsonObject());
        }

        if (number == null || results.size() <= number) {
            JsonObject jsonObject = new JsonObject();
            jsonObject.add("data", gson.toJsonTree(results));
            jsonObject.addProperty("total", results.size());
            jsonObject.addProperty("pageAmount", results.size() / 20 + 1);
            return new Result("true", "query successful", jsonObject);
        }

        if (page == null || page < 1) {
            page = 1;
        }

        int start = (page - 1) * number;
        int end = page * number - 1;
        if (results.size() < end) {
            end = results.size() - 1;
        }

        List<Map<String, Object>> subResults = results.subList(start, end);
        JsonObject jsonObject = new JsonObject();
        jsonObject.add("data", gson.toJsonTree(subResults));
        jsonObject.addProperty("total", results.size());
        jsonObject.addProperty("pageAmount", results.size() / 20 + 1);
        return new Result("true", "query successful", jsonObject);
    }


    public Result getTopicById(String topicId) {
        Map<String, Object> topic = firebaseUtil.getByDocumentId("topics", topicId);
        return new Result("true", "query successful", gson.toJsonTree(topic));
    }


    public Result startAnswer(String surveyId) {
        Map<String, Object> survey = firebaseUtil.getByDocumentId("surveys", surveyId);
        if (survey.size() <= 0) {
            return new Result("false", "no survey", null);
        }

        UUID uuid = UUID.randomUUID();
        survey.put("client_id", uuid.toString());
        survey.put("time", new Date());
        Result result = firebaseUtil.saveDocument("personalSurveys", uuid.toString(), survey);
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("id", uuid.toString());
        result.setData(jsonObject);
        return new Result("true", "save successful", jsonObject);
    }

    public Result surveySummit(String clientId, String topicIndex, String[] answers) {
        Map<String, Object> personalSurveys = firebaseUtil.getByDocumentId("personalSurveys", clientId);
        if (personalSurveys.size() <= 0) {
            return new Result("false", "no survey", null);
        }
        Object selectedTopics = personalSurveys.get("selectedTopics");
        List topicsList = gson.fromJson(selectedTopics.toString(), List.class);
        if (topicsList == null || topicsList.size() <= 0) {
            return new Result("false", "no topics", null);
        }
        Object topic = topicsList.get(Integer.valueOf(topicIndex));
        JsonObject topicJson = (JsonObject) gson.toJsonTree(topic);
        List quesionList = gson.fromJson(topicJson.get("questions"), List.class);
        if (topicsList == null || topicsList.size() <= 0) {
            return new Result("false", "no questions", null);
        }
        List<JsonObject> saveQuestions = new ArrayList<>();
        for (int i = 0; i < quesionList.size(); i++) {
            Object o = quesionList.get(i);
            JsonObject jsonObject = (JsonObject) gson.toJsonTree(o);
            jsonObject.addProperty("answer", answers[i]);
            saveQuestions.add(jsonObject);
        }
        topicJson.add("questions", gson.toJsonTree(saveQuestions));
        topicsList.remove(Integer.valueOf(topicIndex));
        Object object = topicJson;
        topicsList.add(Integer.valueOf(topicIndex), object);
        Object updateFiled = topicsList;
        firebaseUtil.updateDocument("personalSurveys", clientId, "selectedTopics", updateFiled);
        return new Result("true", "update successful", null);
    }

    public Result deleteSurvey(String surveyId) {
        return firebaseUtil.delete("surveys", surveyId);
    }

    public Result deleteTopic(String topicId) {
        return firebaseUtil.delete("topics", topicId);
    }

    public Result saveOrUpdateTopic(String topicId, String topicName, String[] questions) {

        if (StringUtils.isEmpty(topicId)) {
            List<Map<String, Object>> dataByField = firebaseUtil.getDataByField("topics", "topic_tit", topicName);
            if (dataByField.size() > 0) {
                topicName = topicName + "(" + (dataByField.size() + 1) + ")";
            }
            List<String> quesionList = new ArrayList<>(Arrays.asList(questions));

            UUID uuid = UUID.randomUUID();
            Map<String, Object> docData = new HashMap<>();
            docData.put("topic_tit", topicName);
            docData.put("quizes", quesionList);
            docData.put("topic_id", uuid.toString());
            docData.put("time", new Date());
            Result result = firebaseUtil.saveDocument("topics", uuid.toString(), docData);
            JsonObject jsonObject = new JsonObject();
            jsonObject.addProperty("id", uuid.toString());
            result.setData(jsonObject);
            return new Result("save successful", "save successful", jsonObject);
        } else {
            List<Map<String, Object>> dataByField = firebaseUtil.getDataByField("topics", "topic_tit", topicName);
            if (dataByField.size() == 1) {
                if (!topicId.equals(dataByField.get(0).get("topic_id"))) {
                    topicName = topicName + "(" + (dataByField.size() + 1) + ")";
                    firebaseUtil.updateDocument("topics", topicId, "topic_tit", topicName);
                }
                List<String> quesionList = new ArrayList<>(Arrays.asList(questions));
                firebaseUtil.updateDocument("topics", topicId, "quizes", quesionList);
            }
            JsonObject jsonObject = new JsonObject();
            jsonObject.addProperty("id", topicId);
            return new Result("update successful", "update successful", jsonObject);
        }

    }


}
