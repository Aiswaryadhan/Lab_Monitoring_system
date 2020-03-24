$(document).ready(function(){
//console.log("ready");
// alert("Welcome");
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
                      $.ajax({
                                                                  type: "GET",
                                                                  url: 'http://localhost:8080/teacher/id/'+user,
                                                                  headers: {
                                                                                 "Content-Type": "application/json"
                                                                           },
                                                                  dataType: 'json',
                                                                  success: function (data) {

                                                                  $('#sub').empty();
                                                                  $('#sub').append("<option value=\"select\" id=\"user\">select</option>");
                                                                  $( "#selectsub" ).prop( "disabled", true );
//                                                                  var id = data[i]['id'];
//                                                                  var name = data[i]['subject'];
                                                                  var i=0;
                                                                  for(i=0;i<data.length;i++) {
                                                                    var arr=data[i].split(",");
                                                                    var id=arr[1];
                                                                    var sub=arr[0];
                                                                           $('#sub').append("<option value=\"" +id+ "\">" +sub+ "</option>");
                                                                  }
                                                        }
                                             });

                }
            });
           $("#pass").blur(function(){
//           alert("password");
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
//           $("sub").click(function(){
//           alert("HHHH");


//           });
            $('#submit').click(function(){
                var user=$('#user').val();
                var pwd=$('#pass').val();
                var logCred = {
                            'id': user,
                            'password': pwd
                        };
                         var aJson = JSON.stringify(logCred);
                $.ajax({
                            type : "POST",
                            url : 'http://localhost:8080/login',
                            headers : {
                                "Content-Type" : "application/json"
                            },
                             data:aJson,
                            success : function(data) {
                                var msg = "";
                                alert(data);
                                if(data == "success"){
                                                           window.location.replace("http://localhost:8080/teacherDashboard");

                                }
                                else{
                                         msg = "Invalid username and password!";
                                }
                                $("#message").html(msg);
                            }
                        });
            });//close of click
});//close of document ready