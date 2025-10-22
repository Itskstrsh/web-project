package com.example.pekarnya.ITests;

import com.example.pekarnya.controllers.OrderController;
import com.example.pekarnya.dto.OrderDto;
import com.example.pekarnya.services.OrderService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatcher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(OrderController.class)
class OrderControllerIT {

    @Autowired
    MockMvc mvc;

    @Autowired
    ObjectMapper objectMapper;

    @MockBean
    OrderService orders;

    @Test
    void createOrder_returns202_andDelegatesToService() throws Exception {
        // arrange: соберём валидный DTO
        UUID pid = UUID.randomUUID();
        OrderDto dto = new OrderDto(
                List.of(new OrderDto.Item(pid, 2)),
                new OrderDto.Customer("+70000000000", "phone"),
                new OrderDto.Delivery("courier", "Street 1, Apt 2",
                        LocalDate.of(2025, 12, 31), LocalTime.of(10, 30))
        );

        // act + assert
        mvc.perform(post("/api/orderss")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isAccepted());

        // verify: контроллер передал ровно наш заказ в сервис
        verify(orders, times(1)).create(argThat(eqOrder(dto)));
    }

    @Test
    void g32_demo_shouldFail_intentionally() {
        // Демонстрационный падающий IT для проверки блокировки CI (G3.2)
        org.junit.jupiter.api.Assertions.fail("G3.2 demo: IT intentionally failing");
    }


    @Test
    void createOrder_invalidBody_returns400() throws Exception {
        // ВНИМАНИЕ: тест сработает, только если в OrderDto стоят валидационные аннотации.
        // Например: @NotEmpty на items, @NotBlank на phone, @Min(1) на amount и т.д.
        String invalidJson = """
            {"items":[{"id":"%s","amount":0}],
             "customer":{"phone":"","preferredContact":"phone"},
             "delivery":{"type":"courier","address":"","date":null,"time":null}}
            """.formatted(UUID.randomUUID());

        mvc.perform(post("/api/orders")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(invalidJson))
                .andExpect(status().isBadRequest());
    }

    // ---- helpers ----
    private static ArgumentMatcher<OrderDto> eqOrder(OrderDto expected) {
        return actual ->
                actual != null &&
                        actual.items() != null &&
                        actual.items().size() == expected.items().size() &&
                        actual.items().getFirst().id().equals(expected.items().getFirst().id()) &&
                        actual.items().getFirst().amount() == expected.items().getFirst().amount() &&
                        actual.customer().phone().equals(expected.customer().phone()) &&
                        actual.customer().preferredContact().equals(expected.customer().preferredContact()) &&
                        actual.delivery().type().equals(expected.delivery().type()) &&
                        actual.delivery().address().equals(expected.delivery().address()) &&
                        actual.delivery().date().equals(expected.delivery().date()) &&
                        actual.delivery().time().equals(expected.delivery().time());
    }
}
