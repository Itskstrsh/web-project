package com.example.pekarnya.controllers;


import com.example.pekarnya.dto.OrderDto;
import com.example.pekarnya.services.OrderService;
import io.sentry.Sentry;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService ordersService;

    @PostMapping("/orders")
    public ResponseEntity<Void> create(@RequestBody @Valid OrderDto order) {
        try {
            throw new Exception("This is a test.");
        } catch (Exception e) {
            Sentry.captureException(e); //Sentry testing
        }
        ordersService.create(order);
        return ResponseEntity.accepted().build();
    }
}
