$(document).ready(function(){
    var studId;
    var teacherId;
    var teacherSub;
//    alert($.cookie("studId"));
//    alert($.cookie("subject"));
    var txt = "";
    var i=1;
    $("#tblFiles").hide();
    if(($.cookie("studId") != null) && ($.cookie("studName") != null) && ($.cookie("subject") !=null) ){
                studId =$.cookie("studId");
                teacherSub=$.cookie("subject");
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
                $.removeCookie('teacherName');
                $.removeCookie('teacherId');
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
//        alert(filename);
            $.ajax({
                url: "http://localhost:8080/uploadFile/"+studId+'/'+teacherSub,
                type: "POST",
                data: new FormData($("#upload-file-form")[0]),
                enctype: 'multipart/form-data',
                processData: false,
                contentType: false,
                cache: false,
                success: function () {
                    alert("Uploaded successfully...");
                    txt += "<tr><td>"+i+"</td><td>"+filename+"</td></tr>";
                    $("#tblFiles").show();
                     $('#upload-file-input').val('');
                    $('#listFiles').append(txt);
                    i++;
                },
                error: function () {
                     $('#error_input').slideDown();
                     $('#error_input').html('Maximum file size exceeded!...');
                }
            });

    } // function uploadFile
});//close of document ready