package com.example.pekarnya.services;

import com.example.pekarnya.entities.Password;
import com.example.pekarnya.repository.AuthorizationRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthorizationService {
    private final PasswordHasher passwordHasher = new PasswordHasher();
    private final AuthorizationRepo authorizationRepo;

    public boolean checkAuthorization(String password){
        System.out.println("=== AUTHORIZATION SERVICE ===");
        System.out.println("Incoming password: " + password);
        
        var allPasswords = authorizationRepo.findAll();
        System.out.println("Total passwords in DB: " + allPasswords.size());
        
        if (allPasswords.isEmpty()) {
            System.out.println("ERROR: No passwords found in database!");
            return false;
        }
        
        String storedHash = allPasswords.getFirst().getHash();
        System.out.println("Stored hash from DB: " + storedHash);
        System.out.println("Hash length: " + storedHash.length());
        
        boolean result = passwordHasher.verifyPassword(password, storedHash);
        System.out.println("Password verification result: " + result);
        System.out.println("=== END AUTHORIZATION SERVICE ===");
        
        return result;
    }

    public ResponseEntity<?> register(String password){
        System.out.println("=== REGISTER SERVICE ===");
        System.out.println("Registering password: " + password);
        
        // Удаляем все старые пароли перед регистрацией нового
        long oldCount = authorizationRepo.count();
        System.out.println("Old passwords in DB: " + oldCount);
        authorizationRepo.deleteAll();
        System.out.println("All old passwords deleted");
        
        String hash = passwordHasher.hashPassword(password);
        System.out.println("Generated hash: " + hash);
        
        Password savedPassword = authorizationRepo.save(Password.builder().hash(hash).build());
        System.out.println("Saved password ID: " + savedPassword.getId());
        System.out.println("Total passwords in DB now: " + authorizationRepo.count());
        System.out.println("=== END REGISTER SERVICE ===");
        
        return ResponseEntity.ok().build();
    }
}
