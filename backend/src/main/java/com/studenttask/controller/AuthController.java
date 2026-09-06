package com.studenttask.controller;

import com.studenttask.dto.*;
import com.studenttask.entity.User;
import com.studenttask.mapper.UserMapper;
import com.studenttask.security.CustomUserDetails;
import com.studenttask.service.AuthService;
import com.studenttask.service.SessionManagementService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final SessionManagementService sessionManagementService;
    private final UserMapper userMapper;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request, HttpServletRequest httpRequest) {
        String deviceInfo = httpRequest.getHeader("User-Agent");
        String ipAddress = httpRequest.getRemoteAddr();
        return ResponseEntity.ok(authService.registerUser(request, deviceInfo, ipAddress));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest request, HttpServletRequest httpRequest) {
        String deviceInfo = httpRequest.getHeader("User-Agent");
        String ipAddress = httpRequest.getRemoteAddr();
        return ResponseEntity.ok(authService.loginUser(request, deviceInfo, ipAddress));
    }

    @PostMapping("/oauth2/google")
    public ResponseEntity<AuthResponse> loginGoogle(@Valid @RequestBody OAuth2LoginRequest request, HttpServletRequest httpRequest) {
        String deviceInfo = httpRequest.getHeader("User-Agent");
        String ipAddress = httpRequest.getRemoteAddr();
        return ResponseEntity.ok(authService.loginOAuth2Google(request, deviceInfo, ipAddress));
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<TokenRefreshResponse> refreshToken(@Valid @RequestBody RefreshTokenRequest request) {
        return ResponseEntity.ok(authService.refreshToken(request));
    }

    @GetMapping("/me")
    public ResponseEntity<UserDto> getCurrentUser(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return ResponseEntity.ok(userMapper.toDto(userDetails.getUser()));
    }

    @GetMapping("/sessions")
    public ResponseEntity<List<UserSessionDto>> getActiveSessions(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestHeader(value = "X-Session-ID", required = false) String currentSessionId) {
        return ResponseEntity.ok(sessionManagementService.getUserActiveSessions(userDetails.getUser(), currentSessionId));
    }

    @PostMapping("/sessions/revoke/{sessionId}")
    public ResponseEntity<Map<String, String>> revokeSession(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable String sessionId) {
        sessionManagementService.revokeSession(userDetails.getUser(), sessionId);
        return ResponseEntity.ok(Map.of("message", "Session revoked successfully"));
    }

    @PostMapping("/sessions/revoke-others")
    public ResponseEntity<Map<String, String>> revokeOtherSessions(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestHeader(value = "X-Session-ID", required = true) String currentSessionId) {
        sessionManagementService.revokeAllOtherSessions(userDetails.getUser(), currentSessionId);
        return ResponseEntity.ok(Map.of("message", "All other sessions revoked successfully"));
    }
}
