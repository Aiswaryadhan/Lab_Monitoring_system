$(document).ready(function(){
     var teacherId;
     var sub;
     if ($.cookie("id") != null && $.cookie("subject") != null) {
                     teacherId =$.cookie("id");
                     sub= $.cookie("subject");
                     $.ajax({
                                type: "POST",
                                url: 'http://localhost:8080/teacher/getName/'+teacherId,
                                success: function (data) {

                                             $("#teacher_name").text(data);
                                }
                     });

     }
     $.ajax({
                                                         type : "POST",
                                                         url :'http://localhost:8080/teacher/getNotification/'+teacherId,
                                                         success:function(data){
                                                                                         len = data.length;
                                                                                         var i;
                                                                                         var txt='';
                                                                                         var req1='';

                                                                                         if(len > 0){
                                                                                                         for(i=0;i<len;i++){
                                                                                                         req1=data[i];
                                                                                                         txt += "<li><a href=\"#\" class=\"notification-item\"><span class=\"dot bg-warning\"></span>"+req1+" has asked for help</a></li>";
                                                                                                     }
                                                                                                     if(txt!=''){
                                                                                                         $("#notificationList").append(txt);
                                                                                                     }
                                                                                         }
                                                         }
         });
         $.ajax({
                                                         type:'POST',
                                                         url:'http://localhost:8080/teacher/getNotificationCount/'+teacherId,
                                                         success:function(data){
                                                             $("#numNotifications").text(data);
                                                         }
         });
     $.ajax({
                     type: "POST",
                     url: 'http://localhost:8080/teacher/getTeacherStudNo/'+sub,
                     success: function (data) {
                                           $("#studNo").text(data);
                     }
     });
     $.ajax({
                         type: "POST",
                         url: 'http://localhost:8080/teacher/getTime',
                         success: function (data) {
                                               $("#txtTime").text(data);
                         }
     });
     $.ajax({
                         type: "POST",
                         url: 'http://localhost:8080/teacher/getFilesNum/'+sub,
                         success: function (data) {
                                               $("#fileNum").text(data);
                         }
     });
     $.ajax({
                     type: "POST",
                     url: 'http://localhost:8080/teacher/getSubName/'+sub,
                     success: function (data) {
                                           $("#txtSubject").text(data);
                     }
     });
     $.ajax({
                     type: "POST",
                     url: 'http://localhost:8080/teacher/getOnlineStud',
                     success: function (data) {
                                          $("#onlineStud").text(data);
                     }
     });

     $("#teacherLogout").click(function(){
             $.removeCookie('id');
             $.removeCookie('subject');
             $.ajax({
                                      type: "POST",
                                      url: 'http://localhost:8080/loggedStudent/delete',
                                      success: function (data) {

                                      }
             });
     })
});//close of document ready