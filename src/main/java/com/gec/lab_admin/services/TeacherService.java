package com.gec.lab_admin.services;

import com.gec.lab_admin.db.models.Teacher;
import com.gec.lab_admin.db.repositories.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
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
    public List<Teacher> generateSubject(String teacher_id){
        List<Teacher> reportList=new ArrayList<>();
        reportList.add(teacherRepository.generateSubject1Teacher(teacher_id));
//        reportList.add(teacherRepository.generateSubject1Teacher(teacher_id));
//        reportList.add(teacherRepository.generateSubject1Teacher(teacher_id));
        return reportList;
    }
    public Optional<Teacher> login(String teacherId) {
        return teacherRepository.findById(teacherId);
    }
}
