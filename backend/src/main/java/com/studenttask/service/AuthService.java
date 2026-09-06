package com.studenttask.service;

import com.studenttask.dto.*;
import com.studenttask.entity.*;
import com.studenttask.exception.BadRequestException;
import com.studenttask.exception.UnauthorizedException;
import com.studenttask.mapper.UserMapper;
import com.studenttask.repository.UserRepository;
import com.studenttask.security.CustomUserDetails;
import com.studenttask.security.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final RefreshTokenService refreshTokenService;
    private final SessionManagementService sessionManagementService;
    private final UserMapper userMapper;

    @Transactional
    public AuthResponse registerUser(RegisterRequest request, String deviceInfo, String ipAddress) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email is already in use: " + request.getEmail());
        }

        Role role = request.getRole() != null ? request.getRole() : Role.ROLE_STUDENT;

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(role)
                .authProvider(AuthProvider.LOCAL)
                .department(request.getDepartment() != null ? request.getDepartment() : "Computer Science")
                .avatarUrl("https://api.dicebear.com/7.x/avataaars/svg?seed=" + request.getName().replaceAll(" ", ""))
                .build();

        userRepository.save(user);

        // Authenticate new user
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        UserSession session = sessionManagementService.createSession(user, deviceInfo, ipAddress);
        String accessToken = jwtUtils.generateAccessToken(authentication, session.getSessionId());
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user.getId());

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken.getToken())
                .tokenType("Bearer")
                .sessionId(session.getSessionId())
                .user(userMapper.toDto(user))
                .build();
    }

    @Transactional
    public AuthResponse loginUser(AuthRequest request, String deviceInfo, String ipAddress) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        User user = userDetails.getUser();

        UserSession session = sessionManagementService.createSession(user, deviceInfo, ipAddress);
        String accessToken = jwtUtils.generateAccessToken(authentication, session.getSessionId());
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user.getId());

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken.getToken())
                .tokenType("Bearer")
                .sessionId(session.getSessionId())
                .user(userMapper.toDto(user))
                .build();
    }

    @Transactional
    public AuthResponse loginOAuth2Google(OAuth2LoginRequest request, String deviceInfo, String ipAddress) {
        User user = userRepository.findByEmail(request.getEmail()).orElseGet(() -> {
            User newUser = User.builder()
                    .name(request.getName() != null ? request.getName() : "Google User")
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getIdToken().substring(0, Math.min(request.getIdToken().length(), 20))))
                    .role(Role.ROLE_STUDENT)
                    .authProvider(AuthProvider.GOOGLE)
                    .avatarUrl(request.getAvatarUrl() != null ? request.getAvatarUrl() : "https://api.dicebear.com/7.x/avataaars/svg?seed=" + request.getEmail())
                    .department("Computer Science")
                    .build();
            return userRepository.save(newUser);
        });

        UserSession session = sessionManagementService.createSession(user, deviceInfo, ipAddress);
        String accessToken = jwtUtils.generateTokenFromUsername(user.getEmail(), session.getSessionId());
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user.getId());

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken.getToken())
                .tokenType("Bearer")
                .sessionId(session.getSessionId())
                .user(userMapper.toDto(user))
                .build();
    }

    @Transactional
    public TokenRefreshResponse refreshToken(RefreshTokenRequest request) {
        String requestRefreshToken = request.getRefreshToken();

        return refreshTokenService.findByToken(requestRefreshToken)
                .map(refreshTokenService::verifyExpiration)
                .map(RefreshToken::getUser)
                .map(user -> {
                    UserSession session = sessionManagementService.createSession(user, "Refresh Token Session", "127.0.0.1");
                    String accessToken = jwtUtils.generateTokenFromUsername(user.getEmail(), session.getSessionId());
                    return TokenRefreshResponse.builder()
                            .accessToken(accessToken)
                            .refreshToken(requestRefreshToken)
                            .tokenType("Bearer")
                            .build();
                })
                .orElseThrow(() -> new UnauthorizedException("Refresh token is not in database!"));
    }
}
