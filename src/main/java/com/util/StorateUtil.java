package com.util;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.storage.*;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.StorageClient;
import com.po.Result;
import org.springframework.stereotype.Component;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;

@Component
public class StorateUtil {

    private static final String FIREBASE_SERVICE_ACCOUNT = "src/main/resources/survey-service-account.json";

    private static String storagePath = "survey-dfcd5.appspot.com";

    private static Bucket bucket;

    private static Storage service;

    private static String image = "images/";

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
            System.out.println("Failed to establish storage connection");
        }
        FirebaseOptions firebaseOptions = FirebaseOptions.builder()
                .setCredentials(credentials)
                .setStorageBucket(storagePath)
                .build();
        FirebaseApp.initializeApp(firebaseOptions);

        StorageOptions build = StorageOptions.newBuilder()
                .setCredentials(credentials)
                .build();

        bucket = StorageClient.getInstance().bucket();
        service = build.getService();
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
            tempFile = File.createTempFile(PDFName, ".pdf");
            Blob blob = service.get(BlobId.of(storagePath, "images/1111.jpg"));
            blob.downloadTo(Paths.get(tempFile.getAbsolutePath()));
        } catch (IOException e) {
            return new Result("false", "failed to create file", null);
        }
        return new Result("true", tempFile.getAbsolutePath(), null);

    }
}
