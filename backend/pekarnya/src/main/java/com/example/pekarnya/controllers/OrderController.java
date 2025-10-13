package com.example.pekarnya.controllers;


import com.example.pekarnya.dto.OrderDto;
import com.example.pekarnya.services.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orders;

    @PostMapping("/orders")
    public ResponseEntity<Void> create(@RequestBody @Valid OrderDto dto) {
        orders.create(dto);
        return ResponseEntity.accepted().build();
    }
}
