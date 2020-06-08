$(document).ready(function(){
    var len;
    var semId;
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
                                                                                                              $.ajax({
                                                                                                                         type: "POST",
                                                                                                                         url: 'http://localhost:8080/student/getName/'+req1,
                                                                                                                         success: function (data) {
                                                                                                                                                        requester=data;
                                                                                                                         }
                                                                                                              });
                                                                                                              t1=arr[1];
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
    $("#btnInsertSem").prop('disabled',false);
    $("#btnUpdateSem").prop('disabled',true);
    $("#btnDeleteSem").prop('disabled',true);
    $("#txtSem").blur(function(){
                    var sem = $('#txtSem').val();
                    if(sem=='')
                    {
                          $('#error_sem').slideDown();
                          $('#error_sem').html('Please provide valid semester');
                    }
                    else
                    {
                          $('#error_sem').slideUp();
                    }
    });

    $("#txtSem").keypress(function (e) {
                var keyCode = e.keyCode || e.which;

                //Regex for Valid Characters i.e. Alphabets and Numbers.
                var regex = /^[A-Za-z0-9\s]+$/;

                //Validate TextBox value against the Regex.
                var isValid = regex.test(String.fromCharCode(keyCode));
                if (!isValid) {
                    $("#error_sem").html("Only Alphabets and Numbers allowed.");
                }
                else
                {
                     $('#error_sem').slideUp();
                }

                return isValid;
            });

    $.ajax({
               type: "GET",
               url: 'http://localhost:8080/semester/getAll',
               success: function (data) {
                                           len = data.length;
                                           var txt = "";
                                           if(len > 0){
                                                     for(var i=0;i!=len;i++){
                                                          if(data[i].id)
                                                          txt += "<tr><td>"+data[i].id+"</td><td>"+data[i].name+"</td></tr>";
                                                     }
                                                     if(txt != ""){
                                                                   $('#listSemester').append(txt).removeClass("hidden");
                                                     }
                                           }
                                           else
                                           {
                                                alert("Null");
                                           }
               }

    });
    $("#btnInsertSem").click(function(){
        var sem=$("#txtSem").val();
        if(sem==''){
                          $('#error_sem').slideDown();
                          $('#error_sem').html('Please provide valid semester');
        }
        else{
                          $('#error_sem').slideUp();
                          status = 0;
                          var semData = {
                                          'id': len+1,
                                          'name': sem
                          };
                          var aJson = JSON.stringify(semData);
                          $.ajax({
                                                 type: "POST",
                                                 url: 'http://localhost:8080/semester/insert',
                                                  headers: {
                                                           "Content-Type": "application/json"
                                                  },
                                                  data:aJson,
                                                 success: function (data) {
                                                                  alert("Successfully Inserted");
                                                                  $("#txtSem").val('');
                                                                  $("#listSemester tr").remove();
                                                                  $.ajax({
                                                                                 type: "GET",
                                                                                 url: 'http://localhost:8080/semester/getAll',
                                                                                 success: function (data) {
                                                                                                             len = data.length;
                                                                                                             var txt = "";
                                                                                                             if(len > 0){
                                                                                                                       for(var i=0;i!=len;i++){
                                                                                                                            if(data[i].id)
                                                                                                                            txt += "<tr><td>"+data[i].id+"</td><td>"+data[i].name+"</td></tr>";
                                                                                                                       }
                                                                                                                       if(txt != ""){
                                                                                                                                     $('#listSemester').append(txt).removeClass("hidden");
                                                                                                                       }
                                                                                                             }
                                                                                                             else
                                                                                                             {
                                                                                                                  alert("Null");
                                                                                                             }
                                                                                 }

                                                                  });
                                                 }

                          });

        }
    });//close of insert button click
    $('#listSemester').on( 'click', 'tr', function () {

                                        if ( $(this).hasClass('highlighted') )
             							{
             						        $(this).removeClass('highlighted');
             							}
             					        else
             							{
             								$('tr.highlighted').removeClass('highlighted');
             								$(this).addClass('highlighted');
             							}
             							var tableData = $(this).children("td").map(function() {
             														                return $(this).text();
             							}).get();
                                        $("#txtSem").val(tableData[1]);
                                        semId=tableData[0];
                                        $("#btnInsertSem").prop('disabled',true);
                                        $("#btnUpdateSem").prop('disabled',false);
                                        $("#btnDeleteSem").prop('disabled',false);
    });
    $("#btnUpdateSem").click(function(){
                  var sem=$("#txtSem").val();
                  if(sem==''){
                                    $('#error_sem').slideDown();
                                    $('#error_sem').html('Please provide valid semester');
                  }
                  else{
                                    $('#error_sem').slideUp();
                                    status = 0;
                                    var semData = {
                                                    'name': sem
                                    };
                                    var aJson = JSON.stringify(semData);
                                    $.ajax({
                                                           type: "POST",
                                                           url: 'http://localhost:8080/semester/update/'+semId,
                                                            headers: {
                                                                     "Content-Type": "application/json"
                                                            },
                                                            data:aJson,
                                                           success: function (data) {
                                                                            alert("Updation Successful");
                                                                            $("#txtSem").val('');
                                                                             $("#btnInsertSem").prop('disabled',false);
                                                                             $("#btnUpdateSem").prop('disabled',true);
                                                                             $("#btnDeleteSem").prop('disabled',true);
                                                                            $("#listSemester tr").remove();
                                                                            $.ajax({
                                                                                           type: "GET",
                                                                                           url: 'http://localhost:8080/semester/getAll',
                                                                                           success: function (data) {
                                                                                                                       len = data.length;
                                                                                                                       var txt = "";
                                                                                                                       if(len > 0){
                                                                                                                                 for(var i=0;i!=len;i++){
                                                                                                                                      if(data[i].id)
                                                                                                                                      txt += "<tr><td>"+data[i].id+"</td><td>"+data[i].name+"</td></tr>";
                                                                                                                                 }
                                                                                                                                 if(txt != ""){
                                                                                                                                               $('#listSemester').append(txt).removeClass("hidden");
                                                                                                                                 }
                                                                                                                       }
                                                                                                                       else
                                                                                                                       {
                                                                                                                            alert("Null");
                                                                                                                       }
                                                                                           }

                                                                            });
                                                           }

                                    });

                  }
    });

    $("#btnDeleteSem").click(function(){
                $.ajax({
                           type: "POST",
                           url: 'http://localhost:8080/semester/delete/'+semId,
                           success: function (data) {
                                                        alert("Deletion Successful");
                                                        $("#txtSem").val('');
                                                        $("#btnInsertSem").prop('disabled',false);
                                                        $("#btnUpdateSem").prop('disabled',true);
                                                        $("#btnDeleteSem").prop('disabled',true);
                                                        $("#listSemester tr").remove();
                                                        $.ajax({
                                                                  type: "GET",
                                                                  url: 'http://localhost:8080/semester/getAll',
                                                                  success: function (data) {
                                                                                                 len = data.length;
                                                                                                 var txt = "";
                                                                                                 if(len > 0){
                                                                                                               for(var i=0;i!=len;i++){
                                                                                                                            if(data[i].id)
                                                                                                                                  txt += "<tr><td>"+data[i].id+"</td><td>"+data[i].name+"</td></tr>";
                                                                                                               }
                                                                                                               if(txt != ""){
                                                                                                                                  $('#listSemester').append(txt).removeClass("hidden");
                                                                                                               }
                                                                                                 }
                                                                                                 else
                                                                                                 {
                                                                                                        alert("Null");
                                                                                                 }
                                                                  }
                                                        });
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
                                                                                                         $.ajax({
                                                                                                                     type: "POST",
                                                                                                                     url: 'http://localhost:8080/student/getName/'+req1,
                                                                                                                     success: function (data) {
                                                                                                                                                 requester=data;
                                                                                                                     }
                                                                                                         });
                                                                                                         t1=arr[1];
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
});