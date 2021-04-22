package com.util;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import javafx.util.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.*;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Component
public class PDFUtil {

    @Autowired
    private firebaseUtil firebaseUtil;

    public File createPDF(List<Pair<String, File>> topicFiles) {
        File tempFile;
        Document document = null;
        try {
            BaseFont baseFont = BaseFont.createFont();
            document = new Document(PageSize.A4);
            tempFile = File.createTempFile(UUID.randomUUID().toString(), ".pdf");
            PdfWriter.getInstance(document, new FileOutputStream(tempFile));
            document.setMargins(64, 64, 36, 36);
            document.open();
            Paragraph paragraph = new Paragraph("survey report", new Font(baseFont, 36, Font.BOLD));
            paragraph.setAlignment(Element.ALIGN_CENTER);
            document.add(paragraph);
            int i = 0;
            for (Pair<String, File> topicFile : topicFiles) {
                if (i > 0) {
                    document.newPage();
                }
                Paragraph p = new Paragraph(topicFile.getKey(), new Font(baseFont, 24, Font.BOLD));
                paragraph.setAlignment(Element.ALIGN_CENTER);
                document.add(p);
                Image image = Image.getInstance(topicFile.getValue().getAbsolutePath());
//                image.scaleToFit(PageSize.A4.getWidth(), PageSize.A4.getHeight());
                float x = (PageSize.A4.getWidth() - image.getScaledWidth()) / 2;
                float y = (PageSize.A4.getHeight() - image.getScaledHeight()) / 2;
                image.setAbsolutePosition(x, y);
                document.add(image);
                i++;
            }
            document.close();
            firebaseUtil.uploadFile("pdfs", tempFile.getAbsolutePath(), tempFile.getName());
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        } finally {
            if (document != null) {
                document.close();
            }
        }

        return tempFile;
    }
}
