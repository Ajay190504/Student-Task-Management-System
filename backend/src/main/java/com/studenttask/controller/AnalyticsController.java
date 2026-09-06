package com.studenttask.controller;

import com.studenttask.dto.DashboardStatsDto;
import com.studenttask.security.CustomUserDetails;
import com.studenttask.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @GetMapping("/dashboard")
    public ResponseEntity<DashboardStatsDto> getDashboardStats(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return ResponseEntity.ok(analyticsService.getDashboardStats(userDetails.getUser()));
    }
}
