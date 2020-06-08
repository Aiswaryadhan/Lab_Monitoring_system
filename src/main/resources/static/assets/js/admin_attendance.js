$(document).ready(function(){
    $("#tblAttendance").hide();
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
    $("#percent").prop("disabled",true);
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
// window.addEventListener("beforeunload", function (e) {
//   var confirmationMessage = "Are you sure?";
//
//   (e || window.event).returnValue = confirmationMessage; //Gecko + IE
//   return confirmationMessage;                            //Webkit, Safari, Chrome
// });

    $("#startDt").blur(function(){
                                var sDate = $('#startDt').val();
                                if(sDate=='')
                                {
                                       $('#error_sDate_id').slideDown();
                                       $('#error_sDate_id').html('Enter a Valid Date');
                                }
                                else
                                {
                                       $('#error_sDate_id').slideUp();


                                }
    });
     $("#endDt").blur(function(){
                                    var eDate = $('#endDt').val();
                                    if(eDate=='')
                                    {
                                           $('#error_eDate_id').slideDown();
                                           $('#error_eDate_id').html('Enter a Valid Date');
                                    }
                                    else
                                    {
                                           $('#error_eDate_id').slideUp();

                                    }
     });
     $("#btnCalcAttendance").click(function(){
        sDate = $('#startDt').val();
        eDate = $('#endDt').val();
        if(sDate==''){
              $('#error_sDate_id').slideDown();
              $('#error_sDate_id').html('Enter a Valid Date');
        }
        else if(eDate==''){
              $('#error_eDate_id').slideDown();
              $('#error_eDate_id').html('Enter a Valid Date');
        }
        else{
               $('#error_sDate_id').slideUp();
               $('#error_eDate_id').slideUp();
               $.ajax({
                         type: "POST",
                         url: 'http://localhost:8080/attendance/generateReport/'+sDate+'/'+eDate+'/'+sub,
                         headers: {
                                       "Content-Type": "application/json"
                         },
                         success: function (data) {
                                        $("#listAttendance tr").remove();
                                        var len = data.length;
                                        var txt = "";
                                        if(len > 0){
                                                for(var i=0;i!=len;i++){
                                                               if(data[i].name){
                                                                var eligibility;
                                                                if(data[i].eligibility==true){
                                                                    eligibility="Eligible";
                                                                }
                                                                else{
                                                                    eligibility="Not Eligible";
                                                                }
                                                                        txt += "<tr><td>"+(i+1)+"</td><td>"+data[i].name
                                                                            +"</td><td>"+data[i].total_days+"</td><td>"+data[i].present_days+"</td><td>"+data[i].percentage+"</td><td>"+eligibility+"</td></tr>";
                                                               }
                                                }
                                                if(txt != ""){
                                                            $("#tblAttendance").show();
                                                              $('#listAttendance').append(txt).removeClass("hidden");
                                                }
                                        }

                         }

               });

        }
    });
      $("#btnExport").click(function(){
              html2canvas($('#tblAttn')[0], {
                              onrendered: function (canvas) {
                                  var data = canvas.toDataURL();
                                  var docDefinition = {
                                      content: [{
                                          image: data,
                                          width: 500
                                      }]
                                  };
                                  pdfMake.createPdf(docDefinition).download("Table.pdf");
                              }
                          });

        });
    $("#btnReset").click(function(){
    $("#tblAttendance").hide();
          $('#startDt').val('');
          $('#endDt').val('');
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
});//close of document ready