package com.phh.storyserver.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by phhien on 11/21/2016.
 */
@Data
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int ma_kh;
    private String ten_kh;
    private String dia_chi_ld;
    private String so_dt_lh;
    private Date ngay_sinh;
    private String loai_dv;
    private String goi_cuoc;
    private int gia_cuoc;
    private int thoi_gian_sd;
    private int so_nguoi_sd;
    private String ghi_chu;

    @JsonProperty("ngay_sinh")
    public String getNgaySinh() {
        return ngay_sinh.toString();
    }
}
