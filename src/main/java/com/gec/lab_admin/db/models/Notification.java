package com.gec.lab_admin.db.models;

import javax.persistence.Column;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import java.sql.Timestamp;

@Table(name="notification")
public class Notification {
    @Column(name="sender")
    @Size(max = 10)
    private String sender;

    @Column(name="receiver")
    @Size(max = 10)
    private String receiver;

    @Column(name="type")
    @Size(max = 10)
    private String type;

    @Column(name="timestamp")
    private Timestamp timestamp;

    @Column(name="viewedTime")
    private Timestamp viewedTime;

    public Notification() {
    }

    public Notification(@Size(max = 10) String sender, @Size(max = 10) String receiver, @Size(max = 10) String type, Timestamp timestamp, Timestamp viewedTime) {
        this.sender = sender;
        this.receiver = receiver;
        this.type = type;
        this.timestamp = timestamp;
        this.viewedTime = viewedTime;
    }

    public Timestamp getViewedTime() {
        return viewedTime;
    }

    public void setViewedTime(Timestamp viewedTime) {
        this.viewedTime = viewedTime;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public String getReceiver() {
        return receiver;
    }

    public void setReceiver(String receiver) {
        this.receiver = receiver;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }
}
