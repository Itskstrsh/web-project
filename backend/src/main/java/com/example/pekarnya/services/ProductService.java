package com.example.pekarnya.services;

import com.example.pekarnya.entities.Category;
import com.example.pekarnya.entities.Product;
import com.example.pekarnya.dto.*;
import com.example.pekarnya.repository.CategoryRepo;
import com.example.pekarnya.repository.ProductRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional
public class ProductService {
    private final ProductRepo products;
    private final CategoryRepo categories;
    private final AvailabilityBroadcaster broadcaster;

    public List<ProductDto> publicList() {
        return products.findByIsActiveTrue().stream().map(this::toDto).toList();
    }

    public List<ProductDto> adminList(Optional<String> category) {
        var list = category.map(products::findByCategory_Name).orElseGet(products::findAll);
        return list.stream().map(this::toDto).toList();
    }

    public ProductDto create(CreateProductDto dto) {
        Category cat = categories.findByName(dto.category())
                .orElseGet(() -> categories.save(newCategory(dto.category())));
        Product p = Product.builder()
                .name(dto.name())
                .about(dto.about())
                .price(dto.price())
                .image(dto.image())
                .calories(dto.calories())
                .category(cat)
                .isActive(true)
                .stock(0)
                .build();
        return toDto(products.save(p));
    }

    public void deleteProduct(UUID id) { products.deleteById(id); }

    public void deleteCategory(UUID id) { categories.deleteById(id); }

    public CategoryDto createCategory(String name) {
        Category c = categories.save(newCategory(name));
        return new CategoryDto(c.getId(), c.getName());
    }

    public ProductDto patch(UUID id, PatchProductDto dto) {
        Product p = products.findById(id).orElseThrow();
        if (dto.name() != null) p.setName(dto.name());
        if (dto.about() != null) p.setAbout(dto.about());
        if (dto.price() != null) p.setPrice(dto.price());
        if (dto.image() != null) p.setImage(dto.image());
        if (dto.calories() != null) p.setCalories(dto.calories());
        if (dto.category() != null) {
            Category cat = categories.findByName(dto.category())
                    .orElseGet(() -> categories.save(newCategory(dto.category())));
            p.setCategory(cat);
        }
        if (dto.isActive() != null) p.setActive(dto.isActive());
        return toDto(p);
    }

    public ProductDto patchStock(UUID id, int stock) {
        Product p = products.findById(id).orElseThrow();
        p.setStock(stock);
        var saved = products.save(p);
        broadcaster.publish(new AvailabilityEvent(saved.getId(), saved.getStock(), saved.isActive()));
        return toDto(saved);
    }

    private Category newCategory(String name) {
        return Category.builder().name(name).build();
    }

    private ProductDto toDto(Product p) {
        return new ProductDto(
                p.getId(), p.getName(), p.getAbout(), p.getPrice(),
                p.getImage(), p.getCalories(),
                p.getCategory() != null ? p.getCategory().getName() : null,
                p.isActive(), p.getStock()
        );
    }
}
