package com.studenttask.mapper;

import com.studenttask.dto.CourseResponse;
import com.studenttask.entity.Course;
import org.springframework.stereotype.Component;

@Component
public class CourseMapper {

    public CourseResponse toDto(Course course, long taskCount) {
        if (course == null) return null;
        return CourseResponse.builder()
                .id(course.getId())
                .code(course.getCode())
                .title(course.getTitle())
                .instructorName(course.getInstructorName())
                .colorCode(course.getColorCode())
                .totalTasks(taskCount)
                .createdAt(course.getCreatedAt())
                .build();
    }
}
