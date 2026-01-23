package com.example.pekarnya.controllers;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.pekarnya.dto.CategoryDto;
import com.example.pekarnya.dto.CreateProductDto;
import com.example.pekarnya.dto.LoginRequest;
import com.example.pekarnya.dto.PatchProductDto;
import com.example.pekarnya.dto.ProductDto;
import com.example.pekarnya.dto.StockPatchDto;
import com.example.pekarnya.services.AuthorizationService;
import com.example.pekarnya.services.ProductService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {
    private final ProductService productService;
    private final AuthorizationService authorizationService;

    @GetMapping("/products")
    public Map<String, Object> allProducts() {
        return Map.of("items", productService.adminList(Optional.empty()));
    }

    @GetMapping("/products/{category}")
    public Map<String, Object> productsByCategory(@PathVariable String category) {
        return Map.of("items", productService.adminList(Optional.of(category)));
    }

    @PostMapping("/product")
    public ProductDto create(@RequestBody @Valid CreateProductDto dto) {
        return productService.create(dto);
    }

    @PatchMapping("/product/{id}")
    public ProductDto patch(@PathVariable UUID id, @RequestBody PatchProductDto dto) {
        return productService.patch(id, dto);
    }

    @PatchMapping("/product/{id}/stock")
    public ProductDto patchStock(@PathVariable UUID id, @RequestBody @Valid StockPatchDto dto) {
        return productService.patchStock(id, dto.stock());
    }

    @DeleteMapping("/product/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable UUID id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/category")
    public CategoryDto createCategory(@RequestBody Map<String, String> body) {
        return productService.createCategory(body.get("name"));
    }

    @DeleteMapping("/category/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable UUID id) {
        productService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        System.out.println("=== LOGIN REQUEST RECEIVED ===");
        System.out.println("Password from request: " + request.password());
        System.out.println("Password length: " + (request.password() != null ? request.password().length() : "null"));
        
        boolean isValid = authorizationService.checkAuthorization(request.password());
        
        System.out.println("Authorization result: " + isValid);
        System.out.println("=== END LOGIN REQUEST ===");
        
        if (isValid) {
            Map<String, String> response = new HashMap<>();
            response.put("status", "success");
            response.put("token", "admin-token-here");
            return ResponseEntity.ok(response);
        } else {
            Map<String, String> response = new HashMap<>();
            response.put("status", "error");
            response.put("message", "Invalid password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody LoginRequest request){
        System.out.println("=== REGISTER REQUEST RECEIVED ===");
        System.out.println("Password: " + request.password());
        return authorizationService.register(request.password());
    }

    
}
