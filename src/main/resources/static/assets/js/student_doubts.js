$(document).ready(function(){
    var studId;
    var receiver;
    var username;
    var teacherId;
    var studName;
    var teacherName;
    if(($.cookie("studId") != null) && ($.cookie("studName") != null) && ($.cookie("studSem") !=null) && ($.cookie("teacherName") !=null) && ($.cookie("teacherId") !=null)){
//                alert("iffff");
                studId =$.cookie("studId");
                studName=$.cookie("studName");
                teacherName=$.cookie("teacherName");
                var studSem=$.cookie("studSem");
                receiver=$.cookie("teacherId");
                $("#studName").text(studName);
                username = studId;
                alert(receiver);
                connect();
    }

    $("#studentLogout").click(function(){
                $.removeCookie('studId');
                $.removeCookie('studName');
                $.removeCookie('studSem');
                $.removeCookie('teacherName');
                $.removeCookie('teacherId');
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
             alert(messageContent);
             alert(receiver);
             if(messageContent && stompClient) {
                                 var chatMessage = {
                                             sender: username,
                                             content: messageContent,
                                             receiver:receiver,
                                             type: 'CHAT'
                                 };
                                 stompClient.send("/app/chat.send", {}, JSON.stringify(chatMessage));
                                 $('#message').val('');
             }
             event.preventDefault();
      });

         function onMessageReceived(payload) {
              var message = JSON.parse(payload.body);
              if((message.receiver===username && message.sender===receiver)||(message.sender===username && message.receiver===receiver)){
                                                                                         if(message.type === 'CHAT') {
                                                                                         var messageElement = document.createElement('li');
                                                                                               alert("chat");
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
                                                                                                                                      alert(sender);
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
                                                                                                                                      alert(sender);
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
    function getAvatarColor(messageSender) {
                var hash = 0;
                for (var i = 0; i < messageSender.length; i++) {
                                        hash = 31 * hash + messageSender.charCodeAt(i);
                }
                var index = Math.abs(hash % colors.length);
                return colors[index];
    }
});