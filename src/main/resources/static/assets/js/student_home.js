$(document).ready(function(){
     if(($.cookie("studId") != null) && ($.cookie("studName") != null) && ($.cookie("studSem") !=null)){
                var studId =$.cookie("studId");
                var studName=$.cookie("studName");
                var studSem=$.cookie("studSem");
                $("#studName").text(studName);
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

});//close of document ready