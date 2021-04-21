package com.pwmtp.charitable_foundation.service;

import com.pwmtp.charitable_foundation.domain.User;
import com.pwmtp.charitable_foundation.domain.UserRole;
import com.pwmtp.charitable_foundation.repository.UserDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {
    private final UserDAO USER_DAO;

    @Autowired
    public UserService(UserDAO USER_DAO) {
        this.USER_DAO = USER_DAO;
    }

    /*---------- Save ----------*/

    public User save(User user) {
        return USER_DAO.save(user);
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
