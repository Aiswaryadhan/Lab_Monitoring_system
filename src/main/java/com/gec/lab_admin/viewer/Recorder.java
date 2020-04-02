package com.gec.lab_admin.viewer;

import java.awt.Rectangle;
import java.util.ArrayList;

import com.gec.lab_admin.viewer.rmi.Viewer;

/**
 * Recorder.java
 * @author benbac
 */

public class Recorder extends Thread {

    private boolean recording = false;          // control recording

    private boolean viewOnly = false;
    private boolean pause = false;

    public Viewer viewer;
    public ScreenPlayer screenPlayer;

    public Recorder(Viewer viewer) {
        this.viewer = viewer;
        start();

        screenPlayer = new ScreenPlayer(this);
    }


    public void Stop() {
        screenPlayer.removeAdapters();
    }

    public void Start() {
        screenPlayer.addAdapters();
    }

}
