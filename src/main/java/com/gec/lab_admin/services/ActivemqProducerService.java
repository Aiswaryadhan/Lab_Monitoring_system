package com.gec.lab_admin.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.jms.core.MessageCreator;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.jms.BytesMessage;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.Session;
import java.awt.event.MouseEvent;
import java.util.List;

@Service
public class ActivemqProducerService {


    @Autowired
    private JmsTemplate jmsTemplate;

    private static final Logger LOGGER = LoggerFactory.getLogger(ActivemqProducerService.class);

    @PostConstruct
    public void test(){
        this.send("sample message");
    }

    public void send(String message) {
        LOGGER.info("sending message='{}'", message);
        jmsTemplate.convertAndSend("test_queue", message);
    }

    public void send(byte[] bytes) {
		jmsTemplate.send("events_queue", new MessageCreator() {
                        @Override
                        public Message createMessage(Session session) throws JMSException {
                            BytesMessage bytesMessage = session.createBytesMessage();
                            bytesMessage.writeBytes(bytes);
                            return bytesMessage;
                        }
                    });
    }

    ObjectMapper objectMapper = new ObjectMapper();

//    public void send(Object object) {
//        try {
//            System.out.println("writing " + objectMapper.writeValueAsString(object));
//            jmsTemplate.convertAndSend("events_queue", objectMapper.writeValueAsString(object));
//        } catch (JsonProcessingException e) {
//            e.printStackTrace();
//        }
//    }
}