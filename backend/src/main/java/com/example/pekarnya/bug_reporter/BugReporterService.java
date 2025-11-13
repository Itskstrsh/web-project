package com.example.pekarnya.bug_reporter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class BugReporterService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${app.email.from}")
    private String fromEmail;

    @Value("${app.email.to}")
    private String toEmail;

    @Value("${app.email.subject}")
    private String subject;

    /**
     * Основной метод отправки email с ошибкой
     */
    public void sendEmail(String errorMessage, Exception exception) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(toEmail.split(",")); // поддерживает несколько адресов через запятую
            helper.setSubject(subject);
            helper.setText(buildEmailContent(errorMessage, exception), true); // true = HTML

            mailSender.send(message);
            System.out.println("✅ Email с ошибкой отправлен на " + toEmail);

        } catch (MessagingException e) {
            System.err.println("❌ Ошибка при отправке email: " + e.getMessage());
            e.printStackTrace();
        }
    }

    /**
     * Упрощенный метод только с сообщением
     */
    public void sendEmail(String errorMessage) {
        sendEmail(errorMessage, null);
    }

    private String buildEmailContent(String errorMessage, Exception exception) {
        StringBuilder html = new StringBuilder();

        html.append("""
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    .error { background: #fff0f0; padding: 15px; border-left: 4px solid #ff4444; }
                    .info { background: #f0f8ff; padding: 15px; border-left: 4px solid #4444ff; }
                    .stack-trace { background: #f5f5f5; padding: 10px; font-family: monospace; font-size: 12px; }
                </style>
            </head>
            <body>
                <h2>🚨 Ошибка в приложении</h2>
                <div class="error">
                    <strong>Сообщение:</strong> """).append(escapeHtml(errorMessage)).append("""
                </div>
            """);

        if (exception != null) {
            html.append("""
                <div class="info">
                    <strong>Тип исключения:</strong> """).append(escapeHtml(exception.getClass().getName())).append("""
                    <br><strong>Сообщение:</strong> """).append(escapeHtml(exception.getMessage())).append("""
                </div>
                <h3>Stack Trace:</h3>
                <div class="stack-trace">
            """);

            // Добавляем stack trace
            for (StackTraceElement element : exception.getStackTrace()) {
                html.append(escapeHtml(element.toString())).append("<br>");
            }
            html.append("</div>");
        }

        html.append("""
                <div class="info">
                    <strong>Время:</strong> """).append(java.time.LocalDateTime.now()).append("""
                    <br><strong>Приложение:</strong> Spring Application
                </div>
            </body>
            </html>
        """);

        return html.toString();
    }

    private String escapeHtml(String text) {
        if (text == null) return "";
        return text.replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;")
                .replace("\"", "&quot;")
                .replace("'", "&#39;");
    }
}