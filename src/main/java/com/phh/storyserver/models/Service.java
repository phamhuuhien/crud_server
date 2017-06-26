package com.phh.storyserver.models;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by phhien on 6/26/2017.
 */
@Data
@Entity
public class Service {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String service;
    private String plan;
    private int price;
    private Date expried;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
