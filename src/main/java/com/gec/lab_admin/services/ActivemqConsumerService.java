package com.gec.lab_admin.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gec.lab_admin.utilities.ImageUtility;
import com.gec.lab_admin.utilities.ZipUtility;
import org.apache.activemq.Message;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Service;

import javax.jms.BytesMessage;

@Service
public class ActivemqConsumerService {

    @Autowired
    ScreenPlayer screenPlayer;
    Logger logger = LoggerFactory.getLogger(com.gec.lab_admin.services.ActivemqConsumerService.class);

    private static final Logger LOGGER = LoggerFactory.getLogger(com.gec.lab_admin.services.ActivemqConsumerService.class);


    ObjectMapper mapper = new ObjectMapper();

    @JmsListener(destination = "image_queue", containerFactory = "activeMQContainerFactory")
    public void processMessage(Message message) throws Exception {

        if (message instanceof BytesMessage) {
            BytesMessage bytesMessage = (BytesMessage) message;
            int messageLength = new Long(bytesMessage.getBodyLength()).intValue();
            byte[] textBytes = new byte[messageLength];
            bytesMessage.readBytes(textBytes, messageLength);

            screenPlayer.UpdateScreen((byte[]) ZipUtility.byteArrayToObject(textBytes));
        }



//        Object obj = mapper.readValue(message, Object.class);
//        eventSimulator.updateData(obj);


//        if (message instanceof BytesMessage) {
//            BytesMessage bytesMessage = (BytesMessage) message;
//            byte[] data = new byte[(int) bytesMessage.getBodyLength()];
//            bytesMessage.readBytes(data);
//            logger.info("Message received {}", new String(data));
//            eventSimulator.updateData(ZipUtility.byteArrayToObject(data));
//        }
    }
}
