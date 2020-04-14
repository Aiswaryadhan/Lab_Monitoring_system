$(document).ready(function(){
    var len;
    var studId;
    var studName;
    var studSem;
    $("#txtStudId").prop('disabled',false);
    $("#btnInsertStudent").prop('disabled',false);
    $("#btnUpdateStudent").prop('disabled',true);
    $("#btnDeleteStudent").prop('disabled',true);
    $.ajax({
                   type: "GET",
                   url: 'http://localhost:8080/semester/getAll',
                   success: function (data) {
                                               $('#sem').empty();
                                               $('#sem').append("<option value=\"select\" id=\"selectSem\">Select Semester</option>");
                                               var i=0;
                                               for(i=0;i<data.length;i++) {
                                                if(data[i].id){
                                                      $('#sem').append("<option value=\"" +data[i].id+ "\">" +data[i].name+ "</option>");
                                                      }
                                               }

                   }

    });

    $("#txtStudId").blur(function(){
                    studId = $('#txtStudId').val();
                    if(studId=='')
                    {
                          $('#error_stud_id').slideDown();
                          $('#error_stud_id').html('Please provide valid Id');
                    }
                    else
                    {
                          $('#error_stud_id').slideUp();
                    }
    });

    $("#txtStudName").blur(function(){
                        studName = $('#txtStudName').val();
                        if(studName=='')
                        {
                              $('#error_stud_name').slideDown();
                              $('#error_stud_name').html('Please provide valid Name');
                        }
                        else
                        {
                              $('#error_sub_name').slideUp();
                        }
    });
     $("#sem").blur(function(){
                            studSem = $('#sem').val();
                            if(studSem=='select')
                            {
                                  $('#error_stud_sem').slideDown();
                                  $('#error_stud_sem').html('Please select semester');
                            }
                            else
                            {
                                  $('#error_stud_sem').slideUp();
                            }
     });

    $("#txtStudId").keypress(function (e) {
                var keyCode = e.keyCode || e.which;

                //Regex for Valid Characters i.e. Alphabets and Numbers.
                var regex = /^[A-Za-z0-9\s]+$/;

                //Validate TextBox value against the Regex.
                var isValid = regex.test(String.fromCharCode(keyCode));
                if (!isValid) {
                    $('#error_stud_id').slideDown();
                    $("#error_stud_id").html("Only Alphabets and Numbers allowed.");
                }
                else
                {
                    $('#error_stud_id').slideUp();
                }

                return isValid;
    });

    $("#txtStudName").keypress(function (e) {
                    var keyCode = e.keyCode || e.which;

                    //Regex for Valid Characters i.e. Alphabets and Numbers.
                    var regex = /^[A-Za-z\s]+$/;

                    //Validate TextBox value against the Regex.
                    var isValid = regex.test(String.fromCharCode(keyCode));
                    if (!isValid) {
                        $('#error_stud_name').slideDown();
                        $("#error_stud_name").html("Only Alphabets allowed.");
                    }
                    else
                    {
                         $('#error_stud_name').slideUp();
                    }

                    return isValid;
    });

    $.ajax({
               type: "GET",
               url: 'http://localhost:8080/student/getAll',
               success: function (data) {
                                           len = data.length;
                                           var txt = "";
                                           if(len > 0){
                                                     for(var i=0;i!=len;i++){
                                                          if(data[i].id)
                                                          txt += "<tr><td>"+(i+1)+"</td><td>"+data[i].id+"</td><td>"+data[i].name+"</td><td>"+data[i].sem+"</td></tr>";
                                                     }
                                                     if(txt != ""){
                                                                   $('#listStudent').append(txt).removeClass("hidden");
                                                     }
                                           }
                                           else
                                           {
                                                alert("Null");
                                           }
               }

    });
    $("#btnInsertStudent").click(function(){
        studId = $('#txtStudId').val();
        studName = $('#txtStudName').val();
        studSem = $('#sem').val();
        if(studId==''){
              $('#error_stud_id').slideDown();
              $('#error_stud_id').html('Please provide valid Id');
        }
        else if(studName==''){
              $('#error_stud_name').slideDown();
              $('#error_stud_name').html('Please provide valid Name');
        }
        else if(studSem=='select'){
              $('#error_stud_sem').slideDown();
              $('#error_stud_sem').html('Please select semester');
        }
        else{
               $('#error_stud_id').slideUp();
               $('#error_stud_name').slideUp();
               $('#error_stud_sem').slideUp();
               var studData = {
                                 'id': studId,
                                 'name': studName,
                                 'sem':studSem
               };
               var aJson = JSON.stringify(studData);
               $.ajax({
                         type: "POST",
                         url: 'http://localhost:8080/student/insert',
                         headers: {
                                       "Content-Type": "application/json"
                         },
                         data:aJson,
                         success: function (data) {
                                       alert("Successfully Inserted");
                                       $("#txtStudId").val('');
                                       $("#txtStudName").val('');
                                       $("#sem").val('select');
                                       $("#listStudent tr").remove();
                                        $.ajax({
                                                      type: "GET",
                                                      url: 'http://localhost:8080/student/getAll',
                                                      success: function (data) {
                                                                                  len = data.length;
                                                                                  var txt = "";
                                                                                  if(len > 0){
                                                                                            for(var i=0;i!=len;i++){
                                                                                                 if(data[i].id)
                                                                                                 txt += "<tr><td>"+(i+1)+"</td><td>"+data[i].id+"</td><td>"+data[i].name+"</td><td>"+data[i].sem+"</td></tr>";
                                                                                            }
                                                                                            if(txt != ""){
                                                                                                          $('#listStudent').append(txt).removeClass("hidden");
                                                                                            }
                                                                                  }
                                                                                  else
                                                                                  {
                                                                                       alert("Null");
                                                                                  }
                                                      }

                                        });
                         }
               });

        }
    });