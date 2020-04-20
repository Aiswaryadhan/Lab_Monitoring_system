package com.gec.lab_admin.db.repositories;

import com.gec.lab_admin.db.models.Student;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

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

    @Transactional
    @Modifying
    @Query(
            value = "insert into student values(:id,:name,:id,:sem)",
            nativeQuery = true)

    void insertStud(String id, String name, Integer sem);

    @Transactional
    @Modifying
    @Query(
            value = "update student set name=:name,sem=:sem where id=:studId",
            nativeQuery = true)
    void updateStud(String name, Integer sem, String studId);

    @Transactional
    @Modifying
    @Query(
            value = "delete from student where id=:studId",
            nativeQuery = true)
    void deleteStud(String studId);

    @Query(
            value = "select count(s.id)as c from student s inner join subject_sem ss where s.sem=ss.sem and subject_id=:sub and s.id=:studId",
            nativeQuery = true)
    Integer getCount(String studId, String sub);
}