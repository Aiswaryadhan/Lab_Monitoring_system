package com.gec.lab_admin.server.rmi;


import java.net.InetAddress;
import java.rmi.RemoteException;
import java.rmi.server.RMIClientSocketFactory;
import java.rmi.server.RMIServerSocketFactory;
import java.rmi.server.UnicastRemoteObject;

/**
 * ServerImpl.java
 * @author benbac
 */

public class ServerImpl extends UnicastRemoteObject implements ServerInterface {

    public ServerImpl () throws RemoteException {}

//
//
//    @Override
//    public int startViewer(InetAddress inetAddress) throws RemoteException {
//        return Server.addViewer(inetAddress);
//    }
//
//    @Override
//    public void stopViewer(int index) throws RemoteException {
//        Server.removeViewer(index);
//    }


    @Override
    public void updateData(byte[] data, int index) {
        Server.updateData(data, index);
    }

    @Override
    public byte[] updateData(int index) {
        return Server.updateData(index);
    }
}

