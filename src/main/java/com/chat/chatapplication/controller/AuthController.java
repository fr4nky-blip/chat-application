package com.chat.chatapplication.controller;

import com.chat.chatapplication.entity.User;
import com.chat.chatapplication.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.saveUser(user);
    }

    @PostMapping("/login")
    public Object login(@RequestBody User user) {
        Optional<User> loggedInUser =
                userService.login(user.getUsername(), user.getPassword());

        if (loggedInUser.isPresent()) {
            return loggedInUser.get();
        } else {
            return "Invalid username or password";
        }
    }
}
