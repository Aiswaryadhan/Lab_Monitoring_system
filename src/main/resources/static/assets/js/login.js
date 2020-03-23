$(document).ready(function(){

            $("#user").blur(function(){
                var user = $('#user').val();
                if(user=='')
                {
                      $('#error_user').slideDown();
                      $('#error_user').html('Please provide username');
                      status = 1;
                      return false;
                }
                else
                {
                      $('#error_user').slideUp();
                      status = 0;

                }
            });
           $("#pass").blur(function(){
                var pass = $('#pass').val();
                if(pass=='')
                {
                       $('#error_pass').slideDown();
                       $('#error_pass').html('Please provide password');
                       status = 1;
                       return false;
                }
                else
                {
                       $('#error_pass').slideUp();
                       status = 0;
                }
           });
           $("user").change(function(){
                 $.ajax({
                     type: "GET",
                     url: 'http://localhost:8080/teacher/id'+user,
                     headers: {
                                  "Content-Type": "application/json"
                              },
                     success: function (data) {
                            $('#selectsem').empty();
                            $('#selectsem').append("<option value=\"select\" id=\"user\">select</option>");
                            $( "#selectsem" ).prop( "disabled", true );
                            var i=0;
                            for(i=0;i<data.length;i++) {
                                 $('#selectsem').append("<option value=\"" + data[i].id + "\">" + data[i].id + "</option>");
                            }
                 });
           });
            $('#submit').click(function(){
                var user=$('#user').val();
                var pwd=$('#pass').val();
                //alert(username);
                $.ajax({
                            type : "POST",
                            url : 'http://localhost:8080/login/'+user,
                            headers : {
                                "Content-Type" : "application/json"
                            },
                            success : function(data) {
                                var jsonArray = [];
                               success : function(data) {
                                                            alert("Logged in..");

                                                         },
                                else {
                                    alert("Invalid Username or password");
                                    location.reload();
                                }
                            },
                            error : function(data) {
                            }
                        });
            });//close of click
});//close of document ready