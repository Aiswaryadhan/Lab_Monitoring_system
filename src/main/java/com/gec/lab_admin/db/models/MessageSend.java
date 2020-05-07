package com.gec.lab_admin.db.models;

import javax.persistence.Column;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import java.sql.Timestamp;

@Table(name="message_send")
public class MessageSend {
    @Column(name="sender")
    @Size(max = 10)
    private String sender;

    @Column(name="receiver")
    @Size(max = 10)
    private String receiver;

    @Column(name="message")
    @Size(max = 255)
    private String message;

    @Column(name="timestamp")
    private Timestamp timestamp;

    public MessageSend() {
    }

    public MessageSend(@Size(max = 10) String sender, @Size(max = 10) String receiver, @Size(max = 255) String message, Timestamp timestamp) {
        this.sender = sender;
        this.receiver = receiver;
        this.message = message;
        this.timestamp = timestamp;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getReceiver() {
        return receiver;
    }

    public void setReceiver(String receiver) {
        this.receiver = receiver;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }
}
