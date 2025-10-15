package com.example.pekarnya.entities;
import jakarta.persistence.*;
import lombok.*;
import static lombok.AccessLevel.PROTECTED;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;

@Entity
@Table(name = "orders")
@Getter @Setter
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor
@Builder
@EqualsAndHashCode(of = "id")
public class Order {
    @Id @GeneratedValue
    private UUID id;

    @Builder.Default
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> items = new ArrayList<>();

    private String customerPhone;
    private String preferredContact;

    private String deliveryType; // delivery / pickup
    private String address;
    private LocalDate date;
    private LocalTime time;

    @Builder.Default
    private String status = "created";

    public void addItem(OrderItem i){
        i.setOrder(this);
        items.add(i);
    }
}
