$(document).ready(function(){
//console.log("ready");
// alert("Welcome");
            $("#user").blur(function(){
                var user = $('#user').val();
                if(user=='')
                {
                      $('#error_user').slideDown();
                      $('#error_user').html('Please provide username');
                }
                else
                {
                      $('#error_user').slideUp();
                      $.ajax({
                                                                  type: "GET",
                                                                  url: 'http://localhost:8080/teacher/id/'+user,
                                                                  headers: {
                                                                                 "Content-Type": "application/json"
                                                                           },
                                                                  dataType: 'json',
                                                                  success: function (data) {

                                                                  $('#sub').empty();
                                                                  $('#sub').append("<option value=\"Select\" id=\"selectsub\">Select subject</option>");
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
                }
                else
                {
                       $('#error_pass').slideUp();


                }
           });
           $("#sub").blur(function(){
                            var sub = $('#selectsub').val();
                            if(sub=='Select')
                            {
                                   $('#error_sub').slideDown();
                                   $('#error_sub').html('Please select Subject');
                            }
                            else
                            {
                                   $('#error_sub').slideUp();


                            }
           });
            $('#submit').click(function(){
                var user=$('#user').val();
                var pwd=$('#pass').val();
                var selsub=$("#sub").val();

                if(user==''){
                      $('#error_user').slideDown();
                      $('#error_user').html('Please provide username');
                }
                else{
                      $('#error_user').slideUp();
                }
                if(pwd==''){
                       $('#error_pass').slideDown();
                       $('#error_pass').html('Please provide password');
                }
                else{
                       $('#error_pass').slideUp();
                }
                if(sub=='Select'){
                         $('#error_sub').slideDown();
                         $('#error_sub').html('Please select Subject');
                }
                else{
                         $('#error_sub').slideUp();
                }


                var logCred = {
                            'id': user,
                            'password': pwd
                        };
                         var aJson = JSON.stringify(logCred);
                $.ajax({
                            type : "POST",
                            url : 'http://localhost:8080/login/'+selsub,
                            headers : {
                                "Content-Type" : "application/json"
                            },
                             data:aJson,
                            success : function(data) {
                                var msg = "";
                                //alert("Hello");
                                //alert(data);
                                if(data == "success"){
                                                            $.cookie("id", user);
                                                            $.cookie("subject", selsub);
                                                            window.location.replace("http://localhost:8080/home");

                                }
                                else{
                                        $('#error_cred').slideDown();
                                        $('#error_cred').html('Incorrect username or password');
                                }
                            }
                        });
            });//close of click
});//close of document ready