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

//    @Autowired
//    EventSimulator eventSimulator;

    ArrayList<Object> eventsArray = new ArrayList<Object>();

    int i=0;


    public boolean isLoaded(){
        if(eventsArray.size()>0)return true;
        else return false;
    }

    public void ship(){
        System.out.println(eventsArray.size());
        if(isLoaded()){
            try {
                ArrayList SendObjects;
                synchronized(eventsArray){
                    SendObjects = eventsArray;
                    eventsArray = new ArrayList<Object>();
                }

                i++;
                System.out.println(i);
//                System.out.println(SendObjects);
                activemqProducerService.send(ZipUtility.objecToByteArray(SendObjects));
                eventsArray.clear();
                System.out.println("sent " + i + "messages");

            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    public void addObject(Object object) {
        this.eventsArray.add(object);
    }
}
