package com.gec.lab_admin.db.repositories;

import com.gec.lab_admin.db.models.AttendanceRecord;
import com.gec.lab_admin.db.models.Student;
import com.gec.lab_admin.db.models.Teacher;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface StudentRepository extends CrudRepository<Student,String> {
    @Transactional
    @Modifying
    @Query(
            value = "update attendance_record set presence=1 where student_id=:studentId AND date=CURDATE() AND subject_id=:subjectId",
            nativeQuery = true)
    void updateAttendance(String subjectId,String studentId);

    @Transactional
    @Modifying
    @Query(
            value = "insert into loggedInStudent values(:id)",
            nativeQuery = true)
    void insertLoggedStudent(String id);

    @Query(
            value = "select name from student where id=:studId",
            nativeQuery = true)
    String getStudName(String studId);
}
