$(document).ready(function(){
    $("#tblAttendance").hide();
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
//    $("#percent").prop("disabled",true);
    $("#teacherLogout").click(function(){
        $.removeCookie('id');
        $.removeCookie('subject');
        $.ajax({
                                 type: "POST",
                                 url: 'http://localhost:8080/loggedStudent/delete',
                                 success: function (data) {

                                 }
        });
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
});//close of document ready