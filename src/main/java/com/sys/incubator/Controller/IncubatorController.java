package com.sys.incubator.Controller;

import com.sys.incubator.Entity.Incubator;
import com.sys.incubator.Service.IncubatoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/incubator")
public class IncubatorController {

    private IncubatoreService service;

    @Autowired
    public IncubatorController(IncubatoreService service) {
        this.service = service;
    }

    @PostMapping({"/add"})

    public String AddIncubator(@RequestBody Incubator incubator){

     return  service.save(incubator);
    }


    @RequestMapping(path = {"/list"},method = RequestMethod.GET)
        public List<Incubator> getIncubators(){
        return service.getIncubators();
        }


    @RequestMapping(path = {"/get/{id}"},method = RequestMethod.GET)
    public Incubator getIncubatorbyID(@PathVariable Long id){
        return service.getIncubatorbyID(id);
    }

    @PutMapping("/edit/{id}")
    public void updateLease(@PathVariable Long id, @RequestBody Incubator incubator) {

        this.service.updateIncubator(id, incubator);

    }

    @DeleteMapping("/delete/{id}")

    public String deleteIncubatorbyID(@PathVariable Long id){
      return    service.delete(id);
    }

}
