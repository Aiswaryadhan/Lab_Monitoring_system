package com.gec.lab_admin.services;

import org.apache.activemq.ActiveMQConnectionFactory;
import org.springframework.stereotype.Service;

import javax.jms.*;
import java.util.List;

@Service
public class MonitorStudentPublisher {

    // get the initial context
    public void processMonitorMessage(String studId) throws Exception {

        TopicConnection topicConnection = null;
        // Producer
        TopicConnectionFactory connectionFactory = new ActiveMQConnectionFactory(
                "tcp://localhost:61616");
        topicConnection = connectionFactory.createTopicConnection();
//        topicConnection.setClientID("JMSTOPIC");

        TopicSession topicConsumerSession = topicConnection.createTopicSession(
                false, Session.AUTO_ACKNOWLEDGE);
        Topic topic = topicConsumerSession.createTopic("monitorTopic");


        // create a topic publisher
        TopicPublisher topicPublisher = topicConsumerSession.createPublisher(topic);
        topicPublisher.setDeliveryMode(DeliveryMode.NON_PERSISTENT);

        // create the "Hello World" message
        TextMessage message = topicConsumerSession.createTextMessage();
        message.setText(studId);

        // publish the messages
        topicPublisher.publish(message);

        // print what we did
        System.out.println("Message published: " + message.getText());

        // close the topic connection
        topicConnection.close();
    }

}
