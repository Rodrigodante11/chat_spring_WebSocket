package com.cursochat.ws.dtos;

import com.cursochat.ws.data.User;

// objeto que sera transformado em json e mandado ao redis
public record ChatMessage(User from, User to, String text) {
}