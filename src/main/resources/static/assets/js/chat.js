$(document).ready(function(){
var stompClient = null;

//var sender=$("#login").val();
//var receiver=$("#nam").val();
//var msg=$("#msg").val();
function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
        window.sender=$("#login").val();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function connect() {
    var socket = new SockJS('/gs-guide-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({
           "user" : document.getElementById("login").value
    }

    , function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/user/queue/reply', function(greeting) {
                                                            showGreeting(JSON.parse(greeting.body).content);
                                                        });
    });
}

function disconnect() {
    if (stompClient != null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendName() {
    stompClient.send("/app/hello", {
    }, JSON.stringify({
        'name': $("#login").val(),
        'toUser' : $("#nam").val(),
        'content' : $("#msg").val()
    }));
    showGreeting($("#msg").val());
}

function showGreeting(message) {
 $("#greetings").append("<tr><td>" + sender + "</td></tr>");
    $("#greetings").append("<tr><td>" + message + "</td></tr>");
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#send" ).click(function() { sendName(); });
});
});