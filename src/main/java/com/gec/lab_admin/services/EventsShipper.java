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

    public static final Integer THRESHOLD = 5;
    private Integer currentLoad = 0;

    public void incrementLoad(Integer increment){
        currentLoad+=increment;
    }

    public boolean isLoaded(){
        if(currentLoad>=THRESHOLD)return true;
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

                activemqProducerService.send(ZipUtility.objecToByteArray(SendObjects));
                currentLoad = 0;
                eventsArray.clear();

            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    public void addObject(Object object) {
        this.eventsArray.add(object);
    }
}
