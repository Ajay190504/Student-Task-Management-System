package com.studenttask.controller;

import com.studenttask.dto.CourseRequest;
import com.studenttask.dto.CourseResponse;
import com.studenttask.security.CustomUserDetails;
import com.studenttask.service.CourseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;

    @GetMapping
    public ResponseEntity<List<CourseResponse>> getCourses(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return ResponseEntity.ok(courseService.getUserCourses(userDetails.getUser()));
    }

    @PostMapping
    public ResponseEntity<CourseResponse> createCourse(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @Valid @RequestBody CourseRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(courseService.createCourse(userDetails.getUser(), request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteCourse(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long id) {
        courseService.deleteCourse(userDetails.getUser(), id);
        return ResponseEntity.ok(Map.of("message", "Course deleted successfully"));
    }
}
