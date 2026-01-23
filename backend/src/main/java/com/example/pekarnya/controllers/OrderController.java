package com.example.pekarnya.controllers;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.pekarnya.dto.OrderDto;
import com.example.pekarnya.services.OrderService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService ordersService;

    @PostMapping("/orders")
    public ResponseEntity<Void> create(@RequestBody @Valid OrderDto order) {
        ordersService.create(order);
        return ResponseEntity.accepted().build();
    }
}
