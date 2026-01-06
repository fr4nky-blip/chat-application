package com.chat.chatapplication.controller;

import com.chat.chatapplication.entity.Message;
import com.chat.chatapplication.service.ChatService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/chat")
@CrossOrigin
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping("/send")
    public Message sendMessage(@RequestBody Message message) {
        return chatService.saveMessage(message);
    }
}
