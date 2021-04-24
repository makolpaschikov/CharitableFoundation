package com.pwmtp.charitable_foundation.controller;

import com.pwmtp.charitable_foundation.domain.User;
import com.pwmtp.charitable_foundation.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
            @RequestParam String username,
            @RequestParam String password,
            @RequestParam String email,
            @RequestParam MultipartFile application,
            @RequestParam MultipartFile identity
    ) {
        return USER_SERVICE.register(new User(username, email, password), application, identity)
                ? new ResponseEntity<>("successful result", HttpStatus.OK)
                : new ResponseEntity<>("this user is already registered", HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "/activate/{code}", method = RequestMethod.POST)
    public Object activate(@PathVariable String code) {
        USER_SERVICE.activateUser(code);
        return new RedirectView("http://localhost:3000/login");
    }

}
