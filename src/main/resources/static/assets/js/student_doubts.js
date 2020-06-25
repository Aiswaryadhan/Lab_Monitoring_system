$(document).ready(function(){
    var studId;
    var receiver;
    var username;
    var teacherId;
    var studName;
    var teacherName;
    var tcr;
    var tName;
    var t1;
    if(($.cookie("studId") != null) && ($.cookie("studName") != null) && ($.cookie("studSem") !=null) && ($.cookie("teacherName") !=null) && ($.cookie("teacherId") !=null)){
                studId =$.cookie("studId");
                studName=$.cookie("studName");
                teacherName=$.cookie("teacherName");
                var studSem=$.cookie("studSem");
                receiver=$.cookie("teacherId");
                $("#studName").text(studName);
                username = studId;
                connect();
                refresh();
                $.ajax({
                        type:"POST",
                        url: 'http://localhost:8080/teacher/getMessages/'+studId+'/'+receiver,
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
                                                                                       success: function (data){
                                                                                                            sender=data;
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
                                                                                                            document.getElementById("messageArea").appendChild(messageElement);
                                                                                                            document.getElementById("messageArea").scrollTop = document.getElementById("messageArea").scrollHeight;
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
                                                                                                                        document.getElementById("messageArea").appendChild(messageElement);
                                                                                                                        document.getElementById("messageArea").scrollTop = document.getElementById("messageArea").scrollHeight;
                                                                                           }
                                                                                   });
                                                                   }
                                                            }// close of sender check 'if'
                                                        }// close of for
                                                   }// close of length check 'if'
                        }// close of success

                });
    }
    else{
                window.location.replace("http://localhost:8080/student_login");
         }
    $.ajax({
                                                             type : "POST",
                                                             url :'http://localhost:8080/student/getNotification/'+studId,
                                                             success:function(data){
                                                                                             len = data.length;
                                                                                             var i;
                                                                                             var txt='';
                                                                                                         if(len > 0){
                                                                                                             for(i=0;i<len;i++){
                                                                                                             arr=data[i].split(',');
                                                                                                             res1=arr[0];
                                                                                                             t1=arr[1];
                                                                                                             txt += "<li name=\""+res1+"\"><a href=\"#\" class=\"notification-item\"><span class=\"dot bg-warning\"></span>"+res1+" is ready. Please start sharing your screen.</a><p class=\"timestamp\">Date & Time" +t1+"</p></li>";
                                                                                                         }
                                                                                                         if(txt!=''){
                                                                                                             $("#notificationList").append(txt);
                                                                                                         }
                                                                                             }
                                                             }
    });
    $.ajax({
                                                             type:'POST',
                                                             url:'http://localhost:8080/student/getNotificationCount/'+studId,
                                                             success:function(data){
                                                                 $("#numNotifications").text(data);
                                                             }
    });
    $("#studentLogout").click(function(){
                $.removeCookie('studId');
                $.removeCookie('studName');
                $.removeCookie('studSem');
                document.cookie ="_instance=true;expires=Thu, 1970-01-01 00:00:01 GMT";
                $.ajax({
                                         url: 'http://localhost:8090/sitesUnblock',
                                         success: function (data) {
                                         }
                                });
                $.ajax({
                                                         type: "POST",

                                                         url: 'http://localhost:8090/stop',

                                                         success: function (data) {

                                                         }
                });
                $.ajax({
                                         type: "POST",

                                         url: 'http://localhost:8080/loggedStudent/delete/'+studId,

                                         success: function (data) {

                                         }
                });
    });
    'use strict';
    var stompClient;

    var colors = [
             '#2196F3', '#32c787', '#00BCD4', '#ff5652',
             '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
    ];

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
             alert("Teacher disconnected!..");
     }
      $('#btnSend').click(function(){
             var messageContent = $('#message').val();
             if(messageContent && stompClient) {
                                           var chatMessage = {
                                                       sender: username,
                                                       content: messageContent,
                                                       receiver:receiver,
                                                       type: 'CHAT'
                                           };
                                           stompClient.send("/app/chat.send", {}, JSON.stringify(chatMessage));
                                           var msgData = {
                                                         "sender":username,
                                                         "receiver": receiver,
                                                         "message":messageContent
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

                                           $('#message').val('');
                       }
             event.preventDefault();
      });

     $('#btnRequest').click(function(){
             if(stompClient) {
                                           var chatMessage = {
                                                       sender: username,
                                                       receiver:receiver,
                                                       type: 'REQUEST'
                                           };
                                           stompClient.send("/app/chat.send", {}, JSON.stringify(chatMessage));
                                           var msgData = {
                                                         "sender":username,
                                                         "receiver": receiver,
                                                         "type":"request"
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
             event.preventDefault();
     });
     function shareScreen(){
                    $.ajax({
                                       url: 'http://localhost:8090/start',
                                       success: function (data) {
                                            $("#btnStart").attr("disabled", true);
                                       }
                    });
     }
     function onMessageReceived(payload) {
              var message = JSON.parse(payload.body);
              if(message.type === 'RESPONSE') {
                                                          tcr=message.sender;
                                                          $.ajax({
                                                                   type: "POST",
                                                                   url: 'http://localhost:8080/teacher/getName/'+message.sender,
                                                                   success: function (data) {
                                                                                            tName=data;
                                                                                            $("#btnStart").attr("disabled", false);
                                                                                            $("#btnStart").click(shareScreen);
                                                                                            return $.growl.automator_green({
                                                                                                                               title: "Share your screen",
                                                                                                                               message: " "+tName+" is Ready Now.."
                                                                                            });
                                                                                            refresh();

                                                                   }
                                                          });

              }
             if(message.type === 'CHAT') {
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
                                                                                                                                      document.getElementById("messageArea").appendChild(messageElement);
                                                                                                                                      document.getElementById("messageArea").scrollTop = document.getElementById("messageArea").scrollHeight;
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
                                                                                                                                      document.getElementById("messageArea").appendChild(messageElement);
                                                                                                                                      document.getElementById("messageArea").scrollTop = document.getElementById("messageArea").scrollHeight;
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
                                                                                  url :'http://localhost:8080/student/getNotification/'+studId,
                                                                                  success:function(data){
                                                                                          len = data.length;
                                                                                          var i;
                                                                                          var txt='';
                                                                                          $("#notificationList li").remove();
                                                                                          if(len > 0){
                                                                                                          for(i=0;i<len;i++){
                                                                                                              arr=data[i].split(',');
                                                                                                              req1=arr[0];
                                                                                                              t1=arr[1];
                                                                                                              txt += "<li name=\""+req1+"\"><a href=\"#\" class=\"notification-item\"><span class=\"dot bg-warning\"></span>"+req1+" is ready for screen sharing </a><p class=\"timestamp\">Date & Time" +t1+"</p></li>";
                                                                                                          }
                                                                                                          if(txt!=''){
                                                                                                              $("#notificationList").append(txt);
                                                                                                          }
                                                                                          }
                                                                                  }
                              });
                              $.ajax({
                                                                                  type:'POST',
                                                                                  url:'http://localhost:8080/student/getNotificationCount/'+studId,
                                                                                  success:function(data){
                                                                                      $("#numNotifications").text(data);
                                                                                  }
                              });
                              refresh();
                              },5000);
     }
     $('#notificationList').on( 'click', 'li', function(){
               $("#btnStart").attr("disabled", false);
               $("#btnStart").click(shareScreen);
               $.ajax({
                                                url: 'http://localhost:8080/student/updateNotification/'+t1,
                                                success: function (data) {
                                                    $.ajax({
                                                        type:'POST',
                                                        url:'http://localhost:8080/student/getNotificationCount/'+studId,
                                                        success:function(data){
                                                            $("#numNotifications").text(data);
                                                        }
                                                    });
                                                }
               });

     });
    function getAvatarColor(messageSender) {
                var hash = 0;
                for (var i = 0; i < messageSender.length; i++) {
                                        hash = 31 * hash + messageSender.charCodeAt(i);
                }
                var index = Math.abs(hash % colors.length);
                return colors[index];
    }
});