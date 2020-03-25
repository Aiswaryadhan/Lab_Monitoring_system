package com.gec.lab_admin.db.models;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Table(name="teachersubject")
public class TeacherSubject {
    //@Id
    @Column(name="teacher_id")
    @Size(max = 10)
    private String teacher_id;


    @Size(max = 10)
    @Column(name="subject_id")
    private String subject_id;

    public TeacherSubject(){

    }

    public TeacherSubject( String teacher, String subject) {
        this.teacher_id = teacher;
        this.subject_id = subject;
    }

    public String getTeacher_id() {
        return teacher_id;
    }

    public void setTeacher_id(String teacher_id) {
        this.teacher_id = teacher_id;
    }

    public String getSubject_id() {
        return subject_id;
    }

    public void setSubject_id(String subject_id) {
        this.subject_id = subject_id;
    }
}
