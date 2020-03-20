package com.gec.lab_admin.db.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name="teacher")
public class Teacher{

    @Id
    @Column(name="id")
    @Size(max = 10)
    @NotNull
    private String id;

    @Size(max = 30)
    @Column(name="name")
    private String name;

    @Size(max = 20)
    @Column(name="password")
    private String password;

    public Teacher(String id, String name,String password) {
        this.id = id;
        this.name = name;
        this.password=password;
    }

    public Teacher(){

    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    public String getTeacher_password() {
        return password;
    }

    public void setTeacher_password(String pwd) {
        this.password = pwd;
    }

}

