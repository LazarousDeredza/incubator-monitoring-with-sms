package com.sys.incubator.Controller;


import com.sys.incubator.Entity.Incubator;
import com.sys.incubator.Entity.TwilioRequest;
import com.sys.incubator.Service.IncubatoreService;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/sms")
public class SendSMSController {

    private   IncubatoreService incubatorService;

    @Autowired
    public SendSMSController(IncubatoreService incubatorService) {
        this.incubatorService = incubatorService;
    }

    @PostMapping("/send")
    public ResponseEntity<String> sendMessage(@RequestBody TwilioRequest twilioRequest) {

        // Check if RequestBody has valid data or NOT
        if (twilioRequest == null || twilioRequest.getFromPhoneNumber() == null
                || twilioRequest.getToPhoneNumber() == null || twilioRequest.getMessage() == null) {
            return ResponseEntity.badRequest().body("Invalid request data");
        }

        // Extract Request Data
        String fromNumber = twilioRequest.getFromPhoneNumber();
        String toNumber = twilioRequest.getToPhoneNumber();
        String msg = twilioRequest.getMessage();

        System.out.println("fromNumber: " + fromNumber);
        System.out.println("toNumber: " + toNumber);
        System.out.println("msg: " + msg);

        // Create Message to be sent
        Message.creator(new PhoneNumber(toNumber), new PhoneNumber(fromNumber),
                msg).create();

        return ResponseEntity.ok("SMS sent Succesfully !");
    }

    @PostMapping("/send/{id}/{message}")
    public ResponseEntity<String> sendMessage(@PathVariable Long id,@PathVariable String message) {


        Incubator incubator=incubatorService.getIncubatorbyID(id);

        // Extract Request Data
        String fromNumber = "+19892682856";
        String toNumber = incubator.getPhone();


        System.out.println("fromNumber: " + fromNumber);
        System.out.println("toNumber: " + toNumber);
        System.out.println("msg: " + message);


        // Create Message to be sent
        Message.creator(new PhoneNumber(toNumber), new PhoneNumber(fromNumber),
                message).create();

        incubatorService.updateIncubatorState(id,message.toUpperCase());
        System.out.println("SMS sent Succesfully !");
        return ResponseEntity.ok("SMS sent Succesfully !");
    }

}
