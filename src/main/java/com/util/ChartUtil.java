package com.util;

import org.jfree.chart.ChartFactory;
import org.jfree.chart.ChartUtils;
import org.jfree.chart.JFreeChart;
import org.jfree.chart.labels.StandardPieSectionLabelGenerator;
import org.jfree.chart.plot.PiePlot;

import org.jfree.chart.ui.RectangleEdge;
import org.jfree.data.general.DefaultPieDataset;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.awt.*;
import java.io.File;
import java.text.DecimalFormat;
import java.util.HashMap;
import java.util.Map;

@Component
public class ChartUtil {

    private static final String KEY1 = "Datum 1";
    public static final String KEY2 = "Datum 2";
    private static final String path = "D:/";

    @Autowired
    private firebaseUtil firebaseUtil;

    public String createPie(Map<String, Integer> params, String title) {
        DefaultPieDataset data = getPieDataSet(params);
        JFreeChart chart = ChartFactory.createPieChart(title, data, true, false, false);
        chart.getTitle().setFont(new Font("Helvetica", Font.BOLD, 20));
        PiePlot piePlot = (PiePlot) chart.getPlot();
        piePlot.setCircular(true);
        piePlot.setBackgroundAlpha(0f);
        piePlot.setLabelGenerator(null);

        chart.getLegend().setItemFont(new Font("Helvetica", Font.BOLD, 10));
        chart.getLegend().setPosition(RectangleEdge.TOP);
        chart.getLegend().setBorder(0, 0, 0, 0);
        chart.getLegend().setMargin(10, 30, 10, 0);
        piePlot.setLegendLabelGenerator(new StandardPieSectionLabelGenerator("{0}: {1} ({2})", new DecimalFormat("0"), new DecimalFormat("0.00%")));
        String filePath = path + title + ".jpg";
        try {
            File tempFile = File.createTempFile(title, ".jpg");
            ChartUtils.saveChartAsJPEG(tempFile, 1.0f, chart, 400, 400, null);
            firebaseUtil.uploadImage(tempFile.getAbsolutePath(),title + ".jpg");
            firebaseUtil.downloadPDF("1111");
            return filePath;
        } catch (Exception e) {
            e.printStackTrace();
        } finally {

        }
        return null;
    }

    private DefaultPieDataset getPieDataSet(Map<String, Integer> params) {
        DefaultPieDataset dataset = new DefaultPieDataset();
        String[] sum = {"green", "amber", "red"};
        for (String item : sum) {
            if (params.containsKey(item)) {
                dataset.setValue(item, params.get(item));
            } else {
                dataset.setValue(item, 0d);
            }
        }
        return dataset;
    }

    public static void main(String[] args) {
        ChartUtil chartUtil = new ChartUtil();
        Map<String, Integer> params = new HashMap<>();
        params.put("green", 5);
        params.put("yellow", 1);
        params.put("red", 3);
        chartUtil.createPie(params, "1111");
    }

}
