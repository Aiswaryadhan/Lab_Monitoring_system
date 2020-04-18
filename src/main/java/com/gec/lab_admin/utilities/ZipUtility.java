package com.gec.lab_admin.utilities;

import java.io.*;


public class ZipUtility {

    public static Object byteArrayToObject(byte[] data) throws Exception {
        ByteArrayInputStream bais = new ByteArrayInputStream(data);
        ObjectInputStream ois = new ObjectInputStream(bais);
        ois.close();
        bais.close();
        return ois.readObject();
    }

    public static byte[] objecToByteArray(Object obj) throws IOException {
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        ObjectOutputStream oos = new ObjectOutputStream(bos);
        oos.writeObject(obj);
        oos.flush();
        oos.close();
        bos.close();
        return bos.toByteArray();
    }
}