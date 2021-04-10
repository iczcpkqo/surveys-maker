package com.util;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import javafx.util.Pair;
import org.springframework.stereotype.Component;

import java.io.*;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Component
public class PDFUtil {


    public File createPDF(List<Pair<String, File>> topicFiles) {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();

        try {
            BaseFont baseFont = BaseFont.createFont();

            Document document = new Document(PageSize.A4);
            PdfWriter writer = PdfWriter.getInstance(document, baos);
            document.setMargins(64, 64, 36, 36);
            document.open();
            Paragraph paragraph = new Paragraph("survey report", new Font(baseFont, 36, Font.BOLD));
            paragraph.setAlignment(Element.ALIGN_CENTER);
            document.add(paragraph);
            for (Pair<String, File> topicFile : topicFiles) {
                Paragraph p = new Paragraph(topicFile.getKey(), new Font(baseFont, 24, Font.BOLD));
                paragraph.setAlignment(Element.ALIGN_CENTER);
                document.add(p);
                Image image = Image.getInstance(topicFile.getValue().getAbsolutePath());
                image.setAbsolutePosition(400, 430);
                document.add(image);
            }

            File tempFile = File.createTempFile(UUID.randomUUID().toString(), ".pdf");
            BufferedOutputStream out = new BufferedOutputStream(new FileOutputStream(tempFile));
            baos.writeTo(out);
            out.close();
            baos.close();
            writer.close();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

        return null;
    }
}
