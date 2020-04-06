package com.gec.lab_admin.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import com.gec.lab_admin.db.models.Greeting;
import com.gec.lab_admin.db.models.HelloMessage;

import java.security.Principal;

/**
 * Created by VIRONOE on 05/04/2017.
 */
@Controller
public class GreetingController {

	@Autowired
	private SimpMessagingTemplate messagingTemplate;

	@MessageMapping("/hello")
	public void greeting(Principal principal, HelloMessage message) throws  Exception {
		Greeting greeting = new Greeting();
		greeting.setContent(message.getContent());

		messagingTemplate.convertAndSendToUser(message.getToUser(), "/queue/reply", greeting);
	}


}
