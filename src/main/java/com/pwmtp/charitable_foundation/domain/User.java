package com.pwmtp.charitable_foundation.domain;

import org.hibernate.validator.constraints.Length;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Collection;
import java.util.Collections;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "usr")
public class User implements UserDetails {
    @Id
    @Column(name = "usr_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ElementCollection(targetClass = UserRole.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "usr_role", joinColumns = @JoinColumn(name = "usr_id"))
    @Enumerated(EnumType.STRING)
    private Set<UserRole> roles;

    @NotBlank(message = "Number cannot be empty!")
    @Length(min = 11, max = 12, message = "Incorrect phone number!")
    private String number;

    private String applicationFile;
    private String identityFile;

    private String username;
    private String email;
    private String activationCode;
    private boolean activate;
    private String password;

    /*---------- Constructors ----------*/

    public User() {
    }

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.number = "88005553535";
        this.roles = Collections.singleton(UserRole.DISTRIBUTOR);
    }

    /*---------- User details ----------*/

    @Override
    public String getUsername() {
        return getEmail();
    }

    @Override
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles;
    }

    @Override
    public boolean isEnabled() {
        return activate;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    /*---------- Getters and setters ----------*/

    public Long getId() {
        return id;
    }

    public String getName() {
        return username;
    }

    public void setName(String name) {
        this.username = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setActivationCode(String activationCode) {
        this.activationCode = activationCode;
    }

    public String getActivationCode() {
        return activationCode;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public void setActivated(boolean activate) {
        this.activate = activate;
    }

    public boolean isActivated() {
        return activate;
    }

    public String getApplicationFile() {
        return applicationFile;
    }

    public String getIdentityFile() {
        return identityFile;
    }

    public void setApplicationFile(String applicationFile) {
        this.applicationFile = applicationFile;
    }

    public void setIdentityFile(String identityFile) {
        this.identityFile = identityFile;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(id, user.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
