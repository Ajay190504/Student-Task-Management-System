package com.studenttask.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OAuth2LoginRequest {

    @NotBlank(message = "Id token is required")
    private String idToken;

    private String name;
    private String email;
    private String avatarUrl;
}
