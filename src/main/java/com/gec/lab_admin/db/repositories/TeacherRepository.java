package com.gec.lab_admin.db.repositories;

import com.gec.lab_admin.db.models.Teacher;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface TeacherRepository extends CrudRepository<Teacher,String> {

    @Query(
            value = "select subject from subject inner join teacher_subject on teacher_subject.subject_id=subject.id",
            nativeQuery = true)
    Teacher generateSubject1Teacher(@Param("teacher_id")String teacher_id);

}
