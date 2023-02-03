package com.cursochat.ws.pubsub;

import com.cursochat.ws.config.RedisConfig;
import com.cursochat.ws.data.User;
import com.cursochat.ws.data.UserRepository;
import com.cursochat.ws.dtos.ChatMessage;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.ReactiveStringRedisTemplate;
import org.springframework.stereotype.Component;

import java.util.logging.Logger;

@Component
public class Publisher {

    private final static Logger LOGGER = Logger.getLogger(Publisher.class.getName());

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ReactiveStringRedisTemplate redisTemplate;

    public void publishChatMessage(String userIdFrom, String userIdTo, String text) throws JsonProcessingException {
        // pegando os dados dos usuarios no banco
        User from = userRepository.findById(userIdFrom).orElseThrow();
        User to = userRepository.findById(userIdTo).orElseThrow();
        // pegando objeto que sera transformado em json e mandado ao redis
        ChatMessage chatMessage = new ChatMessage(from, to, text);
        // TRanformando o objeto acima de volta ajson
        String chatMessageSerialized = new ObjectMapper().writeValueAsString(chatMessage);
        redisTemplate
                .convertAndSend(RedisConfig.CHAT_MESSAGES_CHANNEL, chatMessageSerialized) // enviar messagem por canais
                .subscribe();
        LOGGER.info("chat message was published");
    }
}
