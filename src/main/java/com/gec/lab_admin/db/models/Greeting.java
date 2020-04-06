package com.gec.lab_admin.db.models;

public class Greeting {
    private String name;
    private String content;

    public String getContent() {
        return content;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public void setContent(String content) {
        this.content = content;
    }
}