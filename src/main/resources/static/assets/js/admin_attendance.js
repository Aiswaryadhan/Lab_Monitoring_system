$(document).ready(function(){
     if ($.cookie("id") != null && $.cookie("subject") != null) {
                var teacherId =$.cookie("id");
                var sub= $.cookie("subject");
                $.ajax({
                           type: "POST",
                           url: 'http://localhost:8080/teacher/getName/'+teacherId,
                           success: function (data) {

                                        $("#teacher_name").text(data);
                           }
                });

     }
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
    $("#txtStud").blur(function(){
                        var studId = $('#txtStud').val();
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
                                                                    if(data=="failed"){
                                                                        $('#error_stud_id').slideDown();
                                                                        $('#error_stud_id').html('Please provide a valid Id');
                                                                    }
                                                                    else {
                                                                        $('#error_stud_id').slideUp();
                                                                    }

                                                                 }
                                        })
                        }
    });
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
        studId = $('#txtStud').val();
        sDate = $('#startDt').val();
        eDate = $('#endDt').val();
        if(studId==''){
              $('#error_stud_id').slideDown();
              $('#error_stud_id').html('Please provide valid Id');
        }
        else if(sDate==''){
              $('#error_sDate_id').slideDown();
              $('#error_sDate_id').html('Enter a Valid Date');
        }
        else if(eDate==''){
              $('#error_eDate_id').slideDown();
              $('#error_eDate_id').html('Enter a Valid Date');
        }
        else{
               $('#error_stud_id').slideUp();
               $('#error_sDate_id').slideUp();
               $('#error_eDate_id').slideUp();
               $.ajax({
                         type: "POST",
                         url: 'http://localhost:8080/attendance/getCount/'+studId+'/'+sDate+'/'+eDate+'/'+sub,
                         headers: {
                                       "Content-Type": "application/json"
                         },
                         success: function (data) {
                                       $("#listAttendance tr").remove();
                                       var count=data;
                                       $.ajax({
                                                         type: "POST",
                                                         url: 'http://localhost:8080/attendance/getTotalCount/'+studId+'/'+sDate+'/'+eDate+'/'+sub,
                                                         headers: {
                                                                       "Content-Type": "application/json"
                                                         },
                                                         success: function (data) {
                                                                       $("#listAttendance tr").remove();
                                                                       var countTotal=data;
                                                                       var percentage=(count/countTotal)*100;
                                                                       $("#percent").val(percentage);
                                                                        $.ajax({
                                                                                type: "GET",
                                                                                url: 'http://localhost:8080/attendance/getAll/'+studId+'/'+sDate+'/'+eDate+'/'+sub,
                                                                                success: function (data) {
                                                                                  len = data.length;
                                                                                  var txt = "";
                                                                                  if(len > 0){
                                                                                            for(var i=0;i!=len;i++){
                                                                                                 var arr=data[i].split(",");
                                                                                                 var attendanceDate=arr[0];
                                                                                                 var presence;
                                                                                                 if(arr[1]=="true"){
                                                                                                    presence="Present";
                                                                                                 }
                                                                                                 else{
                                                                                                    presence="Absent";
                                                                                                 }
                                                                                                 txt += "<tr><td>"+(i+1)+"</td><td>"+attendanceDate+"</td><td>"+presence+"</td></tr>";
                                                                                            }
                                                                                            if(txt != ""){
                                                                                                          $('#listAttendance').append(txt).removeClass("hidden");
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

        }
    });
    $("#btnReset").click(function(){
          $('#txtStud').val('');
          $('#startDt').val('');
          $('#endDt').val('');
          $("#percent").val('');
    });
});//close of document ready