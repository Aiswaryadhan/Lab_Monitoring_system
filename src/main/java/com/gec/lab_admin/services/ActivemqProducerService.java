package com.gec.lab_admin.services;

import com.fasterxml.jackson.core.JsonProcessingException;
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

import javax.annotation.PostConstruct;
import javax.jms.*;
import java.awt.event.MouseEvent;
import java.io.Serializable;
import java.util.ArrayList;
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

//    public void send(ArrayList<String> url){
//        LOGGER.info("sending message='{}'", url);
//        jmsTemplate.send("topic_blocked_sites", new MessageCreator(){
//
//            @Override
//            public Message createMessage(Session session) throws JMSException {
//                ObjectMessage objectMessage = session.createObjectMessage();
//                objectMessage.setObject(url);
//                return objectMessage;
//            }
//        });
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

    public void send(String msg) throws JMSException {
        Connection connection = null;
        ConnectionFactory connectionFactory = new ActiveMQConnectionFactory(
                "tcp://localhost:61616");
        connection = connectionFactory.createConnection();
        Session session = connection.createSession(false,
                Session.AUTO_ACKNOWLEDGE);
        Topic topic = session.createTopic("topic_blocked_sites");
        MessageProducer producer = session.createProducer(topic);
        Message msg1 = session.createTextMessage(msg);
        producer.send(msg1);
    }
}