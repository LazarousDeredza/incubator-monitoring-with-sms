package com.sys.incubator.Service;

import com.sys.incubator.Entity.Incubator;
import com.sys.incubator.Entity.Messages;
import com.sys.incubator.Respository.IncubatorRepository;
import com.sys.incubator.Respository.MessagesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class IncubatoreService {
    private final IncubatorRepository repository;
    private final MessagesRepository messagesRepository;

    @Autowired
    public IncubatoreService(IncubatorRepository repository, MessagesRepository messagesRepository) {
        this.repository = repository;
        this.messagesRepository = messagesRepository;
    }

    public String save(Incubator incubator) {

        String phone = incubator.getPhone();

        Incubator incubator1 = repository.findDistinctFirstByPhone(phone.replaceAll(" ", ""));

        String message;
        if (incubator1 != null) {
            message = "Failed ! Another Incubator with that phone number already exist: !";
            return message;
        } else {
            incubator.setPhone(incubator.getPhone().replaceAll(" ", ""));
            repository.save(incubator);
            message = "Incubator added successfully";
        }

        return message;
    }

    public List<Incubator> getIncubators() {
        return repository.findAll();

    }

    public Incubator getIncubator(String phone) {
        return repository.findDistinctFirstByPhone(phone);
    }

    @Transactional
    public void updateIncubator(Long id, Incubator update) {
        Incubator incubator1 = (Incubator) this.repository.findOne(id);

        incubator1.setFirstName(update.getFirstName());
        incubator1.setLastName(update.getLastName());
        incubator1.setPhone(update.getPhone());
        incubator1.setLocation(update.getLocation());
        incubator1.setAddress(update.getAddress());
        incubator1.setLatitude(update.getLatitude());
        incubator1.setLongitude(update.getLongitude());

    }

    @Transactional
    public void updateIncubatorState(Long id, String state) {
        Incubator incubator1 = (Incubator) this.repository.findOne(id);

        incubator1.setState(state);


    }

    public Incubator getIncubatorbyID(Long id) {
       Incubator incubator=repository.findOne(id);
        List<Messages> mactching=new ArrayList<>();

       List<Messages> messages=messagesRepository.findAll();

       for (Messages m:messages){
           if(m.getFromPhoneNumber().replaceAll(" ","").equals(incubator.getPhone())){
               mactching.add(m);
           }
       }
       incubator.setMessagesList(mactching);
        return incubator;
    }

    public String delete(Long id) {
        Incubator incubator=repository.findOne(id);
        String message;
        if(incubator==null){
            message="Record Not Found";
        }else{
            repository.delete(id);
            message= "Record Deleted Successfully";

        }

        return message;

    }
}
