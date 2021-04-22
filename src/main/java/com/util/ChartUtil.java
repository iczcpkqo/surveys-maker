package com.util;

import org.jfree.chart.ChartFactory;
import org.jfree.chart.ChartUtils;
import org.jfree.chart.JFreeChart;
import org.jfree.chart.labels.StandardPieSectionLabelGenerator;
import org.jfree.chart.plot.PiePlot;

import org.jfree.chart.plot.RingPlot;
import org.jfree.chart.ui.RectangleEdge;
import org.jfree.data.general.DefaultPieDataset;
import org.springframework.stereotype.Component;

import java.awt.*;
import java.io.File;
import java.text.DecimalFormat;
import java.util.Map;

@Component
public class ChartUtil {

    public File createPie(Map<String, Integer> params, String title) {

        DefaultPieDataset data = getPieDataSet(params);
        JFreeChart chart = ChartFactory.createRingChart("", data, true, false, false);
        chart.getTitle().setFont(new Font("Helvetica", Font.BOLD, 20));
        RingPlot ringPlot = (RingPlot) chart.getPlot();
        ringPlot.setSectionDepth(0.5d);
        ringPlot.setSectionPaint("green", new Color(0, 204, 153));
        ringPlot.setSectionPaint("amber", new Color(255, 153, 102));
        ringPlot.setSectionPaint("red", new Color(255, 51, 102));
        ringPlot.setCircular(true);
        ringPlot.setBackgroundAlpha(0f);
        ringPlot.setLabelGenerator(null);
        ringPlot.setSeparatorPaint(Color.WHITE);

        chart.getLegend().setItemFont(new Font("Helvetica", Font.BOLD, 10));
        chart.getLegend().setPosition(RectangleEdge.TOP);
        chart.getLegend().setBorder(0, 0, 0, 0);
        chart.getLegend().setMargin(10, 30, 10, 0);
        ringPlot.setLegendLabelGenerator(new StandardPieSectionLabelGenerator("{0}: {1} ({2})", new DecimalFormat("0"), new DecimalFormat("0.00%")));
        try {
            File tempFile = File.createTempFile(title, ".jpg");
            ChartUtils.saveChartAsJPEG(tempFile, 1.0f, chart, 400, 400, null);
            return tempFile;
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


}
