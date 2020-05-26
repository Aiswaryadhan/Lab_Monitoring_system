$(document).ready(function(){
    var len;
    var subId;
    var subName;
    var sem;
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
    $("#sem").show();
    $("#txtSubId").prop('disabled',false);
    $("#btnInsertSub").prop('disabled',false);
    $("#btnUpdateSub").prop('disabled',true);
    $("#btnDeleteSub").prop('disabled',true);
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
    $("#txtSubId").blur(function(){
                    subId = $('#txtSubId').val();
                    if(subId=='')
                    {
                          $('#error_sub_id').slideDown();
                          $('#error_sub_id').html('Please provide valid Id');
                    }
                    else
                    {
                            var subData = {
                                                   'id': subId
                            };
                            var aJson = JSON.stringify(subData);
                            $.ajax({
                                       type: "POST",
                                       url: 'http://localhost:8080/subject/idCheck',
                                       headers : {
                                                      "Content-Type" : "application/json"
                                       },
                                       data:aJson,
                                       success: function (data) {
                                                      if(data=="success"){
                                                                        $('#error_sub_id').slideDown();
                                                                        $('#error_sub_id').html('Id Already allotted');
                                                      }
                                                      else {
                                                                 $('#error_sub_id').slideUp();
                                                      }
                                       }
                            })
                    }
    });

    $("#txtSubName").blur(function(){
                        subName = $('#txtSubName').val();
                        if(subName=='')
                        {
                              $('#error_sub_name').slideDown();
                              $('#error_sub_name').html('Please provide valid Subject');
                        }
                        else
                        {
                              $('#error_sub_name').slideUp();
                        }
    });
   $("#sem").blur(function(){
                            subSem = $('#sem').val();
                            if(subSem=='select')
                            {
                                  $('#error_sub_sem').slideDown();
                                  $('#error_sub_sem').html('Please select semester');
                            }
                            else
                            {
                                  $('#error_sub_sem').slideUp();
                            }
     });
    $("#txtSubId").keypress(function (e) {
                var keyCode = e.keyCode || e.which;

                //Regex for Valid Characters i.e. Alphabets and Numbers.
                var regex = /^[A-Za-z0-9\s]+$/;

                //Validate TextBox value against the Regex.
                var isValid = regex.test(String.fromCharCode(keyCode));
                if (!isValid) {
                    $('#error_sub_id').slideDown();
                    $("#error_sub_id").html("Only Alphabets and Numbers allowed.");
                }
                else
                {
                     $('#error_sub_id').slideUp();
                }

                return isValid;
    });

    $("#txtSubName").keypress(function (e) {
                    var keyCode = e.keyCode || e.which;

                    //Regex for Valid Characters i.e. Alphabets and Numbers.
                    var regex = /^[A-Za-z0-9\s]+$/;

                    //Validate TextBox value against the Regex.
                    var isValid = regex.test(String.fromCharCode(keyCode));
                    if (!isValid) {
                        $('#error_sub_name').slideDown();
                        $("#error_sub_name").html("Only Alphabets and Numbers allowed.");
                    }
                    else
                    {
                         $('#error_sub_name').slideUp();
                    }

                    return isValid;
    });

    $.ajax({
               type: "GET",
               url: 'http://localhost:8080/subject/getSubSem',
               success: function (data) {
                                           len = data.length;
                                           var txt = "";
                                           if(len > 0){
                                                     for(var i=0;i!=len;i++){
                                                          var arr=data[i].split(",");
                                                          var id=arr[0];
                                                          var name=arr[1];
                                                          var sem=arr[2];
                                                          txt += "<tr><td>"+(i+1)+"</td><td>"+id+"</td><td>"+name+"</td><td>"+sem+"</td></tr>";
                                                     }
                                                     if(txt != ""){
                                                                   $('#listSubject').append(txt).removeClass("hidden");
                                                     }
                                           }
                                           else
                                           {
                                                alert("Empty Set !...");
                                           }
               }

    });
    $("#btnInsertSub").click(function(){
        subId=$("#txtSubId").val();
        subName=$("#txtSubName").val();
        subSem = $('#sem').val();
        if(subId==''){
               $('#error_sub_id').slideDown();
               $('#error_sub_id').html('Please provide valid ID');
        }
        else if(subName==''){
               $('#error_sub_name').slideDown();
               $('#error_sub_name').html('Please provide valid Subject');
        }
        else if(subSem=='select'){
               $('#error_sub_sem').slideDown();
               $('#error_sub_sem').html('Please select semester');
        }
        else{
               $('#error_sub_id').slideUp();
               $('#error_sub_name').slideUp();
               $('#error_sub_sem').slideUp();
               status = 0;
               var subData = {
                                 'id': subId,
                                 'name': subName
               };
               var aJson = JSON.stringify(subData);
               $.ajax({
                         type: "POST",
                         url: 'http://localhost:8080/subject/insert',
                         headers: {
                                       "Content-Type": "application/json"
                         },
                         data:aJson,
                         success: function (data) {
//                                       alert("Successfully Inserted");
                                       $("#listSubject tr").remove();
                                       $.ajax({
                                                      type: "GET",
                                                      url: 'http://localhost:8080/subject/getSubSem',
                                                      success: function (data) {
                                                                                  len = data.length;
                                                                                  var txt = "";
                                                                                  if(len > 0){
                                                                                            for(var i=0;i!=len;i++){
                                                                                                 var arr=data[i].split(",");
                                                                                                 var id=arr[0];
                                                                                                 var name=arr[1];
                                                                                                 var sem=arr[2];
                                                                                                 txt += "<tr><td>"+(i+1)+"</td><td>"+id+"</td><td>"+name+"</td><td>"+sem+"</td></tr>";
                                                                                            }
                                                                                            if(txt != ""){
                                                                                                          $('#listSubject').append(txt).removeClass("hidden");
                                                                                            }
                                                                                  }
                                                                                  else
                                                                                  {
                                                                                       alert("Empty Set !...");
                                                                                  }
                                                      }

                                       });

                         }
               });

               var subSemData = {
                                                'subject_id': subId,
                                                'sem': subSem
               };
               var aJson = JSON.stringify(subSemData);
                $.ajax({
                                        type: "POST",
                                        url: 'http://localhost:8080/subjectSem/insert',
                                        headers: {
                                                      "Content-Type": "application/json"
                                        },
                                        data:aJson,
                                        success: function (data) {
                                                      alert("Successfully Inserted");
                                                      $("#txtSubId").val('');
                                                      $("#txtSubName").val('');
                                                      $("#sem").val('select');

                                        }
                });

        }
    });
    $('#listSubject').on( 'click', 'tr', function () {
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
                            $("#txtSubName").val(tableData[2]);
                            $("#txtSubId").val(tableData[1]);
                            $('#sem').val(tableData[3])
                            $("#txtSubId").prop('disabled',true);
                            $("#btnInsertSub").prop('disabled',true);
                            $("#btnUpdateSub").prop('disabled',false);
                            $("#btnDeleteSub").prop('disabled',false);
    });
    $("#btnUpdateSub").click(function(){
                          subId=$("#txtSubId").val();
                          subName=$("#txtSubName").val();
                          subSem = $('#sem').val();
                          if(subName==''){
                                         $('#error_sub_name').slideDown();
                                         $('#error_sub_name').html('Please provide valid Subject');
                                         status = 1;
                                         return false;
                          }
                          else if(subSem=='select'){
                                             $('#error_sub_sem').slideDown();
                                             $('#error_sub_sem').html('Please select semester');
                          }
                          else{
                                         $('#error_sub_name').slideUp();
                                         $('#error_sub_sem').slideUp();
                                         var semData = {
                                                            'name': subName
                                         };
                                         var aJson = JSON.stringify(semData);
                                         $.ajax({
                                                       type: "POST",
                                                       url: 'http://localhost:8080/subject/update/'+subId,
                                                       headers: {
                                                                   "Content-Type": "application/json"
                                                       },
                                                       data:aJson,
                                                       success: function (data) {

                                                                                    $("#listSubject tr").remove();
                                                                                    $.ajax({
                                                                                               type: "GET",
                                                                                               url: 'http://localhost:8080/subject/getSubSem',
                                                                                               success: function (data) {
                                                                                                                         len = data.length;
                                                                                                                         var txt = "";
                                                                                                                         if(len > 0){
                                                                                                                                    for(var i=0;i!=len;i++){
                                                                                                                                               var arr=data[i].split(",");
                                                                                                                                               var id=arr[0];
                                                                                                                                               var name=arr[1];
                                                                                                                                               var sem=arr[2];
                                                                                                                                               txt += "<tr><td>"+(i+1)+"</td><td>"+id+"</td><td>"+name+"</td><td>"+sem+"</td></tr>";
                                                                                                                                    }
                                                                                                                                    if(txt != ""){
                                                                                                                                                     $('#listSubject').append(txt).removeClass("hidden");
                                                                                                                                    }
                                                                                                                         }
                                                                                                                         else
                                                                                                                         {
                                                                                                                            alert("Empty Set !...");
                                                                                                                         }
                                                                                               }
                                                                                    });

                                                       }

                                         });
                                         var subSemData = {
                                                                                         'sem': subSem
                                                        };
                                                        var aJson = JSON.stringify(subSemData);
                                                         $.ajax({
                                                                                 type: "POST",
                                                                                 url: 'http://localhost:8080/subjectSem/update/'+subId,
                                                                                 headers: {
                                                                                               "Content-Type": "application/json"
                                                                                 },
                                                                                 data:aJson,
                                                                                 success: function (data) {
                                                                                               alert("Successfully Updated");
                                                                                               $("#txtSubId").prop('disabled',false);
                                                                                               $("#txtSubId").val('');
                                                                                               $("#txtSubName").val('');
                                                                                               $("#sem").val('select');
                                                                                               $("#btnInsertSub").prop('disabled',false);
                                                                                               $("#btnUpdateSub").prop('disabled',true);
                                                                                               $("#btnDeleteSub").prop('disabled',true);

                                                                                 }
                                                         });

                          }
    });
    $("#btnDeleteSub").click(function(){
                    subId=$("#txtSubId").val();
                    subName=$("#txtSubName").val();
                    $.ajax({
                              type: "POST",
                              url: 'http://localhost:8080/subject/delete/'+subId,
                               success: function (data) {
                                                            alert("Deletion Successful");
                                                            $("#txtSubId").val('');
                                                            $("#txtSubName").val('');
                                                            $("#sem").show();
                                                            $("#txtSubId").prop('disabled',false);
                                                            $("#btnInsertSub").prop('disabled',false);
                                                            $("#btnUpdateSub").prop('disabled',true);
                                                            $("#btnDeleteSub").prop('disabled',true);
                                                            $("#listSubject tr").remove();
                                                            $.ajax({
                                                                        type: "GET",
                                                                        url: 'http://localhost:8080/subject/getSubSem',
                                                                        success: function (data) {
                                                                                                     len = data.length;
                                                                                                     var txt = "";
                                                                                                     if(len > 0){
                                                                                                                   for(var i=0;i!=len;i++){
                                                                                                                                var arr=data[i].split(",");
                                                                                                                                var id=arr[0];
                                                                                                                                var name=arr[1];
                                                                                                                                var sem=arr[2];
                                                                                                                                txt += "<tr><td>"+(i+1)+"</td><td>"+id+"</td><td>"+name+"</td><td>"+sem+"</td></tr>";
                                                                                                                   }
                                                                                                                   if(txt != ""){
                                                                                                                           $('#listSubject').append(txt).removeClass("hidden");
                                                                                                                   }
                                                                                                     }
                                                                                                     else
                                                                                                     {
                                                                                                        alert("Empty Set !...");
                                                                                                     }
                                                                        }
                                                            });
                               }
                    });

    });
});