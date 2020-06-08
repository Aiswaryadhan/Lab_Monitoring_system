$(document).ready(function(){
    var len;
    var studId;
    var receiver;
    var teacherId;
    var username;
    var studName;
    var teacherName;
    var req;
    var t1;
    var req1='';
    var requester;
    $('#mainDiv').addClass('hidden');

    if ($.cookie("id") != null && $.cookie("subject") != null) {
                teacherId =$.cookie("id");
                var sub= $.cookie("subject");
                $.ajax({
                           type: "POST",
                           url: 'http://localhost:8080/teacher/getName/'+teacherId,
                           success: function (data) {

                                        $("#teacher_name").text(data);
                                        teacherName=data;
                                        username = teacherId;
                                        connect();
                                        refresh();
                                        $.ajax({
                                                 type: "POST",
                                                 url: "http://localhost:8080/teacher/getAllStudId/"+sub,
                                                 success: function (data) {
                                                                                len = data.length;
                                                                                var i;
                                                                                var txt='';
                                                                                var txt1='';
                                                                                if(len > 0){
                                                                                            for(i=0;i<len;i++){
                                                                                            var arr=data[i].split(",");
                                                                                            sName=arr[1];
                                                                                            studId=arr[0];

                                                                                            txt += "<tr><td><button type=\"button\" name=\""+studId+"\" id=\"btnAccess"+studId+"\" disabled=\"disabled\" class=\"btn btn-primary btn-sm\">Remote Access</button></td><td>"+studId+"</td><td>"+sName+"</td></tr>";

                                                                                            var $section = $("<section></section>");
                                                                                            $section.attr("id",studId);
                                                                                            $section.attr("name",studId);
                                                                                            $section.attr("class","msger");
                                                                                            $("#mainDiv").append($section);
                                                                                            $('#'+studId).addClass('hidden');

                                                                                            var $header = $("<header></header>");
                                                                                            $header.attr("id","hdr"+studId);
                                                                                            $header.attr("class","msger-header");
                                                                                            $("#"+studId).append($header);

                                                                                            var $newDiv = $("<div></div>");
                                                                                            $newDiv.attr("id","div1"+studId);
                                                                                            $newDiv.attr("class","msger-header-title");
                                                                                            $("#hdr"+studId).append($newDiv);

                                                                                            var $newBtn = $("<input />");
                                                                                            $newBtn.attr("type","button");
                                                                                            $newBtn.attr("id","btnClose"+studId);
                                                                                            $newBtn.attr("value","close");
                                                                                            $newBtn.click(close);
                                                                                            $("#hdr"+studId).append($newBtn);

                                                                                            var $it = $("<i></i>");
                                                                                            $it.attr("id","it"+studId);
                                                                                            $it.attr("text",studId);
                                                                                            $("#div1"+studId).append($it);

                                                                                            var $main = $("<main></main");
                                                                                            $main.attr("id","main"+studId);
                                                                                            $main.attr("class","msger-chat");
                                                                                            $("#"+studId).append($main);

                                                                                            var $newList = $("<ul></ul>");
                                                                                            $newList.attr("id","messageArea"+studId);
                                                                                            $("#main"+studId).append($newList);
                                                                                            $newList.attr("style","list-style-type: none;background-color: #FFF;margin: 0;overflow: auto;overflow-y: scroll;padding: 0 20px 0px 20px;height: calc(100% - 10px)");

                                                                                            var $newForm = $("<form></form>");
                                                                                            $newForm.attr("id","messageForm"+studId);
                                                                                            $newForm.attr("class","msger-inputarea");
                                                                                            $("#"+studId).append($newForm);

                                                                                            var $text = $("<input />");
                                                                                            $text.attr("id","message"+studId);
                                                                                            $text.attr("type","text");
                                                                                            $text.attr("placeholder","Enter your message...");
                                                                                            $("#messageForm"+studId).append($text);

                                                                                            var $newBtn2 = $("<input />");
                                                                                            $newBtn2.attr("type","button");
                                                                                            $newBtn2.attr("id","btnSend"+studId);
                                                                                            $newBtn2.attr("value","Send");
                                                                                            $newBtn2.attr("class","msger-send-btn");
                                                                                            $newBtn2.click(send);
                                                                                            $("#messageForm"+studId).append($newBtn2);
                                                                                }
                                                                                if(txt != ""){
                                                                                    $('#onlineStud').append(txt);
                                                                                   }
                                                                                }
                                                 }//success of stud fetch
                                        });//end of stud ajax

                           }
                });

    }
    else{
                window.location.replace("http://localhost:8080/login");
         }
    $.ajax({
                                                    type : "POST",
                                                    url :'http://localhost:8080/teacher/getNotification/'+teacherId,
                                                    success:function(data){
                                                                                    len = data.length;
                                                                                    var i;
                                                                                    var txt='';
                                                                                                if(len > 0){
                                                                                                    for(i=0;i<len;i++){
                                                                                                    arr=data[i].split(',');
                                                                                                    req1=arr[0];
                                                                                                    $.ajax({
                                                                                                                 type: "POST",
                                                                                                                 url: 'http://localhost:8080/student/getName/'+req1,
                                                                                                                 success: function (data) {
                                                                                                                               requester=data;
                                                                                                                 }
                                                                                                    });
                                                                                                    t1=arr[1];
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
    var colors = [
         '#2196F3', '#32c787', '#00BCD4', '#ff5652',
         '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
    ];



    $('#onlineStud').on( 'click', 'tr', function () {
                                if ($(this).hasClass('highlighted') )
     							{
     						        $(this).removeClass('highlighted');
     							}
     					        else
     							{
     								$(this).addClass('highlighted');
     								var tableData = $(this).children("td").map(function() {
                                         			return $(this).text();
                                    }).get();
                                    receiver=tableData[1];
                                    alert(receiver);
                                    studId=tableData[1];
                                    if($("#"+studId).hasClass('hidden')){
                                        $("#"+studId).removeClass('hidden');
                                        studName=tableData[2];
                                        $('#mainDiv').removeClass('hidden');
                                        $("#"+studId).prop("disabled",false);
                                    }
                                    else{
                                        $('#'+studId).addClass('hidden');
                                    }

                                    $.ajax({
                                                                        type:"POST",
                                                                        url: 'http://localhost:8080/teacher/getMessages/'+studId+'/'+teacherId,
                                                                        success: function(data){
                                                                            len1=data.length;
                                                                            if(len1!=0){
                                                                                for(var i=0;i<len1;i++){
                                                                                     var sendr=data[i].sender;
                                                                                     var recevr=data[i].receiver;
                                                                                     var sender;
                                                                                     if((sendr).startsWith("fc")){
                                                                                                   var msg1=data[i].message;
                                                                                                     func(msg1);
                                                                                                     function func(msg1){
                                                                                                      $.ajax({
                                                                                                        type: "POST",
                                                                                                        url: 'http://localhost:8080/teacher/getName/'+sendr,
                                                                                                        success: function (data) {
                                                                                                                            sender=data;
                                                                                                                            alert(sender);
                                                                                                                            var messageElement = document.createElement('li');
                                                                                                                            messageElement.classList.add('chat-message');
                                                                                                                            var avatarElement = document.createElement('i');
                                                                                                                            avatarElement.setAttribute("class", "avtr");
                                                                                                                            var avatarText = document.createTextNode(sender[0]);
                                                                                                                            avatarElement.appendChild(avatarText);
                                                                                                                            avatarElement.style['background-color'] = getAvatarColor(sender);
                                                                                                                            messageElement.appendChild(avatarElement);
                                                                                                                            var usernameElement = document.createElement('span');
                                                                                                                            var usernameText = document.createTextNode(sender);
                                                                                                                            usernameElement.appendChild(usernameText);
                                                                                                                            messageElement.appendChild(usernameElement);
                                                                                                                            var textElement = document.createElement('p');

                                                                                                                            var messageText = document.createTextNode(msg1);
                                                                                                                            textElement.appendChild(messageText);
                                                                                                                            messageElement.appendChild(textElement);
                                                                                                                            document.getElementById("messageArea"+studId).appendChild(messageElement);
                                                                                                                            document.getElementById("messageArea"+studId).scrollTop = document.getElementById("messageArea"+studId).scrollHeight;

                                                                                                        }
                                                                                                      });
                                                                                                      }
                                                                                     }
                                                                                     else{
                                                                                     var msg2=data[i].message;
                                                                                      func1(msg2);
                                                                                      function func1(msg2){
                                                                                            $.ajax({
                                                                                                    type: "POST",
                                                                                                    url: 'http://localhost:8080/student/getName/'+sendr,
                                                                                                    success: function (data) {
                                                                                                    sender=data;
                                                                                                    alert(sender);
                                                                                                    var messageElement = document.createElement('li');
                                                                                                    messageElement.classList.add('chat-message');
                                                                                                    var avatarElement = document.createElement('i');
                                                                                                    avatarElement.setAttribute("class", "avtr");
                                                                                                    var avatarText = document.createTextNode(sender[0]);
                                                                                                    avatarElement.appendChild(avatarText);
                                                                                                    avatarElement.style['background-color'] = getAvatarColor(sender);
                                                                                                    messageElement.appendChild(avatarElement);
                                                                                                    var usernameElement = document.createElement('span');
                                                                                                    var usernameText = document.createTextNode(sender);
                                                                                                    usernameElement.appendChild(usernameText);
                                                                                                    messageElement.appendChild(usernameElement);
                                                                                                    var textElement = document.createElement('p');
                                                                                                    var messageText = document.createTextNode(msg2);

                                                                                                    textElement.appendChild(messageText);
                                                                                                    messageElement.appendChild(textElement);
                                                                                                    document.getElementById("messageArea"+studId).appendChild(messageElement);
                                                                                                    document.getElementById("messageArea"+studId).scrollTop = document.getElementById("messageArea"+studId).scrollHeight;

                                                                                                    }
                                                                                            });
                                                                                      }
                                                                                     }// close of sender check 'if'
                                                                                }// close of for
                                                                            }// close of length check 'if'
                                                                            else
                                                                            {
                                                                                return true;
                                                                            }
                                                                        }// close of success
                                                                    });
//                                    if ( $('#'+tableData[0]).hasClass('hidden') ){
//                                                        			 $('#'+tableData[0]).removeClass('hidden');
//                                    }
//                                    else{
//                                      		$('#'+tableData[0]).addClass('hidden');
//                                    }
     							}
    });

    function connect() {
                if(username) {
                                   var socket = new SockJS('/javatechie');
                                   stompClient = Stomp.over(socket);
                                   stompClient.connect({}, onConnected, onError);
                }
    }
    function onConnected() {
        // Subscribe to the Public Topic
        stompClient.subscribe('/queue/public', onMessageReceived);

        // Tell your username to the server
        stompClient.send("/app/chat.register",{},JSON.stringify({sender: username, type: 'JOIN'}))
    }
    function onError(error) {
        alert("Disconnected !..");
    }

    function access(){
                    if(stompClient) {

                                           var chatMessage = {
                                                       sender: username,
                                                       receiver:req,
                                                       type: 'RESPONSE'
                                           };
                                           stompClient.send("/app/chat.send", {}, JSON.stringify(chatMessage));
                                           var msgData = {
                                                         "sender":username,
                                                         "receiver": req,
                                                         "type":"response"
                                           };
                                           var aJson = JSON.stringify(msgData);
                                           $.ajax({
                                                                type: "POST",
                                                                url: 'http://localhost:8080/teacher/insertNotification',
                                                                 headers: {
                                                                          "Content-Type": "application/json"
                                                                 },
                                                                 data:aJson,
                                                                success: function (data) {

                                                                }
                                           });

                                           $('#message').val('');
                    }
                    $.ajax({
                                 url: 'http://localhost:8080/start',
                                 success: function (data) {

                                 }
                    });
    }

    $('#notificationList').on( 'click', 'li', function(){
           var n=$(this).attr('name');
           var ar1=$(this).text().split('@');
           var dt=ar1[1];
           req=n.substring(0, 7);
           var date1=dt.trim();
           $("#btnAccess"+n).attr("disabled", false);
           $("#btnAccess"+n).click(access);
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

    function close(){
                    $("#"+studId).prop("disabled",true);
                    $("#"+studId).addClass('hidden');
                    $('#mainDiv').addClass('hidden');
    }
    function onMessageReceived(payload) {
         var message = JSON.parse(payload.body);
         var id=message.sender;
         var txt="";
         var txt1="";
         var requester;
          if(message.type === 'REQUEST') {

                                            req=message.sender;
                                            $.ajax({
                                                     type: "POST",
                                                     url: 'http://localhost:8080/student/getName/'+message.sender,
                                                     success: function (data) {
                                                                              requester=data;
                                                                              $("#btnAccess"+message.sender).attr("disabled", false);
                                                                              $("#btnAccess"+message.sender).click(access);
                                                                              return $.growl.automator_green({
                                                                                                                 title: "Student Request",
                                                                                                                 message: " "+requester+" has requested for help..."
                                                                              });

                                                     }
                                            });

          }

          if(message.type === 'JOIN') {
                $("#onlineDot"+id).removeAttr("style");
          }
          if(message.type === 'CHAT') {
                        if((message.sender).startsWith("fc")){
                          return true;
                        }
                        else{
                            receiver=message.sender;
                        }
                        if((message.receiver===username && message.sender===receiver)||(message.sender===username && message.receiver===receiver)){
                                                                                 var messageElement = document.createElement('li');
                                                                                 messageElement.classList.add('chat-message');
                                                                                 var avatarElement = document.createElement('i');
                                                                                 avatarElement.setAttribute("class", "avtr");
                                                                                 var sender;
                                                                                 if((message.sender).startsWith("fc")){
                                                                                    $.ajax({
                                                                                            type: "POST",
                                                                                            url: 'http://localhost:8080/teacher/getName/'+message.sender,
                                                                                            success: function (data) {
                                                                                                            sender=data;
                                                                                                            var avatarText = document.createTextNode(sender[0]);
                                                                                                            avatarElement.appendChild(avatarText);
                                                                                                            avatarElement.style['background-color'] = getAvatarColor(sender);
                                                                                                            messageElement.appendChild(avatarElement);
                                                                                                            var usernameElement = document.createElement('span');
                                                                                                            var usernameText = document.createTextNode(sender);
                                                                                                            usernameElement.appendChild(usernameText);
                                                                                                            messageElement.appendChild(usernameElement);
                                                                                                            var textElement = document.createElement('p');
                                                                                                            var messageText = document.createTextNode(message.content);
                                                                                                            textElement.appendChild(messageText);
                                                                                                            messageElement.appendChild(textElement);
                                                                                                            document.getElementById("messageArea"+studId).appendChild(messageElement);
                                                                                                            document.getElementById("messageArea"+studId).scrollTop = document.getElementById("messageArea"+studId).scrollHeight;

                                                                                            }
                                                                                    });
                                                                                 }
                                                                                 else{
                                                                                    $.ajax({
                                                                                           type: "POST",
                                                                                           url: 'http://localhost:8080/student/getName/'+message.sender,
                                                                                           success: function (data) {
                                                                                                      sender=data;
                                                                                             var avatarText = document.createTextNode(sender[0]);
                                                                                             avatarElement.appendChild(avatarText);
                                                                                             avatarElement.style['background-color'] = getAvatarColor(sender);
                                                                                             messageElement.appendChild(avatarElement);
                                                                                             var usernameElement = document.createElement('span');
                                                                                             var usernameText = document.createTextNode(sender);
                                                                                             usernameElement.appendChild(usernameText);
                                                                                             messageElement.appendChild(usernameElement);
                                                                                             var textElement = document.createElement('p');
                                                                                             var messageText = document.createTextNode(message.content);
                                                                                             textElement.appendChild(messageText);
                                                                                             messageElement.appendChild(textElement);
                                                                                             document.getElementById("messageArea"+studId).appendChild(messageElement);
                                                                                             document.getElementById("messageArea"+studId).scrollTop = document.getElementById("messageArea"+studId).scrollHeight;

                                                                                           }
                                                                                    });
                                                                                 }
                        }

          }
    }
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
                                                                                                             $.ajax({
                                                                                                                           type: "POST",
                                                                                                                           url: 'http://localhost:8080/student/getName/'+message.sender,
                                                                                                                           success: function (data) {
                                                                                                                                                        requester=data;
                                                                                                                           }
                                                                                                             });
                                                                                                             t1=arr[1];
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
    function send(){
        var messageContent = $('#message'+studId).val();
        if(messageContent && stompClient) {
                            var chatMessage = {
                                        sender: username,
                                        content: messageContent,
                                        receiver:studId,
                                        type: 'CHAT'
                            };
                            stompClient.send("/app/chat.send", {}, JSON.stringify(chatMessage));
                            var msgData = {
                                          'sender':username,
                                          'receiver': studId,
                                          'message':messageContent
                            };
                            var aJson = JSON.stringify(msgData);
                            $.ajax({
                                                 type: "POST",
                                                 url: 'http://localhost:8080/teacher/insertMessage',
                                                  headers: {
                                                           "Content-Type": "application/json"
                                                  },
                                                  data:aJson,
                                                 success: function (data) {

                                                 }
                            });

                            $('#message'+studId).val('');
        }
        event.preventDefault();
    }
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
                                                                                                             $.ajax({
                                                                                                                        type: "POST",
                                                                                                                        url: 'http://localhost:8080/student/getName/'+req1,
                                                                                                                        success: function (data) {
                                                                                                                                                      requester=data;
                                                                                                                        }
                                                                                                             });
                                                                                                             t1=arr[1];
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
    function getAvatarColor(messageSender) {
                var hash = 0;
                for (var i = 0; i < messageSender.length; i++) {
                                        hash = 31 * hash + messageSender.charCodeAt(i);
                }
                var index = Math.abs(hash % colors.length);
                return colors[index];
    }
});