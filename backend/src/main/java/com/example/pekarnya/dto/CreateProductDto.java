package com.example.pekarnya.dto;

import jakarta.validation.constraints.*;

public record CreateProductDto(
        @NotBlank String name,
        @NotBlank String about,
        @Min(0) int price,
        @NotBlank String image,
        @NotBlank String calories,
        @NotBlank String category
) {}
