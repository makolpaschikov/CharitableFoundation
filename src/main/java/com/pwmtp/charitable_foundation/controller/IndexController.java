package com.pwmtp.charitable_foundation.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class IndexController {
    @GetMapping
    public Object getPage() {
        return new ModelAndView("index");
    }
}
