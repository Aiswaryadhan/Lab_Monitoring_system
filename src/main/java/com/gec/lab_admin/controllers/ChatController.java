package com.gec.lab_admin.controllers;

import com.gec.lab_admin.db.models.ChatMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

@Controller
public  class ChatController{

	@MessageMapping("/chat.register")
	@SendTo("/queue/public")
	public ChatMessage register(@Payload ChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessor){
		headerAccessor.getSessionAttributes().put("username",chatMessage.getSender());
		return chatMessage;
	}

	@MessageMapping("/chat.send")
	@SendTo("/queue/public")
	public ChatMessage sendMessage(@Payload ChatMessage chatMessage){
		System.out.println(chatMessage.getContent());
		return chatMessage;
	}

}