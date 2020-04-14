$(document).ready(function(){
    var studId;
    var receiver;
    var username;
    var teacherId;
    if(($.cookie("studId") != null) && ($.cookie("studName") != null) && ($.cookie("studSem") !=null) && ($.cookie("teacherName") !=null) && ($.cookie("teacherId") !=null)){
//                alert("iffff");
                studId =$.cookie("studId");
                var studName=$.cookie("studName");
                var studSem=$.cookie("studSem");
                 receiver=$.cookie("teacherName");
                receiver=$.cookie("teacherId");
                $("#studName").text(studName);
                username = studId;
                alert(username);
                connect();
    }
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
             alert("Error");
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
              alert("receved");
              if((message.receiver===username && message.sender===receiver)||(message.sender===username && message.receiver===receiver)){
                    var messageElement = document.createElement('li');
                    if(message.type === 'CHAT') {
                          alert("chat");
                          messageElement.classList.add('chat-message');
                          var avatarElement = document.createElement('i');
                          var avatarText = document.createTextNode(message.sender[0]);
                          avatarElement.appendChild(avatarText);
                          avatarElement.style['background-color'] = getAvatarColor(message.sender);
                          messageElement.appendChild(avatarElement);
                          var usernameElement = document.createElement('span');
                          var usernameText = document.createTextNode(message.sender);
                          usernameElement.appendChild(usernameText);
                          messageElement.appendChild(usernameElement);
                          var textElement = document.createElement('p');
                          var messageText = document.createTextNode(message.content);
                          textElement.appendChild(messageText);
                          messageElement.appendChild(textElement);
                          document.getElementById("messageArea").appendChild(messageElement);
                          document.getElementById("messageArea").scrollTop = document.getElementById("messageArea").scrollHeight;
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