package com.studenttask.dto;

import com.studenttask.entity.AuthProvider;
import com.studenttask.entity.Role;
import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDto {

    private Long id;
    private String name;
    private String email;
    private Role role;
    private AuthProvider authProvider;
    private String avatarUrl;
    private String department;
    private LocalDateTime createdAt;
}
