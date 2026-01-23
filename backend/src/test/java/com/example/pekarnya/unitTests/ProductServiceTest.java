package com.example.pekarnya.unitTests;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import java.util.Optional;
import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.example.pekarnya.dto.CreateProductDto;
import com.example.pekarnya.dto.PatchProductDto;
import com.example.pekarnya.dto.ProductDto;
import com.example.pekarnya.entities.Category;
import com.example.pekarnya.entities.Product;
import com.example.pekarnya.repository.CategoryRepo;
import com.example.pekarnya.repository.ProductRepo;
import com.example.pekarnya.services.ProductService;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock
    private ProductRepo productRepo;

    @Mock
    private CategoryRepo categoryRepo;

    @InjectMocks
    private ProductService productService;

    private Product testProduct;
    private Category testCategory;
    private UUID testId;

    @BeforeEach
    void setUp() {
        testId = UUID.randomUUID();
        testCategory = Category.builder()
                .id(testId)
                .name("Пельмени")
                .build();

        testProduct = Product.builder()
                .id(testId)
                .name("Пельмени классические")
                .about("Вкусные пельмени")
                .price(450)
                .image("/uploads/test.jpg")
                .calories("500 г")
                .category(testCategory)
                .isActive(true)
                .stock(10)
                .build();
    }

    @Test
    void createProduct_ShouldCreateAndReturnProductDto() {
        // Arrange
        CreateProductDto createDto = new CreateProductDto(
                "Пельмени классические",
                "Вкусные пельмени",
                450,
                "/uploads/test.jpg",      // image
                null,                      // imageBase64 (может быть null)
                "500 г",                   // calories
                "Пельмени",                // category
                10                         // stock
        );

        when(categoryRepo.findByName("Пельмени")).thenReturn(Optional.of(testCategory));
        when(productRepo.save(any(Product.class))).thenReturn(testProduct);

        // Act
        ProductDto result = productService.create(createDto);

        // Assert
        assertThat(result).isNotNull();
        assertThat(result.name()).isEqualTo("Пельмени классические");
        assertThat(result.price()).isEqualTo(450);
        assertThat(result.category()).isEqualTo("Пельмени");
        verify(productRepo, times(1)).save(any(Product.class));
    }

    @Test
    void createProduct_WithNewCategory_ShouldCreateCategoryAndProduct() {
        // Arrange
        CreateProductDto createDto = new CreateProductDto(
                "Новый продукт",
                "Описание нового продукта",
                300,
                "/uploads/new.jpg",        // image
                null,                      // imageBase64
                "400 г",                   // calories
                "Новая категория",         // category
                5                          // stock
        );

        Category newCategory = Category.builder()
                .id(UUID.randomUUID())
                .name("Новая категория")
                .build();

        Product newProduct = Product.builder()
                .id(UUID.randomUUID())
                .name("Новый продукт")
                .about("Описание нового продукта")
                .price(300)
                .image("/uploads/new.jpg")
                .calories("400 г")
                .category(newCategory)
                .isActive(true)
                .stock(5)
                .build();

        when(categoryRepo.findByName("Новая категория")).thenReturn(Optional.empty());
        when(categoryRepo.save(any(Category.class))).thenReturn(newCategory);
        when(productRepo.save(any(Product.class))).thenReturn(newProduct);

        // Act
        ProductDto result = productService.create(createDto);

        // Assert
        assertThat(result).isNotNull();
        assertThat(result.name()).isEqualTo("Новый продукт");
        assertThat(result.category()).isEqualTo("Новая категория");
        verify(categoryRepo, times(1)).save(any(Category.class));
    }

    @Test
    void patchProduct_ShouldUpdateProductAndReturnDto() {
        // Arrange
        PatchProductDto patchDto = new PatchProductDto(
                "Обновленное название",    // name
                "Обновленное описание",    // about
                500,                       // price (Integer, not int)
                "/uploads/updated.jpg",    // image
                null,                      // imageBase64
                "600 г",                   // calories
                "Обновленная категория",   // category
                false                      // isActive (Boolean, not boolean)
        );

        Category updatedCategory = Category.builder()
                .id(UUID.randomUUID())
                .name("Обновленная категория")
                .build();

        Product updatedProduct = Product.builder()
                .id(testId)
                .name("Обновленное название")
                .about("Обновленное описание")
                .price(500)
                .image("/uploads/updated.jpg")
                .calories("600 г")
                .category(updatedCategory)
                .isActive(false)
                .stock(10)
                .build();

        when(productRepo.findById(testId)).thenReturn(Optional.of(testProduct));
        when(categoryRepo.findByName("Обновленная категория")).thenReturn(Optional.of(updatedCategory));
        when(productRepo.save(any(Product.class))).thenReturn(updatedProduct);

        // Act
        ProductDto result = productService.patch(testId, patchDto);

        // Assert
        assertThat(result).isNotNull();
        assertThat(result.name()).isEqualTo("Обновленное название");
        assertThat(result.price()).isEqualTo(500);
        assertThat(result.category()).isEqualTo("Обновленная категория");
        assertThat(result.isActive()).isFalse();
    }

    @Test
    void patchProduct_WithPartialUpdate_ShouldUpdateOnlyProvidedFields() {
        // Arrange
        PatchProductDto patchDto = new PatchProductDto(
                null,                      // name (не обновляем)
                "Новое описание",          // about
                null,                      // price (не обновляем)
                null,                      // image (не обновляем)
                null,                      // imageBase64 (не обновляем)
                null,                      // calories (не обновляем)
                null,                      // category (не обновляем)
                null                       // isActive (не обновляем)
        );

        when(productRepo.findById(testId)).thenReturn(Optional.of(testProduct));
        when(productRepo.save(any(Product.class))).thenReturn(testProduct);

        // Act
        ProductDto result = productService.patch(testId, patchDto);

        // Assert
        assertThat(result).isNotNull();
        assertThat(result.about()).isEqualTo("Новое описание");
        // Остальные поля должны остаться прежними
        assertThat(result.name()).isEqualTo("Пельмени классические");
        assertThat(result.price()).isEqualTo(450);
    }

    @Test
    void createProduct_WithBase64Image_ShouldProcessBase64() {
        // Arrange
        String base64Image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
        
        CreateProductDto createDto = new CreateProductDto(
                "Продукт с base64",
                "Описание",
                250,
                null,                      // image (null, используем base64)
                base64Image,               // imageBase64
                "300 г",                   // calories
                "Пельмени",                // category
                15                         // stock
        );

        when(categoryRepo.findByName("Пельмени")).thenReturn(Optional.of(testCategory));
        when(productRepo.save(any(Product.class))).thenAnswer(invocation -> {
            Product savedProduct = invocation.getArgument(0);
            // Проверяем, что изображение было обработано
            assertThat(savedProduct.getImage()).isNotNull();
            return savedProduct;
        });

        // Act
        ProductDto result = productService.create(createDto);

        // Assert
        assertThat(result).isNotNull();
        verify(productRepo, times(1)).save(any(Product.class));
    }

    @Test
    void patchProduct_WithBase64Image_ShouldUpdateImage() {
        // Arrange
        String base64Image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
        
        PatchProductDto patchDto = new PatchProductDto(
                null,                      // name
                null,                      // about
                null,                      // price
                null,                      // image (null, используем base64)
                base64Image,               // imageBase64
                null,                      // calories
                null,                      // category
                null                       // isActive
        );

        when(productRepo.findById(testId)).thenReturn(Optional.of(testProduct));
        when(productRepo.save(any(Product.class))).thenAnswer(invocation -> {
            Product savedProduct = invocation.getArgument(0);
            // Проверяем, что изображение было обновлено
            assertThat(savedProduct.getImage()).isNotNull();
            return savedProduct;
        });

        // Act
        ProductDto result = productService.patch(testId, patchDto);

        // Assert
        assertThat(result).isNotNull();
        verify(productRepo, times(1)).save(any(Product.class));
    }
}