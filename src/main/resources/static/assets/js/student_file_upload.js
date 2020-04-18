$(document).ready(function(){
    var studId;
    var teacherId;
    var teacherSub;
    alert($.cookie("studId"));
    alert($.cookie("teacherSub"));
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

      $.ajax({
        url: "http://localhost:8080/uploadFile/"+studId+'/'+teacherSub,
        type: "POST",
        data: new FormData($("#upload-file-form")[0]),
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        cache: false,
        success: function () {
          // Handle upload success
          // ...
          alert("Uploaded successfully...")
        },
        error: function () {
          // Handle upload error
          // ...
        }
      });
    } // function uploadFile
});//close of document ready