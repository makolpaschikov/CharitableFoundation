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

@Service
public class UserService implements UserDetailsService {
    private final UserDAO USER_DAO;
    private final PasswordEncoder PASSWORD_ENCODER;

    @Autowired
    public UserService(UserDAO userDAO, PasswordEncoder passwordEncoder) {
        this.USER_DAO = userDAO;
        this.PASSWORD_ENCODER = passwordEncoder;
    }

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
        USER_DAO.save(user);
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
