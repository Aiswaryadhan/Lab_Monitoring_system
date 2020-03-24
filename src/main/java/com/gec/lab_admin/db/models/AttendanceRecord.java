package com.gec.lab_admin.db.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;

@Entity
@Table(name="attendance_record")
public class AttendanceRecord {

    @Column(name="lab_date")
    @NotNull
    private Date lab_date;

//    @JsonIgnore
    @Size(max = 10)
    @Column(name="subject_id")
    private String subject_id;

    @Size(max = 10)
    @Column(name="student_id")
    private String student_id;

//    @JsonIgnore
    @Size(max = 1)
    @NotNull
    @Column(name="presence")
    private Boolean presence;

    public AttendanceRecord(Date lab_date,String subject_id,String student_id,Boolean presence) {
        this.lab_date = lab_date;
        this.subject_id = subject_id;
        this.student_id = student_id;
        this.presence = presence;
    }

    public Date getLab_date() {
        return lab_date;
    }

    public void setLab_date(Date lab_date) {
        this.lab_date = lab_date;
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

    public Boolean getPresence() {
        return presence;
    }

    public void setPresence(Boolean presence) {
        this.presence = presence;
    }
}
