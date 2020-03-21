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