package com.gec.lab_admin.db.repositories;

import com.gec.lab_admin.db.models.Student;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
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
            value = "insert into loggedInStudent values(:id,:ip,NOW())",
            nativeQuery = true)
    void insertLoggedStudent(String id,String ip);

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

    @Transactional
    @Modifying
    @Query(
            value = "delete from student where sem>=6",
            nativeQuery = true)
    void deleteFinal();

    @Transactional
    @Modifying
    @Query(
            value = "update student set sem=sem+1",
            nativeQuery = true)
    void updateSem();
    @Query(
            value = "select name from student where id=:sender",
            nativeQuery = true)
    String getStudName(String sender);

    @Transactional
    @Modifying
    @Query(
            value = "insert into files_uploaded values(NOW(),:teacherSub,:studId,:filename)",
            nativeQuery = true)
    void insertFiles(String studId, String teacherSub,String filename);

    @Query(
            value = "select datetime,file_name from files_uploaded where student_id=:studId and subject_id=:teacherSub order by datetime desc",
            nativeQuery = true)
    List<String> studDisplayFiles(String studId, String teacherSub);

    @Query(
            value = "select f.datetime,f.file_name,s.name from files_uploaded f inner join student s on f.student_id=s.id where f.subject_id=:sub order by f.datetime desc",
            nativeQuery = true)
    List<String> adminDisplayFiles(String sub);

    @Query(
            value = "select count(*) from files_uploaded where student_id=:studId and subject_id=:sub",
            nativeQuery = true)
    Integer getFiles(String sub,String studId);

    @Query(
            value = "select url from blocked_sites where sub_id=:loggedInTeacherSubject",
            nativeQuery = true)
    List<String> getAllSites(String loggedInTeacherSubject);

    @Query(
            value = "select sender,timestamp from notification where receiver=:studId and type='response' order by timestamp desc",
            nativeQuery = true)
    List<String> getNotifications(String studId);
    @Query(
            value = "select count(*) from notification where receiver=:studId and type='response' and viewedTime is NULL",
            nativeQuery = true)
    int getNotificationCount(String studId);

    @Transactional
    @Modifying
    @Query(
            value = "update notification set viewedTime=NOW() where timestamp=:t1",
            nativeQuery = true)
    void updateNotification(Timestamp t1);
    @Query(
            value = "select count(id) from loggedInStudent where ip=:ip",
            nativeQuery = true)
    int checkIp(String ip);
}