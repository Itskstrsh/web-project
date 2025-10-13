package com.example.pekarnya.ITests;

import com.example.pekarnya.controllers.AdminController;
import com.example.pekarnya.dto.CategoryDto;
import com.example.pekarnya.dto.ProductDto;
import com.example.pekarnya.services.ProductService;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = AdminController.class)
class AdminControllerTest {

    @Autowired
    MockMvc mvc;

    @MockBean
    ProductService products;

    private ProductDto sampleProduct(UUID id) {
        return new ProductDto(
                id,
                "Baguette",
                "Crispy french bread",
                199,
                "bag.png",
                "230 kcal",
                "bread",
                true,
                7
        );
    }

    // GET /api/admin/products
    @Test
    void allProducts_returnsWrappedList() throws Exception {
        var id = UUID.randomUUID();
        when(products.adminList(Optional.empty())).thenReturn(List.of(sampleProduct(id)));

        mvc.perform(get("/api/admin/products"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.items", Matchers.hasSize(1)))
                .andExpect(jsonPath("$.items[0].id").value(id.toString()))
                .andExpect(jsonPath("$.items[0].name").value("Baguette"));

        verify(products, times(1)).adminList(Optional.empty());
    }

    // GET /api/admin/products/{category}
    @Test
    void productsByCategory_filtersByCategory() throws Exception {
        var id = UUID.randomUUID();
        when(products.adminList(Optional.of("bread"))).thenReturn(List.of(sampleProduct(id)));

        mvc.perform(get("/api/admin/products/bread"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.items[0].category").value("bread"));

        ArgumentCaptor<Optional<String>> captor = ArgumentCaptor.forClass(Optional.class);
        verify(products).adminList(captor.capture());
        assert captor.getValue().isPresent() && captor.getValue().get().equals("bread");
    }

    // POST /api/admin/product
    @Test
    void createProduct_returnsDto() throws Exception {
        var id = UUID.randomUUID();
        when(products.create(any())).thenReturn(sampleProduct(id));

        String body = """
                {
                  "name":"Baguette",
                  "about":"Crispy french bread",
                  "price":199,
                  "image":"bag.png",
                  "calories":"230 kcal",
                  "category":"bread"
                }
                """;

        mvc.perform(post("/api/admin/product")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(id.toString()))
                .andExpect(jsonPath("$.name").value("Baguette"));

        verify(products, times(1)).create(any());
    }

    // PATCH /api/admin/product/{id}
    @Test
    void patchProduct_returnsUpdatedDto() throws Exception {
        var id = UUID.randomUUID();
        var updated = new ProductDto(
                id, "New Name", "Crispy french bread", 249,
                "bag-2.png", "230 kcal", "bread", true, 7
        );
        when(products.patch(eq(id), any())).thenReturn(updated);

        String body = """
                {
                  "name":"New Name",
                  "price":249,
                  "image":"bag-2.png"
                }
                """;

        mvc.perform(patch("/api/admin/product/{id}", id)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("New Name"))
                .andExpect(jsonPath("$.price").value(249))
                .andExpect(jsonPath("$.image").value("bag-2.png"));

        verify(products).patch(eq(id), any());
    }

    // PATCH /api/admin/product/{id}/stock
    @Test
    void patchStock_updatesAndReturnsDto() throws Exception {
        var id = UUID.randomUUID();
        var dto = new ProductDto(
                id, "Baguette", "Crispy french bread", 199,
                "bag.png", "230 kcal", "bread", true, 15
        );
        when(products.patchStock(eq(id), eq(15))).thenReturn(dto);

        String body = """
                { "stock": 15 }
                """;

        mvc.perform(patch("/api/admin/product/{id}/stock", id)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.stock").value(15));

        verify(products).patchStock(id, 15);
    }

    // DELETE /api/admin/product/{id}
    @Test
    void deleteProduct_returns204() throws Exception {
        var id = UUID.randomUUID();

        mvc.perform(delete("/api/admin/product/{id}", id))
                .andExpect(status().isNoContent());

        verify(products).deleteProduct(id);
    }

    // POST /api/admin/category
    @Test
    void createCategory_returnsCategoryDto() throws Exception {
        var id = UUID.randomUUID();
        when(products.createCategory("bread")).thenReturn(new CategoryDto(id, "bread"));

        String body = """
                { "name": "bread" }
                """;

        mvc.perform(post("/api/admin/category")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(id.toString()))
                .andExpect(jsonPath("$.name").value("bread"));

        verify(products).createCategory("bread");
    }

    // DELETE /api/admin/category/{id}
    @Test
    void deleteCategory_returns204() throws Exception {
        var id = UUID.randomUUID();

        mvc.perform(delete("/api/admin/category/{id}", id))
                .andExpect(status().isNoContent());

        verify(products).deleteCategory(id);
    }
}
