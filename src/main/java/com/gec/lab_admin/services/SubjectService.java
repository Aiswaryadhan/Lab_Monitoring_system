package com.gec.lab_admin.services;

import com.gec.lab_admin.db.repositories.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;

import com.gec.lab_admin.db.models.Subject;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SubjectService {

    @Autowired
    private SubjectRepository subjectRepository;

    public List<Subject> getAllSubject() {
            return (List<Subject>) subjectRepository.findAll();
    }

    public void insertSub(String id, String name) {
            subjectRepository.insertSub(id,name);

    }

    public void updateSub(String name, String subId) {
        subjectRepository.updateSub(name,subId);
    }

    public void deleteSub(String subId) {
        subjectRepository.deleteSubSem(subId);
        subjectRepository.deleteSub(subId);

    }

    public void insertSubSem(String subject_id, Integer sem) {
        subjectRepository.insertSubSem(subject_id,sem);
    }


    public List<String> getSubSem() {
        return subjectRepository.getSubSem();
    }

    public void updateSubSem(Integer sem, String subId) {
            subjectRepository.updateSubSem(sem,subId);
    }

    public Optional<Subject> idCheck(String id) {
        return subjectRepository.findById(id);
    }
}
