package com.gec.lab_admin.services;

import org.apache.activemq.ActiveMQConnectionFactory;
import org.apache.activemq.broker.BrokerFactory;
import org.apache.activemq.broker.BrokerService;
import org.springframework.stereotype.Service;

import javax.jms.*;
import javax.naming.Context;
import javax.naming.InitialContext;
import java.net.URI;
import java.util.List;
import java.util.Properties;

@Service
public class SitesPublisher {
    // get the initial context
    public void processMessage(List<String> urlList) throws Exception {

        TopicConnection topicConnection = null;
        // Producer
        TopicConnectionFactory connectionFactory = new ActiveMQConnectionFactory(
                "tcp://localhost:61616");
        topicConnection = connectionFactory.createTopicConnection();
//        topicConnection.setClientID("JMSTOPIC");

        TopicSession topicConsumerSession = topicConnection.createTopicSession(
                false, Session.AUTO_ACKNOWLEDGE);
        Topic topic = topicConsumerSession.createTopic("customerTopic");


            // create a topic publisher
            TopicPublisher topicPublisher = topicConsumerSession.createPublisher(topic);
            topicPublisher.setDeliveryMode(DeliveryMode.PERSISTENT);

            // create the "Hello World" message
            TextMessage message = topicConsumerSession.createTextMessage();
            message.setText(String.valueOf(urlList));

            // publish the messages
            topicPublisher.publish(message);

            // print what we did
            System.out.println("Message published: " + message.getText());

            // close the topic connection
//        topicConnection.close();
        }


}
