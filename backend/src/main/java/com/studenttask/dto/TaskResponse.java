package com.studenttask.dto;

import com.studenttask.entity.Category;
import com.studenttask.entity.Priority;
import com.studenttask.entity.TaskStatus;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaskResponse {

    private Long id;
    private String title;
    private String description;
    private Priority priority;
    private TaskStatus status;
    private Category category;
    private LocalDate dueDate;
    private Double estimatedHours;
    private LocalDateTime completedAt;
    private CourseResponse course;
    private List<SubtaskResponse> subtasks;
    private boolean isOverdue;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
