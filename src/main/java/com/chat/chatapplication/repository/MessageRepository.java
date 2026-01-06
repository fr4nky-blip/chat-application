package com.chat.chatapplication.repository;

import com.chat.chatapplication.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {
}
