package com.example.pekarnya.services;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class ImageUtils {
    
    @Value("${app.upload.dir:uploads}")
    private String uploadDir;
    
    /**
     * Сохраняет base64 изображение в файл
     */
    public String saveBase64Image(String base64Image) throws IOException {
        log.info("=== SAVE BASE64 IMAGE START ===");
        
        try {
            if (base64Image == null || base64Image.isEmpty()) {
                log.warn("Empty base64 image");
                return null;
            }
            
            // Проверяем формат
            if (!base64Image.startsWith("data:image/")) {
                log.error("Invalid base64 format. Must start with 'data:image/'");
                throw new IllegalArgumentException("Invalid image format");
            }
            
            // Извлекаем данные
            String[] parts = base64Image.split(",");
            if (parts.length < 2) {
                log.error("Invalid base64 format - missing comma");
                throw new IllegalArgumentException("Invalid base64 format");
            }
            
            String imageData = parts[1];
            String mimeType = parts[0].split(":")[1].split(";")[0];
            String extension = getExtensionFromMimeType(mimeType);
            
            log.info("MIME type: {}, Extension: {}", mimeType, extension);
            
            // Декодируем base64
            byte[] imageBytes = Base64.getDecoder().decode(imageData);
            log.info("Decoded to {} bytes", imageBytes.length);
            
            // Создаем директорию
            Path uploadPath = Paths.get(uploadDir).toAbsolutePath();
            log.info("Upload path: {}", uploadPath);
            
            if (!Files.exists(uploadPath)) {
                log.info("Creating upload directory");
                Files.createDirectories(uploadPath);
            }
            
            // Проверяем права
            log.info("Directory writable: {}", Files.isWritable(uploadPath));
            
            // Генерируем уникальное имя файла
            String filename = UUID.randomUUID() + extension;
            Path filePath = uploadPath.resolve(filename);
            
            log.info("Saving file to: {}", filePath);
            
            // Сохраняем файл
            Files.write(filePath, imageBytes);
            
            String fileUrl = "/uploads/" + filename;
            log.info("File saved successfully. URL: {}", fileUrl);
            
            // Проверяем что файл создан
            if (Files.exists(filePath)) {
                long fileSize = Files.size(filePath);
                log.info("File exists, size: {} bytes", fileSize);
            } else {
                log.error("File was not created!");
            }
            
            log.info("=== SAVE BASE64 IMAGE COMPLETE ===");
            return fileUrl;
            
        } catch (Exception e) {
            log.error("=== SAVE BASE64 IMAGE FAILED ===", e);
            throw e;
        }
    }
    
    /**
     * Удаляет старое изображение по URL
     */
    public void deleteOldImage(String imageUrl) throws IOException {
        log.info("Deleting old image: {}", imageUrl);
        
        if (imageUrl == null || imageUrl.isEmpty()) {
            log.info("No image to delete");
            return;
        }
        
        if (imageUrl.startsWith("/uploads/")) {
            String filename = imageUrl.substring("/uploads/".length());
            Path filePath = Paths.get(uploadDir, filename).toAbsolutePath();
            
            log.info("File path to delete: {}", filePath);
            
            if (Files.exists(filePath)) {
                try {
                    Files.delete(filePath);
                    log.info("✅ Image file deleted: {}", filename);
                } catch (IOException e) {
                    log.error("Failed to delete image file: {}", e.getMessage());
                    throw e;
                }
            } else {
                log.warn("Image file not found: {}", filePath);
            }
        } else {
            log.warn("Image URL doesn't start with /uploads/: {}", imageUrl);
        }
    }
    
    /**
     * Проверяет существует ли файл изображения
     */
    public boolean checkImageExists(String imageUrl) {
        if (imageUrl == null || imageUrl.isEmpty()) {
            return false;
        }
        
        if (imageUrl.startsWith("/uploads/")) {
            String filename = imageUrl.substring("/uploads/".length());
            Path filePath = Paths.get(uploadDir, filename).toAbsolutePath();
            
            boolean exists = Files.exists(filePath);
            boolean readable = Files.isReadable(filePath);
            
            log.info("Image check - URL: {}, Path: {}, Exists: {}, Readable: {}", 
                imageUrl, filePath, exists, readable);
            
            return exists && readable;
        }
        
        return false;
    }
    
    /**
     * Получает размер файла изображения
     */
    public long getImageSize(String imageUrl) throws IOException {
        if (imageUrl == null || imageUrl.isEmpty()) {
            return 0;
        }
        
        if (imageUrl.startsWith("/uploads/")) {
            String filename = imageUrl.substring("/uploads/".length());
            Path filePath = Paths.get(uploadDir, filename);
            
            if (Files.exists(filePath)) {
                return Files.size(filePath);
            }
        }
        
        return 0;
    }
    
    private String getExtensionFromMimeType(String mimeType) {
        return switch (mimeType.toLowerCase()) {
            case "image/jpeg", "image/jpg" -> ".jpg";
            case "image/png" -> ".png";
            case "image/gif" -> ".gif";
            case "image/webp" -> ".webp";
            case "image/svg+xml" -> ".svg";
            default -> {
                log.warn("Unknown MIME type: {}, using .jpg", mimeType);
                yield ".jpg";
            }
        };
    }
}