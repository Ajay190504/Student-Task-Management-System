package com.studenttask.mapper;

import com.studenttask.dto.UserSessionDto;
import com.studenttask.entity.UserSession;
import org.springframework.stereotype.Component;

@Component
public class SessionMapper {

    public UserSessionDto toDto(UserSession session, String currentSessionId) {
        if (session == null) return null;
        return UserSessionDto.builder()
                .id(session.getId())
                .sessionId(session.getSessionId())
                .deviceInfo(session.getDeviceInfo())
                .ipAddress(session.getIpAddress())
                .lastActive(session.getLastActive())
                .createdAt(session.getCreatedAt())
                .isCurrentSession(session.getSessionId().equals(currentSessionId))
                .build();
    }
}
