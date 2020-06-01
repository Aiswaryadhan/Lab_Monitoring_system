package com.gec.lab_admin.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.activemq.ActiveMQConnectionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.jms.core.MessageCreator;
import javax.jms.MessageProducer;
import org.springframework.stereotype.Service;
import javax.jms.Topic;

import javax.jms.*;
import java.io.Serializable;
import java.util.Iterator;
import java.util.List;

@Service
public class ActivemqProducerService {
    @Autowired
    private JmsTemplate jmsTemplate;

    private static final Logger LOGGER = LoggerFactory.getLogger(ActivemqProducerService.class);

//    @PostConstruct
//    public void test(){
//        this.send("sample message");
//    }



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


}