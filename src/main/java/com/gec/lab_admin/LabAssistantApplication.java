package com.gec.lab_admin;

import com.gec.lab_admin.events.EventSimulator;
import com.gec.lab_admin.services.ScreenPlayer;
import com.sun.rmi.rmid.ExecOptionPermission;
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

import java.util.Timer;
import java.util.TimerTask;

@SpringBootApplication
@EnableJms
@EnableAsync
public class LabAssistantApplication {

	@Value("${spring.activemq.broker-url}")
	private String activeMQUrl;

	public static void main(String[] args)throws Exception {

		EventSimulator eventSimulator = new EventSimulator();

		ScreenPlayer frame = new ScreenPlayer();
		frame.setSize(600, 400);
		frame.addAdapters();
		frame.setVisible(true);

		TimerTask task = new TimerTask() {
			public void run() {
				try {
					System.out.println("started simulation");
					frame.removeAdapters();
					eventSimulator.updateData(frame.eventArrayList);
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			}
		};

		Timer timer = new Timer();

		long delay = 30000L;
		timer.schedule(task, delay);

//		SpringApplication.run(LabAssistantApplication.class, args);
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
