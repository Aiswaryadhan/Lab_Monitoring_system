package com.gec.lab_admin.db.repositories;

import com.gec.lab_admin.db.models.AttendanceRecord;
import com.gec.lab_admin.db.models.Teacher;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Map;

public interface TeacherRepository extends CrudRepository<Teacher,String> {

    @Query(
            value = "select s.name,s.id from subject s inner join teacher_subject on teacher_subject.subject_id=s.id where teacher_id=:teacher_id",
            nativeQuery = true)
    List<String> getSubjects(String teacher_id);

    @Query(
            value = " select st.id as student_id, ss.subject_id as subject_id from student st inner join subject_sem ss on st.sem=ss.sem where ss.subject_id=:subject_id",
            nativeQuery = true)
    List<Map<String,String>> getAttendanceRecords(String subject_id);

    @Query(
            value = "select name from teacher where id=:teacherId",
            nativeQuery = true)
    String getTeacherName(String teacherId);
    @Query(
            value = "select s.id,s.name from student s inner join loggedInStudent ls on s.id=ls.id and s.id=:sender",
            nativeQuery = true)
    String getStudentName(String sender);

    @Query(
            value = "select t.id,t.name,t.is_admin,GROUP_CONCAT(s.name SEPARATOR ';')as subjects,GROUP_CONCAT(s.id SEPARATOR ';')as subject_ids from teacher t,teacher_subject ts,subject s where t.id=ts.teacher_id && ts.subject_id=s.id group by t.id",
            nativeQuery = true)
    List<String> getTeacherDetails();

    @Transactional
    @Modifying
    @Query(
            value = "insert into teacher values(:id,:name,:id,:is_admin)",
            nativeQuery = true)
    void insertTeacher(String id, String name, Boolean is_admin);

    @Transactional
    @Modifying
    @Query(
            value = "insert into teacher_subject values(:teacher_id,:subject_id)",
            nativeQuery = true)
    void insertTeacherSub(String teacher_id, String subject_id);

    @Transactional
    @Modifying
    @Query(
            value = "update teacher set name=:name,is_admin=:is_admin where id=:teacherId",
            nativeQuery = true)
    void updateTeacher(String name, Boolean is_admin, String teacherId);

    @Transactional
    @Modifying
    @Query(
            value = "update teacher_subject set subject_id=:subject_id where teacher_id=:teacherId",
            nativeQuery = true)
    void updateTeacherSub(String subject_id, String teacherId);

    @Transactional
    @Modifying
    @Query(
            value = "delete from teacher_subject  where teacher_id=:teacherId",
            nativeQuery = true)
    void deleteTeacherSub(String teacherId);

    @Transactional
    @Modifying
    @Query(
            value = "delete from loggedInStudent",
            nativeQuery = true)
    void deleteLoggesStud();

    @Transactional
    @Modifying
    @Query(
            value = "delete from loggedInStudent where id=:studId",
            nativeQuery = true)
    void deleteLoggedInStudent(String studId);

    @Query(
            value = "select count(date) from attendance_record where date=CURDATE() and subject_id=:sub",
            nativeQuery = true)
    Integer getSubCount(String sub);

    @Query(
            value = "select TIMESTAMPDIFF(MINUTE,time,NOW()) from loggedInStudent where id=:studId",
            nativeQuery = true)
    Integer getTimeDiff(String studId);

    @Transactional
    @Modifying
    @Query(
            value = "update attendance_record set presence=0 where student_id=:studId AND date=CURDATE() AND subject_id=:loggedInTeacherSubject",
            nativeQuery = true)
    void updateLogoutAttendance(String loggedInTeacherSubject, String studId);

    @Query(
            value = "select count(id) from student",
            nativeQuery = true)
    Integer getStudNum();

    @Query(
            value = "select name from subject where id=:sub ",
            nativeQuery = true)
    String getSubName(String sub);

    @Query(
            value = "select count(*) from loggedInStudent",
            nativeQuery = true)
    Integer getOnlineStud();

    @Query(
            value = "select CURDATE()",
            nativeQuery = true)
    String getTime();

    @Query(
            value = "select count(id) from teacher",
            nativeQuery = true)
    Integer getTeacherNum();

    @Query(
            value = "select count(*) from files_uploaded where subject_id=:sub and DATE(datetime) = CURDATE()",
            nativeQuery = true)
    Integer getFiles(String sub);

    @Query(
            value = "select count(st.id) from student st inner join subject_sem ss on st.sem=ss.sem where ss.subject_id=:sub",
            nativeQuery = true)
    Integer getTeacherSub(String sub);

//    @Query(
//            value = "select count(*) from attendance_record where subject_id=:sub and student_id=:studId and date between :sDate and :eDate",
//            nativeQuery = true)
//    int getTotalCount(String studId, String sDate, String eDate,String sub);
//
//    @Query(
//            value = "select count(*) from attendance_record where subject_id=:sub and student_id=:studId and presence=1 and date between :sDate and :eDate",
//            nativeQuery = true)
//    int getCount(String studId, String sDate, String eDate, String sub);
//
//    @Query(
//            value = "select date,presence from attendance_record where subject_id=:sub and student_id=:studId and date between :sDate and :eDate",
//            nativeQuery = true)
//    List<String> getAllAttendance(String studId, String sDate, String eDate, String sub);

//    @Query(
//            value = "insert into semester values(:id,:name)",
//            nativeQuery = true)
//    void insertSem(sem);
}