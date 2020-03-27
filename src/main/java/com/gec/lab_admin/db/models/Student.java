package com.gec.lab_admin.db.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name="student")
public class Student {

    @Id
    @Column(name="id")
    @Size(max = 10)
    @NotNull
    private String id;

    @JsonIgnore
    @Size(max = 30)
    @Column(name="name")
    @NotNull
    private String name;

    @Size(max = 20)
    @Column(name="password")
    @NotNull
    private String password;

    @JsonIgnore
    @Size(max = 11)
    @Column(name="sem")
    @NotNull
    private Integer sem;

    public Student(){

    }

    public Student(String id, String name, String password, Integer sem) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.sem = sem;
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

    public Integer getSem() {
        return sem;
    }

    public void setSem(Integer sem) {
        this.sem = sem;
    }

}
