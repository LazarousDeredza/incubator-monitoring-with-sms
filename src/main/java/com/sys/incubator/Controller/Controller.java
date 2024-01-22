package com.sys.incubator.Controller;


import org.springframework.web.bind.annotation.GetMapping;

@org.springframework.stereotype.Controller
public class Controller {

    @GetMapping({"", "/", "/home"})
    String home() {
        return "index";
    }

    @GetMapping("/add")
    String add() {
        return "addIncubator";
    }

    @GetMapping("/list")
    String list() {
        return "incubatorList";
    }

    @GetMapping("/Edit-Incubator")
        public String editIncubator(){
        return "Edit-Incubator";
        }

    @GetMapping("/IncubatorDetails")
    public String details(){

        return "incubatorDetails";
    }

}
