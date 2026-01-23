package com.example.pekarnya.services;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.pekarnya.dto.AvailabilityEvent;
import com.example.pekarnya.dto.CategoryDto;
import com.example.pekarnya.dto.CreateProductDto;
import com.example.pekarnya.dto.PatchProductDto;
import com.example.pekarnya.dto.ProductDto;
import com.example.pekarnya.entities.Category;
import com.example.pekarnya.entities.Product;
import com.example.pekarnya.repository.CategoryRepo;
import com.example.pekarnya.repository.ProductRepo;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class ProductService {
    private final ProductRepo products;
    private final CategoryRepo categories;
    private final AvailabilityBroadcaster broadcaster;
    private final ImageUtils imageUtils;

    public List<ProductDto> publicList() {
        return products.findByIsActiveTrue().stream().map(this::toDto).toList();
    }

    public List<ProductDto> adminList(Optional<String> category) {
        var list = category.map(products::findByCategory_Name).orElseGet(products::findAll);
        return list.stream().map(this::toDto).toList();
    }

    public ProductDto create(CreateProductDto dto) {
        log.info("=== CREATE PRODUCT START ===");
        log.info("Name: '{}', Category: '{}', Price: {}", 
            dto.name(), dto.category(), dto.price());
        log.info("Has imageBase64: {}", dto.imageBase64() != null && !dto.imageBase64().isEmpty());
        
        try {
            // Проверяем изображение ДО создания продукта
            String imageUrl = null;
            boolean imageProcessed = false;
            
            if (dto.imageBase64() != null && !dto.imageBase64().trim().isEmpty()) {
                log.info("Processing image base64 (length: {})", dto.imageBase64().length());
                
                // Логируем первые символы для отладки
                String preview = dto.imageBase64().substring(0, Math.min(100, dto.imageBase64().length()));
                log.info("Base64 preview: {}...", preview);
                
                try {
                    long startTime = System.currentTimeMillis();
                    imageUrl = imageUtils.saveBase64Image(dto.imageBase64());
                    long processTime = System.currentTimeMillis() - startTime;
                    
                    log.info("Image saved to: '{}' (processed in {}ms)", imageUrl, processTime);
                    imageProcessed = true;
                    
                    // ВАЖНО: Проверяем что URL не null и не пустой
                    if (imageUrl == null || imageUrl.trim().isEmpty()) {
                        log.warn("ImageUtils вернул пустой URL!");
                        imageUrl = null;
                    } else {
                        // Проверяем существует ли файл физически
                        if (imageUrl.startsWith("/uploads/")) {
                            String filename = imageUrl.substring("/uploads/".length());
                            Path filePath = Paths.get("uploads", filename);
                            boolean fileExists = Files.exists(filePath);
                            log.info("Physical file check - Path: {}, Exists: {}", 
                                filePath.toAbsolutePath(), fileExists);
                            
                            if (fileExists) {
                                long fileSize = Files.size(filePath);
                                log.info("File size: {} bytes", fileSize);
                            } else {
                                log.error("⚠ Файл не создан на диске!");
                            }
                        }
                    }
                    
                } catch (Exception e) {
                    log.error("❌ Failed to save image: {}", e.getMessage(), e);
                    // Продолжаем без изображения
                    imageUrl = null;
                }
            } else if (dto.image() != null && !dto.image().trim().isEmpty()) {
                log.info("Using provided image URL: {}", dto.image());
                imageUrl = dto.image();
            } else {
                log.info("No image provided");
            }
            
            log.info("Final image URL: '{}'", imageUrl);
            
            // Находим или создаем категорию
            Category cat = categories.findByName(dto.category())
                    .orElseGet(() -> {
                        log.info("Creating new category: '{}'", dto.category());
                        return categories.save(newCategory(dto.category()));
                    });
            
            log.info("Category found/created: {}", cat.getName());
            
            // Создаем продукт
            Product product = Product.builder()
                    .name(dto.name())
                    .about(dto.about())
                    .price(dto.price())
                    .image(imageUrl)
                    .calories(dto.calories())
                    .category(cat)
                    .isActive(true)
                    .stock(dto.stock())
                    .build();
            
            log.info("Saving product to database...");
            Product savedProduct = products.save(product);
            log.info("✅ Product saved with ID: {}", savedProduct.getId());
            
            // Создаем DTO для ответа
            ProductDto resultDto = toDto(savedProduct);
            log.info("Returning DTO - Image field: '{}'", resultDto.image());
            log.info("Image field length: {}", 
                resultDto.image() != null ? resultDto.image().length() : 0);
            
            log.info("=== CREATE PRODUCT COMPLETE ===");
            return resultDto;
            
        } catch (Exception e) {
            log.error("=== CREATE PRODUCT FAILED ===", e);
            throw new RuntimeException("Failed to create product: " + e.getMessage(), e);
        }
    }

    public void deleteProduct(UUID id) { 
        log.info("Deleting product with ID: {}", id);
        products.findById(id).ifPresent(product -> {
            try {
                if (product.getImage() != null) {
                    log.info("Deleting image file: {}", product.getImage());
                    imageUtils.deleteOldImage(product.getImage());
                }
            } catch (IOException e) {
                log.warn("Failed to delete image for product {}: {}", id, e.getMessage());
            }
            products.delete(product);
            log.info("✅ Product deleted: {}", id);
        });
    }

    public void deleteCategory(UUID id) { 
        log.info("Deleting category with ID: {}", id);
        categories.deleteById(id); 
    }

    public CategoryDto createCategory(String name) {
        log.info("Creating new category: {}", name);
        Category c = categories.save(newCategory(name));
        return new CategoryDto(c.getId(), c.getName());
    }

    public ProductDto patch(UUID id, PatchProductDto dto) {
        log.info("=== PATCH PRODUCT START ===");
        log.info("Product ID: {}", id);
        
        try {
            Product product = products.findById(id).orElseThrow(() -> 
                new RuntimeException("Product not found: " + id));
            
            log.info("Found product: {}", product.getName());
            
            // Обновляем поля
            boolean changed = false;
            
            if (dto.name() != null && !dto.name().equals(product.getName())) {
                log.info("Updating name: '{}' -> '{}'", product.getName(), dto.name());
                product.setName(dto.name());
                changed = true;
            }
            
            if (dto.about() != null && !dto.about().equals(product.getAbout())) {
                log.info("Updating about");
                product.setAbout(dto.about());
                changed = true;
            }
            
            if (dto.price() != null && !dto.price().equals(product.getPrice())) {
                log.info("Updating price: {} -> {}", product.getPrice(), dto.price());
                product.setPrice(dto.price());
                changed = true;
            }
            
            if (dto.calories() != null && !dto.calories().equals(product.getCalories())) {
                log.info("Updating calories: '{}' -> '{}'", 
                    product.getCalories(), dto.calories());
                product.setCalories(dto.calories());
                changed = true;
            }
            
            // Обработка изображения
            boolean hasNewImage = (dto.imageBase64() != null && !dto.imageBase64().trim().isEmpty()) ||
                                 (dto.image() != null && !dto.image().trim().isEmpty());
            
            if (hasNewImage) {
                log.info("Processing new image...");
                String oldImage = product.getImage();
                
                if (oldImage != null) {
                    log.info("Deleting old image: {}", oldImage);
                    try {
                        imageUtils.deleteOldImage(oldImage);
                    } catch (IOException e) {
                        log.warn("Failed to delete old image: {}", e.getMessage());
                    }
                }
                
                String newImageUrl = processImage(dto.image(), dto.imageBase64());
                log.info("New image URL: '{}'", newImageUrl);
                
                product.setImage(newImageUrl);
                changed = true;
            }
            
            if (dto.category() != null) {
                String currentCategory = product.getCategory() != null ? 
                    product.getCategory().getName() : null;
                
                if (!dto.category().equals(currentCategory)) {
                    log.info("Updating category: '{}' -> '{}'", currentCategory, dto.category());
                    
                    Category cat = categories.findByName(dto.category())
                            .orElseGet(() -> {
                                log.info("Creating new category: '{}'", dto.category());
                                return categories.save(newCategory(dto.category()));
                            });
                    
                    product.setCategory(cat);
                    changed = true;
                }
            }
            
            if (dto.isActive() != null && dto.isActive() != product.isActive()) {
                log.info("Updating active status: {} -> {}", product.isActive(), dto.isActive());
                product.setActive(dto.isActive());
                changed = true;
            }
            
            if (changed) {
                log.info("Saving updated product...");
                Product saved = products.save(product);
                log.info("✅ Product updated successfully");
                log.info("=== PATCH PRODUCT COMPLETE ===");
                return toDto(saved);
            } else {
                log.info("No changes detected, returning current product");
                log.info("=== PATCH PRODUCT COMPLETE (no changes) ===");
                return toDto(product);
            }
            
        } catch (Exception e) {
            log.error("=== PATCH PRODUCT FAILED ===", e);
            throw new RuntimeException("Failed to update product: " + e.getMessage(), e);
        }
    }

    public ProductDto patchStock(UUID id, int stock) {
        log.info("Updating stock for product {}: {}", id, stock);
        Product product = products.findById(id).orElseThrow(() -> 
            new RuntimeException("Product not found: " + id));
        
        product.setStock(stock);
        var saved = products.save(product);
        
        broadcaster.publish(new AvailabilityEvent(
            saved.getId(), saved.getStock(), saved.isActive()
        ));
        
        log.info("✅ Stock updated successfully");
        return toDto(saved);
    }

    /**
     * Обрабатывает изображение: сохраняет base64 или использует готовый URL
     */
    private String processImage(String imageUrl, String imageBase64) throws IOException {
        log.info("Processing image - URL: {}, Base64 present: {}", 
            imageUrl, imageBase64 != null && !imageBase64.isEmpty());
        
        // Приоритет у base64
        if (imageBase64 != null && !imageBase64.trim().isEmpty()) {
            log.info("Saving base64 image (length: {})", imageBase64.length());
            
            // Логируем формат
            if (imageBase64.startsWith("data:image")) {
                log.info("✓ Valid image format");
                String mimeType = imageBase64.substring(5, imageBase64.indexOf(";"));
                log.info("Image MIME type: {}", mimeType);
            } else {
                log.warn("⚠ Image doesn't start with 'data:image'");
            }
            
            String savedUrl = imageUtils.saveBase64Image(imageBase64);
            log.info("ImageUtils returned URL: '{}'", savedUrl);
            return savedUrl;
            
        } else if (imageUrl != null && !imageUrl.trim().isEmpty()) {
            log.info("Using provided image URL: {}", imageUrl);
            return imageUrl;
        }
        
        log.info("No image data provided");
        return null;
    }

    private Category newCategory(String name) {
        log.debug("Creating category entity for: {}", name);
        return Category.builder()
                .name(name)
                .build();
    }

    private ProductDto toDto(Product product) {
        log.debug("Converting Product to DTO: {}", product.getName());
        
        String image = product.getImage();
        log.debug("Product image field: '{}'", image);
        
        if (image != null) {
            log.debug("Image length: {}, starts with '/': {}", 
                image.length(), image.startsWith("/"));
        }
        
        return new ProductDto(
                product.getId(), 
                product.getName(), 
                product.getAbout(), 
                product.getPrice(),
                image, // Передаем как есть
                product.getCalories(),
                product.getCategory() != null ? product.getCategory().getName() : null,
                product.isActive(), 
                product.getStock()
        );
    }
    
    // Дополнительные методы для отладки
    
    public Optional<ProductDto> findById(UUID id) {
        return products.findById(id).map(this::toDto);
    }
    
    public boolean verifyImageExists(String imageUrl) {
        if (imageUrl == null || imageUrl.isEmpty()) {
            return false;
        }
        
        try {
            if (imageUrl.startsWith("/uploads/")) {
                String filename = imageUrl.substring("/uploads/".length());
                Path filePath = Paths.get("uploads", filename).toAbsolutePath();
                
                boolean exists = Files.exists(filePath);
                boolean readable = Files.isReadable(filePath);
                
                log.info("Image verification - URL: {}, Path: {}, Exists: {}, Readable: {}", 
                    imageUrl, filePath, exists, readable);
                
                return exists && readable;
            }
        } catch (Exception e) {
            log.error("Error verifying image: {}", e.getMessage());
        }
        
        return false;
    }
}