$(document).ready(function(){
     var teacherId;
     var sub;
     var requester;
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
     else{
                  window.location.replace("http://localhost:8080/login");
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
                                                                                         requester=arr[1]
                                                                                         t1=arr[2];
                                                                                         txt += "<li name=\""+req1+"\"><a href=\"#\" class=\"notification-item\"><span class=\"dot bg-warning\"></span>"+requester+" has asked for help </a><p class=\"timestamp\">Date & Time @ " +t1+"</p></li>";
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
                url: 'http://localhost:8080/teacher/getStudNo',
                success: function (data) {
                                      $("#studNo").text(data);
                }
    });
    $.ajax({
                    type: "POST",
                    url: 'http://localhost:8080/teacher/getTeacherNum',
                    success: function (data) {
                                          $("#teacherNo").text(data);
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
    $("#btnPublish").click(function(){

                  $.ajax({
                                           type: "POST",
                                           url: 'http://localhost:8080/teacher/blockSites',
                                           success: function (data) {
                                                    alert("Blocked..");
                                           }
                  });
     });
     $("#txtChangeTime").blur(function(){
                                var t = $('#txtChangeTime').val();
                                 if(t<1 || t>120)
                                 {
                                       $('#error_time').slideDown();
                                       $('#error_time').html('Please enter a value between 1 and 120...');
                                 }
                                 else
                                 {
                                       $('#error_time').slideUp();
                                 }
     });
     $("#btnTime").click(function(){
        var t=$("#txtChangeTime").val();
        if(t!='' && t>1 && t<120){
                       $.ajax({
                                                type: "POST",
                                                url: 'http://localhost:8080/teacher/changeMinTime/'+t,
                                                success: function (data) {
                                                     alert("Default minimum time updated...");
                                                     $("#txtChangeTime").val('');
                                                }
                       });
        }
        else{
            $('#error_time').slideDown();
            $('#error_time').html('Please enter a value between 1 and 120...');
        }
     });

    $("#adminLogout").click(function(){
        $.removeCookie('id');
        $.removeCookie('subject');
        $.ajax({
                                 type: "POST",
                                 url: 'http://localhost:8080/loggedStudent/delete',
                                 success: function (data) {

                                 }
        });
        $.ajax({
                                                 type: "POST",
                                                 url: 'http://localhost:8080/notifications/delete',
                                                 success: function (data) {

                                                 }
        });
        $.ajax({
                                                         type: "POST",
                                                         url: 'http://localhost:8080/messages/delete',
                                                         success: function (data) {

                                                         }
        });
    });
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
                                                                                 requester=arr[1]
                                                                                 t1=arr[2];
                                                                                 txt += "<li name=\""+req1+"\"><a href=\"#\" class=\"notification-item\"><span class=\"dot bg-warning\"></span>"+requester+" has asked for help </a><p class=\"timestamp\">Date & Time @ " +t1+"</p></li>";
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
               var ar1=$(this).text().split('@');
               var dt=ar1[1];
               var date1=dt.trim();
               $.ajax({
                                                url: 'http://localhost:8080/teacher/updateNotification/'+date1,
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