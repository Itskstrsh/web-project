package com.example.pekarnya.controllers;

import com.example.pekarnya.dto.*;
import com.example.pekarnya.services.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {
    private final ProductService productService;

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
}
