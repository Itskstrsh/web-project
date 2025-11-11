package com.example.pekarnya.dto;

import java.util.UUID;

public record ProductDto(
        UUID id,
        String name,
        String about,
        int price,
        String image,
        String calories,
        String category,
        boolean isActive,
        int stock
) {}