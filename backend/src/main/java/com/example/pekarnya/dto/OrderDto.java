package com.example.pekarnya.dto;

import com.example.pekarnya.enums.ContactWay;
import com.example.pekarnya.enums.DeliveryType;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

public record OrderDto(
        @NotEmpty List<@Valid Item> items,
        @Valid Customer customer,
        @Valid Delivery delivery
) {

    public record Item(
            @NotNull UUID id,
            @Min(1) int amount
    ) { }

    public record Customer(
            @NotBlank String phone,
            @NotNull ContactWay contactWay
    ) { }

    public record Delivery(
            @NotNull DeliveryType deliveryType,
            @NotBlank String address,
            @NotNull LocalDate date,
            @NotNull LocalTime time
    ) { }
}
