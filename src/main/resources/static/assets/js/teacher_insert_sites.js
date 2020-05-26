$(document).ready(function(){
    var len;
    var subId;
    var teacherId;
    if ($.cookie("id") != null && $.cookie("subject") != null) {
                    teacherId =$.cookie("id");
                    subId= $.cookie("subject");
                    $.ajax({
                               type: "POST",
                               url: 'http://localhost:8080/teacher/getName/'+teacherId,
                               success: function (data) {

                                            $("#teacher_name").text(data);
                               }
                    });

    }
    $.ajax({
                                                        type : "POST",
                                                        url :'http://localhost:8080/teacher/getNotification/'+teacherId,
                                                        success:function(data){
                                                                                        len = data.length;
                                                                                        var i;
                                                                                        var txt='';
                                                                                        var req1='';

                                                                                        if(len > 0){
                                                                                                        for(i=0;i<len;i++){
                                                                                                        req1=data[i];
                                                                                                        txt += "<li><a href=\"#\" class=\"notification-item\"><span class=\"dot bg-warning\"></span>"+req1+" has asked for help</a></li>";
                                                                                                    }
                                                                                                    if(txt!=''){
                                                                                                        $("#notificationList").append(txt);
                                                                                                    }
                                                                                        }
                                                        }
        });
        $.ajax({
                                                        type:'POST',
                                                        url:'http://localhost:8080/teacher/getNotificationCount/'+teacherId,
                                                        success:function(data){
                                                            $("#numNotifications").text(data);
                                                        }
        });
     $("#teacherLogout").click(function(){
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
    $("#btnDeleteSite").prop('disabled',true);
    $("#txtSite").blur(function(){
                    var site = $('#txtSite').val();
//                    alert(site);
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
               url: 'http://localhost:8080/teacher/getAllSites/'+subId,
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
                                                $("tblSites").hide();
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
                                          'sub_id':subId,
                                          'url': site
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
                                                                                 url: 'http://localhost:8080/teacher/getAllSites/'+subId,
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
                                                                                                                  $("tblSites").hide();
                                                                                                             }
                                                                                 }

                                                                  });
                                                 }

                          });

                    }
        });


        $('#listSites').on( 'click', 'tr', function () {

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
                                        $("#txtSite").val(tableData[1]);
                                         $("#txtSite").prop('disabled',true);
                                        $("#btnInsertSite").prop('disabled',true);
                                        $("#btnDeleteSite").prop('disabled',false);

                            });

          $("#btnDeleteSite").click(function(){

          var site=$("#txtSite").val();
          var siteData = {
                           'sub_id':subId,
                           'url': site
          };
          var aJson = JSON.stringify(siteData);
                $.ajax({
                           type: "POST",
                           url: 'http://localhost:8080/teacher/deleteSite',
                           headers: {
                                    "Content-Type": "application/json"
                           },
                           data:aJson,
                           success: function (data) {
                                                        alert("Deletion Successful");
                                                        $("#txtSite").val('');
                                                        $("#txtSite").prop('disabled',false);
                                                        $("#btnInsertSite").prop('disabled',false);
                                                        $("#btnDeleteSite").prop('disabled',true);
                                                        $("#listSites tr").remove();
                                                        var siteData = {
                                                                    'sub_id':subId,
                                                                    'url': site
                                                        };
                                                        var aJson = JSON.stringify(siteData);
                                                        $.ajax({
                                                                  type: "GET",
                                                                  url: 'http://localhost:8080/teacher/getAllSites/'+subId,
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
                                                                                                       alert("Empty List")
                                                                                                }
                                                                  }
                                                        });
                           }
                });

          });

});