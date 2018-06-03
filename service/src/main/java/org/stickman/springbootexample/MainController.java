package org.stickman.springbootexample;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
public class MainController {

    @RequestMapping("/greeting")
    public String index() {
        return "Greetings from Spring Boot!";
    }
}