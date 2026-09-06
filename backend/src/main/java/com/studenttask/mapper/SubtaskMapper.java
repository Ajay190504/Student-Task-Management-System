package com.studenttask.mapper;

import com.studenttask.dto.SubtaskResponse;
import com.studenttask.entity.Subtask;
import org.springframework.stereotype.Component;

@Component
public class SubtaskMapper {

    public SubtaskResponse toDto(Subtask subtask) {
        if (subtask == null) return null;
        return SubtaskResponse.builder()
                .id(subtask.getId())
                .title(subtask.getTitle())
                .completed(subtask.isCompleted())
                .createdAt(subtask.getCreatedAt())
                .build();
    }
}
