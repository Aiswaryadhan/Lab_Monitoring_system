package com.gec.lab_admin.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Service;

@Service
public class ActivemqConsumerService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ActivemqConsumerService.class);

    @JmsListener(destination = "sample_queue", containerFactory = "activeMQContainerFactory")
    public void processMessage(String content) {
        LOGGER.info("Received Message " + content);
    }
}
