package com.phh.storyserver.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Set;

/**
 * Created by phhien on 11/21/2016.
 */
@Setter
@Getter
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
    private List<Service> services;

    @JsonProperty("birthday")
    public String getNgaySinh() {
        return birthday.toString();
    }
}
