$(document).ready(function(){
    var len;
    var studId;
    var receiver;
    var teacherId;
    var username;
    var studName;
    var teacherName;
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
     							}
     							var tableData = $(this).children("td").map(function() {
     														                return $(this).text();
     							}).get();
     							receiver=studId;
                                studName=tableData[1];
                                $('#mainDiv').removeClass('hidden');
                                $("#"+studId).prop("disabled",false);
     							if ( $('#'+tableData[0]).hasClass('hidden') ){
                                     			 $('#'+tableData[0]).removeClass('hidden');
                                }
                                else{
                                     		$('#'+tableData[0]).addClass('hidden');
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




    function close(){
                    $("#"+studId).prop("disabled",true);
                    $("#"+studId).addClass('hidden');
                    $('#mainDiv').addClass('hidden');
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
                                                                var $section = $("<section></section>");
                                                                $section.attr("id",studId);
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
                                                                $it.attr("text","Chat");
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


                                                                var $text = $("<input></input>");
                                                                $text.attr("id","message"+studId);
                                                                $text.attr("type","text");
                                                                $text.attr("placeholder","Enter your message...");
                                                                $text.attr("class","msger-input");
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
                                                            $('#listStud').append(txt).removeClass("hidden");
                                                     }
                                            }
                           }
                    });
            }
           if(message.type === 'CHAT') {
                            alert("chatzzz");
                            alert("user"+username);
                            alert("receiver"+receiver);
                          if((message.receiver===username && message.sender===receiver)||(message.sender===username && message.receiver===receiver)){
                                                                           if(message.type === 'CHAT') {
                                                                           var messageElement = document.createElement('li');
                                                                                 alert("chat");
                                                                                 messageElement.classList.add('chat-message');
                                                                                 var avatarElement = document.createElement('i');
                                                                                 avatarElement.setAttribute("class", "avtr");
                                                                                 var avatarText = document.createTextNode(teacherName[0]);
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
    }
  function send(){
        var messageContent = $('#message'+studId).val();
        alert(messageContent);
        alert(receiver);
        if(messageContent && stompClient) {
                            var chatMessage = {
                                        sender: username,
                                        content: messageContent,
                                        receiver:studId,
                                        type: 'CHAT'
                            };
                            stompClient.send("/app/chat.send", {}, JSON.stringify(chatMessage));
                            $('#message'+studId).val('');
        }
        event.preventDefault();
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