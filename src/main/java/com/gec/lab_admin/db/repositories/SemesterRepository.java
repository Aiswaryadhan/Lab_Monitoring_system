package com.gec.lab_admin.db.repositories;

import com.gec.lab_admin.db.models.Teacher;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface SemesterRepository extends CrudRepository<Teacher,String> {
    @Query(
            value = "select name from semester",
            nativeQuery = true)
    List<String> getSemester();
}
