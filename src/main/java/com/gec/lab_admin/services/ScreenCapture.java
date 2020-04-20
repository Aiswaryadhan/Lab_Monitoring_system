package com.gec.lab_admin.services;

import com.gec.lab_admin.utilities.ImageUtility;
import com.gec.lab_admin.utilities.ZipUtility;
import jdk.nashorn.internal.objects.Global;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;

@Service
public class ScreenCapture {
    static Object object=null;
    static ArrayList Objects = (ArrayList) object;
    private static Robot r;
    public BufferedImage captureScreen() {
        BufferedImage Image = null;
        try {
            Thread.sleep(120);
          Robot r = new Robot();

            // It saves screenshot to desired path
            String path = "screenshot.jpg";

            // Used to get ScreenSize and capture image
            Rectangle capture =
                    new Rectangle(Toolkit.getDefaultToolkit().getScreenSize());
            Image = r.createScreenCapture(capture);
            ImageIO.write(Image, "jpg", new File(path));
            System.out.println("Screenshot saved");
        } catch (AWTException | IOException | InterruptedException ex) {
            System.out.println(ex);
        }
        return Image;
    }
    public byte[] CaptureScreenByteArray() {
        return ImageUtility.toByteArray(captureScreen());
    }
    public Rectangle getScreenRect() {
        Toolkit tk = Toolkit.getDefaultToolkit();
        Rectangle screenRect = new Rectangle(tk.getScreenSize());
        return screenRect;
    }

    public byte[] updateData() {
        byte[] data=null;
        Objects.add(CaptureScreenByteArray());
        Objects.add(getScreenRect());

        synchronized(Objects) {
            try {
                data = ZipUtility.objecttoByteArray(Objects);
                System.out.println(data);
            } catch (IOException ioe) {
                ioe.getStackTrace();
            }
            Objects = new ArrayList<Object>();
        }

        return data;
    }


}
