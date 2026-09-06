package com.studenttask.service;

import com.studenttask.dto.UserSessionDto;
import com.studenttask.entity.User;
import com.studenttask.entity.UserSession;
import com.studenttask.exception.ResourceNotFoundException;
import com.studenttask.mapper.SessionMapper;
import com.studenttask.repository.UserSessionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SessionManagementService {

    private final UserSessionRepository userSessionRepository;
    private final SessionMapper sessionMapper;

    @Transactional
    public UserSession createSession(User user, String deviceInfo, String ipAddress) {
        String sessionId = UUID.randomUUID().toString();
        UserSession session = UserSession.builder()
                .user(user)
                .sessionId(sessionId)
                .deviceInfo(deviceInfo != null ? deviceInfo : "Unknown Device")
                .ipAddress(ipAddress != null ? ipAddress : "127.0.0.1")
                .lastActive(LocalDateTime.now())
                .revoked(false)
                .build();
        return userSessionRepository.save(session);
    }

    public List<UserSessionDto> getUserActiveSessions(User user, String currentSessionId) {
        List<UserSession> sessions = userSessionRepository.findByUserAndRevokedFalseOrderByLastActiveDesc(user);
        return sessions.stream()
                .map(session -> sessionMapper.toDto(session, currentSessionId))
                .collect(Collectors.toList());
    }

    @Transactional
    public void revokeSession(User user, String sessionId) {
        UserSession session = userSessionRepository.findBySessionId(sessionId)
                .orElseThrow(() -> new ResourceNotFoundException("Session", "sessionId", sessionId));

        if (!session.getUser().getId().equals(user.getId())) {
            throw new IllegalArgumentException("Cannot revoke session belonging to another user");
        }

        session.setRevoked(true);
        userSessionRepository.save(session);
    }

    @Transactional
    public void revokeAllOtherSessions(User user, String currentSessionId) {
        List<UserSession> sessions = userSessionRepository.findByUserAndRevokedFalseOrderByLastActiveDesc(user);
        for (UserSession s : sessions) {
            if (!s.getSessionId().equals(currentSessionId)) {
                s.setRevoked(true);
            }
        }
        userSessionRepository.saveAll(sessions);
    }
}
