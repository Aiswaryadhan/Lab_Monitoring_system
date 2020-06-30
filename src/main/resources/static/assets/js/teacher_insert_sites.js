$(document).ready(function(){
    var len;
    var subId;
    var teacherId;
    var requester;
    if ($.cookie("id") != null && $.cookie("subject") != null) {
                    teacherId =$.cookie("id");
                    subId= $.cookie("subject");
                    $.ajax({
                               type: "POST",
                               url: 'http://localhost:8080/teacher/getName/'+teacherId,
                               success: function (data) {

                                            $("#teacher_name").text(data);
                                            refresh();
                               }
                    });

    }
    else{
                window.location.replace("http://localhost:8080/login");
         }

     $("#teacherLogout").click(function(){
            $.removeCookie('id');
            $.removeCookie('subject');
            $.ajax({
                                     type: "POST",
                                     url: 'http://localhost:8080/loggedStudent/delete',
                                     success: function (data) {

                                     }
            });
            $.ajax({
                                                     type: "POST",
                                                     url: 'http://localhost:8080/notifications/delete',
                                                     success: function (data) {

                                                     }
            });
            $.ajax({
                                                             type: "POST",
                                                             url: 'http://localhost:8080/messages/delete',
                                                             success: function (data) {

                                                             }
            });
     });
    $.ajax({
                                                                          type : "POST",
                                                                          url :'http://localhost:8080/teacher/getNotification/'+teacherId,
                                                                          success:function(data){
                                                                                  len = data.length;
                                                                                  var i;
                                                                                  var txt='';
                                                                                  $("#notificationList li").remove();
                                                                                  if(len > 0){
                                                                                       for(i=0;i<len;i++){
                                                                                            arr=data[i].split(',');
                                                                                            req1=arr[0];
                                                                                            requester=arr[1]
                                                                                            t1=arr[2];
                                                                                            txt += "<li name=\""+req1+"\"><a href=\"#\" class=\"notification-item\"><span class=\"dot bg-warning\"></span>"+requester+" has asked for help </a><p class=\"timestamp\">Date & Time @ " +t1+"</p></li>";
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
    $("#btnInsertSite").prop('disabled',false);
    $("#btnDeleteSite").prop('disabled',true);
    $("#txtSite").blur(function(){
                    var site =jQuery.trim($('#txtSite').val());
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

$("#txtStudId").keypress(function (e) {
                var keyCode = e.keyCode || e.which;

                //Regex for Valid Characters i.e. Alphabets and Numbers.
                var regex =/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;

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
        if(site==''){
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
                                        if ( $(this).hasClass('highlighted') ){
             						        $(this).removeClass('highlighted');
             							}
             					        else{
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
    function refresh(){
                setTimeout(function(){
                 $.ajax({
                                                                     type : "POST",
                                                                     url :'http://localhost:8080/teacher/getNotification/'+teacherId,
                                                                     success:function(data){
                                                                             len = data.length;
                                                                             var i;
                                                                             var txt='';
                                                                             $("#notificationList li").remove();
                                                                             if(len > 0){
                                                                                  for(i=0;i<len;i++){
                                                                                       arr=data[i].split(',');
                                                                                       req1=arr[0];
                                                                                       requester=arr[1]
                                                                                       t1=arr[2];
                                                                                       txt += "<li name=\""+req1+"\"><a href=\"#\" class=\"notification-item\"><span class=\"dot bg-warning\"></span>"+requester+" has asked for help </a><p class=\"timestamp\">Date & Time @ " +t1+"</p></li>";
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
                 refresh();
                 },5000);
    }
    $('#notificationList').on( 'click', 'li', function(){
               var n=$(this).attr('name');
               var ar1=$(this).text().split('@');
               var dt=ar1[1];
               var date1=dt.trim();
               $.ajax({
                                                url: 'http://localhost:8080/teacher/updateNotification/'+date1,
                                                success: function (data) {
                                                    $.ajax({
                                                        type:'POST',
                                                        url:'http://localhost:8080/teacher/getNotificationCount/'+teacherId,
                                                        success:function(data){
                                                            $("#numNotifications").text(data);
                                                        }
                                                    });
                                                }
               });

        });
});