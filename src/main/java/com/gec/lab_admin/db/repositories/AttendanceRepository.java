package com.gec.lab_admin.db.repositories;

import com.gec.lab_admin.db.models.AttendanceRecord;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface AttendanceRepository extends CrudRepository<AttendanceRecord,String> {

    Date dt=new Date();
    @Query(
            value = "insert into attendance_record values(dt,:subject_id,(select )))",
            nativeQuery = true)
    List<String> getSubjects(String teacher_id);

    Optional<AttendanceRecord> findById(String subjectId);
}
