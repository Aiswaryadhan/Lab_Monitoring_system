package com.gec.lab_admin.viewer.rmi;

import com.gec.lab_admin.controllers.StudentController;
import com.gec.lab_admin.server.rmi.ServerInterface;
import com.gec.lab_admin.utilities.InetAdrUtility;
import com.gec.lab_admin.viewer.Recorder;
import com.gec.lab_admin.utilities.ZipUtility;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.rmi.server.UnicastRemoteObject;
import java.io.IOException;

import java.rmi.registry.Registry;
import java.util.ArrayList;

public class Viewer {

    private int index = -1;
    private Recorder recorder;

    private Registry registry;
    private boolean connected = false;
    private ServerInterface rmiServer;
    private ArrayList<Object> Objects;
    final Logger logger = LoggerFactory.getLogger(StudentController.class);

    public boolean isConnected() {
        return connected;
    }

    public void Start() {
        connect();
        if (connected) {
            recorder = new Recorder(this);
            //recorder.viewerGUI.Start();
        }
        else Stop();
    }

    public void Stop() {
        if (recorder != null) {
            recorder.Stop();
            recorder.interrupt();
        }
        disconnect();
        recorder.interrupt();
    }

    public int connect() {
        connected = false;

        try {

            rmiServer = (ServerInterface) registry.lookup("ServerImpl");

            index = rmiServer.startViewer(InetAdrUtility.getLocalAdr());

            Objects = new ArrayList<Object>();
            connected = true;
            return index;
        } catch (Exception e) {
            logger.info("Error");
            return -1;
        }
    }

    public void disconnect() {
        connected = false;
        try {
            if (rmiServer != null) {
                rmiServer.stopViewer(index);
                UnicastRemoteObject.unexportObject(rmiServer, true);
            }
        }
        catch (Exception e) {
            e.getStackTrace();
        }
        rmiServer = null;
        registry = null;
    }

    public void updateData(Object object) {
        byte[] data;
        try {
            data = ZipUtility.objecttoByteArray(object);

            updateData(data);
        }
        catch (IOException e) {
            e.getStackTrace();
        }
    }

    public void updateData(byte[] data) {
        try {rmiServer.updateData(data, index);}
        catch (Exception re) {
            re.getStackTrace();
        }
    }

    public void AddObject(Object object) {
        Objects.add(object);
    }



   /* public void updateOptions () {
        try {rmiServer.updateOptions(
                recorder.getViewerData(), index);
        }
        catch (Exception re) {
            re.getStackTrace();
        }
    }*/



}
