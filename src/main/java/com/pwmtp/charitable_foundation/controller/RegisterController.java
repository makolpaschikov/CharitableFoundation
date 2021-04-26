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

    /**
     * The controller that logs the user into the database
     * @param username    - name of organization
     * @param password    - account password
     * @param email       - organization email
     * @param application - application file
     * @param identity    - organization confirmation file
     * @return            - 200 if the user is registered, otherwise 400
     */
    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<String> register(
            @RequestParam String username, @RequestParam String password, @RequestParam String email,
            @RequestParam MultipartFile application, @RequestParam MultipartFile identity
    ) {
        return USER_SERVICE.register(new User(username, email, password), application, identity)
                ? new ResponseEntity<>("successful result", HttpStatus.OK)
                : new ResponseEntity<>("this user is already registered", HttpStatus.BAD_REQUEST);
    }

    /**
     * The controller that activates the organization's account
     * @param code - activation code
     * @return     - RedirectView that redirects the user to the login page 'http://localhost:3000/login'
     */
    @RequestMapping(value = "/activate/{code}", method = RequestMethod.GET)
    public Object activate(@PathVariable String code) {
        USER_SERVICE.activateUser(code);
        return new RedirectView("http://localhost:3000/login");
    }

}
