$(document).ready(function(){
    var len;
    var studId;
    var studName;
    var studSem;
    var teacherId;
    var sub;
    $("#finals").hide();
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
    $("#txtStudId").prop('disabled',false);
    $("#btnInsertStudent").prop('disabled',false);
    $("#btnUpdateStudent").prop('disabled',true);
    $("#btnDeleteStudent").prop('disabled',true);
    $.ajax({
                   type: "GET",
                   url: 'http://localhost:8080/semester/getAll',
                   success: function (data) {
                                               $('#sem').empty();
                                               $('#sem').append("<option value=\"select\" id=\"selectSem\">Select Semester</option>");
                                               var i=0;
                                               for(i=0;i<data.length;i++) {
                                                if(data[i].id){
                                                      $('#sem').append("<option value=\"" +data[i].id+ "\">" +data[i].name+ "</option>");
                                                      }
                                               }

                   }

    });

    $("#txtStudId").blur(function(){
                    studId = $('#txtStudId').val();
                    if(studId=='')
                    {
                          $('#error_stud_id').slideDown();
                          $('#error_stud_id').html('Please provide valid Id');
                    }
                    else
                    {
                                    var studData = {
                                        'id': studId
                                    };
                                    var aJson = JSON.stringify(studData);
                                    $.ajax({
                                                             type: "POST",
                                                             url: 'http://localhost:8080/student/idCheck',
                                                             headers : {
                                                                         "Content-Type" : "application/json"
                                                             },
                                                             data:aJson,
                                                             success: function (data) {
                                                                if(data=="success"){
                                                                    $('#error_stud_id').slideDown();
                                                                    $('#error_stud_id').html('Id Already allotted');
                                                                }
                                                                else {
                                                                    $('#error_stud_id').slideUp();
                                                                }

                                                             }
                                    })
                    }
    });

    $("#txtStudName").blur(function(){
                        studName = $('#txtStudName').val();
                        if(studName=='')
                        {
                              $('#error_stud_name').slideDown();
                              $('#error_stud_name').html('Please provide valid Name');
                        }
                        else
                        {
                              $('#error_sub_name').slideUp();
                        }
    });
     $("#sem").blur(function(){
                            studSem = $('#sem').val();
                            if(studSem=='select')
                            {
                                  $('#error_stud_sem').slideDown();
                                  $('#error_stud_sem').html('Please select semester');
                            }
                            else
                            {
                                  $('#error_stud_sem').slideUp();
                            }
     });

    $("#txtStudId").keypress(function (e) {
                var keyCode = e.keyCode || e.which;

                //Regex for Valid Characters i.e. Alphabets and Numbers.
                var regex = /^[A-Za-z0-9\s]+$/;

                //Validate TextBox value against the Regex.
                var isValid = regex.test(String.fromCharCode(keyCode));
                if (!isValid) {
                    $('#error_stud_id').slideDown();
                    $("#error_stud_id").html("Only Alphabets and Numbers allowed.");
                }
                else
                {
                    $('#error_stud_id').slideUp();
                }

                return isValid;
    });

    $("#txtStudName").keypress(function (e) {
                    var keyCode = e.keyCode || e.which;

                    //Regex for Valid Characters i.e. Alphabets and Numbers.
                    var regex = /^[A-Za-z\s]+$/;

                    //Validate TextBox value against the Regex.
                    var isValid = regex.test(String.fromCharCode(keyCode));
                    if (!isValid) {
                        $('#error_stud_name').slideDown();
                        $("#error_stud_name").html("Only Alphabets allowed.");
                    }
                    else
                    {
                         $('#error_stud_name').slideUp();
                    }

                    return isValid;
    });

    $.ajax({
               type: "GET",
               url: 'http://localhost:8080/student/getAll',
               success: function (data) {
                                           len = data.length;
                                           var txt = "";
                                           if(len > 0){
                                                     for(var i=0;i!=len;i++){
                                                          if(data[i].id)
                                                          txt += "<tr><td>"+(i+1)+"</td><td>"+data[i].id+"</td><td>"+data[i].name+"</td><td>"+data[i].sem+"</td></tr>";

                                                     }
                                                     if(txt != ""){
                                                                   $('#listStudent').append(txt).removeClass("hidden");
                                                     }
                                           }
                                           else
                                           {
                                                alert("Null");
                                           }
               }

    });
    $('#search_field').on('keyup',function() {
      var value = $(this).val();
      var patt =new RegExp(value,"i");
      $('#listStudent').find('tr').each(function() {
        if (!($(this).find('td').text().search(patt) >= 0)) {
          $(this).not('.myHead').hide();
        }
        if (($(this).find('td').text().search(patt) >= 0)) {
          $(this).show();
        }
      });
    });

    $("#btnInsertStudent").click(function(){
        studId = $('#txtStudId').val();
        studName = $('#txtStudName').val();
        studSem = $('#sem').val();
        if(studId==''){
              $('#error_stud_id').slideDown();
              $('#error_stud_id').html('Please provide valid Id');
        }
        else if(studName==''){
              $('#error_stud_name').slideDown();
              $('#error_stud_name').html('Please provide valid Name');
        }
        else if(studSem=='select'){
              $('#error_stud_sem').slideDown();
              $('#error_stud_sem').html('Please select semester');
        }
        else{
               $('#error_stud_id').slideUp();
               $('#error_stud_name').slideUp();
               $('#error_stud_sem').slideUp();
               var studData = {
                                 'id': studId,
                                 'name': studName,
                                 'sem':studSem
               };
               var aJson = JSON.stringify(studData);
               $.ajax({
                         type: "POST",
                         url: 'http://localhost:8080/student/insert',
                         headers: {
                                       "Content-Type": "application/json"
                         },
                         data:aJson,
                         success: function (data) {
                                       alert("Successfully Inserted");
                                       $("#txtStudId").val('');
                                       $("#txtStudName").val('');
                                       $("#sem").val('select');
                                       $("#listStudent tr").remove();
                                        $.ajax({
                                                      type: "GET",
                                                      url: 'http://localhost:8080/student/getAll',
                                                      success: function (data) {
                                                                                  len = data.length;
                                                                                  var txt = "";
                                                                                  if(len > 0){
                                                                                            for(var i=0;i!=len;i++){
                                                                                                 if(data[i].id)
                                                                                                 txt += "<tr><td>"+(i+1)+"</td><td>"+data[i].id+"</td><td>"+data[i].name+"</td><td>"+data[i].sem+"</td></tr>";

                                                                                            }
                                                                                            if(txt != ""){
                                                                                                          $('#listStudent').append(txt).removeClass("hidden");
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
    $('#listStudent').on( 'click', 'tr', function () {
                                if ( $(this).hasClass('highlighted') ){
                         	                $(this).removeClass('highlighted');
          						}
                         		else{
                         			        $('tr.highlighted').removeClass('highlighted');
                         					$(this).addClass('highlighted');
                         		}
                         		var tableData = $(this).children("td").map(function() {
                         														           return $(this).text();
                         		}).get();

                                $("#txtStudId").val(tableData[1]);
                                $("#txtStudName").val(tableData[2]);
                                $('#sem').val(tableData[3]);
                                $("#txtStudId").prop('disabled',true);
                                $("#btnInsertStudent").prop('disabled',true);
                                $("#btnUpdateStudent").prop('disabled',false);
                                $("#btnDeleteStudent").prop('disabled',false);
    });
    $("#btnSem").click(function(){
       var res= confirm("Are you sure to upgrade Semester?");
       if(res==true){
            $.ajax({
                     type: "POST",
                     url: 'http://localhost:8080/student/updateSem',
                     headers: {
                                 "Content-Type": "application/json"
                     },
                     success: function (data) {
                        alert("Semester upgraded!...");
                        $("#listStudent tr").remove();
                        $.ajax({
                                  type: "GET",
                                  url: 'http://localhost:8080/student/getAll',
                                  success: function (data) {
                                                             len = data.length;
                                                             var txt = "";
                                                             if(len > 0){
                                                                      for(var i=0;i!=len;i++){
                                                                                   if(data[i].id)
                                                                                      txt += "<tr><td>"+(i+1)+"</td><td>"+data[i].id+"</td><td>"+data[i].name+"</td><td>"+data[i].sem+"</td></tr>";

                                                                      }

                                                                      if(txt != ""){
                                                                                  $('#listStudent').append(txt).removeClass("hidden");
                                                                      }
                                                             }
                                                             else
                                                             {
                                                                   alert("Empty set");
                                                             }
                                  }
                        });
                     },
                    error: function (){
                                          $('#finals').show();

                    }
            });

       }
    });
    $("#btnFinal").click(function(){
           var res= confirm("Are you sure to Delete Final year student details?");
           if(res==true){
                $.ajax({
                         type: "POST",
                         url: 'http://localhost:8080/student/deleteFinal',
                         headers: {
                                     "Content-Type": "application/json"
                         },
                         success: function (data) {
                            alert("Deleted final years!...");
                            $('#finals').hide();
                            $("#listStudent tr").remove();
                            $.ajax({
                                      type: "GET",
                                      url: 'http://localhost:8080/student/getAll',
                                      success: function (data) {
                                                                 len = data.length;
                                                                 var txt = "";
                                                                 if(len > 0){
                                                                          for(var i=0;i!=len;i++){
                                                                                       if(data[i].id)
                                                                                          txt += "<tr><td>"+(i+1)+"</td><td>"+data[i].id+"</td><td>"+data[i].name+"</td><td>"+data[i].sem+"</td></tr>";

                                                                          }
                                                                          if(txt != ""){
                                                                                      $('#listStudent').append(txt).removeClass("hidden");
                                                                          }
                                                                 }
                                                                 else
                                                                 {
                                                                       alert("Empty set");
                                                                 }
                                      }
                            });
                         }
                });

           }
        });
    $("#btnUpdateStudent").click(function(){
                              studId = $('#txtStudId').val();
                              studName = $('#txtStudName').val();
                              studSem = $('#sem').val();
                              if(studName==''){
                                        $('#error_stud_name').slideDown();
                                        $('#error_stud_name').html('Please provide valid Name');
                              }
                              else if(studSem=='select'){
                                        $('#error_stud_sem').slideDown();
                                        $('#error_stud_sem').html('Please select semester');
                              }
                              else{
                                        $('#error_stud_id').slideUp();
                                        $('#error_stud_name').slideUp();
                                        $('#error_stud_sem').slideUp();
                                        var studData = {
                                                           'name': studName,
                                                           'sem':studSem
                                        };
                                        var aJson = JSON.stringify(studData);
                                             $.ajax({
                                                           type: "POST",
                                                           url: 'http://localhost:8080/student/update/'+studId,
                                                           headers: {
                                                                       "Content-Type": "application/json"
                                                           },
                                                           data:aJson,
                                                           success: function (data) {
                                                                                        alert("Updation Successful");
                                                                                        $("#txtStudId").val('');
                                                                                        $("#txtStudName").val('');
                                                                                        $("#sem").val('select');
                                                                                        $("#txtStudId").prop('disabled',false);
                                                                                        $("#btnInsertStudent").prop('disabled',false);
                                                                                        $("#btnUpdateStudent").prop('disabled',true);
                                                                                        $("#btnDeleteStudent").prop('disabled',true);
                                                                                        $("#listStudent tr").remove();
                                                                                        $.ajax({
                                                                                                 type: "GET",
                                                                                                 url: 'http://localhost:8080/student/getAll',
                                                                                                 success: function (data) {
                                                                                                                               len = data.length;
                                                                                                                               var txt = "";
                                                                                                                               if(len > 0){
                                                                                                                                        for(var i=0;i!=len;i++){
                                                                                                                                                         if(data[i].id)
                                                                                                                                                                 txt += "<tr><td>"+(i+1)+"</td><td>"+data[i].id+"</td><td>"+data[i].name+"</td><td>"+data[i].sem+"</td></tr>";

                                                                                                                                        }
                                                                                                                                        if(txt != ""){
                                                                                                                                                $('#listStudent').append(txt).removeClass("hidden");
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
    $("#btnDeleteStudent").click(function(){
         studId = $('#txtStudId').val();
         studName = $('#txtStudName').val();
         studSem = $('#sem').val();
         $.ajax({
                                type: "POST",
                                url: 'http://localhost:8080/student/delete/'+studId,
                                headers: {
                                            "Content-Type": "application/json"
                                },
                                success: function (data) {
                                                            alert("Deletion Successful");
                                                            $("#txtStudId").val('');
                                                            $("#txtStudName").val('');
                                                            $("#sem").val('select');
                                                            $("#txtStudId").prop('disabled',false);
                                                            $("#btnInsertStudent").prop('disabled',false);
                                                            $("#btnUpdateStudent").prop('disabled',true);
                                                            $("#btnDeleteStudent").prop('disabled',true);
                                                            $("#listStudent tr").remove();
                                                            $.ajax({
                                                                         type: "GET",
                                                                         url: 'http://localhost:8080/student/getAll',
                                                                         success: function (data) {
                                                                                  len = data.length;
                                                                                  var txt = "";
                                                                                  if(len > 0){
                                                                                      for(var i=0;i!=len;i++){
                                                                                                if(data[i].id)
                                                                                                   txt += "<tr><td>"+(i+1)+"</td><td>"+data[i].id+"</td><td>"+data[i].name+"</td><td>"+data[i].sem+"</td></tr>";

                                                                                      }
                                                                                      if(txt != ""){
                                                                                               $('#listStudent').append(txt).removeClass("hidden");
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