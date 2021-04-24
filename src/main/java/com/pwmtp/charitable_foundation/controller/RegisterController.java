package com.pwmtp.charitable_foundation.controller;

import com.pwmtp.charitable_foundation.domain.User;
import com.pwmtp.charitable_foundation.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.view.RedirectView;

@RestController
@RequestMapping("/api")
public class RegisterController {
    private final UserService USER_SERVICE;

    @Autowired
    public RegisterController(UserService USER_SERVICE) {
        this.USER_SERVICE = USER_SERVICE;
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<String> register(
            @RequestParam MultipartFile application,
            @RequestParam MultipartFile identity,
            User user
    ) {
        USER_SERVICE.register(user);
        return new ResponseEntity<>("result successful result", HttpStatus.OK);
    }

    @PostMapping("/activate/{code}")
    // TODO: rewrite
    public Object activate(@PathVariable String code, Model model) {
        boolean isActivated = USER_SERVICE.activateUser(code);
        if(isActivated) {
            model.addAttribute("message", "User successfully activated!");
        } else {
            model.addAttribute("message", "Activation code is not found!");
        }
        return new RedirectView("/login");
    }

}
