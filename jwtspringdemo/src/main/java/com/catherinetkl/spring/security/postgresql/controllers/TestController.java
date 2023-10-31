package com.catherinetkl.spring.security.postgresql.controllers;

import com.catherinetkl.spring.security.postgresql.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.context.MessageSource;

import java.util.List;
import java.util.Locale;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class TestController {
    private final MessageSource messageSource;

    public TestController(@Qualifier("messageSource") MessageSource messageSource) {
        this.messageSource = messageSource;
    }

    @GetMapping("/all")
    public String allAccess() {
        return "Public Content";
    }

    @GetMapping("/user")
    @PreAuthorize("hasRole('USER') or hasRole('MANAGER') or hasRole('ADMIN')")
    public String userAccess(Locale locale) {
        String userMessageKey = "message.role.user"; // Define the message key for User
        String managerMessageKey = "message.role.manager"; // Define the message key for Manager
        String adminMessageKey = "message.role.admin"; // Define the message key for Admin

        UserDetailsImpl userDetails;
        userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority)
                .toList();

        // Check the user's roles and retrieve the corresponding message
        String roleSpecificMessage;
        if (roles.contains("ROLE_ADMIN")) {
            roleSpecificMessage = messageSource.getMessage(adminMessageKey, null, locale);
        } else if (roles.contains("ROLE_MANAGER")) {
            roleSpecificMessage = messageSource.getMessage(managerMessageKey, null, locale);
        } else {
            roleSpecificMessage = messageSource.getMessage(userMessageKey, null, locale);
        }

        return roleSpecificMessage;
    }

    @GetMapping("/manager")
    @PreAuthorize("hasRole('MANAGER') or hasRole('ADMIN')")
    public String managerAccess() {
        return "This is the manager board, strictly for manager use only.";
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public String adminAccess() {
        return "This is the admin board, strictly for admin use only";
    }
}