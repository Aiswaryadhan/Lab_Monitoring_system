package com.gec.lab_admin.db.models;

public class AttendanceReport {
    private String name;
    private Integer total_days;
    private Integer present_days;
    private Float percentage;
//    private Boolean eligibility;

    public AttendanceReport(String name, Integer total_days, Integer present_days, Float percentage) {
        this.name = name;
        this.total_days = total_days;
        this.present_days = present_days;
        this.percentage = percentage;
//        this.eligibility = eligibility;
    }

    public AttendanceReport() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getTotal_days() {
        return total_days;
    }

    public void setTotal_days(Integer total_days) {
        this.total_days = total_days;
    }

    public Integer getPresent_days() {
        return present_days;
    }

    public void setPresent_days(Integer present_days) {
        this.present_days = present_days;
    }

    public Float getPercentage() {
        return percentage;
    }

    public void setPercentage(Float percentage) {
        this.percentage = percentage;
    }

//    public Boolean getEligibility() {
//        return eligibility;
//    }
//
//    public void setEligibility(Boolean eligibility) {
//        this.eligibility = eligibility;
//    }
}
