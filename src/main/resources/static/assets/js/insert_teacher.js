$(document).ready(function(){
    var len;
    var teacherId;
    var teacherName;
    var teacherAdmin;
    var teacherSub;
    var sub;
    var t1;
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
    $("#txtTeacherId").prop('disabled',false);
    $("#btnInsertTeacher").prop('disabled',false);
    $("#btnUpdateTeacher").prop('disabled',true);
    $("#btnDeleteTeacher").prop('disabled',true);
    $.ajax({
                   type: "GET",
                   url: 'http://localhost:8080/subject/getAll',
                   success: function (data) {
                                               $('#sub').empty();
                                               $('#sub').append("<option value=\"select\" id=\"selectSub\" selected>Select Subjects</option>");
                                               var i=0;
                                               for(i=0;i<data.length;i++) {
                                                if(data[i].id){
                                                      $('#sub').append("<option value=\"" +data[i].id+ "\">" +data[i].name+ "</option>");
                                                      }
                                               }

                   }

    });

    $("#txtTeacherId").blur(function(){
                    teacherId = $('#txtTeacherId').val();
                    if(teacherId=='')
                    {
                          $('#error_teacher_id').slideDown();
                          $('#error_teacher_id').html('Please provide valid Id');
                    }
                    else
                    {
                            var teachData = {
                                             'id': teacherId
                            };
                            var aJson = JSON.stringify(teachData);
                            $.ajax({
                                    type: "POST",
                                    url: 'http://localhost:8080/teacher/idCheck',
                                    headers : {
                                                "Content-Type" : "application/json"
                                    },
                                    data:aJson,
                                    success: function (data) {
                                                   if(data=="success"){
                                                                        $('#error_teacher_id').slideDown();
                                                                        $('#error_teacher_id').html('Id Already allotted');
                                                   }
                                                   else {
                                                            $('#error_teacher_id').slideUp();
                                                   }
                                    }
                            })
                    }
    });

    $("#txtTeacherName").blur(function(){
                        teacherName = $('#txtTeacherName').val();
                        if(teacherName=='')
                        {
                              $('#error_teacher_name').slideDown();
                              $('#error_teacher_name').html('Please provide valid Name');
                        }
                        else
                        {
                              $('#error_teacher_name').slideUp();
                        }
    });
     $("#sub").blur(function(){
                            teacherSub = $('#sub').val();
                            if(teacherSub=='select')
                            {
                                  $('#error_teacher_sub').slideDown();
                                  $('#error_teacher_sub').html('Please select subject');
                            }
                            else
                            {
                                  $('#error_teacher_sub').slideUp();
                            }
     });

    $("#txtTeacherId").keypress(function (e) {
                var keyCode = e.keyCode || e.which;

                //Regex for Valid Characters i.e. Alphabets and Numbers.
                var regex = /^[A-Za-z0-9\s]+$/;

                //Validate TextBox value against the Regex.
                var isValid = regex.test(String.fromCharCode(keyCode));
                if (!isValid) {
                    $('#error_teacher_id').slideDown();
                    $("#error_teacher_id").html("Only Alphabets and Numbers allowed.");
                }
                else
                {
                    $('#error_teacher_id').slideUp();
                }

                return isValid;
    });

    $("#txtTeacherName").keypress(function (e) {
                    var keyCode = e.keyCode || e.which;

                    //Regex for Valid Characters i.e. Alphabets and Numbers.
                    var regex = /^[A-Za-z\s]+$/;

                    //Validate TextBox value against the Regex.
                    var isValid = regex.test(String.fromCharCode(keyCode));
                    if (!isValid) {
                        $('#error_teacher_name').slideDown();
                        $("#error_teacher_name").html("Only Alphabets allowed.");
                    }
                    else
                    {
                         $('#error_teacher_name').slideUp();
                    }

                    return isValid;
    });

    $.ajax({
              type: "GET",
              url: 'http://localhost:8080/teacher_details/getAll',
              success: function (data) {
                                       len = data.length;
                                       var txt = "";
                                       if(len > 0){
                                             for(var i=0;i!=len;i++){
                                                  var arr=data[i].split(",");
                                                  var id=arr[0];
                                                  var name=arr[1];
                                                  var isAdmin=arr[2];
                                                  var subjects=arr[3];
                                                  var subject_ids=arr[4];
                                                  txt += "<tr><td>"+(i+1)+"</td><td>"+id+"</td><td>"+name+"</td><td>"+isAdmin+"</td><td>"+subjects+"</td><td>"+subject_ids+"</td></tr>";
                                             }
                                             if(txt != ""){
                                                 $('#listTeacher').append(txt).removeClass("hidden");
                                             }
                                       }
                                       else
                                       {
                                             alert("Empty List");
                                       }
              }
    });
    $("#btnInsertTeacher").click(function(){
        teacherId = $('#txtTeacherId').val();
        teacherName = $('#txtTeacherName').val();
        teacherSub = $('#sub').val();
        var subs=String(teacherSub);
        var f=0;
        var  arr1=subs.split(",");
        var subLen=arr1.length;
        if($('#checkAdmin').prop('checked')) {
            $('#checkAdmin').val(true);
        }
        else{
            $('#checkAdmin').val(false);
        }
        teacherAdmin=$('#checkAdmin').val();
//        alert(teacherAdmin);
        if(teacherId==''){
              $('#error_teacher_id').slideDown();
              $('#error_teacher_id').html('Please provide valid Id');
        }
        else if(teacherName==''){
              $('#error_teacher_name').slideDown();
              $('#error_teacher_name').html('Please provide valid Name');
        }
        else if(teacherSub=='select'){
              $('#error_teacher_sub').slideDown();
              $('#error_teacher_sub').html('Please select subject');
        }
        else{
               $('#error_teacher_id').slideUp();
               $('#error_teacher_name').slideUp();
               $('#error_teacher_sub').slideUp();
               var teacherData = {
                                 'id': teacherId,
                                 'name': teacherName,
                                 'is_admin':teacherAdmin
               };
               var aJson = JSON.stringify(teacherData);
               $.ajax({
                         type: "POST",
                         url: 'http://localhost:8080/teacher/insert',
                         headers: {
                                       "Content-Type": "application/json"
                         },
                         data:aJson,
                         success: function (data) {
                                       $("#listTeacher tr").remove();
                                    $.ajax({
                                        type: "GET",
                                        url: 'http://localhost:8080/teacher_details/getAll',
                                        success: function (data) {
                                                                 len = data.length;
                                                                 var txt = "";
                                                                 if(len > 0){
                                                                       for(var i=0;i!=len;i++){
                                                                            var arr=data[i].split(",");
                                                                            var id=arr[0];
                                                                            var name=arr[1];
                                                                            var isAdmin=arr[2];
                                                                            var subjects=arr[3];
                                                                            var subject_ids=arr[4];
                                                                            txt += "<tr><td>"+(i+1)+"</td><td>"+id+"</td><td>"+name+"</td><td>"+isAdmin+"</td><td>"+subjects+"</td><td>"+subject_ids+"</td></tr>";
                                                                       }
                                                                       if(txt != ""){
                                                                           $('#listTeacher').append(txt).removeClass("hidden");
                                                                       }
                                                                 }
                                                                 else
                                                                 {
                                                                       alert("Empty List");
                                                                 }
                                        }
                                    });
                         }
               });
                for(i=0;i<subLen;i++){
                    var teacherData = {
                                                'teacher_id': teacherId,
                                                'subject_id':arr1[i]
                    };
                    var aJson = JSON.stringify(teacherData);
                    $.ajax({
                              type: "POST",
                              url: 'http://localhost:8080/teacherSub/insert',
                              headers: {
                                              "Content-Type": "application/json"
                              },
                              data:aJson,

                              success: function (data) {
//                                                f=1;
                              }


                    });
                }

                        alert("Successfully Inserted");
                        $('#txtTeacherId').val('');
                        $('#txtTeacherName').val('');
                        $('#sub').val('select');
                        $('#checkAdmin').prop('checked',false);
        }

    });
    $('#listTeacher').on( 'click', 'tr', function () {
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

	                                var values=tableData[5];
	                                $("#sub option[value='select']").prop("selected", false);
									$.each(values.split(";"), function(i,e){
									    $("#sub option[value='" + jQuery.trim(e) + "']").prop("selected", true);
									});
                                    $('#txtTeacherId').val(tableData[1]);
                                    $('#txtTeacherName').val(tableData[2]);
                                    teacherAdmin1=tableData[3];
//                                    alert(teacherAdmin1);
                                     if(teacherAdmin1=="true") {
                                                $('#checkAdmin').prop('checked',true);
                                     }
                                     else{
                                                $('#checkAdmin').prop('checked',false);
                                     }

                                    $("#txtTeacherId").prop('disabled',true);
                                    $("#btnInsertTeacher").prop('disabled',true);
                                    $("#btnUpdateTeacher").prop('disabled',false);
                                    $("#btnDeleteTeacher").prop('disabled',false);
    });
    $("#btnUpdateTeacher").click(function(){
          teacherId = $('#txtTeacherId').val();
          teacherName = $('#txtTeacherName').val();
          teacherSub = $('#sub').val();
          var subs=String(teacherSub);
          var f=0;
          var arr1=subs.split(",");
          var subLen=arr1.length;
          if($('#checkAdmin').prop('checked')) {
                $('#checkAdmin').val(true);
          }
          else{
                $('#checkAdmin').val(false);
          }
          teacherAdmin=$('#checkAdmin').val();
          if(teacherName==''){
                $('#error_teacher_name').slideDown();
                $('#error_teacher_name').html('Please provide valid Name');
          }
          else if(teacherSub=='select'){
                $('#error_teacher_sub').slideDown();
                $('#error_teacher_sub').html('Please select subject');
          }
          else{
                $('#error_teacher_id').slideUp();
                $('#error_teacher_name').slideUp();
                $('#error_teacher_sub').slideUp();
                var teacherData = {
                                       'name': teacherName,
                                       'is_admin':teacherAdmin
                };
                var aJson = JSON.stringify(teacherData);
                $.ajax({
                              type: "POST",
                              url: 'http://localhost:8080/teacher/update/'+teacherId,
                              headers: {
                                          "Content-Type": "application/json"
                              },
                              data:aJson,
                              success: function (data) {
                                          $("#listTeacher tr").remove();
                                          $.ajax({
                                                    type: "GET",
                                                    url: 'http://localhost:8080/teacher_details/getAll',
                                                    success: function (data) {
                                                                                  len = data.length;
                                                                                  var txt = "";
                                                                                  if(len > 0){
                                                                                      for(var i=0;i!=len;i++){
                                                                                                  var arr=data[i].split(",");
                                                                                                  var id=arr[0];
                                                                                                  var name=arr[1];
                                                                                                  var isAdmin=arr[2];
                                                                                                  var subjects=arr[3];
                                                                                                  var subject_ids=arr[4];
                                                                                                  txt += "<tr><td>"+(i+1)+"</td><td>"+id+"</td><td>"+name+"</td><td>"+isAdmin+"</td><td>"+subjects+"</td><td>"+subject_ids+"</td></tr>";
                                                                                      }
                                                                                      if(txt != ""){
                                                                                                  $('#listTeacher').append(txt).removeClass("hidden");
                                                                                      }
                                                                                  }
                                                                                  else
                                                                                  {
                                                                                      alert("Empty list");
                                                                                  }
                                                    }
                                          });
                              }
                });
                $.ajax({
                                                     type: "POST",
                                                     url: 'http://localhost:8080/teacherSub/delete/'+teacherId,
                                                     headers: {
                                                                "Content-Type": "application/json"
                                                     },
                                                     success: function (data) {

                                                     }
                });
                for(i=0;i<subLen;i++){
                                    var teacherData = {
                                                                'teacher_id': teacherId,
                                                                'subject_id':arr1[i]
                                    };
                                    var aJson = JSON.stringify(teacherData);
                                    $.ajax({
                                              type: "POST",
                                              url: 'http://localhost:8080/teacherSub/insert',
                                              headers: {
                                                              "Content-Type": "application/json"
                                              },
                                              data:aJson,
                                              success: function (data) {
                                              }
                                    });
                }

                     alert("Successfully Updated");
                     $('#txtTeacherId').val('');
                     $('#txtTeacherName').val('');
                     $('#sub').val('select');
                     $('#checkAdmin').prop('checked',false);
                     $("#txtTeacherId").prop('disabled',false);
                     $("#btnInsertTeacher").prop('disabled',false);
                     $("#btnUpdateTeacher").prop('disabled',true);
                     $("#btnDeleteTeacher").prop('disabled',true);

          }
    });

    $("#btnDeleteTeacher").click(function(){
              teacherId = $('#txtTeacherId').val();
              $.ajax({
                                  type: "POST",
                                  url: 'http://localhost:8080/teacher/delete/'+teacherId,
                                  headers: {
                                              "Content-Type": "application/json"
                                  },
                                  success: function (data) {
                                              $("#listTeacher tr").remove();
                                              $.ajax({
                                                        type: "GET",
                                                        url: 'http://localhost:8080/teacher_details/getAll',
                                                        success: function (data) {
                                                                                      len = data.length;
                                                                                      var txt = "";
                                                                                      if(len > 0){
                                                                                          for(var i=0;i!=len;i++){
                                                                                                      var arr=data[i].split(",");
                                                                                                      var id=arr[0];
                                                                                                      var name=arr[1];
                                                                                                      var isAdmin=arr[2];
                                                                                                      var subjects=arr[3];
                                                                                                      var subject_ids=arr[4];
                                                                                                      txt += "<tr><td>"+(i+1)+"</td><td>"+id+"</td><td>"+name+"</td><td>"+isAdmin+"</td><td>"+subjects+"</td><td>"+subject_ids+"</td></tr>";
                                                                                          }
                                                                                          if(txt != ""){
                                                                                                      $('#listTeacher').append(txt).removeClass("hidden");
                                                                                          }
                                                                                      }
                                                                                      else
                                                                                      {
                                                                                          alert("Empty list");
                                                                                      }
                                                        }
                                              });
                                  }
              });
              $.ajax({
                                     type: "POST",
                                     url: 'http://localhost:8080/teacherSub/delete/'+teacherId,
                                     headers: {
                                                "Content-Type": "application/json"
                                     },
                                     success: function (data) {
                                                               alert("Successfully Deleted");
                                                               $('#txtTeacherId').val('');
                                                               $('#txtTeacherName').val('');
                                                               $('#sub').val('select');
                                                               $('#checkAdmin').prop('checked',false);
                                                               $("#txtTeacherId").prop('disabled',false);
                                                               $("#btnInsertTeacher").prop('disabled',false);
                                                               $("#btnUpdateTeacher").prop('disabled',true);
                                                               $("#btnDeleteTeacher").prop('disabled',true);
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