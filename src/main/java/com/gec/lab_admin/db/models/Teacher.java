package com.gec.lab_admin.db.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.org.apache.xpath.internal.operations.Bool;

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

    @JsonIgnore
    @Size(max = 30)
    @Column(name="name")
    private String name;

    @Size(max = 20)
    @Column(name="password")
    private String password;

    @JsonIgnore
    @Size(max = 1)
    @Column(name="is_admin")
    private Boolean is_admin;

    public Teacher(String id, String name,String password,Boolean is_admin) {
        this.id = id;
        this.name = name;
        this.password=password;
        this.is_admin=is_admin;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Boolean getIs_admin() {
        return is_admin;
    }

    public void setIs_admin(Boolean is_admin) {
        this.is_admin = is_admin;
    }
}

