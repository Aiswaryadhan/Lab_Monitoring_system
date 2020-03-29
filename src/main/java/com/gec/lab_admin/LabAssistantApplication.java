package com.gec.lab_admin;

import org.apache.activemq.ActiveMQConnectionFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.jms.annotation.EnableJms;
import org.springframework.jms.config.JmsListenerContainerFactory;
import org.springframework.jms.config.SimpleJmsListenerContainerFactory;
import org.springframework.scheduling.annotation.EnableAsync;

import javax.jms.ConnectionFactory;
import javax.jms.JMSException;

@SpringBootApplication
@EnableJms
@EnableAsync
public class LabAssistantApplication {

	@Value("${spring.activemq.broker-url}")
	private String activeMQUrl;

	public static void main(String[] args) {
		SpringApplication.run(LabAssistantApplication.class, args);
	}

	@Bean
	JmsListenerContainerFactory<?> activeMQContainerFactory(@Qualifier("activeMQ") ConnectionFactory connectionFactory) throws JMSException {
		SimpleJmsListenerContainerFactory factory = new SimpleJmsListenerContainerFactory();
		factory.setConnectionFactory(connectionFactory);
		return factory;
	}

	@Bean(name = "activeMQ")
	public ConnectionFactory activeMQConnectionFactory() {
		ActiveMQConnectionFactory connectionFactory = new ActiveMQConnectionFactory();
		connectionFactory.setBrokerURL(activeMQUrl);
		return connectionFactory;
	}

}
