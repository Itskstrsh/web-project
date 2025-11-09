package com.example.pekarnya.unitTests;

import com.example.pekarnya.dto.*;
import com.example.pekarnya.entities.Category;
import com.example.pekarnya.entities.Product;
import com.example.pekarnya.repository.CategoryRepo;
import com.example.pekarnya.repository.ProductRepo;
import com.example.pekarnya.services.AvailabilityBroadcaster;
import com.example.pekarnya.services.ProductService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import java.util.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

class ProductServiceTest {

    @Mock ProductRepo products;
    @Mock CategoryRepo categories;
    @Mock
    AvailabilityBroadcaster broadcaster;
    @InjectMocks
    ProductService service;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    private Product sampleProduct() {
        Category cat = Category.builder().id(UUID.randomUUID()).name("bread").build();
        return Product.builder()
                .id(UUID.randomUUID())
                .name("Багет")
                .about("Французский хлеб")
                .price(120)
                .image("baguette.png")
                .calories("210")
                .category(cat)
                .isActive(true)
                .stock(3)
                .build();
    }


    @Test
    void publicList_returnsOnlyActiveProducts() {
        when(products.findByIsActiveTrue()).thenReturn(List.of(sampleProduct()));

        var result = service.publicList();

        assertThat(result).hasSize(1);
        assertThat(result.get(0).name()).isEqualTo("Багет");
        verify(products).findByIsActiveTrue();
    }

    @Test
    void adminList_withoutCategory_returnsAll() {
        when(products.findAll()).thenReturn(List.of(sampleProduct()));

        var res = service.adminList(Optional.empty());

        assertThat(res).hasSize(1);
        verify(products).findAll();
    }

    @Test
    void adminList_withCategory_filtersByCategory() {
        when(products.findByCategory_Name("bread")).thenReturn(List.of(sampleProduct()));

        var res = service.adminList(Optional.of("bread"));

        assertThat(res).hasSize(1);
        verify(products).findByCategory_Name("bread");
    }


    @Test
    void create_withExistingCategory_reusesIt() {
        var cat = Category.builder().id(UUID.randomUUID()).name("bread").build();
        when(categories.findByName("bread")).thenReturn(Optional.of(cat));

        var saved = sampleProduct();
        when(products.save(any())).thenReturn(saved);

        var dto = new CreateProductDto("Багет","desc",120,"img","cal","bread");
        var res = service.create(dto);

        assertThat(res.category()).isEqualTo("bread");
        verify(categories, never()).save(any());
        verify(products).save(any(Product.class));
    }

    @Test
    void create_withNewCategory_savesCategory() {
        when(categories.findByName("newcat")).thenReturn(Optional.empty());
        when(categories.save(any())).thenAnswer(a -> a.getArgument(0));

        var p = sampleProduct();
        when(products.save(any())).thenReturn(p);

        var dto = new CreateProductDto("Новый","desc",100,"img","cal","newcat");
        service.create(dto);

        verify(categories).save(any(Category.class));
    }


    @Test
    void deleteProduct_callsRepository() {
        UUID id = UUID.randomUUID();
        service.deleteProduct(id);
        verify(products).deleteById(id);
    }

    @Test
    void deleteCategory_callsRepository() {
        UUID id = UUID.randomUUID();
        service.deleteCategory(id);
        verify(categories).deleteById(id);
    }


    @Test
    void createCategory_savesAndReturnsDto() {
        var cat = Category.builder().id(UUID.randomUUID()).name("drinks").build();
        when(categories.save(any())).thenReturn(cat);

        var dto = service.createCategory("drinks");

        assertThat(dto.name()).isEqualTo("drinks");
        verify(categories).save(any(Category.class));
    }


    @Test
    void patch_updatesFieldsAndCategory() {
        Product prod = sampleProduct();
        when(products.findById(prod.getId())).thenReturn(Optional.of(prod));

        var patch = new PatchProductDto("Батон","новый",200,"img2","300","newcat",false);
        when(categories.findByName("newcat")).thenReturn(Optional.empty());
        when(categories.save(any())).thenAnswer(a -> a.getArgument(0));

        var res = service.patch(prod.getId(), patch);

        assertThat(res.name()).isEqualTo("Батон");
        assertThat(prod.getPrice()).isEqualTo(200);
        verify(categories).save(any(Category.class));
    }


    @Test
    void patchStock_updatesAndPublishesEvent() {
        Product prod = sampleProduct();
        when(products.findById(prod.getId())).thenReturn(Optional.of(prod));
        when(products.save(any())).thenAnswer(a -> a.getArgument(0));

        var res = service.patchStock(prod.getId(), 9);

        assertThat(res.stock()).isEqualTo(9);
        verify(broadcaster).publish(any());
        verify(products).save(any(Product.class));
    }
}
