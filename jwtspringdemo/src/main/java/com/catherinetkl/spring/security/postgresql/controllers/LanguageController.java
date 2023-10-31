package com.catherinetkl.spring.security.postgresql.controllers;

import org.springframework.context.MessageSource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Locale;

@RestController
public class LanguageController {
    private final MessageSource messageSource;

    public LanguageController(MessageSource messageSource) {
        this.messageSource = messageSource;
    }

    @GetMapping("/api/change-language")
    public ResponseEntity<String> changeLanguage(@RequestParam String lang) {
        // Set the new locale based on the lang parameter
        Locale newLocale = Locale.forLanguageTag(lang);
        Locale.setDefault(newLocale);

        // You can use the new locale to serve messages in the selected language
        String message = messageSource.getMessage("message.login_successful", null, newLocale);

        return ResponseEntity.ok(message);
    }
}

