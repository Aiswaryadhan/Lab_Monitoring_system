package com.gec.lab_admin.db.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


@Table(name="blocked_sites")
public class BlockedSites {

    @Column(name="sub_id")
    @Size(max = 10)
    private String sub_id;

    @Column(name="url")
    @Size(max = 255)
    private String url;



    public String getSub_id() {
        return sub_id;
    }

    public void setSub_id(String sub_id) {
        this.sub_id = sub_id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public BlockedSites(){

    }

    public BlockedSites(@Size(max = 10) String sub_id, @Size(max = 255) String url) {
        this.sub_id = sub_id;
        this.url = url;
    }
}
