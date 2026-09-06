package com.studenttask.dto;

import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SubtaskResponse {

    private Long id;
    private String title;
    private boolean completed;
    private LocalDateTime createdAt;
}
