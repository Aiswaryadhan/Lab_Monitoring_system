package com.gec.lab_admin.db.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Size;

@Table(name="subjectsem")
public class SubjectSem {

    @Column(name="subject_id")
    @Size(max = 10)
    private String subject_id;


    @Size(max = 11)
    @Column(name="sem")
    private Integer sem;

    public SubjectSem(){

    }

    public SubjectSem(String subject_id,Integer sem) {
        this.subject_id = subject_id;
        this.sem = sem;
    }

    public String getSubject_id() {
        return subject_id;
    }

    public void setSubject_id(String subject_id) {
        this.subject_id = subject_id;
    }

    public Integer getSem() {
        return sem;
    }

    public void setSem(Integer sem) {
        this.sem = sem;
    }
}
