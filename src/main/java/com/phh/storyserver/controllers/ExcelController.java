package com.phh.storyserver.controllers;

import com.phh.storyserver.models.Service;
import com.phh.storyserver.repositories.ServiceRepository;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.CreationHelper;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by hienpham on 7/9/2017.
 */
@Controller
public class ExcelController {



    @Autowired
    ServiceRepository serviceRepository;

    @RequestMapping(value = "/excel", method = RequestMethod.GET)
    public void home(HttpServletResponse response) throws IOException {
        // Creation workbook vide
        XSSFWorkbook workbook = new XSSFWorkbook();

        // Creation sheet
        XSSFSheet sheet = workbook.createSheet("Participant");

        CellStyle dateCellStyle = workbook.createCellStyle();
        CreationHelper createHelper = workbook.getCreationHelper();
        dateCellStyle.setDataFormat(
                createHelper.createDataFormat().getFormat("dd/MM/yyyy"));
        List<Service> services = serviceRepository.findAll();
        int indiceMap = 2;
        Map<String, Object[]> data = new TreeMap<>();
        data.put("1", new Object[] { "name", "code", "address", "birthday", "phone", "service", "expired", "dialPlan" });

        for (Service service : services) {
            data.put(Integer.toString(indiceMap),
                    new Object[] { service.getUser().getName(), service.getUser().getCode(), service.getUser().getAddress(),
                            service.getUser().getBirthday(), service.getUser().getPhone(), service.getService(), service.getExpired(), service.getDialPlan() });
            indiceMap++;
        }
        // Iteration sur la map data et ecriture dans dans la feuille excel
        Set<String> keyset = data.keySet();
        int rownum = 0;
        for (String key : keyset) {
            Row row = sheet.createRow(rownum++);
            Object[] objArr = data.get(key);
            int cellnum = 0;
            for (Object obj : objArr) {
                Cell cell = row.createCell(cellnum++);
                if (obj instanceof String)
                    cell.setCellValue((String) obj);
                else if (obj instanceof Integer)
                    cell.setCellValue((Integer) obj);
                else if (obj instanceof Date) {
                    cell.setCellValue((Date) obj);
                    cell.setCellStyle(dateCellStyle);
                }
            }
        }

        DateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
        String dateToday = dateFormat.format(new Date());

        // Ecriture du fichier excel comme attachement
        ByteArrayOutputStream outByteStream = new ByteArrayOutputStream();
        workbook.write(outByteStream);
        byte[] outArray = outByteStream.toByteArray();
        String fileOut = "Bang_bao_cao_" + dateToday + ".xlsx";

        response.setContentType("application/vnd.ms-excel");
        response.setContentLength(outArray.length);
        response.setHeader("Content-Disposition", "attachment; filename=\""
                + fileOut + "\"");

        OutputStream outStream = response.getOutputStream();
        outStream.write(outArray);

        outStream.flush();
        outStream.close();
    }
}
