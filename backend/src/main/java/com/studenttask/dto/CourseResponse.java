package com.studenttask.dto;

import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseResponse {

    private Long id;
    private String code;
    private String title;
    private String instructorName;
    private String colorCode;
    private long totalTasks;
    private LocalDateTime createdAt;
}
