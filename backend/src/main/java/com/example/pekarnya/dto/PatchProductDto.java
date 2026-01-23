package com.example.pekarnya.dto;

public record PatchProductDto(
    String name,
    String about,
    Integer price,
    String image,
    String imageBase64,
    String calories,
    String category,
    Boolean isActive
) {}
