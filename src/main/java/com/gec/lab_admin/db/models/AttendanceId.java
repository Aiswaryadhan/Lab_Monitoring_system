package com.gec.lab_admin.db.models;

import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Date;

@Embeddable
public class AttendanceId implements Serializable {

    private Date date;
    private String subject_id;
    private String student_id;

    public AttendanceId(){

    }

    public AttendanceId(Date date, String subject_id, String student_id) {
        this.date = date;
        this.subject_id = subject_id;
        this.student_id = student_id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getSubject_id() {
        return subject_id;
    }

    public void setSubject_id(String subject_id) {
        this.subject_id = subject_id;
    }

    public String getStudent_id() {
        return student_id;
    }

    public void setStudent_id(String student_id) {
        this.student_id = student_id;
    }

}
