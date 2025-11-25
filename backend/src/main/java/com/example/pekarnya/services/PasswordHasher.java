package com.example.pekarnya.services;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class PasswordHasher {

    private final PasswordEncoder passwordEncoder;

    public PasswordHasher() {
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public String hashPassword(String password) {
        return passwordEncoder.encode(password);
    }

    public boolean verifyPassword(String rawPassword, String encodedPassword) {
        System.out.println("=== PASSWORD HASHER - VERIFY ===");
        System.out.println("Raw password: " + rawPassword);
        System.out.println("Encoded password: " + encodedPassword);
        
        boolean matches = passwordEncoder.matches(rawPassword, encodedPassword);
        System.out.println("BCrypt matches result: " + matches);
        System.out.println("=== END PASSWORD HASHER - VERIFY ===");
        
        return matches;
    }
}