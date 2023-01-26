package com.cursochat.ws.handler;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.Timer;
import java.util.TimerTask;
import java.util.UUID;

@Component
public class WebSocketHandler extends TextWebSocketHandler {

    @Override
    public void afterConnectionEstablished(WebSocketSession session)  {
        System.out.println("[afterConnectionEstablished] session id: "+ session.getId());
        //super.afterConnectionEstablished(session);
        //super.afterConnectionEstablished(session);

        new Timer().scheduleAtFixedRate(new TimerTask() {
            @Override
            public void run() {
                try{
                    session.sendMessage(new TextMessage("Ola "+ UUID.randomUUID()));
                }catch (IOException e){
                    e.printStackTrace();
                }

            }
        }, 2000L, 2000L);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message)  {
        System.out.println("[handleTextMessage] message: "+ message.getPayload());
        //super.handleTextMessage(session, message);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status)  {
        System.out.println("[afterConnectionClosed] session id: "+ session.getId());
        //super.afterConnectionClosed(session, status);
    }
}
