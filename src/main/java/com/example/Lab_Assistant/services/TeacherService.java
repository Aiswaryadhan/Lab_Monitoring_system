package com.example.Lab_Assistant.services;

import com.example.Lab_Assistant.db.models.Teacher;
import com.example.Lab_Assistant.db.models.repositories.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TeacherService {
    @Autowired
    private TeacherRepository teacherRepository;

    public List<Teacher> findAll(){
        List<Teacher> teacherDetails = new ArrayList<>();
        teacherRepository.findAll().forEach(teacherDetails::add);
        return teacherDetails;
    }
    public Teacher find(String studentID){
        return teacherRepository.findOne(studentID);
    }
}
