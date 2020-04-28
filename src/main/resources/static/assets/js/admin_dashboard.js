$(document).ready(function(){
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
                type: "POST",
                url: 'http://localhost:8080/teacher/getStudNo',
                success: function (data) {
                                      $("#studNo").text(data);
                }
    });
    $.ajax({
                    type: "POST",
                    url: 'http://localhost:8080/teacher/getTeacherNum',
                    success: function (data) {
                                          $("#teacherNo").text(data);
                    }
    });
    $.ajax({
                    type: "POST",
                    url: 'http://localhost:8080/teacher/getTime',
                    success: function (data) {
                                          $("#txtTime").text(data);
                    }
    });
    $.ajax({
                    type: "POST",
                    url: 'http://localhost:8080/teacher/getFilesNum/'+sub,
                    success: function (data) {
                                          $("#fileNum").text(data);
                    }
    });
    $.ajax({
                type: "POST",
                url: 'http://localhost:8080/teacher/getSubName/'+sub,
                success: function (data) {
                                      $("#txtSubject").text(data);
                }
    });
    $.ajax({
                type: "POST",
                url: 'http://localhost:8080/teacher/getOnlineStud',
                success: function (data) {
                                     $("#onlineStud").text(data);
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
});//close of document ready