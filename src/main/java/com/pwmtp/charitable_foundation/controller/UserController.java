package com.pwmtp.charitable_foundation.controller;

import com.pwmtp.charitable_foundation.domain.User;
import com.pwmtp.charitable_foundation.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class UserController {
    private final UserService USER_SERVICE;

    @Autowired
    public UserController(UserService USER_SERVICE) {
        this.USER_SERVICE = USER_SERVICE;
    }

    /**
     * Controller that returns data about the authorized user
     * @param user - the authorized user
     * @return     - 200 if it was possible to return data, 401 if the user is not authorized
     */
    @RequestMapping(value = "/me", method = RequestMethod.GET)
    public ResponseEntity<Object> getUser(@AuthenticationPrincipal User user) {
        return user != null
                ? new ResponseEntity<>(user, HttpStatus.OK)
                : new ResponseEntity<>("user is not logged in", HttpStatus.UNAUTHORIZED);
    }

    /**
     * Controller that returns the user's contact information
     * @param id - the id of the user whose contact information needs to be returned
     * @return   - json file as 'name:"name", email:"email"' and code 200
     */
    @RequestMapping(value = "/get-contacts", method = RequestMethod.GET)
    public @ResponseBody
    ResponseEntity<Map<String, String>> getContacts(@RequestParam Long id) {
        User user = USER_SERVICE.getByID(id);
        Map<String, String> json = new HashMap<>();
        json.put("name", user.getName());
        json.put("email", user.getEmail());
        return new ResponseEntity<>(json, HttpStatus.OK);
    }
}
