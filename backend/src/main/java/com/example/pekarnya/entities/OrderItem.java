package com.example.pekarnya.entities;

import jakarta.persistence.*;
import lombok.*;
import static lombok.AccessLevel.PROTECTED;
import java.util.UUID;

@Entity
@Getter @Setter
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor
@Builder
@EqualsAndHashCode(of = "id")
public class OrderItem {
    @Id @GeneratedValue
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY)
    private Product product;

    private int amount;
}
