package com.example.pekarnya.repository;

import com.example.pekarnya.entities.Password;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface AuthorizationRepo extends JpaRepository<Password, UUID> {
    Optional<Password>findPasswordByHash(String hash);
}
