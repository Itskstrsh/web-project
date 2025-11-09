package com.example.pekarnya.dto;

import java.util.UUID;

public record AvailabilityEvent(UUID id, int stock, boolean isActive) {}
