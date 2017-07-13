package com.phh.storyserver.controllers;

import com.phh.storyserver.models.Service;
import com.phh.storyserver.models.User;
import com.phh.storyserver.repositories.ServiceRepository;
import com.phh.storyserver.repositories.UserRepository;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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

    @Autowired
    UserRepository userRepository;

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
        data.put("1", new Object[] { "Tên khách hàng", "Mã khách hàng", "Địa chỉ sử dụng", "Ngày sinh", "Số điện thoại", "Dịch vụ", "Thời gian sử dụng", "Số thuê bao" });

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

    //@PostMapping("/upload") // //new annotation since 4.3
    @RequestMapping(value = "/import", method = RequestMethod.POST)
    public @ResponseBody List<Service> singleFileUpload(@RequestParam("file") MultipartFile file) throws IOException {

        if (file.isEmpty()) {

        }

        try {

            // Get the file and save it somewhere
            byte[] bytes = file.getBytes();

            ByteArrayInputStream bis = new ByteArrayInputStream(bytes);
            Workbook workbook;
            try {
                if (file.getOriginalFilename().endsWith("xls")) {
                    workbook = new HSSFWorkbook(bis);
                } else if (file.getOriginalFilename().endsWith("xlsx")) {
                    workbook = new XSSFWorkbook(bis);
                } else {
                    throw new IllegalArgumentException("Received file does not have a standard excel extension.");
                }

                for (Row row : workbook.getSheetAt(0)) {
                    if (row.getRowNum() <= 1) {
                        continue;
                    }

                    String code = row.getCell(1).getStringCellValue();
                    User user = userRepository.findByCode(code);
                    if(user == null) {
                        user = new User();
                        user.setName(row.getCell(0).getStringCellValue());
                        user.setCode(row.getCell(1).getStringCellValue());
                        user.setAddress(row.getCell(2).getStringCellValue());
                        user.setPhone(row.getCell(3).getStringCellValue());
                        user.setBirthday(row.getCell(4).getDateCellValue());
                        user.setNumberUsed(new Double(row.getCell(5).getNumericCellValue()).intValue());
                        user.setNote(row.getCell(6) == null ? "" : row.getCell(6).getStringCellValue());

                    }

                    Service service = new Service();
                    service.setService(row.getCell(8).getStringCellValue());
                    service.setPlan(row.getCell(9).getStringCellValue());
                    service.setPrice(new Double(row.getCell(10).getNumericCellValue()).intValue());
                    service.setExpired(new Double(row.getCell(11).getNumericCellValue()).intValue());
                    service.setDialPlan(row.getCell(12).getStringCellValue());
                    service.setUser(user);

                    List<Service> services = user.getServices();
                    if(services == null) {
                        services = new ArrayList<>();
                    }
                    services.add(service);
                    user.setServices(services);

                    userRepository.save(user);
                }

            } catch (IOException e) {
                e.printStackTrace();
            }

        } catch (IOException e) {
            e.printStackTrace();
        }

        return new ArrayList<>();
    }
}
