package com.studenttask.mapper;

import com.studenttask.dto.UserDto;
import com.studenttask.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserDto toDto(User user) {
        if (user == null) return null;
        return UserDto.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .authProvider(user.getAuthProvider())
                .avatarUrl(user.getAvatarUrl())
                .department(user.getDepartment())
                .createdAt(user.getCreatedAt())
                .build();
    }
}
