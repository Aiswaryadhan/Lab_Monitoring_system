$(document).ready(function(){
    var studId;
    var teacherId;
    var teacherSub;
    var txt = "";
    $("#tblFiles").hide();
    if(($.cookie("studId") != null) && ($.cookie("studName") != null) && ($.cookie("teacherSub") !=null) ){
                studId =$.cookie("studId");
                teacherSub=$.cookie("teacherSub");
                var studName=$.cookie("studName");
                var studSem=$.cookie("studSem");
                receiver=$.cookie("teacherId");
                $("#studName").text(studName);
                refresh();
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
    $("#studentLogout").click(function(){
                $.removeCookie('studId');
                $.removeCookie('studName');
                $.removeCookie('studSem');
                $.ajax({
                                         type: "POST",
                                         url: 'http://localhost:8080/loggedStudent/delete/'+studId,
                                         success: function (data) {

                                         }
                });
    });


    $("#upload-file-input").on("change", uploadFile);

    /**
     * Upload the file sending it via Ajax at the Spring Boot server.
     */
    function uploadFile() {
        $('#error_input').slideUp();
        $("#listFiles tr").remove();
        var filename = $('input[type=file]').val().split('\\').pop();
        if(filename!=''){
            $.ajax({
                url: "http://localhost:8080/uploadFile/"+studId+'/'+teacherSub,
                type: "POST",
                data: new FormData($("#upload-file-form")[0]),
                enctype: 'multipart/form-data',
                processData: false,
                contentType: false,
                cache: false,
                success: function () {
                $.ajax({
                                url: "http://localhost:8080/student/upload/"+studId+'/'+teacherSub+'/'+filename,
                                type: "POST",
                                success: function () {
                                            $.ajax({
                                                url: "http://localhost:8080/student/getUploadDetails/"+studId+'/'+teacherSub,
                                                type: "POST",
                                                success: function (data) {
                                                     len = data.length;
                                                     var txt = "";
                                                     if(len > 0){
                                                                 for(var i=0;i!=len;i++){
                                                                                   var arr=data[i].split(",");
                                                                                   var date=arr[0];
                                                                                   alert(date);
                                                                                   var file_name=arr[1];
                                                                                   alert(file_name);
                                                                                   txt += "<tr><td>"+(i+1)+"</td><td>"+date+"</td><td>"+file_name+"</td></tr>";

                                                                 }
                                                                 alert(txt);
                                                                 if(txt != ""){
                                                                          $('#listFiles').append(txt).removeClass("hidden");
                                                                          $("#tblFiles").show();
                                                                 }
                                                     }
                                                     else
                                                     {
                                                       alert("Empty List");
                                                }
                                                },

                                });
                                },

                });
                    alert("Uploaded successfully...");
                },
                error: function () {
                     $('#error_input').slideDown();
                     $('#error_input').html('Maximum file size of 3MB exceeded!...');
                }
            });
        }
        else
        {
            $('#error_input').slideDown();
                                 $('#error_input').html('Please select a file');
        }

    } // function uploadFile
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