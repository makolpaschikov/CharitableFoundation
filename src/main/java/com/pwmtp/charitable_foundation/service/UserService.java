package com.pwmtp.charitable_foundation.service;

import com.pwmtp.charitable_foundation.domain.User;
import com.pwmtp.charitable_foundation.domain.UserRole;
import com.pwmtp.charitable_foundation.repository.UserDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.thymeleaf.util.StringUtils;

import java.util.UUID;

@Service
public class UserService implements UserDetailsService {
    private final UserDAO USER_DAO;
    private final PasswordEncoder PASSWORD_ENCODER;

    @Autowired
    public UserService(UserDAO userDAO, PasswordEncoder passwordEncoder) {
        this.USER_DAO = userDAO;
        this.PASSWORD_ENCODER = passwordEncoder;
    }

    @Autowired
    private MailSender mailSender;

    /*---------- Encoder ----------*/

    public PasswordEncoder getPasswordEncoder() {
        return PASSWORD_ENCODER;
    }

    /*---------- Save ----------*/

    public void update(User user) {
        USER_DAO.save(user);
    }

    public void register(User user) {
        user.setPassword(PASSWORD_ENCODER.encode(user.getPassword()));
        user.setActivationCode(UUID.randomUUID().toString());

        USER_DAO.save(user);

        if (!StringUtils.isEmpty(user.getEmail())) {
            String message = String.format("Hello, %s!\nWelcome to CharitableFoundationWebsite! " +
                    "\nTo activate your account, visit " + "http://localhost:8080/activate/%s",
                    user.getName(),
                    user.getActivationCode());
            mailSender.send(user.getEmail(), "Activation code", message);
        }
    }

    public boolean activateUser(String code) {
        User user = USER_DAO.findUserByActivationCode(code);

        if(user == null) {
            return false;
        }

        user.setActivationCode(null);

        USER_DAO.save(user);

        return true;
    }

    /*---------- Get ----------*/

    public User getByID(Long id) {
        return USER_DAO.findUserById(id);
    }

    public User getByEmail(String email) {
        return USER_DAO.findUserByEmail(email);
    }

    public User getByRole(UserRole role) {
        return USER_DAO.findUserByRoles(role);
    }

    /*---------- Delete ----------*/

    public void deleteByID(Long id) {
        USER_DAO.deleteById(id);
    }

    public void deleteByObject(User user) {
        USER_DAO.delete(user);
    }

    public void deleteAll() {
        USER_DAO.deleteAll();
    }

    /*---------- User details ----------*/

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return getByEmail(email);
    }
}
