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
    private ScreenCapture screenCapture;
    private static final Logger LOGGER = LoggerFactory.getLogger(ActivemqProducerService.class);
    byte[] data=screenCapture.updateData();
    @PostConstruct

    public void init(){
        this.send(data);
    }

    public void send(byte[] message) {
        LOGGER.info("sending message='{}'", message);
        jmsTemplate.convertAndSend("sample_queue", message);
    }
}