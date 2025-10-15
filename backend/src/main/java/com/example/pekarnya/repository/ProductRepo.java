package com.example.pekarnya.repository;


import com.example.pekarnya.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ProductRepo extends JpaRepository<Product, UUID> {
    List<Product> findByIsActiveTrue();
    List<Product> findByCategory_Name(String name);
}