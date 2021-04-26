package com.pwmtp.charitable_foundation.service;

import com.pwmtp.charitable_foundation.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.thymeleaf.util.StringUtils;

@Service
public class MailSender {

    @Value("${spring.mail.username}")
    private String username;
    private final JavaMailSender MAIL_SENDER;

    @Autowired
    public MailSender(JavaMailSender mailSender) {
        this.MAIL_SENDER = mailSender;
    }

    /**
     * Collects a message for the user and sends him a link to activate the account by email
     * @param user - recipient user
     */
    public void sendActivationCode(User user) {
        if (!StringUtils.isEmpty(user.getEmail())) {
            String message = String.format(
                    "Здравствуйте, %s!\n" +
                            "Для активации Вашего аккаунта перейдите по ссылке " +
                            "http://localhost:8080/api/activate/%s",
                    user.getName(), user.getActivationCode()
            );
            send(user.getEmail(), "Подтверждение почты", message);
        }
    }

    // Sends a letter
    private void send(String emailTo, String subject, String message) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setFrom(username);
        mailMessage.setTo(emailTo);
        mailMessage.setSubject(subject);
        mailMessage.setText(message);
        MAIL_SENDER.send(mailMessage);
    }
}
