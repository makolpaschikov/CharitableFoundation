package com.pwmtp.charitable_foundation.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexController {
    @GetMapping
    public Object getPage() {
        return "index";
    }
}
