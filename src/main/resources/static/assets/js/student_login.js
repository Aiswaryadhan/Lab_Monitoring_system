$(document).ready(function(){
            $("#user").blur(function(){
                var user = $('#user').val();
                if(user=='')
                {
                      $('#error_user').slideDown();
                      $('#error_user').html('Please provide username');
                      status = 1;
                      return false;
                }
                else
                {
                      $('#error_user').slideUp();
                      status = 0;


                }
            });
           $("#pass").blur(function(){
                var pass = $('#pass').val();
                if(pass=='')
                {
                       $('#error_pass').slideDown();
                       $('#error_pass').html('Please provide password');
                       status = 1;
                       return false;
                }
                else
                {
                       $('#error_pass').slideUp();
                       status = 0;

                }
           });
            $('#submit').click(function(){
                var user=$('#user').val();
                var pwd=$('#pass').val();
                var sub=$.cookie("subject");
                $.ajax({
                          type : "POST",
                          url : 'http://localhost:8080/student/getCount/'+user+'/'+sub,
                          headers : {
                                        "Content-Type" : "application/json"
                          },
                          success : function(data) {
                                            if(data==1){
                                                var logCred = {
                                                            'id': user,
                                                            'password': pwd
                                                };
                                                var aJson = JSON.stringify(logCred);
                                                $.ajax({
                                                        type : "POST",
                                                        url : 'http://localhost:8080/student/login',
                                                        headers : {
                                                                "Content-Type" : "application/json"
                                                        },
                                                        data:aJson,
                                                        success : function(data) {
                                                        if(data != "invalid"){
                                                                            $('#error_cred').slideUp();
                                                                            $.ajax({
                                                                                    type : "POST",
                                                                                    url : 'http://localhost:8080/student/getTeacherName',
                                                                                    headers : {
                                                                                            "Content-Type" : "application/json"
                                                                                    },
                                                                                    data:aJson,
                                                                                    success : function(data) {
                                                                                           if(data != "null"){
                                                                                                var dataTeacher=data.split(",");
                                                                                                $.cookie("teacherName", dataTeacher[0]);
                                                                                                $.cookie("teacherId", dataTeacher[1]);
                                                                                                $.cookie("teacherSub", dataTeacher[2]);
                                                                                           }
                                                                                           else{
                                                                                                alert("Teacher is not logged in !")
                                                                                           }
                                                                                    }
                                                                            });
                                                                            var arr=data.split(",");
                                                                            $.cookie("studName",arr[0]);
                                                                            $.cookie("studSem",arr[1]);
                                                                            $.cookie("studId", user);
                                                                            window.location.replace("http://localhost:8080/student_home");
                                                        }
                                                        else{
                                                                $('#error_cred').slideDown();
                                                                $('#error_cred').html('Incorrect username or password');
                                                        }
                                                        }
                                                });
                                            }
                                            else{
                                                alert("You are not allowed to attend this session!")
                                            }
                          }
                });

            });//close of click
});//close of document ready