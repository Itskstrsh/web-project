package com.example.pekarnya.services;

import com.example.pekarnya.entities.*;
import com.example.pekarnya.dto.OrderDto;
import com.example.pekarnya.repository.OrderRepo;
import com.example.pekarnya.repository.ProductRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderService {
    private final ProductRepo products;
    private final OrderRepo orders;
    private final ProductService productService;

    public void create(OrderDto dto) {
        Order o = Order.builder()
                .customerPhone(dto.customer().phone())
                .preferredContact(dto.customer().preferredContact())
                .deliveryType(dto.delivery().type())
                .address(dto.delivery().address())
                .date(dto.delivery().date())
                .time(dto.delivery().time())
                .build();

        dto.items().forEach(it -> {
            Product p = products.findById(it.id()).orElseThrow();
            if (p.getStock() < it.amount()) throw new IllegalStateException("Not enough stock for " + p.getName());
            p.setStock(p.getStock() - it.amount());
            productService.patchStock(p.getId(), p.getStock());

            OrderItem oi = OrderItem.builder()
                    .product(p)
                    .amount(it.amount())
                    .build();
            o.addItem(oi);
        });

        orders.save(o);
    }
}

