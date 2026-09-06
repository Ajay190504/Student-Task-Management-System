package com.studenttask.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SubtaskRequest {

    private Long id;

    @NotBlank(message = "Subtask title is required")
    private String title;

    private boolean completed;
}
