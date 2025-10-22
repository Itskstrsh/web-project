package com.example.pekarnya.unitTests;

import com.example.pekarnya.dto.OrderDto;
import com.example.pekarnya.entities.Order;
import com.example.pekarnya.entities.OrderItem;
import com.example.pekarnya.entities.Product;
import com.example.pekarnya.repository.OrderRepo;
import com.example.pekarnya.repository.ProductRepo;
import com.example.pekarnya.services.OrderService;
import com.example.pekarnya.services.ProductService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static com.jayway.jsonpath.internal.path.PathCompiler.fail;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.*;

/** Unit tests for OrderService.create() */
class OrderServiceTest {

    @Mock private ProductRepo products;
    @Mock private OrderRepo orders;
    @Mock private ProductService productService;
    @InjectMocks private OrderService service;

    @Captor private ArgumentCaptor<Order> orderCaptor;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }


    private Product product(UUID id, String name, int stock) {
        return Product.builder()
                .id(id)
                .name(name)
                .stock(stock)
                .isActive(true)
                .build();
    }

    private OrderDto.Customer customer(String phone, String pref) {
        return new OrderDto.Customer(phone, pref);
    }

    private OrderDto.Delivery delivery(
            String type, String address, LocalDate date, LocalTime time
    ) {
        return new OrderDto.Delivery(type, address, date, time);
    }


    @Test
    void create_orderWithSingleItem_updatesStock_persistsOrder_andPublishes() {
        UUID pid = UUID.randomUUID();
        var p = product(pid, "Багет", 5);
        when(products.findById(pid)).thenReturn(Optional.of(p));
        when(orders.save(any())).thenAnswer(a -> a.getArgument(0));

        var dto = new OrderDto(
                List.of(new OrderDto.Item(pid, 2)),
                customer("+79990001122", "phone"),
                delivery("delivery", "ул. Пекарная, 1",
                        LocalDate.of(2025, 10, 15), LocalTime.of(10, 0))
        );

        service.create(dto);

        verify(productService).patchStock(pid, 3);
        verify(orders).save(orderCaptor.capture());

        Order saved = orderCaptor.getValue();
        assertThat(saved.getCustomerPhone()).isEqualTo("+79990001122");
        assertThat(saved.getPreferredContact()).isEqualTo("phone");
        assertThat(saved.getDeliveryType()).isEqualTo("delivery");
        assertThat(saved.getAddress()).isEqualTo("ул. Пекарная, 1");
        assertThat(saved.getDate()).isEqualTo(LocalDate.of(2025, 10, 15));
        assertThat(saved.getTime()).isEqualTo(LocalTime.of(10, 0));
        assertThat(saved.getItems()).hasSize(1);
        OrderItem it = saved.getItems().get(0);
        assertThat(it.getProduct()).isSameAs(p);
        assertThat(it.getAmount()).isEqualTo(2);
    }

    @Test
    void demo_shouldFail_forG31() {
        // Намеренно ломаем юнит-тест для демонстрации G3.1:
        fail("G3.1 demo: unit test intentionally failing");
    }

    @Test
    void create_orderWithMultipleItems_updatesEachStock_andSavesOrder() {
        UUID p1 = UUID.randomUUID();
        UUID p2 = UUID.randomUUID();
        var prod1 = product(p1, "Багет", 5);
        var prod2 = product(p2, "Круассан", 4);
        when(products.findById(p1)).thenReturn(Optional.of(prod1));
        when(products.findById(p2)).thenReturn(Optional.of(prod2));
        when(orders.save(any())).thenAnswer(a -> a.getArgument(0));

        var dto = new OrderDto(
                List.of(new OrderDto.Item(p1, 2), new OrderDto.Item(p2, 1)),
                customer("123", "telegram"),
                delivery("pickup", "ПВЗ",
                        LocalDate.of(2025, 10, 16), LocalTime.of(12, 30))
        );

        service.create(dto);

        verify(productService).patchStock(p1, 3);
        verify(productService).patchStock(p2, 3);
        verify(orders).save(orderCaptor.capture());
        assertThat(orderCaptor.getValue().getItems()).hasSize(2);
    }

    @Test
    void create_fails_whenNotEnoughStock() {
        UUID pid = UUID.randomUUID();
        var p = product(pid, "Эклер", 1);
        when(products.findById(pid)).thenReturn(Optional.of(p));

        var dto = new OrderDto(
                List.of(new OrderDto.Item(pid, 3)), // > stock
                customer("555", "phone"),
                delivery("delivery", "адрес",
                        LocalDate.of(2025, 10, 20), LocalTime.of(18, 0))
        );

        assertThatThrownBy(() -> service.create(dto))
                .isInstanceOf(IllegalStateException.class)
                .hasMessageContaining("Not enough stock");

        verify(productService, never()).patchStock(any(), anyInt());
        verify(orders, never()).save(any());
    }
}
