package com.studenttask.dto;

import com.studenttask.entity.Category;
import com.studenttask.entity.Priority;
import com.studenttask.entity.TaskStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaskRequest {

    @NotBlank(message = "Task title is required")
    @Size(max = 180, message = "Task title cannot exceed 180 characters")
    private String title;

    private String description;

    @NotNull(message = "Priority is required")
    private Priority priority;

    @NotNull(message = "Status is required")
    private TaskStatus status;

    @NotNull(message = "Category is required")
    private Category category;

    private LocalDate dueDate;

    private Double estimatedHours;

    private Long courseId;

    private List<SubtaskRequest> subtasks;
}
