package com.pwmtp.charitable_foundation.domain;

import org.springframework.security.core.GrantedAuthority;

public enum UserRole implements GrantedAuthority {
    MEDICAL_FACILITY,
    FOUNDATION_EMPLOYEE,
    FOUNDATION_DIRECTOR;

    @Override
    public String getAuthority() {
        return name();
    }
}
