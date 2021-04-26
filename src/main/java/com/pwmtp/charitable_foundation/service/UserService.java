package com.pwmtp.charitable_foundation.service;

import com.pwmtp.charitable_foundation.domain.User;
import com.pwmtp.charitable_foundation.repository.UserDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@Service
public class UserService implements UserDetailsService {
    private final UserDAO USER_DAO;
    private final PasswordEncoder PASSWORD_ENCODER;
    private final MailSender MAIL_SENDER;

    @Autowired
    public UserService(UserDAO userDAO, PasswordEncoder passwordEncoder, MailSender mailSender) {
        this.USER_DAO = userDAO;
        this.PASSWORD_ENCODER = passwordEncoder;
        this.MAIL_SENDER = mailSender;
    }

    /*---------- Encoder ----------*/

    public PasswordEncoder getPasswordEncoder() {
        return PASSWORD_ENCODER;
    }

    /*---------- Save ----------*/

    /**
     * Overwrites the user in the database
     * @param user - rewritable user
     */
    public void update(User user) {
        USER_DAO.save(user);
    }

    /**
     * Adds a user to the database and sends a message to his mail to activate the account
     * @param user        - {@link com.pwmtp.charitable_foundation.controller.RegisterController#register}
     * @param application - {@link com.pwmtp.charitable_foundation.controller.RegisterController#register}
     * @param identity    - {@link com.pwmtp.charitable_foundation.controller.RegisterController#register}
     * @return            - <b>true</b> if the user was registered, otherwise <b>false</b>
     */
    public boolean register(User user, MultipartFile application, MultipartFile identity) {
        if (getByEmail(user.getEmail()) != null) return false;

        user.setApplicationFile(FileManager.saveFile(application, user.getEmail(), FileManager.FileType.APPLICATION));
        user.setIdentityFile(FileManager.saveFile(identity, user.getEmail(), FileManager.FileType.IDENTITY));
        user.setPassword(PASSWORD_ENCODER.encode(user.getPassword()));
        user.setActivationCode(UUID.randomUUID().toString());
        USER_DAO.save(user);

        MAIL_SENDER.sendActivationCode(user);
        return true;
    }

    /**
     * Activates the user by the received activation code
     * @param code - activation code
     */
    public void activateUser(String code) {
        User user = USER_DAO.findUserByActivationCode(code);
        if(user == null) return;

        user.setActivated(true);
        user.setActivationCode(null);
        update(user);
    }

    /*---------- Get ----------*/

    /**
     * Returns the user by id
     * @param id - id of user
     * @return   - object of user
     */
    public User getByID(Long id) {
        return USER_DAO.findUserById(id);
    }

    /**
     * Returns the user by email
     * @param email - email of user
     * @return      - object of user
     */
    public User getByEmail(String email) {
        return USER_DAO.findUserByEmail(email);
    }

    /*---------- User details ----------*/

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return getByEmail(email);
    }

}
