package com.example.pekarnya.entities;


import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor
@Builder
@EqualsAndHashCode(of = "id")
public class Product {
    @Id @GeneratedValue
    private UUID id;

    private String name;

    @Column(length = 2000)
    private String about;

    private int price;
    private String image;
    private String calories;

    @ManyToOne(fetch = FetchType.LAZY)
    private Category category;

    @Column(name = "is_active")
    private boolean isActive = true;

    private int stock = 0;
}
