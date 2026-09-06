package com.studenttask.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TokenRefreshResponse {

    private String accessToken;
    private String refreshToken;
    private String tokenType = "Bearer";
}
