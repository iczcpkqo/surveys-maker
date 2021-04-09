package com.util;

import com.google.api.core.ApiFuture;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.storage.*;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
import com.google.firebase.cloud.StorageClient;
import com.google.gson.JsonObject;
import com.po.Result;
import org.springframework.stereotype.Component;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Map;
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

    public QuerySnapshot queryByName(String bucketname) throws ExecutionException, InterruptedException {
        ApiFuture<QuerySnapshot> surveys = db.collection(bucketname).get();
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

    public Result downloadPDF(String PDFName) {
        File tempFile;
        try {
            tempFile = File.createTempFile(PDFName, ".jpg");
            Blob blob = service.get(BlobId.of(storageBucket, "images/1111.jpg"));
            blob.downloadTo(Paths.get(tempFile.getAbsolutePath()));
        } catch (IOException e) {
            return new Result("false", "failed to create file", null);
        }
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("filePath",tempFile.getAbsolutePath());
        return new Result("true", tempFile.getAbsolutePath(), jsonObject);

    }

}
