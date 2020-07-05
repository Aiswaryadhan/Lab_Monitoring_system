package com.gec.lab_admin.db.repositories;

import com.gec.lab_admin.db.models.Semester;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.gec.lab_admin.db.models.Subject;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface SubjectRepository extends CrudRepository <Subject,String>{

    @Transactional
    @Modifying
    @Query(
            value = "insert into subject values(:id,:name)",
            nativeQuery = true)
    void insertSub(String id, String name);

    @Transactional
    @Modifying
    @Query(
            value = "update subject set name=:name where id=:subId",
            nativeQuery = true)
    void updateSub(String name, String subId);

    @Transactional
    @Modifying
    @Query(
            value = "delete from subject where id=:subId",
            nativeQuery = true)
    void deleteSub(String subId);
    @Transactional
    @Modifying
    @Query(
            value = "insert into subject_sem values(:subject_id,:sem)",
            nativeQuery = true)
    void insertSubSem(String subject_id, Integer sem);

    @Transactional
    @Modifying
    @Query(
            value = "delete from subject_sem where subject_id=:subId",
            nativeQuery = true)
    void deleteSubSem(String subId);

    @Query(
            value = "select s.*,ss.sem from subject s, subject_sem ss where s.id=ss.subject_id;",
            nativeQuery = true)
    List<String> getSubSem();

    @Transactional
    @Modifying
    @Query(
            value = "update subject_sem set sem=:sem where subject_id=:subId",
            nativeQuery = true)
    void updateSubSem(Integer sem, String subId);

    @Transactional
    @Modifying
    @Query(
            value = "delete from teacher_subject where subject_id=:subId",
            nativeQuery = true)
    void deleteTeacherSubject(String subId);
}
