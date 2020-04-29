package com.gec.lab_admin.services;

import com.gec.lab_admin.db.models.AttendanceRecord;
import com.gec.lab_admin.db.models.Student;
import com.gec.lab_admin.db.models.Subject;
import com.gec.lab_admin.db.repositories.AttendanceRepository;
import com.gec.lab_admin.db.repositories.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private AttendanceRepository attendanceRepository;

    public Optional<Student> login(String studentId) {
        return studentRepository.findById(studentId);
    }

    public void updateAttendance(String subjectId, String studentId) {
        studentRepository.updateAttendance(subjectId,studentId);
    }

    public void add(String id) {
        studentRepository.insertLoggedStudent(id);
    }


    public List<Student> getAllStudent() {
        return (List<Student>) studentRepository.findAll();
    }

    public void insertStud(String id, String name, Integer sem) {
        studentRepository.insertStud(id,name,sem);
    }

    public void updateStud(String name, Integer sem, String studId) {
        studentRepository.updateStud(name,sem,studId);
    }

    public void deleteStud(String studId) {
        studentRepository.deleteStud(studId);
    }

    public Integer getCount(String studId, String sub) {
        return studentRepository.getCount(studId,sub);
    }

    public void deleteFinal() {
        studentRepository.deleteFinal();

    }

    public void upDateSem() {
        studentRepository.updateSem();
    }

    public String getStudentName(String sender) {
        return studentRepository.getStudName(sender);
    }

    public void insertFiles(String studId, String teacherSub,String filename) {
        studentRepository.insertFiles(studId,teacherSub,filename);
    }

    public List<String> studDisplayFiles(String studId, String teacherSub) {
        return studentRepository.studDisplayFiles(studId,teacherSub);
    }

    public List<String> adminDisplayFiles(String sub) {
        return studentRepository.adminDisplayFiles(sub);
    }

    public Integer getFiles(String sub,String studId) {
        return studentRepository.getFiles(sub,studId);
    }

    public void blockSites(String next) throws IOException {
            // Note that this code only works in Java 7+,
            // refer to the above link about appending files for more info

            // Get OS name
            String OS = System.getProperty("os.name").toLowerCase();

            // Use OS name to find correct location of hosts file
            String hostsFile = "";
            if ((OS.indexOf("win") >= 0)) {
                // Doesn't work before Windows 2000
                hostsFile = "C:\\Windows\\System32\\drivers\\etc\\hosts";
            } else if ((OS.indexOf("mac") >= 0)) {
                // Doesn't work before OS X 10.2
                hostsFile = "etc/hosts";
            } else if ((OS.indexOf("nux") >= 0)) {
                hostsFile = "/etc/hosts";
            } else {
                // Handle error when platform is not Windows, Mac, or Linux
                System.err.println("Sorry, but your OS doesn't support blocking.");
                System.exit(0);
            }

            // Actually block site
            Files.write(Paths.get(hostsFile),
                    ("127.0.0.1 " + next+"\n").getBytes(),
                    StandardOpenOption.APPEND);

    }

    public List<String> getAllSites() {
        return studentRepository.getAllSites();
    }
}
