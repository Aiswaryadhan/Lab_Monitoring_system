package com.gec.lab_admin.server.rmi;

import com.gec.lab_admin.server.robot;
import com.gec.lab_admin.utilities.ZipUtility;

import java.io.IOException;
import java.net.InetAddress;
import java.rmi.registry.Registry;
import java.util.ArrayList;
import java.util.Hashtable;

public class Server {
    private static Registry registry;
    private static ServerImpl serverImpl;

    private static robot rt = new robot();

    private static ArrayList<Object> Objects = new ArrayList<Object>();
    public static Hashtable<Integer, InetAddress> viewers =
            new Hashtable<Integer, InetAddress>();

    public static void updateData(byte[] data, int index) {
        Object object;
        try {
            object = ZipUtility.byteArraytoObject(data);
            rt.updateData(object);
        }
        catch (Exception e) {
            e.getStackTrace();
        }
    }

    public static byte[] updateData(int index) {
        byte[] data = null;
        Objects.add(rt.CaptureScreenByteArray());
        Objects.add(rt.getScreenRect());

        synchronized(Objects) {
            try {
                data = ZipUtility.objecttoByteArray(Objects);
            } catch (IOException ioe) {
                ioe.getStackTrace();
            }
            Objects = new ArrayList<Object>();
        }

        return data;
    }

    public static void AddObject(Object object) {
        Objects.add(object);
    }
}
