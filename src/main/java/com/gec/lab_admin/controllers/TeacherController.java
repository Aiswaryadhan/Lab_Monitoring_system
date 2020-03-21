package com.gec.lab_admin.controllers;

import com.gec.lab_admin.db.models.Teacher;
import com.gec.lab_admin.services.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class TeacherController {
    @Autowired
    TeacherService teacherService;

    @RequestMapping(method = RequestMethod.POST,value = "/login/{studentID}")
    public void login(@RequestBody Teacher teacher, @PathVariable String techherID){
        teacherService.login(teacher,techherID);
    }
}
