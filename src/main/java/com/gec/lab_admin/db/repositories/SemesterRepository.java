package com.gec.lab_admin.db.repositories;

import com.gec.lab_admin.db.models.Semester;
import com.gec.lab_admin.db.models.Teacher;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface SemesterRepository extends CrudRepository<Semester,String> {

    @Transactional
    @Modifying
    @Query(
            value = "insert into semester values(:id,:name)",
            nativeQuery = true)
    void insertSem(Integer id,String name);

    @Transactional
    @Modifying
    @Query(
            value = "update semester set name=:name where id=:semId",
            nativeQuery = true)
    void updateSem(String name, Integer semId);

    @Transactional
    @Modifying
    @Query(
            value = "delete from semester where id=:semId",
            nativeQuery = true)
    void deleteSem(Integer semId);
}
