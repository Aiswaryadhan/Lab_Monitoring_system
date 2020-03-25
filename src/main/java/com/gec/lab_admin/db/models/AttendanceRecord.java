package com.gec.lab_admin.db.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;

@Entity
@Table(name="attendance_record")
public class AttendanceRecord {

    @EmbeddedId
    private AttendanceId attendanceId;

    @Size(max = 1)
    @NotNull
    @Column(name="presence")
    private Boolean presence;

    public  AttendanceRecord(){

    }
    public AttendanceRecord(AttendanceId attendanceId,Boolean presence) {
        this.attendanceId=attendanceId;
        this.presence = presence;
    }

    public AttendanceId getAttendanceId() {
        return attendanceId;
    }

    public void setAttendanceId(AttendanceId attendanceId) {
        this.attendanceId = attendanceId;
    }

    public Boolean getPresence() {
        return presence;
    }

    public void setPresence(Boolean presence) {
        this.presence = presence;
    }
}
