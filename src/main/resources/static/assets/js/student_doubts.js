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
                $.ajax({
                        type:"POST",
                        url: 'http://192.168.42.215:8080/teacher/getMessages/'+studId+'/'+receiver,
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
                                                                                       url: 'http://192.168.42.215:8080/teacher/getName/'+sendr,
                                                                                       success: function (data){
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
                                                                                                            document.getElementById("messageArea").appendChild(messageElement);
                                                                                                            document.getElementById("messageArea").scrollTop = document.getElementById("messageArea").scrollHeight;
                                                                                       }
                                                                              });
                                                                             }
                                                            }
                                                            else{
                                                                   var msg2=data[i].message;
                                                                   alert(msg2);
                                                                   func1(msg2);
                                                                   function func1(msg2){
                                                                                   $.ajax({
                                                                                           type: "POST",
                                                                                           url: 'http://192.168.42.215:8080/student/getName/'+sendr,
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

    $("#studentLogout").click(function(){
                $.removeCookie('studId');
                $.removeCookie('studName');
                $.removeCookie('studSem');
                $.removeCookie('teacherName');
                $.removeCookie('teacherId');
                $.ajax({
                                         type: "POST",

                                         url: 'http://192.168.42.215:8080/loggedStudent/delete/'+studId,

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
                                           var msgData = {
                                                         "sender":username,
                                                         "receiver": receiver,
                                                         "message":messageContent
                                           };
                                           var aJson = JSON.stringify(msgData);
                                           $.ajax({
                                                                type: "POST",
                                                                url: 'http://192.168.42.215:8080/teacher/insertMessage',
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
                                                                                                           url: 'http://192.168.42.202:8080/teacher/getName/'+message.sender,
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
                                                                                                            url: 'http://192.168.42.202:8080/student/getName/'+message.sender,
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