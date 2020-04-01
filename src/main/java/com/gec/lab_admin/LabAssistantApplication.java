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

import javax.imageio.ImageIO;
import javax.jms.ConnectionFactory;
import javax.jms.JMSException;
import javax.swing.*;

import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.Timer;
import java.util.TimerTask;

@SpringBootApplication
@EnableJms
@EnableAsync
public class LabAssistantApplication {

	@Value("${spring.activemq.broker-url}")
	private String activeMQUrl;

	public static void main(String[] args)throws Exception {

		try {
			Thread.sleep(120);
			Robot r = new Robot();

			// It saves screenshot to desired path
			String path = "screenshot.jpg";

			// Used to get ScreenSize and capture image
			Rectangle capture =
					new Rectangle(Toolkit.getDefaultToolkit().getScreenSize());
			BufferedImage Image = r.createScreenCapture(capture);
			ImageIO.write(Image, "jpg", new File(path));
			System.out.println("Screenshot saved");
		}
		catch (AWTException | IOException | InterruptedException ex) {
			System.out.println(ex);
		}



		EventSimulator eventSimulator = new EventSimulator();

		ScreenPlayer frame = new ScreenPlayer();
		Dimension screenSize = Toolkit.getDefaultToolkit().getScreenSize();


		ImageIcon icon = new ImageIcon("screenshot.jpg");
		Image image = icon.getImage();

		frame.UpdateScreen(image);
		frame.screenRect = new Rectangle(0, 0, screenSize.width, screenSize.height);
		frame.UpdateScreen(image);

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

		long delay = 20000L;
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
