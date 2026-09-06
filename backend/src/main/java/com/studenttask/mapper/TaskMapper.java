package com.studenttask.mapper;

import com.studenttask.dto.SubtaskResponse;
import com.studenttask.dto.TaskResponse;
import com.studenttask.entity.Task;
import com.studenttask.entity.TaskStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class TaskMapper {

    private final CourseMapper courseMapper;
    private final SubtaskMapper subtaskMapper;

    public TaskResponse toDto(Task task) {
        if (task == null) return null;

        List<SubtaskResponse> subtaskDtos = task.getSubtasks() != null
                ? task.getSubtasks().stream().map(subtaskMapper::toDto).collect(Collectors.toList())
                : Collections.emptyList();

        boolean isOverdue = task.getDueDate() != null 
                && task.getDueDate().isBefore(LocalDate.now()) 
                && task.getStatus() != TaskStatus.COMPLETED;

        return TaskResponse.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .priority(task.getPriority())
                .status(task.getStatus())
                .category(task.getCategory())
                .dueDate(task.getDueDate())
                .estimatedHours(task.getEstimatedHours())
                .completedAt(task.getCompletedAt())
                .course(task.getCourse() != null ? courseMapper.toDto(task.getCourse(), 0) : null)
                .subtasks(subtaskDtos)
                .isOverdue(isOverdue)
                .createdAt(task.getCreatedAt())
                .updatedAt(task.getUpdatedAt())
                .build();
    }
}
