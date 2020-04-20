package com.gec.lab_admin.services;

import com.gec.lab_admin.utilities.ImageUtility;
import org.springframework.stereotype.Service;

import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.util.ArrayList;

@Service
public class ScreenPlayer extends JFrame {

    public ArrayList<Object> eventArrayList = new ArrayList<>();

    private Image img;

    public Rectangle screenRect = new Rectangle(0, 0, 0, 0);
    private Rectangle oldScreenRect = new Rectangle(-1, -1, -1, -1);

    private KeyAdapter keyAdapter;
    private MouseAdapter mouseAdapter;
    private MouseWheelListener mouseWheelListener;
    private MouseMotionAdapter mouseMotionAdapter;

    public ScreenPlayer() {

        keyAdapter = new KeyAdapter() {
            @Override
            public void keyPressed(KeyEvent e){
                addEvent(e);
            }

            @Override
            public void keyReleased(KeyEvent e){
                addEvent(e);
            }
        };

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

        setSize(600, 400);
        setFocusable(true);
        setVisible(true);
        addAdapters();
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
        System.out.println("removeadapters executed");
    }  
    
    public void addEvent(Object object){
        System.out.println("recorded new event");
        eventArrayList.add(object);
    }


    @Override
    public void paint(Graphics g) {
        g.drawImage(img, 0, 0, screenRect.width, screenRect.height, this);
    }

    public void setScreenRect(Rectangle rect) {
        screenRect = rect;
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