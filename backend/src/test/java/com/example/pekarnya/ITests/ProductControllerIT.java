package com.example.pekarnya.ITests;

import com.example.pekarnya.controllers.ProductController;
import com.example.pekarnya.dto.ProductDto;
import com.example.pekarnya.services.AvailabilityBroadcaster;
import com.example.pekarnya.services.ProductService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.*;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ProductController.class)
class ProductControllerIT {

    @Autowired MockMvc mvc;

    @MockBean ProductService products;
    @MockBean AvailabilityBroadcaster broadcaster;

    @Test
    void availability_stream_startsAsync_andSubscribes() throws Exception {
        when(broadcaster.subscribe()).thenReturn(new SseEmitter(0L));

        mvc.perform(get("/api/availability/stream"))
                .andExpect(request().asyncStarted())
                .andExpect(status().isOk());

        verify(broadcaster, times(1)).subscribe();
        verifyNoMoreInteractions(broadcaster);
    }

    @Test
    void getProducts_returnsList() throws Exception {
        var dto = new ProductDto(
                UUID.randomUUID(), "Croissant", "fresh butter croissant",
                250, "img.png", "450 kcal", "bakery", true, 12
        );
        when(products.publicList()).thenReturn(List.of(dto));

        mvc.perform(get("/api/products"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].name").value("Croissant"))
                .andExpect(jsonPath("$[0].price").value(250));

        verify(products).publicList();
    }
}
