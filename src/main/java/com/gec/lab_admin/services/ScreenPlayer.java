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
import java.util.HashMap;
import java.util.Map;

@Lazy
@Component
public class ScreenPlayer extends JLabel implements Serializable {

    @Autowired
    EventsShipper shipper;

    private Image img;

    Dimension screenSize = Toolkit.getDefaultToolkit().getScreenSize();
    public Rectangle screenRect = new Rectangle(0, 0, screenSize.width, screenSize.height);
    private Rectangle oldScreenRect = new Rectangle(-1, -1, -1, -1);

    private KeyAdapter keyAdapter;
    private MouseAdapter mouseAdapter;
    private MouseWheelListener mouseWheelListener;
    private MouseMotionAdapter mouseMotionAdapter;

    Map<Integer, Boolean> keyEvent = new HashMap<>();

    public void init() {

        keyAdapter = new KeyAdapter() {
            @Override
            public void keyPressed(KeyEvent e){
                shipper.incrementLoad(5);
                keyEvent.put(e.getKeyCode(), true);
                addEvent(keyEvent);
            }
            
            @Override
            public void keyReleased(KeyEvent e){
                shipper.incrementLoad(5);
                keyEvent.put(e.getKeyCode(), false);
                addEvent(keyEvent);
            }
        };

        mouseWheelListener = new MouseWheelListener() {
            @Override
            public void mouseWheelMoved(MouseWheelEvent e) {
                shipper.incrementLoad(3);
                addEvent(e);
            }
        };

        mouseMotionAdapter = new MouseMotionAdapter() {
            @Override
            public void mouseMoved(MouseEvent e) {
                shipper.incrementLoad(1);
                addEvent(e);
            }

            @Override
            public void mouseDragged(MouseEvent e) {
                shipper.incrementLoad(4);
                addEvent(e);
            }
        };

        mouseAdapter = new MouseAdapter()
        {
            @Override
            public void mousePressed(MouseEvent e) {
                shipper.incrementLoad(5);
                addEvent(e);
            }

            @Override
            public void mouseReleased(MouseEvent e) {
                shipper.incrementLoad(5);
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
        addKeyListener(keyAdapter);
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
        System.out.println("removeAdapters executed");
    }  
    
    public void addEvent(Object object){
//        System.out.println("recorded new event");
        shipper.addObject(object);
        shipper.ship();
        keyEvent.clear();
    }


    @Override
    public void paint(Graphics g) {
        g.drawImage(img, 0, 0, screenRect.width, screenRect.height, this);
    }

    public void updateScreen(byte[] data) {
        if (!screenRect.equals(oldScreenRect)) {
            oldScreenRect = screenRect;
            setSize(screenRect.getSize());
            setPreferredSize(screenRect.getSize());
        }
        img = ImageUtility.read(data);
        repaint();
    }

    public void updateScreen(Image data) {
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