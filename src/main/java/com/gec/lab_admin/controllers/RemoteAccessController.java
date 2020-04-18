package com.gec.lab_admin.controllers;

import com.gec.lab_admin.services.ViewerFrame;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RemoteAccessController {

    @Autowired
    ViewerFrame viewerFrame;

    @RequestMapping("/start")
    public void generateSubject() {
        viewerFrame.init();
    }
}
