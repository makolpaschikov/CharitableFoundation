package com.pwmtp.charitable_foundation.controller;

import com.pwmtp.charitable_foundation.domain.User;
import com.pwmtp.charitable_foundation.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import javax.validation.Valid;

@RestController
@RequestMapping("/signup")
public class SignupController {
    private final UserService USER_SERVICE;

    @Autowired
    public SignupController(UserService USER_SERVICE) {
        this.USER_SERVICE = USER_SERVICE;
    }

    @GetMapping
    public Object getPage(User user) {
        return new ModelAndView("signup");
    }

    @PostMapping
    public Object register(@Valid User user, BindingResult bindingResult) {
        findErrors(user, bindingResult);
        if (bindingResult.hasErrors()) {
            return new ModelAndView("signup");
        } else {
            USER_SERVICE.register(user);
            return new RedirectView("/activate-account");
        }
    }

    @GetMapping("/activate/{code}")
    public Object activate(@PathVariable String code, Model model) {
        boolean isActivated = USER_SERVICE.activateUser(code);
        if(isActivated) {
            model.addAttribute("message", "User successfully activated!");
        } else {
            model.addAttribute("message", "Activation code is not found!");
        }
        return new RedirectView("/login");
    }

    private void findErrors(User user, BindingResult bindingResult) {
        //Checking passwords
        if (bindingResult.getFieldErrorCount("password") == 0) {
            boolean hasUpperChar = false; //At least one symbol should be upper case
            boolean hasNumber = false; //At least one number presents
            for (char ch : user.getPassword().toCharArray()) {
                if (!hasUpperChar && Character.isUpperCase(ch)) hasUpperChar = true;
                if (!hasNumber && Character.isDigit(ch)) hasNumber = true;
            }
            if (!hasUpperChar)
                bindingResult.addError(new FieldError("user", "password", "Password does not have any upper case chars!"));
            if (!hasNumber)
                bindingResult.addError(new FieldError("user", "password", "Password does not have any numbers!"));

            // Checking passwords for match
            if (!user.getPassword().equals(user.getPasswordConf())) {
                bindingResult.addError(new FieldError("user", "passwordConf", "Passwords do not match!"));
            }
        }

        //Checking phone numbers
        if (bindingResult.getFieldErrorCount("number") == 0) {
            if (user.getNumber().toCharArray()[0] != '+' && user.getNumber().length() == 12) {
                bindingResult.addError(new FieldError("user", "number", "Phone number should only contain 11 numbers!"));
            }
        }

    }

}
