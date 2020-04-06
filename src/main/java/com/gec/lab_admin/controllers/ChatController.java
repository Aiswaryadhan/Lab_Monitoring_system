package com.gec.lab_admin.controllers;

import com.gec.lab_admin.db.models.ChatMessage;
import com.gec.lab_admin.db.models.Greeting;
import com.gec.lab_admin.db.models.HelloMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Controller
public  class ChatController{

//    @MessageMapping("/chat.register")
//    @SendTo("/topic/public")
//    public ChatMessage register(@Payload ChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessor){
//        headerAccessor.getSessionAttributes().put("username",chatMessage.getSender());
//        return chatMessage;
//    }
//
//    @MessageMapping("/chat.send")
//    @SendTo("/topic/public")
//    public ChatMessage sendMessage(@Payload ChatMessage chatMessage){
//        return chatMessage;
//    }

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/hello")
    public void greeting(Principal principal, HelloMessage message) throws  Exception {
        Greeting greeting = new Greeting();
        greeting.setContent(message.getContent());

        messagingTemplate.convertAndSendToUser(message.getToUser(), "/queue/reply", greeting);
    }

}
