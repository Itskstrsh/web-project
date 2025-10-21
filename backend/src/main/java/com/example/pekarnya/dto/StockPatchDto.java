package com.example.pekarnya.dto;

import jakarta.validation.constraints.Min;

public record StockPatchDto(@Min(0) int stock) {}