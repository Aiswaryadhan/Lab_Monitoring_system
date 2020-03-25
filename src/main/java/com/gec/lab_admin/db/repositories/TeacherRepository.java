package com.gec.lab_admin.db.repositories;

import com.gec.lab_admin.db.models.Teacher;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TeacherRepository extends CrudRepository<Teacher,String> {

    @Query(
            value = "select s.name,s.id from subject s inner join teacher_subject on teacher_subject.subject_id=s.id where teacher_id=:teacher_id",
            nativeQuery = true)
    List<String> getSubjects(String teacher_id);
}