package com.phh.storyserver.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

/**
 * Created by phhien on 11/21/2016.
 */
@Data
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int user_id;
    private int code;
    private String name;
    private String address;
    private String phone;
    private Date birthday;
    private int numberUsed;
    private String note;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    Set<Service> services;

    @JsonProperty("birthday")
    public String getNgaySinh() {
        return birthday.toString();
    }
}
