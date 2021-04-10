package com.util;

import com.google.api.core.ApiFuture;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.*;
import com.google.cloud.storage.*;
import com.google.cloud.storage.Blob;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
import com.google.firebase.cloud.StorageClient;
import com.google.gson.JsonObject;
import com.po.Result;
import org.apache.commons.lang3.ArrayUtils;
import org.springframework.stereotype.Component;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;
import java.util.concurrent.ExecutionException;

@Component
public class firebaseUtil {

    private static final String FIREBASE_SERVICE_ACCOUNT = "src/main/resources/survey-service-account.json";

    private static String storageBucket = "survey-dfcd5.appspot.com";

    private static String projectId = "survey-dfcd5";

    private static Bucket bucket;

    private static Storage service;

    private static String image = "images/";

    private static Firestore db;

    static {

        // Use a service account
        InputStream serviceAccount = null;
        try {
            serviceAccount = new FileInputStream(FIREBASE_SERVICE_ACCOUNT);
        } catch (FileNotFoundException e) {
            System.out.println("failed to read file service-account.json");
        }
        GoogleCredentials credentials = null;
        try {
            credentials = GoogleCredentials.fromStream(serviceAccount);
        } catch (IOException e) {
            System.out.println("Failed to establish firebase connection");
        }
        FirebaseOptions options = new FirebaseOptions.Builder()
                .setCredentials(credentials)
                .setStorageBucket(storageBucket)
                .build();
        FirebaseApp.initializeApp(options);

        db = FirestoreClient.getFirestore();

        StorageOptions build = StorageOptions.newBuilder()
                .setCredentials(credentials)
                .build();

        bucket = StorageClient.getInstance().bucket();
        service = build.getService();

    }

    public QuerySnapshot queryByCollection(String collection) throws ExecutionException, InterruptedException {
        ApiFuture<QuerySnapshot> surveys = db.collection(collection).get();
        QuerySnapshot queryDocumentSnapshots = surveys.get();
        return queryDocumentSnapshots;
    }

    public Result addDataToBucket(String bucketname, Map<String, Object> data) {
        ApiFuture<DocumentReference> addedDocRef;
        try {
            addedDocRef = db.collection(bucketname).add(data);
        } catch (Exception e) {
            e.printStackTrace();
            return new Result("false", "failed to add data", null);
        }
        try {
            System.out.println("Added document with ID: " + addedDocRef.get().getId());
        } catch (InterruptedException e) {
            e.printStackTrace();
            return new Result("false", "failed to add data", null);
        } catch (ExecutionException e) {
            e.printStackTrace();
            return new Result("false", "failed to add data", null);
        }
        return new Result("true", "add data successful", null);
    }

    public Result uploadImage(String imagePath, String imageName) {

        try {
            bucket.create(image + imageName, Files.readAllBytes(Paths.get(imagePath)));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    public Result downloadPDF(String fileName) {
        File tempFile;
        try {
            tempFile = File.createTempFile(fileName, ".pdf");
            Blob blob = service.get(BlobId.of(storageBucket, image + "/" + fileName + ".pdf"));
            blob.downloadTo(Paths.get(tempFile.getAbsolutePath()));
        } catch (IOException e) {
            return new Result("false", "failed to create file", null);
        }
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("filePath", tempFile.getAbsolutePath());
        jsonObject.addProperty("fileName", fileName + ".pdf");
        return new Result("true", tempFile.getAbsolutePath(), jsonObject);

    }

    public List<Map<String, Object>> getDataByField(String collection, String fieldName, String name) {
        ApiFuture<QuerySnapshot> future = db.collection("survey").whereEqualTo(fieldName, name).get();
        List<QueryDocumentSnapshot> documents;
        try {
            documents = future.get().getDocuments();
        } catch (Exception e) {
            return new ArrayList<>();
        }
        List<Map<String, Object>> result = new ArrayList<>();
        if (documents != null && documents.size() > 0) {
            for (QueryDocumentSnapshot document : documents) {
                result.add(document.getData());
            }

        }
        return result;
    }

    public List<Map<String, Object>> getDocumentContains(String collection, List<String> topicIdsList) {
        List<Map<String, Object>> result = new ArrayList<>();
        for (String s : topicIdsList) {
            Map<String, Object> data = getByDocumentId(collection, s);
            if (data.size() > 0) {
                result.add(data);
            }
        }
        return result;
    }

    public Map<String, Object> getByDocumentId(String collection, String s) {
        ApiFuture<DocumentSnapshot> future = db.collection(collection).document(s).get();
        Map<String, Object> result = new HashMap<>();
        DocumentSnapshot document;
        try {
            document = future.get();
        } catch (Exception e) {
            return result;
        }

        if (document.exists()) {
            result = document.getData();
        }
        return result;
    }

    public Result saveDocument(String collection, String uuid, Map<String, Object> docData) {
        try {
            db.collection(collection).document(uuid).set(docData);
        } catch (Exception e) {
            e.printStackTrace();
            return new Result("false", "failed to save document", null);
        }
        return new Result("true", "save document successful", null);
    }


}
