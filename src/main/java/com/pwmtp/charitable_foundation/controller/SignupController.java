package com.pwmtp.charitable_foundation.controller;

import com.pwmtp.charitable_foundation.domain.User;
import com.pwmtp.charitable_foundation.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

@Controller
@RequestMapping("signup")
public class SignupController {
    private final UserService USER_SERVICE;

    @Autowired
    public SignupController(UserService USER_SERVICE) {
        this.USER_SERVICE = USER_SERVICE;
    }

    @GetMapping
    public Object getPage() {
        return new ModelAndView("signup");
    }

    @PostMapping
    public Object register(@RequestParam User user) {
        USER_SERVICE.register(user);
        return new RedirectView("/login");
    }
}
