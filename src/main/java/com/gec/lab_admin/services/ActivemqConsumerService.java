package com.gec.lab_admin.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gec.lab_admin.utilities.ZipUtility;
import org.apache.activemq.Message;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.jms.BytesMessage;
import java.util.ArrayList;

import javax.jms.BytesMessage;


@Service
public class ActivemqConsumerService {

    @Autowired
    ScreenPlayer screenPlayer;

    @Autowired
    ViewerFrame viewerFrame;

    Logger logger = LoggerFactory.getLogger(com.gec.lab_admin.services.ActivemqConsumerService.class);

    private static final Logger LOGGER = LoggerFactory.getLogger(com.gec.lab_admin.services.ActivemqConsumerService.class);


    ObjectMapper mapper = new ObjectMapper();


    @PostConstruct
    public void init(){
        viewerFrame.init();
    }

    @JmsListener(destination = "image_queue", containerFactory = "activeMQContainerFactory")
    public void processMessage(Message message) throws Exception {

        if (message instanceof BytesMessage) {
            BytesMessage bytesMessage = (BytesMessage) message;
            int messageLength = new Long(bytesMessage.getBodyLength()).intValue();
            byte[] dataBytes = new byte[messageLength];
            bytesMessage.readBytes(dataBytes, messageLength);

            Object object = ZipUtility.byteArrayToObject(dataBytes);
            if(object instanceof ArrayList) {
                for ( Object obj : (ArrayList) object ) {
                    if (obj instanceof byte[]) {
                        logger.info("found buffered stream image");
                        screenPlayer.updateScreen((byte[]) obj);
                    }
                }
            }
        }
    }
}
