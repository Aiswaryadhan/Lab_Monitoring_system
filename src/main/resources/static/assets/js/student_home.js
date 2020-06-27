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
                refresh();
     }
     else{
                 window.location.replace("http://localhost:8080/student_login");
          }
     $.ajax({
                                                                      type : "POST",
                                                                      url :'http://localhost:8080/student/getNotification/'+studId,
                                                                      success:function(data){
                                                                                                      len = data.length;
                                                                                                      var i;
                                                                                                      var txt='';
                                                                                                                  if(len > 0){
                                                                                                                      for(i=0;i<len;i++){
                                                                                                                      arr=data[i].split(',');
                                                                                                                      res1=arr[0];
                                                                                                                      t1=arr[1];
                                                                                                                      txt += "<li name=\""+res1+"\"><a href=\"#\" class=\"notification-item\"><span class=\"dot bg-warning\"></span>"+res1+" is ready. Please start sharing your screen.</a><p class=\"timestamp\">Date & Time" +t1+"</p></li>";
                                                                                                                  }
                                                                                                                  if(txt!=''){
                                                                                                                      $("#notificationList").append(txt);
                                                                                                                  }
                                                                                                      }
                                                                      }
     });
     $.ajax({
                                                                      type:'POST',
                                                                      url:'http://localhost:8080/student/getNotificationCount/'+studId,
                                                                      success:function(data){
                                                                          $("#numNotifications").text(data);
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
     $.ajax({
                        type: "POST",
                        url: 'http://localhost:8090/stop',
                        success: function () {
                            $.ajax({
                                                    type: "POST",
                                                    url: 'http://localhost:8080/stopAdapters',
                                                    success: function () {

                                                    }
                            });
                        }
     });
    $("#studentLogout").click(function(){
                $.removeCookie('studId');
                $.removeCookie('studName');
                $.removeCookie('studSem');
//                $.removeCookie('teacherName');
//                $.removeCookie('teacherId');
                document.cookie ="_instance=true;expires=Thu, 1970-01-01 00:00:01 GMT";
                $.ajax({
                         url: 'http://localhost:8090/sitesUnblock',
                         success: function (data) {

                         }
                });

                $.ajax({
                    type: "POST",
                    url: 'http://localhost:8080/loggedStudent/delete/'+studId,
                    success: function (data) {

                    }
                });

    });
    function refresh(){
                                     setTimeout(function(){
                                      $.ajax({
                                                                                          type : "POST",
                                                                                          url :'http://localhost:8080/student/getNotification/'+studId,
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
                                                                                                                      txt += "<li name=\""+req1+"\"><a href=\"#\" class=\"notification-item\"><span class=\"dot bg-warning\"></span>"+req1+" is ready for screen sharing </a><p class=\"timestamp\">Date & Time" +t1+"</p></li>";
                                                                                                                  }
                                                                                                                  if(txt!=''){
                                                                                                                      $("#notificationList").append(txt);
                                                                                                                  }
                                                                                                  }
                                                                                          }
                                      });
                                      $.ajax({
                                                                                          type:'POST',
                                                                                          url:'http://localhost:8080/student/getNotificationCount/'+studId,
                                                                                          success:function(data){
                                                                                              $("#numNotifications").text(data);
                                                                                          }
                                      });
                                      refresh();
                                      },5000);
    }
    $('#notificationList').on( 'click', 'li', function(){
                       $.ajax({
                                                        url: 'http://localhost:8080/student/updateNotification/'+t1,
                                                        success: function (data) {
                                                            $.ajax({
                                                                type:'POST',
                                                                url:'http://localhost:8080/student/getNotificationCount/'+studId,
                                                                success:function(data){
                                                                    $("#numNotifications").text(data);
                                                                }
                                                            });
                                                        }
                       });

    });

});//close of document ready
