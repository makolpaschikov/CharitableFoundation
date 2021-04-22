package com.pwmtp.charitable_foundation.controller;

import com.pwmtp.charitable_foundation.domain.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.validation.Valid;
import java.util.Map;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/signup")
public class SignupController {
    @GetMapping
    public Object getPage() {
        return new ModelAndView("signup");
    }

    @PostMapping("/signup")
    public String addUser(
            @Valid User user,
            BindingResult bindingResult
    ){
        if (bindingResult.hasErrors()) {
            return "signup";
        }

        return "redirect:/index";
    }
}
