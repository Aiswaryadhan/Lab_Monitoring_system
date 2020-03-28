[1mdiff --git a/src/main/java/com/gec/lab_admin/controllers/StudentController.java b/src/main/java/com/gec/lab_admin/controllers/StudentController.java[m
[1mindex 2cf9cef..1f15ef5 100644[m
[1m--- a/src/main/java/com/gec/lab_admin/controllers/StudentController.java[m
[1m+++ b/src/main/java/com/gec/lab_admin/controllers/StudentController.java[m
[36m@@ -26,7 +26,7 @@[m [mpublic class StudentController {[m
         if(loggedInStudent.isPresent()){[m
             if(loggedInStudent.get().getPassword().equals(student.getPassword())){[m
                 logger.info("succes");[m
[31m-                studentService.updateAttendance(student.getId(), TeacherController.LOGGED_IN_TEACHER_SUBJECT);[m
[32m+[m[32m                studentService.updateAttendance(TeacherController.LOGGED_IN_TEACHER_SUBJECT, student.getId());[m
                 return "success";[m
             }[m
             else{[m
[36m@@ -39,4 +39,4 @@[m [mpublic class StudentController {[m
             return "wrong user name";[m
         }[m
     }[m
[31m-}[m
[32m+[m[32m}[m
\ No newline at end of file[m
[1mdiff --git a/src/main/java/com/gec/lab_admin/controllers/TeacherController.java b/src/main/java/com/gec/lab_admin/controllers/TeacherController.java[m
[1mindex b25ff39..421cdcf 100644[m
[1m--- a/src/main/java/com/gec/lab_admin/controllers/TeacherController.java[m
[1m+++ b/src/main/java/com/gec/lab_admin/controllers/TeacherController.java[m
[36m@@ -46,4 +46,4 @@[m [mpublic class TeacherController {[m
     public List<String> generateSubject(@PathVariable String teacher_id) {[m
         return teacherService.getSubjects(teacher_id);[m
     }[m
[31m-}[m
[32m+[m[32m}[m
\ No newline at end of file[m
[1mdiff --git a/src/main/java/com/gec/lab_admin/services/StudentService.java b/src/main/java/com/gec/lab_admin/services/StudentService.java[m
[1mindex 5fa58eb..29305fb 100644[m
[1m--- a/src/main/java/com/gec/lab_admin/services/StudentService.java[m
[1m+++ b/src/main/java/com/gec/lab_admin/services/StudentService.java[m
[36m@@ -22,18 +22,6 @@[m [mpublic class StudentService {[m
     @Autowired[m
     private AttendanceRepository attendanceRepository;[m
 [m
[31m-[m
[31m-[m
[31m-[m
[31m-[m
[31m-[m
[31m-[m
[31m-[m
[31m-[m
[31m-[m
[31m-[m
[31m-    [m
[31m-[m
     public Optional<Student> login(String studentId) {[m
         return studentRepository.findById(studentId);[m
     }[m
[36m@@ -53,4 +41,4 @@[m [mpublic class StudentService {[m
 //        studentRepository.save(sd);[m
 //    }[m
 [m
[31m-}[m
[32m+[m[32m}[m
\ No newline at end of file[m
[1mdiff --git a/src/main/java/com/gec/lab_admin/services/TeacherService.java b/src/main/java/com/gec/lab_admin/services/TeacherService.java[m
[1mindex fc46eee..5f9ccbf 100644[m
[1m--- a/src/main/java/com/gec/lab_admin/services/TeacherService.java[m
[1m+++ b/src/main/java/com/gec/lab_admin/services/TeacherService.java[m
[36m@@ -33,7 +33,7 @@[m [mpublic class TeacherService {[m
         return teacherRepository.findById(teacherId);[m
     }[m
 [m
[31m-//    @Transactional[m
[32m+[m[32m    //    @Transactional[m
     public void getAttendanceRecords(String subjectID){[m
         List<Map<String, String>> studentList = teacherRepository.getAttendanceRecords(subjectID);[m
         List<AttendanceRecord> attendanceRecordList = new ArrayList<>();[m
[36m@@ -48,4 +48,4 @@[m [mpublic class TeacherService {[m
             attendanceRepository.save(attendanceRecord);[m
         }[m
     }[m
[31m-}[m
[32m+[m[32m}[m
\ No newline at end of file[m
[1mdiff --git a/src/main/resources/templates/login_page.html b/src/main/resources/templates/login_page.html[m
[1mindex ff207a1..cde0369 100644[m
[1m--- a/src/main/resources/templates/login_page.html[m
[1m+++ b/src/main/resources/templates/login_page.html[m
[36m@@ -1,4 +1,5 @@[m
 [m
[32m+[m
 <!doctype html>[m
 <html lang="en" class="fullscreen-bg" xmlns:th="http://www.w3.org/1999/xhtml">[m
 [m
[36m@@ -54,7 +55,7 @@[m
                                 </select>[m
                             </div>[m
                             <div class="form-group">[m
[31m-                            <input type="button" class="btn btn-primary btn-lg btn-block" id="submit" value="LOGIN">[m
[32m+[m[32m                                <input type="button" class="btn btn-primary btn-lg btn-block" id="submit" value="LOGIN">[m
                             </div>[m
                             <!--                            <div class="bottom">-->[m
                             <!--                                <span class="helper-text"><i class="fa fa-lock"></i> <a href="#">Forgot password?</a></span>-->[m
