package com.gec.lab_admin.db.repositories;


import com.gec.lab_admin.db.models.*;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public interface TeacherRepository extends CrudRepository<Teacher,String> {

    @Query(
            value = "select s.name,s.id from subject s inner join teacher_subject on teacher_subject.subject_id=s.id where teacher_id=:teacher_id",
            nativeQuery = true)
    List<String> getSubjects(String teacher_id);

    @Query(
            value = "select st.id as student_id, ss.subject_id as subject_id from student st inner join subject_sem ss on st.sem=ss.sem where ss.subject_id=:subject_id",
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

    @Query(
            value = "select url from blocked_sites where sub_id=:subId",
            nativeQuery = true)
    List<String> getAllSites(String subId);

    @Transactional
    @Modifying
    @Query(
            value = "insert into blocked_sites values(:subId,:url)",
            nativeQuery = true)
    void insertSite(String subId,String url);

    @Transactional
    @Modifying
    @Query(
            value = "delete from blocked_sites where sub_id=:sub_id and url=:url",
            nativeQuery = true)
    void deleteSites(String sub_id, String url);

    @Query(
            value = "select * from message_send where (sender=:teacherId and receiver=:stId) or (sender=:stId and receiver=:teacherId) order by timestamp",
            nativeQuery = true)
    List<Map> getMessages(String stId, String teacherId);

    @Query(
            value = "select id from loggedInStudent",
            nativeQuery = true)
    List<String> getLoggedStud();

    @Transactional
    @Modifying
    @Query(
            value = "insert into message_send values(:sender,:receiver,:message,NOW())",
            nativeQuery = true)
    void insertMessage(String sender, String receiver, String message);

    @Query(
            value = "select st.id as student_id, st.name as studName from student st inner join subject_sem ss on st.sem=ss.sem where ss.subject_id=:sub",
            nativeQuery = true)
    List<String> getAllStudId(String sub);

    @Transactional
    @Modifying
    @Query(
            value = "insert into notification values(:sender,:receiver,:type,NOW(),NULL)",
            nativeQuery = true)
    void insertNotification(String sender, String receiver, String type);

    @Query(
            value = "select s.id,s.name,n.timestamp from student s inner join  notification n on s.id=n.sender where receiver=:username and type='request' order by timestamp desc",
            nativeQuery = true)
    List<String> getNotifications(String username);

    @Query(
            value = "select count(*) from notification where receiver=:username and viewedTime is NULL",
            nativeQuery = true)
    int getNotificationCount(String username);

    @Transactional
    @Modifying
    @Query(
            value = "update notification set viewedTime=NOW() where timestamp=:t1",
            nativeQuery = true)
    void updateNotification(Timestamp t1);

    @Query(
            value = "select st.id as student_id, st.name as subject_id from student st inner join subject_sem ss on st.sem=ss.sem where ss.subject_id=:sub",
            nativeQuery = true)
    List<String> getStudInfo(String sub);

    @Transactional
    @Modifying
    @Query(
            value = "delete from notification",
            nativeQuery = true)
    void deleteNotifications();
    @Transactional
    @Modifying
    @Query(
            value = "delete from message_send",
            nativeQuery = true)
    void deleteMessages();
}