package com.gec.lab_admin.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

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
        jmsTemplate.convertAndSend("sample_queue", message);
    }
}