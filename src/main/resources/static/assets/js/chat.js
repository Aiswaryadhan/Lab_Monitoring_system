$(document).ready(function(){
    var len;
    var studId;
    var receiver;
    var teacherId;
    var username;
    if ($.cookie("id") != null && $.cookie("subject") != null) {
                teacherId =$.cookie("id");
                var sub= $.cookie("subject");
                $.ajax({
                           type: "POST",
                           url: 'http://localhost:8080/teacher/getName/'+teacherId,
                           success: function (data) {

                                        $("#teacher_name").text(data);
                                        $("#receiverName").text(data);
                                        username = teacherId;
                                        connect();
                           }
                });

    }

     'use strict';
//     var receiver = null;
//     var stompClient = null;
//     var username = null;

     var colors = [
         '#2196F3', '#32c787', '#00BCD4', '#ff5652',
         '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
     ];



    $('#onlineStud').on( 'click', 'tr', function () {
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
     							receiver=tableData[0];
                               var studName=tableData[1];
                                $("#"+studId).show();
                                $("#msgDiv"+studId).show();
                                $("#btnSend"+studId).attr('disabled',false);
     							 if ( $('#'+studId).hasClass('hidden') ){
                                     			 $('#'+studId).removeClass('hidden');
                                 }
                                 else{
//                                     		$('#'+studId+'.hidden').removeClass('hidden');
                                     		$('#'+studId).addClass('hidden');
                                 }



    });

    function connect() {
                if(username) {
//                                   usernamePage.classList.add('hidden');
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


    function send(){
        var messageContent = $('#message'+studId).val();
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
                            $('#message'+studId).val('');
        }
        event.preventDefault();
    }

    function close(){
                    $("#"+studId).hide();
                    $("#msgDiv"+studId).hide();
//                    $("#btnSend"+studId).attr('disabled',true);
                     if ( $(this).hasClass('highlighted') ){
                         	$(this).removeClass('highlighted');
                     }
                     else{
                         	$('tr.highlighted').removeClass('highlighted');
                         	$(this).addClass('highlighted');
                     }

    }
    function onMessageReceived(payload) {
            var message = JSON.parse(payload.body);
            if(message.type === 'JOIN') {
            $("#onlineStud tr").remove();
                    $.ajax({
                           type: "POST",
                           url: 'http://localhost:8080/teacher/getStudName',
                           success: function (data) {
                                            len = data.length;
                                            var txt = "";
                                            if(len > 0){
                                                     for(var i=0;i!=len;i++){
                                                                var arr=data[i].split(",");
                                                                studId=arr[0];
                                                                var name=arr[1];
                                                                txt += "<tr><td>"+arr[0]+"</td><td>"+arr[1]+"</td></tr>";
                                                                var $containerDiv = $("<div></div>");
                                                                $containerDiv.attr("id",studId);
                                                                $(".contents").append($containerDiv);
                                                                $("#"+studId).attr("class","hidden");

                                                                var $newDiv = $("<div></div>");
                                                                $newDiv.attr("id","msgDiv"+studId);

                                                                $newDiv.attr("style","height: 500px;width:500px;border: 1px solid black");
                                                                $("#"+studId).append($newDiv);

                                                                var $newBtn = $("<input />");
                                                                $newBtn.attr("type","button");
                                                                $newBtn.attr("id","btnClose"+studId);
                                                                $newBtn.attr("value","close");
                                                                $newBtn.click(close);
                                                                $("#msgDiv"+studId).append($newBtn);

                                                                var $newSpan = $("<input />");
                                                                $newSpan.attr("id","span"+studId);
                                                                $newSpan.attr("value",name);
                                                                $newSpan.attr("style","background-color:#00bfff");
                                                                $("#msgDiv"+studId).append($newSpan);

                                                                var $newList = $("<ul></ul>");
                                                                $newList.attr("id","messageArea"+studId);
                                                                $("#msgDiv"+studId).append($newList);
                                                                $newList.attr("style","list-style-type: none;background-color: #FFF;margin: 0;overflow: auto;overflow-y: scroll;padding: 0 20px 0px 20px;height: calc(100% - 150px)");

                                                                var $newForm = $("<form></form>");
                                                                $newForm.attr("id","messageForm"+studId);
                                                                $newForm.attr("name","messageForm");
                                                                $newForm.attr("nameForm","messageForm");
                                                                $("#msgDiv"+studId).append($newForm);

                                                                var $newDiv1 = $("<div></div>");
                                                                $newDiv1.attr("class","form-group");
                                                                $newDiv1.attr("id","newDiv1"+studId);
                                                                $("#msgDiv"+studId).append($newDiv1);

                                                                var $newDiv2 = $("<div></div>");
                                                                $newDiv2.attr("class","input-group");
                                                                $newDiv2.attr("id","newDiv2"+studId);
                                                                $("#msgDiv"+studId).append($newDiv2);

                                                                var $text = $("<textarea></textarea>");
                                                                $text.attr("id","message"+studId);
                                                                $text.attr("placeholder","type message...");
                                                                $text.attr("class","form-control");
                                                                $("#msgDiv"+studId).append($text);

                                                                var $newBtn2 = $("<input />");
                                                                $newBtn2.attr("type","button");
                                                                $newBtn2.attr("id","btnSend"+studId);
                                                                $newBtn2.attr("value","Send");
                                                                $newBtn2.attr("class","primary");
                                                                $newBtn2.click(send);
                                                                $("#msgDiv"+studId).append($newBtn2);
                                                                $("#btnSend"+studId).attr('disabled',true);



                                                     }
                                                     if(txt != ""){
                                                            $('#listStud').append(txt).removeClass("hidden");
                                                     }
                                            }
                           }
                    });
            }
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
                                                                        document.getElementById("messageArea"+studId).appendChild(messageElement);
                                                                        document.getElementById("messageArea"+studId).scrollTop = document.getElementById("messageArea"+studId).scrollHeight;
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