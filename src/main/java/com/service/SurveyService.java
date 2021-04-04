package com.service;

import com.firebase.firebaseUtil;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.gson.*;
import com.po.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;


@Service
public class SurveyService {

    private static Gson gson = new Gson();
    private static JsonParser jsonParser = new JsonParser();
    private static JsonObject resultData = new JsonObject();
    @Autowired
    private firebaseUtil firebaseUtil;

    public Result queryAllSurveys() {
        QuerySnapshot surveys;
        QuerySnapshot topics;
        try {
            surveys = firebaseUtil.queryByName("surveys");
            topics = firebaseUtil.queryByName("topics");
        } catch (ExecutionException e) {
            e.printStackTrace();
            return new Result("false", "failed to query data", null);
        } catch (InterruptedException e) {
            return new Result("false", "failed to query data", null);
        }


        JsonElement surveysElement = getSurveysElement(surveys);
        JsonElement topicsElement = getTopicsElement(topics);

        resultData.add("surveys", surveysElement);
        resultData.add("topics", topicsElement);
        return new Result("true", "query data successful", resultData);
    }

    private JsonElement getTopicsElement(QuerySnapshot topics) {
        List<Map<String, Object>> resultArray = new ArrayList<>();
        for (QueryDocumentSnapshot document : topics.getDocuments()) {
            Map<String, Object> data = document.getData();
            data.put("id",document.getId());
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
            data.put("id",document.getId());
            resultArray.add(data);
        }
        String s = gson.toJson(resultArray);
        JsonElement jsonElement = jsonParser.parseString(s);
        return jsonElement;
    }
}
