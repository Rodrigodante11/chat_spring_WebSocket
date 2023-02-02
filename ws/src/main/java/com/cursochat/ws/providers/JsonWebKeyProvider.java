package com.cursochat.ws.providers;

import com.auth0.jwk.Jwk;
import com.auth0.jwk.JwkException;
import com.auth0.jwk.UrlJwkProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Component;

import java.net.MalformedURLException;
import java.net.URL;
import java.security.PublicKey;

@Component
public class JsonWebKeyProvider implements KeyProvider {

    private final UrlJwkProvider provider;

    public JsonWebKeyProvider(@Value("${app.auth.jwks-url}") final String jwksUrl) {
        try {
            this.provider = new UrlJwkProvider(new URL(jwksUrl));
        } catch (MalformedURLException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    @Override
    @Cacheable("public-key")
    public PublicKey getPublicKey(String keyId) {
        try {
            final Jwk jwk = provider.get(keyId);
            return jwk.getPublicKey();
        } catch (JwkException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }
}
