package com.gec.lab_admin.db.repositories;

import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface AttendanceRepository {

    Date dt=new Date();
    @Query(
            value = "insert into attendance_record values(dt,"")",
            nativeQuery = true)
    List<String> getSubjects(String teacher_id);

}
