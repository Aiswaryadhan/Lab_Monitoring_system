package com.gec.lab_admin.db.models;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name="semester")
public class Semester {

    @Id
    @Column(name="id")
    @Size(max = 11)
    @NotNull
    private Integer id;


    //    @JsonIgnore
    @Size(max = 10)
    @Column(name="name")
    private String name;

    public Semester(){

    }
    public Semester(Integer id,String name) {
        this.id = id;
        this.name = name;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getSem() {
        return name;
    }

    public void setSem(String sem) {
        this.name = sem;
    }
}
