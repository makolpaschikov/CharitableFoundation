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

    public void sendActivationCode(User user) {
        if (!StringUtils.isEmpty(user.getEmail())) {
            String message = String.format(
                    "Здравствуйте, %s!\n "
                            + "Для активации Вашего аккаунта перейдите по ссылке "
                            + "http://localhost:8080/api/activate/%s",
                    user.getName(),
                    user.getActivationCode()
            );
            send(user.getEmail(), "Activation code", message);
        }
    }

/*    public void sendAsk(Long id, String emailFrom, String productName) {
        UserService userService;
        String message = String.format(
                "Здравствуйте, %s!\n "
                    + "Ваше объявление о пожертвовании \"%s\" заинтересовало медицинское учреждение.\n"
                    + "Можете связаться с ним по почте %s",
                    USER_SERVICE.getByID(id).getName(),
                    productName,
                    emailFrom
        );

        send(USER_SERVICE.getByID(id).getEmail(), "Запрос на подтверждение пожертвования", message);
    }*/

    private void send(String emailTo, String subject, String message) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setFrom(username);
        mailMessage.setTo(emailTo);
        mailMessage.setSubject(subject);
        mailMessage.setText(message);
        MAIL_SENDER.send(mailMessage);
    }
}
