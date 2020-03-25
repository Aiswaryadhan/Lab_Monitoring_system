package com.gec.lab_admin.db.models;

import org.hibernate.annotations.Type;

import javax.persistence.*;

@Entity
@Table(name="attendance_record")
public class AttendanceRecord {

    @EmbeddedId
    @Id
    private AttendanceId attendanceId;

//fixme : typ error
    @Column(name="presence", columnDefinition = "TINYINT(1)")
    private boolean presence;

    public  AttendanceRecord(){

    }
    public AttendanceRecord(AttendanceId attendanceId,boolean presence) {
        this.attendanceId=attendanceId;
        this.presence = presence;
    }

    public AttendanceId getAttendanceId() {
        return attendanceId;
    }

    public void setAttendanceId(AttendanceId attendanceId) {
        this.attendanceId = attendanceId;
    }

    public boolean getPresence() {
        return presence;
    }

    public void setPresence(boolean presence) {
        this.presence = presence;
    }
}
