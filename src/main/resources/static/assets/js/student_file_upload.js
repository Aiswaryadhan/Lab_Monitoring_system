$(document).ready(function(){
    var studId;
    var teacherId;
    var teacherSub;
//    alert($.cookie("studId"));
//    alert($.cookie("subject"));
    var txt = "";
//    var i=1;
    $("#tblFiles").hide();
    if(($.cookie("studId") != null) && ($.cookie("studName") != null) && ($.cookie("teacherSub") !=null) ){
                studId =$.cookie("studId");
                teacherSub=$.cookie("teacherSub");
                var studName=$.cookie("studName");
                var studSem=$.cookie("studSem");
//                teacherSub=$.cookie("subject");
                receiver=$.cookie("teacherId");
                $("#studName").text(studName);
//             stud_id/sub_id/date/file.extention
    }

    $("#studentLogout").click(function(){
                $.removeCookie('studId');
                $.removeCookie('studName');
                $.removeCookie('studSem');
                $.ajax({
                                         type: "POST",
                                         url: 'http://192.168.42.215:8080/loggedStudent/delete/'+studId,
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
                url: "http://192.168.42.215:8080/uploadFile/"+studId+'/'+teacherSub,
                type: "POST",
                data: new FormData($("#upload-file-form")[0]),
                enctype: 'multipart/form-data',
                processData: false,
                contentType: false,
                cache: false,
                success: function () {
//                alert("success");
                $.ajax({
                                url: "http://192.168.42.215:8080/student/upload/"+studId+'/'+teacherSub+'/'+filename,
                                type: "POST",
                                success: function () {
//                                            alert("success");
                                            $.ajax({
                                                url: "http://192.168.42.215:8080/student/getUploadDetails/"+studId+'/'+teacherSub,
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

//                    txt += "<tr><td>"+i+"</td><td>"+filename+"</td></tr>";

//                     $('#upload-file-input').val('');
//                    $('#listFiles').append(txt);
//                    i++;
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
});//close of document ready