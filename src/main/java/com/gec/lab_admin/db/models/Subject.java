package com.gec.lab_admin.db.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name="subject")
public class Subject {
    @Id
    @Column(name="id")
    @Size(max = 10)
    @NotNull
    private String id;


//    @JsonIgnore
    @Size(max = 50)
    @Column(name="name")
    @NotNull
    private String name;

    public Subject(String id, String name) {
        this.id = id;
        this.name = name;
    }

    public Subject(){

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
}
