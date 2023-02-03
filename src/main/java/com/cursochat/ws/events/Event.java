package com.cursochat.ws.events;

public record Event<T>(EventType type, T payload) {
}

