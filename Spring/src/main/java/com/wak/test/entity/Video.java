package com.wak.test.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

@Entity
@Table(name="waktube")
@Getter
@Setter
public class Video {
    @Id
    @Column(name="vid")
    private String vid;

    @Column(name="title")
    private String title;

    @Column(name="views")
    private Integer views;

    @Column(name="uploader")
    private String uploader;

    @Column(name="upload_date")
    private Date uploadDate;

    public String getUploadDate(){
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        return dateFormat.format(this.uploadDate);
    }
    public Integer getViews(){
        return (this.views + 500) / 1000;
    }

}
