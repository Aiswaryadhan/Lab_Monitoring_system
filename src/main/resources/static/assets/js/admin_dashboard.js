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

});//close of document ready