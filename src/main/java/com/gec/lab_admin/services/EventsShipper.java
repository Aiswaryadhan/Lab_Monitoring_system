package com.gec.lab_admin.services;

import com.gec.lab_admin.utilities.ZipUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;

@Service
public class EventsShipper {

    @Autowired
    ActivemqProducerService activemqProducerService;

    ArrayList<Object> eventsArray = new ArrayList<Object>();

    int i=0;


    public boolean isLoaded(){
        if(eventsArray.size()>5)return true;
        else return false;
    }

    public void ship(){
        if(isLoaded()){
            try {

//                ArrayList sendObjects;
//                synchronized(eventsArray){
//                    sendObjects = eventsArray;
//                }


                ArrayList SendObjects;
                synchronized(eventsArray){
                    SendObjects = eventsArray;
                    eventsArray = new ArrayList<Object>();
                }

                i++;
                activemqProducerService.send(ZipUtility.objecToByteArray(SendObjects));
                eventsArray.clear();
                System.out.println("sent " + i + "messages");

            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    public void addObject(Object object) {
        this.eventsArray.add(object);
    }
}
