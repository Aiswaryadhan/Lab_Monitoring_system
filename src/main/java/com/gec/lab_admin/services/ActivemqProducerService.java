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

    /*public void send(List<String> urlList){
        LOGGER.info("sending message='{}'", urlList);
        jmsTemplate.convertAndSend("topic_blocked_sites", urlList);
        JMSContextSender context = JMSContextSender.getInstance(); //Get JMS Context. Replace with appropriate code to get JMSContext
        msg = context.getQueueSession().createObjectMessage(); //Get Queue Session and create Object Message

        msg.setObject((Serializable)listData);
        context.getQueueSender().send(msg);
        System.out.println("message sent...");*/
//                new MessageCreator(){
//
//            @Override
//            public Message createMessage(Session session) throws JMSException {
////                Iterator<String> s1Iterator = urlList.iterator();
//                ObjectMessage objectMessage = null;
//                    objectMessage = session.createObjectMessage();
//                    objectMessage.setObject((Serializable) urlList);
//                    LOGGER.info(String.valueOf(objectMessage));
//                System.out.println(objectMessage);
//                    return objectMessage;
//
//            }
//        });
   // }


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

  /*  public void send(List<String> urlList) throws JMSException {
        Connection connection = null;
        ConnectionFactory connectionFactory = new ActiveMQConnectionFactory(
                "tcp://localhost:61616");
        connection = connectionFactory.createConnection();
        Session session = connection.createSession(false,
                Session.AUTO_ACKNOWLEDGE);
        Topic topic = session.createTopic("topic_blocked_site");
        MessageProducer producer = session.createProducer(topic);
        Iterator<String> s1Iterator = urlList.iterator();
        LOGGER.info("block");
        LOGGER.info(String.valueOf(urlList));
        Message msg1 = session.createTextMessage(String.valueOf(urlList));
        producer.send(msg1);
//                while (s1Iterator.hasNext()) {
//                    LOGGER.info(s1Iterator.next());
//                    LOGGER.info("Sites");
//                    Message msg1 = session.createTextMessage(s1Iterator.next());
//                    producer.send(msg1);
//                }
    }*/
}