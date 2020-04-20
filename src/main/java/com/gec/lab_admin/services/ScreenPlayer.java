package com.gec.lab_admin.services;

import com.gec.lab_admin.utilities.ImageUtility;
import com.gec.lab_admin.utilities.ZipUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.io.IOException;
import java.io.Serializable;

@Lazy
@Component
public class ScreenPlayer extends JLabel implements Serializable {

    @Autowired
    transient EventsShipper shipper;

    transient private Image img;


    transient Dimension screenSize = Toolkit.getDefaultToolkit().getScreenSize();
    transient public Rectangle screenRect = new Rectangle(0, 0, screenSize.width, screenSize.height);
    transient private Rectangle oldScreenRect = new Rectangle(-1, -1, -1, -1);

    transient private KeyAdapter keyAdapter;
    transient private MouseAdapter mouseAdapter;
    transient private MouseWheelListener mouseWheelListener;
    transient private MouseMotionAdapter mouseMotionAdapter;

    public void init() {

//        keyAdapter = new KeyAdapter() {
//            @Override
//            public void keyPressed(KeyEvent e){
////                addEvent(e);
////                try {
//////                    System.out.println(ZipUtility.objecToByteArray(e));
////                } catch (IOException ex) {
////                    ex.printStackTrace();
////                }
//            }
//
//            @Override
//            public void keyReleased(KeyEvent e){
////                addEvent(e);
////                try {
////                    System.out.println(ZipUtility.objecToByteArray(e));
////                } catch (IOException ex) {
////                    System.out.println(str);
////                    ex.printStackTrace();
////                }
//            }
//        };

        mouseWheelListener = new MouseWheelListener() {
            @Override
            public void mouseWheelMoved(MouseWheelEvent e) {
                addEvent(e);
            }
        };

        mouseMotionAdapter = new MouseMotionAdapter() {
            @Override
            public void mouseMoved(MouseEvent e) {
                addEvent(e);
            }

            @Override
            public void mouseDragged(MouseEvent e) {
                addEvent(e);
            }
        };

        mouseAdapter = new MouseAdapter()
        {
            @Override
            public void mousePressed(MouseEvent e) {
                addEvent(e);
            }

            @Override
            public void mouseReleased(MouseEvent e) {
                addEvent(e);
            }
        };

        repaint();
        setFocusable(true);
        setVisible(true);
        addAdapters();
        repaint(screenRect);
    }

        public void addAdapters() {
//        addKeyListener(keyAdapter);
        addMouseWheelListener(mouseWheelListener);
        addMouseMotionListener(mouseMotionAdapter);
        addMouseListener(mouseAdapter);   
        System.out.println("addAdapters executed");
    }
     
    public void removeAdapters() {
        removeKeyListener(keyAdapter);
        removeMouseWheelListener(mouseWheelListener);
        removeMouseMotionListener(mouseMotionAdapter);
        removeMouseListener(mouseAdapter);
        System.out.println("removeadapters executed");
    }  
    
    public void addEvent(Object object){
//        System.out.println("recorded new event");
        shipper.addObject(object);
        shipper.ship();
    }


    @Override
    public void paint(Graphics g) {
        g.drawImage(img, 0, 0, screenRect.width, screenRect.height, this);
    }

    public void UpdateScreen(byte[] data) {
        if (!screenRect.equals(oldScreenRect)) {
            oldScreenRect = screenRect;
            setSize(screenRect.getSize());
            setPreferredSize(screenRect.getSize());
        }

        img = ImageUtility.read(data);
        repaint();
    }

    public void UpdateScreen(Image data) {
        if (!screenRect.equals(oldScreenRect)) {
            oldScreenRect = screenRect;
            setSize(screenRect.getSize());
            setPreferredSize(screenRect.getSize());
        }

        img = data;
        repaint();
    }

    public void clearScreen() {
        setSize(new Dimension(1, 1));
        setPreferredSize(new Dimension(1, 1));
        img = createImage(getWidth(), getHeight());
        repaint();
        oldScreenRect = new Rectangle(-1, -1, -1, -1);
    }

    public boolean isScreenRectChanged () {
        boolean bool = (!screenRect.equals(oldScreenRect));
        oldScreenRect = screenRect;
        return bool;
    }
}