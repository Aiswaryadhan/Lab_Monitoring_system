package com.example.Lab_Assistant.controllers;

import com.example.Lab_Assistant.services.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TeacherController {

    @Autowired
    private TeacherService studentService;
}
