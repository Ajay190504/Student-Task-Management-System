package com.studenttask.controller;

import com.studenttask.dto.TaskRequest;
import com.studenttask.dto.TaskResponse;
import com.studenttask.entity.Category;
import com.studenttask.entity.Priority;
import com.studenttask.entity.TaskStatus;
import com.studenttask.security.CustomUserDetails;
import com.studenttask.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @GetMapping
    public ResponseEntity<List<TaskResponse>> getTasks(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestParam(required = false) TaskStatus status,
            @RequestParam(required = false) Priority priority,
            @RequestParam(required = false) Category category,
            @RequestParam(required = false) Long courseId,
            @RequestParam(required = false) String search) {
        return ResponseEntity.ok(taskService.getTasks(userDetails.getUser(), status, priority, category, courseId, search));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskResponse> getTaskById(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long id) {
        return ResponseEntity.ok(taskService.getTaskById(userDetails.getUser(), id));
    }

    @PostMapping
    public ResponseEntity<TaskResponse> createTask(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @Valid @RequestBody TaskRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(taskService.createTask(userDetails.getUser(), request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskResponse> updateTask(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long id,
            @Valid @RequestBody TaskRequest request) {
        return ResponseEntity.ok(taskService.updateTask(userDetails.getUser(), id, request));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<TaskResponse> updateTaskStatus(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long id,
            @RequestParam TaskStatus status) {
        return ResponseEntity.ok(taskService.updateTaskStatus(userDetails.getUser(), id, status));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteTask(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long id) {
        taskService.deleteTask(userDetails.getUser(), id);
        return ResponseEntity.ok(Map.of("message", "Task deleted successfully"));
    }

    @PatchMapping("/subtasks/{subtaskId}/toggle")
    public ResponseEntity<TaskResponse> toggleSubtask(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long subtaskId) {
        return ResponseEntity.ok(taskService.toggleSubtask(userDetails.getUser(), subtaskId));
    }

    @GetMapping("/export/csv")
    public ResponseEntity<InputStreamResource> exportTasksCsv(@AuthenticationPrincipal CustomUserDetails userDetails) {
        ByteArrayInputStream in = taskService.exportTasksToCsv(userDetails.getUser());
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=student_tasks.csv");

        return ResponseEntity
                .ok()
                .headers(headers)
                .contentType(MediaType.parseMediaType("application/csv"))
                .body(new InputStreamResource(in));
    }
}
