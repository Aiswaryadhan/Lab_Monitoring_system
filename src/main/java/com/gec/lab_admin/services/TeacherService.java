package com.gec.lab_admin.services;

import com.gec.lab_admin.db.models.Subjects;
import com.gec.lab_admin.db.models.Teacher;
import com.gec.lab_admin.db.repositories.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TeacherService {
    @Autowired
    private TeacherRepository teacherRepository;

    public List<Teacher> findAll(){
        List<Teacher> teacherDetails = new ArrayList<>();
        teacherRepository.findAll().forEach(teacherDetails::add);
        return teacherDetails;
    }



    public List<String> getSubjects(String teacher_id){
        List<Subjects> subjectList=new ArrayList<>();
        return teacherRepository.getSubjects(teacher_id);
    }
    public Optional<Teacher> login(String teacherId) {
        return teacherRepository.findById(teacherId);
    }
}
