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
public class Category {
    @Id @GeneratedValue
    private UUID id;

    @Column(unique = true, nullable = false)
    private String name;
}
