package com.pwmtp.charitable_foundation.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class MvcConfig extends WebSecurityConfigurerAdapter implements WebMvcConfigurer {
    private final String PROJECT_DIR = System.getProperty("user.dir");

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry
                .addViewController("/login")
                .setViewName("login");
    }
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry
                .addResourceHandler("/static/**")
                .addResourceLocations("file:/" + PROJECT_DIR + "/client/build/static/");
        registry
                .addResourceHandler("/asset-manifest.json")
                .addResourceLocations("file:/" + PROJECT_DIR + "/client/build/asset-manifest.json");
        registry
                .addResourceHandler("/favicon.ico")
                .addResourceLocations("file:/" + PROJECT_DIR + "/client/build/favicon.ico");
        registry
                .addResourceHandler("/logo192.png")
                .addResourceLocations("file:/" + PROJECT_DIR + "/client/build/logo192.png");
        registry
                .addResourceHandler("/logo512.png")
                .addResourceLocations("file:/" + PROJECT_DIR + "/client/build/logo512.png");
        registry
                .addResourceHandler("/manifest.json")
                .addResourceLocations("file:/" + PROJECT_DIR + "/client/build/manifest.json");
        registry
                .addResourceHandler("/robots.txt")
                .addResourceLocations("file:/" + PROJECT_DIR + "/client/build/robots.txt");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .mvcMatchers("/**").permitAll()
                .anyRequest().authenticated()
                .and()
                .formLogin().loginPage("/login").defaultSuccessUrl("/router").permitAll()
                .and()
                .logout().logoutSuccessUrl("/").permitAll();
    }
}
