package com.studenttask.dto;

import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserSessionDto {

    private Long id;
    private String sessionId;
    private String deviceInfo;
    private String ipAddress;
    private LocalDateTime lastActive;
    private LocalDateTime createdAt;
    private boolean isCurrentSession;
}
