package com.example.pekarnya.services;

import com.example.pekarnya.dto.AvailabilityEvent;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Component
public class AvailabilityBroadcaster {
    private final List<SseEmitter> clients = new CopyOnWriteArrayList<>();

    public SseEmitter subscribe() {
        SseEmitter emitter = new SseEmitter(0L);
        clients.add(emitter);
        emitter.onCompletion(() -> clients.remove(emitter));
        emitter.onTimeout(() -> clients.remove(emitter));
        return emitter;
    }

    public void publish(AvailabilityEvent evt) {
        for (SseEmitter client : clients) {
            try {
                client.send(SseEmitter.event().name("ProductStockChanged").data(evt));
            } catch (IOException e) {
                client.complete();
                clients.remove(client);
            }
        }
    }
}
