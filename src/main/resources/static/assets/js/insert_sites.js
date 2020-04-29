$(document).ready(function(){
    var len;
    var semId;
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
    $("#btnInsertSite").prop('disabled',false);
    $("#btnUpdateSite").prop('disabled',true);
    $("#btnDeleteSite").prop('disabled',true);
    $("#txtSite").blur(function(){
                    var site = $('#txtSite').val();
                    if(site=='')
                    {
                          $('#error_site').slideDown();
                          $('#error_site').html('Please provide valid url');
                    }
                    else
                    {
                          $('#error_site').slideUp();
                    }
    });


    $.ajax({
               type: "GET",
               url: 'http://localhost:8080/teacher/getAllSites',
               success: function (data) {
                                           len = data.length;
                                           var txt = "";
                                           if(len > 0){
                                                     for(var i=0;i!=len;i++){

                                                          txt += "<tr><td>"+(i+1)+"</td><td>"+data[i]+"</td></tr>";
                                                     }
                                                     if(txt != ""){
                                                                   $('#listSites').append(txt).removeClass("hidden");
                                                     }
                                           }
                                           else
                                           {
                                                alert("Null");
                                           }
               }

    });
    $("#btnInsertSite").click(function(){
        var site=$("#txtSite").val();
                    if(site=='')
                    {
                          $('#error_site').slideDown();
                          $('#error_site').html('Please provide valid url');
                    }
                    else
                    {
                          $('#error_site').slideUp();
                          status = 0;
                          var siteData = {
                                          'name': site
                          };
                          var aJson = JSON.stringify(siteData);
                          $.ajax({
                                                 type: "POST",
                                                 url: 'http://localhost:8080/teacher/insertSite',
                                                  headers: {
                                                           "Content-Type": "application/json"
                                                  },
                                                  data:aJson,
                                                 success: function (data) {
                                                                  alert("Successfully Inserted");
                                                                  $("#txtSite").val('');
                                                                  $("#listSites tr").remove();
                                                                  $.ajax({
                                                                                 type: "GET",
                                                                                 url: 'http://localhost:8080/teacher/getAllSites',
                                                                                 success: function (data) {
                                                                                                             len = data.length;
                                                                                                             var txt = "";
                                                                                                             if(len > 0){
                                                                                                                       for(var i=0;i!=len;i++){
                                                                                                                            txt += "<tr><td>"+(i+1)+"</td><td>"+data[i]+"</td></tr>";
                                                                                                                       }
                                                                                                                       if(txt != ""){
                                                                                                                                     $('#listSites').append(txt).removeClass("hidden");
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


//        $('#listSemester').on( 'click', 'tr', function () {
//
//                                        if ( $(this).hasClass('highlighted') )
//             							{
//             						        $(this).removeClass('highlighted');
//             							}
//             					        else
//             							{
//             								$('tr.highlighted').removeClass('highlighted');
//             								$(this).addClass('highlighted');
//             							}
//             							var tableData = $(this).children("td").map(function() {
//             														                return $(this).text();
//             							}).get();
////                                        semVal=tableData[1];
//                                        $("#txtSem").val(tableData[1]);
//                                        semId=tableData[0];
//                                        $("#btnInsertSem").prop('disabled',true);
//                                        $("#btnUpdateSem").prop('disabled',false);
//                                        $("#btnDeleteSem").prop('disabled',false);
//
//                            });
//
//          $("#btnUpdateSem").click(function(){
//                  var sem=$("#txtSem").val();
//                              if(sem=='')
//                              {
//                                    $('#error_sem').slideDown();
//                                    $('#error_sem').html('Please provide valid semester');
//                              }
//                              else
//                              {
//                                    $('#error_sem').slideUp();
//                                    status = 0;
//                                    var semData = {
//                                                    'name': sem
//                                    };
//                                    var aJson = JSON.stringify(semData);
//                                    $.ajax({
//                                                           type: "POST",
//                                                           url: 'http://localhost:8080/semester/update/'+semId,
//                                                            headers: {
//                                                                     "Content-Type": "application/json"
//                                                            },
//                                                            data:aJson,
//                                                           success: function (data) {
//                                                                            alert("Updation Successful");
//                                                                            $("#txtSem").val('');
//                                                                             $("#btnInsertSem").prop('disabled',false);
//                                                                             $("#btnUpdateSem").prop('disabled',true);
//                                                                             $("#btnDeleteSem").prop('disabled',true);
//                                                                            $("#listSemester tr").remove();
//                                                                            $.ajax({
//                                                                                           type: "GET",
//                                                                                           url: 'http://localhost:8080/semester/getAll',
//                                                                                           success: function (data) {
//                                                                                                                       len = data.length;
//                                                                                                                       var txt = "";
//                                                                                                                       if(len > 0){
//                                                                                                                                 for(var i=0;i!=len;i++){
//                                                                                                                                      if(data[i].id)
//                                                                                                                                      txt += "<tr><td>"+data[i].id+"</td><td>"+data[i].name+"</td></tr>";
//                                                                                                                                 }
//                                                                                                                                 if(txt != ""){
//                                                                                                                                               $('#listSemester').append(txt).removeClass("hidden");
//                                                                                                                                 }
//                                                                                                                       }
//                                                                                                                       else
//                                                                                                                       {
//                                                                                                                            alert("Null");
//                                                                                                                       }
//                                                                                           }
//
//                                                                            });
//                                                           }
//
//                                    });
//
//                              }
//                  });
//
//          $("#btnDeleteSem").click(function(){
//                $.ajax({
//                           type: "POST",
//                           url: 'http://localhost:8080/semester/delete/'+semId,
//                           success: function (data) {
//                                                        alert("Deletion Successful");
//                                                        $("#txtSem").val('');
//                                                        $("#btnInsertSem").prop('disabled',false);
//                                                        $("#btnUpdateSem").prop('disabled',true);
//                                                        $("#btnDeleteSem").prop('disabled',true);
//                                                        $("#listSemester tr").remove();
//                                                        $.ajax({
//                                                                  type: "GET",
//                                                                  url: 'http://localhost:8080/semester/getAll',
//                                                                  success: function (data) {
//                                                                                                 len = data.length;
//                                                                                                 var txt = "";
//                                                                                                 if(len > 0){
//                                                                                                               for(var i=0;i!=len;i++){
//                                                                                                                            if(data[i].id)
//                                                                                                                                  txt += "<tr><td>"+data[i].id+"</td><td>"+data[i].name+"</td></tr>";
//                                                                                                               }
//                                                                                                               if(txt != ""){
//                                                                                                                                  $('#listSemester').append(txt).removeClass("hidden");
//                                                                                                               }
//                                                                                                 }
//                                                                                                 else
//                                                                                                 {
//                                                                                                        alert("Null");
//                                                                                                 }
//                                                                  }
//                                                        });
//                           }
//                });
//
//          });

});