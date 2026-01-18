package com.example.pekarnya.exceptions;

import com.example.pekarnya.bug_reporter.BugReporterService;
import io.sentry.Sentry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Map;

@RestControllerAdvice
public class RestExceptionHandler {
    @Autowired
    private BugReporterService bugReporterService;
    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<Map<String, String>> illegalState(IllegalStateException e) {
        bugReporterService.sendEmail(Arrays.toString(e.getStackTrace()),e);
        return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", e.getMessage()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> invalid(MethodArgumentNotValidException e) {
        var msg = e.getBindingResult().getFieldErrors().stream()
                .findFirst().map(f -> f.getField() + " " + f.getDefaultMessage()).orElse("Validation error");
        bugReporterService.sendEmail(Arrays.toString(e.getStackTrace()),e);
        return ResponseEntity.badRequest().body(Map.of("error", msg));
    }
}
