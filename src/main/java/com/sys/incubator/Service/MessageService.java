package com.sys.incubator.Service;

import com.sys.incubator.Entity.Incubator;
import com.sys.incubator.Entity.Messages;
import com.sys.incubator.Respository.IncubatorRepository;
import com.sys.incubator.Respository.MessagesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class MessageService {
    private MessagesRepository messagesRepository;
    private IncubatorRepository incubatorRepository;


    @Autowired
    public MessageService(MessagesRepository messagesRepository, IncubatorRepository incubatorRepository) {
        this.messagesRepository = messagesRepository;
        this.incubatorRepository = incubatorRepository;
    }

    public Messages saveMessage(Messages message) {
        updateIncubatorStatus(message);

       return messagesRepository.save(message);
    }

    @Transactional
    public void updateIncubatorStatus(Messages message) {

        //find by phone
        Incubator incubator = incubatorRepository.findDistinctFirstByPhone(message.getFromPhoneNumber());

        if (incubator != null) {
            incubator.setBatteryCurrent(message.getBatteryCurrent());
            incubator.setBatteryVoltage(message.getBatteryVoltage());
            incubator.setTemperature(message.getTemperature());
            incubator.setHumidity(message.getHumidity());
        }


    }
}
