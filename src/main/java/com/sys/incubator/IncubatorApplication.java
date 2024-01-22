package com.sys.incubator;

import com.twilio.Twilio;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.twilio.twiml.MessagingResponse;
import com.twilio.twiml.messaging.Body;
import com.twilio.twiml.messaging.Message;

import static spark.Spark.*;

@SpringBootApplication
public class IncubatorApplication {

	private static final String ACCOUNT_SID = "AC8780816e771ebf176b28cf91ce6137c4";
	private static final String AUTH_TOKEN = "7ef795baa7d0e8c276f81360db9d9857";

	static {
		Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
	}

	public static void main(String[] args) {


		//Twilio.init(ACCOUNT_SID, AUTH_TOKEN);

		SpringApplication.run(IncubatorApplication.class, args);

	}

}
