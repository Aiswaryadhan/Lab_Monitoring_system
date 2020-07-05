package com.gec.lab_admin.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import javax.swing.*;
import java.awt.event.WindowEvent;

@Lazy
@Component
public class ViewerFrame extends javax.swing.JFrame {

    @Autowired
    ScreenPlayer screenPlayer;
    @Autowired
    EventsShipper eventsShipper;

    /** Creates new form MainFrame */
    public void init() {
        screenPlayer.init();
        initComponents();
        setExtendedState(java.awt.Frame.MAXIMIZED_BOTH);
        jScrollPane1.setViewportView(screenPlayer);
        setVisible(true);
    }

    public void Start() {
//        if (recorder.isRecording())
//            recorder.Stop();
//        else
//            recorder.Start();
//
//        if (recorder.isRecording()) {
//
//            setTitle("jrdesktop Viewer [" +Config.server_address + "]");
//        } else {
//            setTitle("jrdesktop Viewer");
//
//        }
    }

    private void initComponents() {

        jScrollPane1 = new javax.swing.JScrollPane();

        setDefaultCloseOperation(javax.swing.WindowConstants.DISPOSE_ON_CLOSE);
        setTitle("Screen Sharing");
//        setIconImage(new ImageIcon(main.WAIT_ICON).getImage());
        addWindowListener(new java.awt.event.WindowAdapter() {
            public void windowClosing(WindowEvent evt) {
                formWindowClosing(evt);
            }
            public void windowOpened(WindowEvent evt) {
                formWindowOpened(evt);
            }
        });

        jScrollPane1.setFocusable(false);

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(getContentPane());
        getContentPane().setLayout(layout);
        layout.setHorizontalGroup(
                layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                        .addComponent(jScrollPane1, javax.swing.GroupLayout.DEFAULT_SIZE, 892, Short.MAX_VALUE)
        );
        layout.setVerticalGroup(
                layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                        .addComponent(jScrollPane1, javax.swing.GroupLayout.Alignment.TRAILING, javax.swing.GroupLayout.DEFAULT_SIZE, 462, Short.MAX_VALUE)
        );

        setSize(new java.awt.Dimension(900, 500));
        setLocationRelativeTo(null);
    }// </editor-fold>//GEN-END:initComponents

    private void formWindowClosing(WindowEvent evt) {//GEN-FIRST:event_formWindowClosing
        if (evt.getID() == WindowEvent.WINDOW_CLOSING) {
            if (JOptionPane.showConfirmDialog(null, "Exit Viewer ?", "Confirm Dialog",
                    JOptionPane.OK_CANCEL_OPTION) == JOptionPane.OK_OPTION) {
//                if (recorder.isRecording())
//                    recorder.viewer.Stop();
//
//            }
            } else
                super.processWindowEvent(evt);
        }
    }//GEN-LAST:event_formWindowClosing

    private void formWindowOpened(WindowEvent evt) {//GEN-FIRST:event_formWindowOpened
        // TODO add your handling code here:
//        screenPlayer.init();
    }//GEN-LAST:event_formWindowOpened


    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JScrollPane jScrollPane1;
    // End of variables declaration//GEN-END:variables

}

