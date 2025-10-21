package com.example.pekarnya.unitTests;

import com.example.pekarnya.dto.AvailabilityEvent;
import com.example.pekarnya.services.AvailabilityBroadcaster;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.lang.reflect.Field;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicInteger;

import static org.assertj.core.api.Assertions.assertThat;

class AvailabilityBroadcasterTest {

    private AvailabilityBroadcaster broadcaster;

    @BeforeEach
    void setUp() {
        broadcaster = new AvailabilityBroadcaster();
    }

    @SuppressWarnings("unchecked")
    private List<SseEmitter> clients() {
        try {
            Field f = AvailabilityBroadcaster.class.getDeclaredField("clients");
            f.setAccessible(true);
            return (List<SseEmitter>) f.get(broadcaster);
        } catch (ReflectiveOperationException e) {
            throw new RuntimeException(e);
        }
    }

    static class TestEmitter extends SseEmitter {
        final boolean throwOnSend;
        final AtomicInteger sendCount = new AtomicInteger();
        final AtomicBoolean completed = new AtomicBoolean(false);

        TestEmitter(boolean throwOnSend) {
            super(0L);
            this.throwOnSend = throwOnSend;
        }

        @Override
        public void send(SseEventBuilder builder) throws IOException {
            if (throwOnSend) throw new IOException("boom");
            sendCount.incrementAndGet();
        }

        @Override
        public void complete() {
            completed.set(true);
            super.complete();
        }
    }

    private static void awaitTrue(java.util.function.BooleanSupplier cond) {
        long deadline = System.currentTimeMillis() + 500;
        while (System.currentTimeMillis() < deadline) {
            if (cond.getAsBoolean()) return;
            try { Thread.sleep(10); } catch (InterruptedException ignored) {}
        }
    }

    @Test
    void subscribe_addsClient_and_invokesCompletionCallback() {
        var emitter = broadcaster.subscribe();
        assertThat(clients()).hasSize(1);

        var completed = new java.util.concurrent.atomic.AtomicBoolean(false);
        emitter.onCompletion(() -> completed.set(true));

        emitter.complete();

        awaitTrue(completed::get);
        clients().remove(emitter);
    }


    @Test
    void publish_sendsToAllClients() {
        var e1 = new TestEmitter(false);
        var e2 = new TestEmitter(false);
        clients().add(e1);
        clients().add(e2);

        var evt = new AvailabilityEvent(UUID.randomUUID(), 7, true);

        broadcaster.publish(evt);

        assertThat(e1.sendCount.get()).isEqualTo(1);
        assertThat(e2.sendCount.get()).isEqualTo(1);
        assertThat(clients()).containsExactly(e1, e2);
    }

    @Test
    void publish_removesClient_whenSendThrows() {
        var bad = new TestEmitter(true);
        var good = new TestEmitter(false);

        clients().add(bad);
        clients().add(good);

        var evt = new AvailabilityEvent(UUID.randomUUID(), 0, true);

        broadcaster.publish(evt);

        awaitTrue(bad.completed::get);
        awaitTrue(() -> clients().size() == 1 && clients().get(0) == good);

        assertThat(good.sendCount.get()).isEqualTo(1);
        assertThat(clients()).containsExactly(good);
    }
}
