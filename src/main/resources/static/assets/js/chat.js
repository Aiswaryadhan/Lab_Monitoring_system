$(document).ready(function(){
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
                $.ajax({
                                           type: "POST",
                                           url: 'http://localhost:8080/teacher/getStudName/'+sub,
                                           success: function (data) {

                                                         var len = data.length;
                                                         var txt = "";
                                                         if(len > 0){
                                                            for(var i=0;i!=len;i++){
                                                                txt += "<tr><td>"+data[i]+"</td></tr>";
                                                            }
                                                            if(txt != ""){
                                                                                $('#listStud').append(txt).removeClass("hidden");
                                                                            }
                                                         }
                                           }
                                });

     }
     'use strict';
    $("#msgDiv").hide();
     var usernamePage = document.querySelector('#username-page');
     var chatPage = document.querySelector('#chat-page');
     var chatList = document.querySelector('#list-container');
     var usernameForm = document.querySelector('#usernameForm');
     var messageForm = document.querySelector('#messageForm');
     var messageInput = document.querySelector('#message');
     var receiver = null;
     var messageArea = document.querySelector('#messageArea');
     var connectingElement = document.querySelector('.connecting');

     var stompClient = null;
     var username = null;

     var colors = [
         '#2196F3', '#32c787', '#00BCD4', '#ff5652',
         '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
     ];

     $('#onlineStud').on( 'click', 'tr', function () {

     	 				                                                   if ( $(this).hasClass('highlighted') )
     																	     {
     						                                                  $(this).removeClass('highlighted');
//     																		  $('#btn_insert_publisher').attr('disabled', "disabled");
     																		  }
     					                                                   else
     																	    {
     																			$('tr.highlighted').removeClass('highlighted');
     																			$(this).addClass('highlighted');
     																			 var newDiv = $('<div class="listing listing_ad job"><h4><a>Some text</a></h4> </div>');
                                                                                      //newDiv.style.background = "#000";
                                                                                       $('body').append(newDiv);
                                                                                    });

     																		}
     																	var tableData = $(this).children("td").map(function() {
     																								return $(this).text();
     																	}).get();

     														receiver=tableData[0];
     														 $("#recvr").text(receiver);
                                                            $("#msgDiv").show();
                                                                 username = $("#teacher_name").text();
                                                                   // alert(username);
                                                                    if(username) {
                                                                        usernamePage.classList.add('hidden');
                                                                        var socket = new SockJS('/javatechie');
                                                                        stompClient = Stomp.over(socket);

                                                                        stompClient.connect({}, onConnected, onError);
                                                                    }
                                                                    event.preventDefault();


         //console.log( table.row( this ).data() );
     									} );



//$("#btn_connect").click(function() {
//    username = $("#teacher_name").text();
//   // alert(username);
//    if(username) {
//        usernamePage.classList.add('hidden');
//        var socket = new SockJS('/javatechie');
//        stompClient = Stomp.over(socket);
//
//        stompClient.connect({}, onConnected, onError);
//    }
//    event.preventDefault();
//})


function onConnected() {
    // Subscribe to the Public Topic
    stompClient.subscribe('/queue/public', onMessageReceived);

    // Tell your username to the server
    stompClient.send("/app/chat.register",
        {},
        JSON.stringify({sender: username, type: 'JOIN'})
    )

}


function onError(error) {
    connectingElement.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
    connectingElement.style.color = 'red';
}


$("#btnSend").click(function(){
    var messageContent = messageInput.value.trim();

    if(messageContent && stompClient) {
        var chatMessage = {
            sender: username,
            content: messageInput.value,
            receiver:receiver,
            type: 'CHAT'
        };

        stompClient.send("/app/chat.send", {}, JSON.stringify(chatMessage));
        messageInput.value = '';
    }
    event.preventDefault();
});

$("#btnClose").click(function(){
   $("#msgDiv").hide();
});
function onMessageReceived(payload) {
    var message = JSON.parse(payload.body);
    if((message.receiver===username && message.sender===receiver)||(message.sender===username && message.receiver===receiver)){
    // alert("receved");
        var messageElement = document.createElement('li');
        if(message.type === 'CHAT') {
       // alert("chat");
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
        }

        var textElement = document.createElement('p');
        var messageText = document.createTextNode(message.content);
        textElement.appendChild(messageText);

        messageElement.appendChild(textElement);
        messageArea.appendChild(messageElement);
        messageArea.scrollTop = messageArea.scrollHeight;
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