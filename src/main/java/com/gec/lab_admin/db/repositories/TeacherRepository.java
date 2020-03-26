package com.gec.lab_admin.db.repositories;

import com.gec.lab_admin.db.models.Teacher;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

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

}