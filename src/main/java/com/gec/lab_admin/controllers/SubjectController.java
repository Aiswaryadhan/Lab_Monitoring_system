package com.gec.lab_admin.controllers;

import com.gec.lab_admin.db.models.Semester;
import com.gec.lab_admin.db.models.Student;
import com.gec.lab_admin.db.models.SubjectSem;
import com.gec.lab_admin.services.SubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.gec.lab_admin.db.models.Subject;
import java.util.List;
import java.util.Optional;

@RestController
public class SubjectController {

    @Autowired
    SubjectService subjectService;

    @RequestMapping("/subject/getAll")
    public List<Subject> getAllSubject()
    {
        return subjectService.getAllSubject();
    }
    @RequestMapping("/subject/idCheck")
    public String idCheck(@RequestBody Subject subject) {
        Optional<Subject> sub = subjectService.idCheck(subject.getId());
        if(sub.isPresent()){
            return "success";
        }
        else{
            return "failed";
        }

    }
    @RequestMapping("/subject/getSubSem")
    public List<String> getSubSem()
    {
        return subjectService.getSubSem();
    }

    @RequestMapping("/subject/insert")
    public void insertSub(@RequestBody Subject subject) {
        subjectService.insertSub(subject.getId(), subject.getName());
    }
    @RequestMapping("/subjectSem/update/{subId}")
    public void updateSubSem(@RequestBody SubjectSem subjectSem,@PathVariable String subId) {
        subjectService.updateSubSem(subjectSem.getSem(), subId);
    }
    @RequestMapping("/subject/update/{subId}")
    public void updateSub(@RequestBody Subject subject,@PathVariable String subId) {
        subjectService.updateSub(subject.getName(), subId);
    }
    @RequestMapping("/subject/delete/{subId}")
    public void deleteSub(@PathVariable String subId){
        subjectService.deleteTeacherSubject(subId);
        subjectService.deleteSub(subId);

    }

    @RequestMapping("/subjectSem/insert")
    public void insertSubSem(@RequestBody SubjectSem subjectSem) {
        subjectService.insertSubSem(subjectSem.getSubject_id(), subjectSem.getSem());
    }

}
