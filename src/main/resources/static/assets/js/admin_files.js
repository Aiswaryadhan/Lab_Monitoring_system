$(document).ready(function(){
     var sub;
     if ($.cookie("id") != null && $.cookie("subject") != null) {
                var teacherId =$.cookie("id");
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
               url: 'http://localhost:8080/teacher/getFiles/'+sub,
               success: function (data) {
                            len = data.length;
                            var txt = "";
                            if(len > 0){
                                  for(var i=0;i!=len;i++){
                                             var arr=data[i].split(",");
                                             var date=arr[0];
                                             var file_name=arr[1];
                                             var studName=arr[2];
                                             txt += "<li><img src=\"assets/img/user-medium.png\" alt=\"Avatar\" class=\"img-circle pull-left avatar\"><p><a href=\"#\">"+studName+"</a> has send "+file_name+" <span class=\"timestamp\">"+date+"</span></p></li>";
                                  }
                                  alert(txt);
                                 if(txt != ""){
                                              $('#listMsg').append(txt).removeClass("hidden");
//                                              $("#listMsg").show();
                                 }
                           }
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