$(document).ready(function(){
    var len;
    var semId;
    $("#btnInsertSem").prop('disabled',false);
    $("#btnUpdateSem").prop('disabled',true);
    $("#btnDeleteSem").prop('disabled',true);
    $("#txtSem").blur(function(){
                    var sem = $('#txtSem').val();
                    if(sem=='')
                    {
                          $('#error_sem').slideDown();
                          $('#error_sem').html('Please provide valid semester');
                          status = 1;
                          return false;
                    }
                    else
                    {
                          $('#error_sem').slideUp();
                          status = 0;
                    }
    });

    $("#txtSem").keypress(function (e) {
                var keyCode = e.keyCode || e.which;

                //Regex for Valid Characters i.e. Alphabets and Numbers.
                var regex = /^[A-Za-z0-9\s]+$/;

                //Validate TextBox value against the Regex.
                var isValid = regex.test(String.fromCharCode(keyCode));
                if (!isValid) {
                    $("#error_sem").html("Only Alphabets and Numbers allowed.");
                }
                else
                {
                     $("#error_sem").html("");
                }

                return isValid;
            });

    $.ajax({
               type: "GET",
               url: 'http://localhost:8080/semester/getAll',
               success: function (data) {
                                           len = data.length;
                                           var txt = "";
                                           if(len > 0){
                                                     for(var i=0;i!=len;i++){
                                                          if(data[i].id)
                                                          txt += "<tr><td>"+data[i].id+"</td><td>"+data[i].name+"</td></tr>";
                                                     }
                                                     if(txt != ""){
                                                                   $('#listSemester').append(txt).removeClass("hidden");
                                                     }
                                           }
                                           else
                                           {
                                                alert("Null");
                                           }
               }

    });
    $("#btnInsertSem").click(function(){
        var sem=$("#txtSem").val();
                    if(sem=='')
                    {
                          $('#error_sem').slideDown();
                          $('#error_sem').html('Please provide valid semester');
                          status = 1;
                          return false;
                    }
                    else
                    {
                          $('#error_sem').slideUp();
                          status = 0;
                          var semData = {
                                          'id': len+1,
                                          'name': sem
                          };
                          var aJson = JSON.stringify(semData);
                          $.ajax({
                                                 type: "POST",
                                                 url: 'http://localhost:8080/semester/insert',
                                                  headers: {
                                                           "Content-Type": "application/json"
                                                  },
                                                  data:aJson,
                                                 success: function (data) {
                                                                  alert("Successfully Inserted");
                                                                  $("#txtSem").val('');
                                                                  $("#listSemester tr").remove();
                                                                  $.ajax({
                                                                                 type: "GET",
                                                                                 url: 'http://localhost:8080/semester/getAll',
                                                                                 success: function (data) {
                                                                                                             len = data.length;
                                                                                                             var txt = "";
                                                                                                             if(len > 0){
                                                                                                                       for(var i=0;i!=len;i++){
                                                                                                                            if(data[i].id)
                                                                                                                            txt += "<tr><td>"+data[i].id+"</td><td>"+data[i].name+"</td></tr>";
                                                                                                                       }
                                                                                                                       if(txt != ""){
                                                                                                                                     $('#listSemester').append(txt).removeClass("hidden");
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


        $('#listSemester').on( 'click', 'tr', function () {

                                        if ( $(this).hasClass('highlighted') )
             							{
             						        $(this).removeClass('highlighted');
             							}
             					        else
             							{
             								$('tr.highlighted').removeClass('highlighted');
             								$(this).addClass('highlighted');
             							}
             							var tableData = $(this).children("td").map(function() {
             														                return $(this).text();
             							}).get();
//                                        semVal=tableData[1];
                                        $("#txtSem").val(tableData[1])
                                        semId=tableData[0];
                                        $("#btnInsertSem").prop('disabled',true);
                                        $("#btnUpdateSem").prop('disabled',false);
                                        $("#btnDeleteSem").prop('disabled',false);

                            });

          $("#btnUpdateSem").click(function(){
                  var sem=$("#txtSem").val();
                              if(sem=='')
                              {
                                    $('#error_sem').slideDown();
                                    $('#error_sem').html('Please provide valid semester');
                                    status = 1;
                                    return false;
                              }
                              else
                              {
                                    $('#error_sem').slideUp();
                                    status = 0;
                                    var semData = {
                                                    'name': sem
                                    };
                                    var aJson = JSON.stringify(semData);
                                    $.ajax({
                                                           type: "POST",
                                                           url: 'http://localhost:8080/semester/update/'+semId,
                                                            headers: {
                                                                     "Content-Type": "application/json"
                                                            },
                                                            data:aJson,
                                                           success: function (data) {
                                                                            alert("Updation Successful");
                                                                            $("#txtSem").val('');
                                                                             $("#btnInsertSem").prop('disabled',false);
                                                                             $("#btnUpdateSem").prop('disabled',true);
                                                                             $("#btnDeleteSem").prop('disabled',true);
                                                                            $("#listSemester tr").remove();
                                                                            $.ajax({
                                                                                           type: "GET",
                                                                                           url: 'http://localhost:8080/semester/getAll',
                                                                                           success: function (data) {
                                                                                                                       len = data.length;
                                                                                                                       var txt = "";
                                                                                                                       if(len > 0){
                                                                                                                                 for(var i=0;i!=len;i++){
                                                                                                                                      if(data[i].id)
                                                                                                                                      txt += "<tr><td>"+data[i].id+"</td><td>"+data[i].name+"</td></tr>";
                                                                                                                                 }
                                                                                                                                 if(txt != ""){
                                                                                                                                               $('#listSemester').append(txt).removeClass("hidden");
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

          $("#btnDeleteSem").click(function(){
                $.ajax({
                           type: "POST",
                           url: 'http://localhost:8080/semester/delete/'+semId,
                           success: function (data) {
                                                        alert("Deletion Successful");
                                                        $("#txtSem").val('');
                                                        $("#btnInsertSem").prop('disabled',false);
                                                        $("#btnUpdateSem").prop('disabled',true);
                                                        $("#btnDeleteSem").prop('disabled',true);
                                                        $("#listSemester tr").remove();
                                                        $.ajax({
                                                                  type: "GET",
                                                                  url: 'http://localhost:8080/semester/getAll',
                                                                  success: function (data) {
                                                                                                 len = data.length;
                                                                                                 var txt = "";
                                                                                                 if(len > 0){
                                                                                                               for(var i=0;i!=len;i++){
                                                                                                                            if(data[i].id)
                                                                                                                                  txt += "<tr><td>"+data[i].id+"</td><td>"+data[i].name+"</td></tr>";
                                                                                                               }
                                                                                                               if(txt != ""){
                                                                                                                                  $('#listSemester').append(txt).removeClass("hidden");
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

          });

});