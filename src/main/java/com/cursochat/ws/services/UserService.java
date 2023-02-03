package com.cursochat.ws.services;

import com.cursochat.ws.data.User;
import com.cursochat.ws.data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> findChatUsers(){

        return userRepository.findAll();
    }
}
