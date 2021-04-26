package com.pwmtp.charitable_foundation.repository;

import com.pwmtp.charitable_foundation.domain.User;
import org.springframework.data.repository.CrudRepository;

public interface UserDAO extends CrudRepository<User, Long> {
    User findUserById(Long id);
    User findUserByEmail(String email);
    User findUserByActivationCode(String code);
}
