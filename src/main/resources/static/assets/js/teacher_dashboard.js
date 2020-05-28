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
                                              refresh();
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
                                                                          $("#notificationList li").remove();
                                                                          if(len > 0){
                                                                                          for(i=0;i<len;i++){
                                                                                              arr=data[i].split(',');
                                                                                              req1=arr[0];
                                                                                              t1=arr[1];
                                                                                              txt += "<li name=\""+req1+"\"><a href=\"#\" class=\"notification-item\"><span class=\"dot bg-warning\"></span>"+req1+" has asked for screen sharing </a><p class=\"timestamp\">Date & Time" +t1+"</p></li>";
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
    function refresh(){
        setTimeout(function(){
         $.ajax({
                                                             type : "POST",
                                                             url :'http://localhost:8080/teacher/getNotification/'+teacherId,
                                                             success:function(data){
                                                                     len = data.length;
                                                                     var i;
                                                                     var txt='';
                                                                     $("#notificationList li").remove();
                                                                     if(len > 0){
                                                                                     for(i=0;i<len;i++){
                                                                                         arr=data[i].split(',');
                                                                                         req1=arr[0];
                                                                                         t1=arr[1];
                                                                                         txt += "<li name=\""+req1+"\"><a href=\"#\" class=\"notification-item\"><span class=\"dot bg-warning\"></span>"+req1+" has asked for screen sharing </a><p class=\"timestamp\">Date & Time" +t1+"</p></li>";
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
         refresh();
          },5000);
    }
     $('#notificationList').on( 'click', 'li', function(){
                   var n=$(this).attr('name');
                   $.ajax({
                                                    url: 'http://localhost:8080/teacher/updateNotification/'+t1,
                                                    success: function (data) {
                                                        $.ajax({
                                                            type:'POST',
                                                            url:'http://localhost:8080/teacher/getNotificationCount/'+teacherId,
                                                            success:function(data){
                                                                $("#numNotifications").text(data);
                                                            }
                                                        });
                                                    }
                   });

     });
});//close of document ready