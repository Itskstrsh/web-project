package com.example.pekarnya.controllers;


import com.example.pekarnya.dto.ProductDto;
import com.example.pekarnya.services.AvailabilityBroadcaster;
import com.example.pekarnya.services.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService products;
    private final AvailabilityBroadcaster broadcaster;

    @GetMapping("/products")
    public List<ProductDto> products() {
        return products.publicList();
    }

    @GetMapping(value = "/availability/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter availability() {
        return broadcaster.subscribe();
    }
}
