package com.pwmtp.charitable_foundation.controller;

import org.springframework.web.bind.annotation.*;

@RestController
public class TestController {

    @RequestMapping(value = "/api/login", method = RequestMethod.POST)
    public @ResponseBody int login(@RequestBody Object body) {
        System.out.println("body = " + body);
        return 555;
    }
}
