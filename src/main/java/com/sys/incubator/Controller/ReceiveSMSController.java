package com.sys.incubator.Controller;


import com.sys.incubator.Entity.Messages;
import com.sys.incubator.Service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

import static spark.Spark.get;
import static spark.Spark.post;

@RestController
public class ReceiveSMSController {

    private MessageService messageService;

    @Autowired
    public ReceiveSMSController(MessageService messageService) {
        this.messageService = messageService;
    }


    //https://x34tvf9k-8080.inc1.devtunnels.ms/


    @PostMapping("sms")
    public Messages sms(@RequestBody String body) {
        System.out.println("Received message");

        //print the recieved message
        System.out.println(body);

        // Extract the "Body" parameter value
        String decodedBody = extractParameterValue(body, "Body");
        System.out.println("Body: " + decodedBody);
        String decodedFrom = extractParameterValue(body, "From");
        System.out.println("From: " + decodedFrom);
        String decodedTo = extractParameterValue(body, "To");
        System.out.println("To: " + decodedTo);


        //Date now
        LocalDate date = LocalDate.now();
        //dd/mm/yyyy
        String dateNow = date.toString();
        System.out.println("Date: " + dateNow);

        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("hh:mm a");
        LocalTime currentTimeunformated = LocalTime.now();
        String currentTime = currentTimeunformated.format(timeFormatter);
        System.out.println("Time: " + currentTime);

        String decodedTemperature = extractBodyParameterValue(decodedBody, "temperature");
        System.out.println("Temperature: " + decodedTemperature);
        String decodedHumidity = extractBodyParameterValue(decodedBody, "humidity");
        System.out.println("Humidity: " + decodedHumidity);
        String decodedVoltage = extractBodyParameterValue(decodedBody, "voltage");
        System.out.println("Voltage: " + decodedVoltage);
        String decodedCurrent = extractBodyParameterValue(decodedBody, "current");
        System.out.println("Current: " + decodedCurrent);


        Messages message = new Messages();
        message.setMessage(decodedBody);
        message.setFromPhoneNumber(decodedFrom);
        message.setDate(dateNow);
        message.setTime(currentTime);
        message.setToPhoneNumber(decodedTo);
        message.setTemperature(decodedTemperature);
        message.setHumidity(decodedHumidity);
        message.setBatteryCurrent(decodedCurrent);
        message.setBatteryVoltage(decodedVoltage);

        return messageService.saveMessage(message);
    }

    private String extractParameterValue(String queryString, String parameterName) {
        try {
            // Decoding the query string
            String decodedQueryString = URLDecoder.decode(queryString, StandardCharsets.UTF_8.toString());

            // Splitting the query string into individual key-value pairs
            String[] keyValuePairs = decodedQueryString.split("&");

            // Creating a map to store the parameter-value pairs
            Map<String, String> parameters = new HashMap<>();

            // Extracting the parameter-value pairs and populating the map
            for (String keyValuePair : keyValuePairs) {
                String[] pair = keyValuePair.split("=");
                if (pair.length == 2) {
                    String key = pair[0];
                    String value = pair[1];
                    // System.out.println("Key: " + key + ", Value: " + value);
                    parameters.put(key, value);
                }
            }

            // Retrieving the value associated with the specified parameter name
            return parameters.get(parameterName);
        } catch (Exception e) {
            // Handle any exceptions that may occur during the extraction process
            e.printStackTrace();
            return null;
        }


    }

    private String extractBodyParameterValue(String queryString, String parameterName) {
        try {
            // Decoding the query string
            String decodedQueryString = URLDecoder.decode(queryString, StandardCharsets.UTF_8.toString());

            // Splitting the query string into individual key-value pairs
            String[] keyValuePairs = decodedQueryString.split(",");

            // Creating a map to store the parameter-value pairs
            Map<String, String> parameters = new HashMap<>();

            // Extracting the parameter-value pairs and populating the map
            for (String keyValuePair : keyValuePairs) {
                String[] pair = keyValuePair.split(":");
                if (pair.length == 2) {
                    String key = pair[0];
                    String value = pair[1];
                    //System.out.println("Key: " + key + ", Value: " + value);
                    parameters.put(key, value);
                }
            }

            // Retrieving the value associated with the specified parameter name
            return parameters.get(parameterName);
        } catch (Exception e) {
            // Handle any exceptions that may occur during the extraction process
            e.printStackTrace();
            return null;
        }


    }
}

