$(document).ready(function(){
     var sub;
     var teacherId;
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
               url: 'http://localhost:8080/teacher/getFiles/'+sub,
               success: function (data) {
                            len = data.length;
                            var txt = "";
                            if(len > 0){
                                  for(var i=0;i!=len;i++){
                                             var arr=data[i].split(",");
                                             var date=arr[0];
                                             var file_name=arr[1];
                                             var studName=arr[2];
                                             txt += "<li><img src=\"assets/img/user-medium.png\" alt=\"Avatar\" class=\"img-circle pull-left avatar\"><p><a href=\"#\">"+studName+"</a> has send "+file_name+" <span class=\"timestamp\">"+date+"</span></p></li>";
                                  }
                                  alert(txt);
                                 if(txt != ""){
                                              $('#listMsg').append(txt).removeClass("hidden");
//                                              $("#listMsg").show();
                                 }
                           }
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
    });
});//close of document ready