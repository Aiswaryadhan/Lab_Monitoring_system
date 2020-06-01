package com.gec.lab_admin.services;

import com.gec.lab_admin.utilities.ImageUtility;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.converter.json.GsonBuilderUtils;
import org.springframework.stereotype.Component;

import javax.swing.*;
import java.awt.*;
import java.io.Serializable;

@Lazy
@Component
public class MonitorScreenPlayer extends JLabel implements Serializable {

    private Image img;

    final Logger logger = LoggerFactory.getLogger(MonitorScreenPlayer.class);
    Dimension screenSize = Toolkit.getDefaultToolkit().getScreenSize();

    public Rectangle screenRect = new Rectangle(0, 0, screenSize.width, screenSize.height);
    private Rectangle oldScreenRect = new Rectangle(-1, -1, -1, -1);

    public void init() {
        repaint();
        setFocusable(true);
        setVisible(true);
        repaint(screenRect);
    }

    @Override
    public void paint(Graphics g) {
        logger.info(String.valueOf(screenRect.width));
        logger.info(String.valueOf(screenRect.height));
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
