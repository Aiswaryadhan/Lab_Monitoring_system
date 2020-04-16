package com.gec.lab_admin.db.repositories;

import com.gec.lab_admin.db.models.AttendanceRecord;
import com.gec.lab_admin.db.models.AttendanceReport;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface AttendanceRepository extends CrudRepository<AttendanceRecord,String> {

    @Query(
            value = "select s.name as name,count(distinct a.date)as present_days,:totalDays as total_days,concat(round((present_days/total_days * 100),2),'%') AS percentage  from attendance_record a inner join student s on s.id=a.student_id where a.date between :sDate and :eDate and a.subject_id=:sub and a.presence=1 group by a.student_id",
            nativeQuery = true)
    AttendanceReport generateReport(String sDate, String eDate, String sub ,Integer totalDays);

    @Query(
            value = "select count(distinct a.date) from attendance_record a where a.date between :sDate and :eDate and a.subject_id=:sub",
            nativeQuery = true)
    Integer getTotalDays(String sDate, String eDate, String sub);


//    Optional<AttendanceRecord> findById(String subjectId);
}
