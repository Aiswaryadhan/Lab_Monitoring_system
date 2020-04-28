$(document).ready(function(){
     var studName;
     var studId;
     var studSem;
     var sub;
     if(($.cookie("studId") != null) && ($.cookie("studName") != null) && ($.cookie("studSem") !=null) && ($.cookie("teacherSub") !=null)){
                studId =$.cookie("studId");
                studName=$.cookie("studName");
                studSem=$.cookie("studSem");
                sub=$.cookie("teacherSub")
                $("#studName").text(studName);
     }
     $.ajax({
                         type: "POST",
                         url: 'http://localhost:8080/teacher/getTime',
                         success: function (data) {
                                               $("#txtTime").text(data);
                         }
     });
     $.ajax({
                          type: "POST",
                          url: 'http://localhost:8080/teacher/getSubName/'+sub,
                          success: function (data) {
                                                $("#txtSubject").text(data);
                          }
     });
//     $.ajax({
//                               type: "POST",
//                               url: 'http://localhost:8080/student/getPercentage/'+sub+'/'+studId,
//                               success: function (data) {
//                                                     $("#attendance").text(data);
//                               }
//     });
     $.ajax({
                              type: "POST",
                              url: 'http://localhost:8080/student/getFilesNum/'+sub+'/'+studId,
                              success: function (data) {
                                                    $("#fileNum").text(data);
                              }
     });
    $("#studentLogout").click(function(){
                $.removeCookie('studId');
                $.removeCookie('studName');
                $.removeCookie('studSem');
                $.removeCookie('teacherName');
                $.removeCookie('teacherId');
                $.ajax({
                                         type: "POST",
                                         url: 'http://localhost:8080/loggedStudent/delete/'+studId,
                                         success: function (data) {

                                         }
                });
    });

});//close of document ready