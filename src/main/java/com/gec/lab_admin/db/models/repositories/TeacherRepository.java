package com.gec.lab_admin.db.models.repositories;

import com.gec.lab_admin.db.models.Teacher;
import org.springframework.data.repository.CrudRepository;

public interface TeacherRepository extends CrudRepository<Teacher,String> {
    Teacher findOne(String studentID);
}
