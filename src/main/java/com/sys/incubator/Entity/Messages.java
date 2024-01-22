package com.sys.incubator.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Messages {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String message;
    private String fromPhoneNumber;
    private String toPhoneNumber;
    private String date;
    private String time;
    private String temperature;
    private String humidity;
    private String batteryVoltage;
    private String batteryCurrent;

}
