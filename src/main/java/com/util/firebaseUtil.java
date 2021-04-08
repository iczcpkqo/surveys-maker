package com.util;

import com.google.api.core.ApiFuture;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
import com.po.Result;
import org.springframework.stereotype.Component;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Component
public class firebaseUtil {

    private static final String FIREBASE_SERVICE_ACCOUNT = "src/main/resources/survey-service-account.json";

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
                .build();
        FirebaseApp.initializeApp(options);

        db = FirestoreClient.getFirestore();

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

}
