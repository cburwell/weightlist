package com.cburwell.weightlist.controllers;

import com.cburwell.weightlist.models.User;
import com.cburwell.weightlist.repositories.UserRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

public class AuthController {
    private final UserRepository repository;

    AuthController(UserRepository repository) {
        this.repository = repository;
    }

    @CrossOrigin(origins = "http://localhost:3001")
    @PostMapping("/login")
    User login(@RequestBody User user) {
        User u = repository.findByEmail(user.getEmail());

//      TODO:  Password auth
        if (u.getPassword().equals(user.getPassword())) {
            return u;
        }
        else {
            throw new RuntimeException("Unable to find user: " + user.getEmail());
        }
    }

    @CrossOrigin(origins = "http://localhost:3001")
    @PostMapping("/signup")
    User signup(@RequestBody User user) {
        User u = repository.findByEmail(user.getEmail());
        return u == null ? repository.save(user) : u;
    }
}
