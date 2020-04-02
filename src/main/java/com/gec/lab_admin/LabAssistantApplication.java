package com.gec.lab_admin;

import com.gec.lab_admin.server.rmi.ServerImpl;
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
import java.awt.*;
import com.gec.lab_admin.server.rmi.Server;
import com.gec.lab_admin.viewer.rmi.Viewer;
import java.awt.event.InputEvent;
import java.awt.event.KeyEvent;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;

@SpringBootApplication
@EnableJms
@EnableAsync
public class LabAssistantApplication {

	@Value("${spring.activemq.broker-url}")
	private String activeMQUrl;
	private static ServerImpl serverImpl;
	private static Registry registry;

	public static void main(String[] args) throws AWTException, RemoteException {
		Robot robot = new Robot();
		new Viewer().start();
		try {
			ServerImpl serverImpl = new ServerImpl();
			registry = LocateRegistry.createRegistry(8080);
			registry.rebind("ServerImpl", serverImpl);
		}
		catch (Exception e) {
			e.getStackTrace();
		}
		SpringApplication.run(LabAssistantApplication.class, args);
//		click(500,600);
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
