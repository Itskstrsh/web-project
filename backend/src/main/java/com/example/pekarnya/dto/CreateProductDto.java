package com.example.pekarnya.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public record CreateProductDto(
    @NotBlank(message = "Название обязательно")
    String name,
    
    @NotBlank(message = "Описание обязательно")
    String about,
    
    @Min(value = 0, message = "Цена не может быть отрицательной")
    int price,
    
    String image,           // URL изображения
    String imageBase64,     // Base64 строка изображения
    
    @NotBlank(message = "Вес/калории обязательны")
    String calories,
    
    @NotBlank(message = "Категория обязательна")
    String category,
    
    @Min(value = 0, message = "Количество не может быть отрицательным")
    int stock
) {}
