package com.example.Lab_Assistant.db.models.repositories;

import com.example.Lab_Assistant.db.models.Teacher;
import org.springframework.data.repository.CrudRepository;

public interface TeacherRepository extends CrudRepository<Teacher,String> {
    Teacher findOne(String studentID);
}
