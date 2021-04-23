package com.pwmtp.charitable_foundation.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequestMapping("/activate-account")
public class AccountActivatorController {
    @GetMapping
    public Object getPage() {
        return new ModelAndView("mail-activate");
    }
}
