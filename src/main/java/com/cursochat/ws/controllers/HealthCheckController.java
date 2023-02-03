package com.cursochat.ws.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.logging.Logger;

@RestController
public class HealthCheckController {
    private final static Logger LOGGER = Logger.getLogger(HealthCheckController.class.getName());

    @GetMapping
    void healthCheck() {
        LOGGER.info("health check");
    }
}
