package com.studenttask.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseRequest {

    @NotBlank(message = "Course code is required")
    @Size(max = 20, message = "Course code cannot exceed 20 characters")
    private String code;

    @NotBlank(message = "Course title is required")
    @Size(max = 150, message = "Course title cannot exceed 150 characters")
    private String title;

    private String instructorName;

    private String colorCode;
}
