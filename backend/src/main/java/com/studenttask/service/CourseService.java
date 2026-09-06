package com.studenttask.service;

import com.studenttask.dto.CourseRequest;
import com.studenttask.dto.CourseResponse;
import com.studenttask.entity.Course;
import com.studenttask.entity.User;
import com.studenttask.exception.BadRequestException;
import com.studenttask.exception.ResourceNotFoundException;
import com.studenttask.mapper.CourseMapper;
import com.studenttask.repository.CourseRepository;
import com.studenttask.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;
    private final TaskRepository taskRepository;
    private final CourseMapper courseMapper;

    public List<CourseResponse> getUserCourses(User user) {
        List<Course> courses = courseRepository.findByUserOrderByCodeAsc(user);
        return courses.stream().map(course -> {
            long count = taskRepository.countByUserAndCourse(user, course);
            return courseMapper.toDto(course, count);
        }).collect(Collectors.toList());
    }

    @Transactional
    public CourseResponse createCourse(User user, CourseRequest request) {
        if (courseRepository.existsByCodeAndUser(request.getCode(), user)) {
            throw new BadRequestException("Course code already exists: " + request.getCode());
        }

        Course course = Course.builder()
                .code(request.getCode().toUpperCase().trim())
                .title(request.getTitle().trim())
                .instructorName(request.getInstructorName())
                .colorCode(request.getColorCode() != null ? request.getColorCode() : "#3B82F6")
                .user(user)
                .build();

        Course savedCourse = courseRepository.save(course);
        return courseMapper.toDto(savedCourse, 0);
    }

    @Transactional
    public void deleteCourse(User user, Long courseId) {
        Course course = courseRepository.findByIdAndUser(courseId, user)
                .orElseThrow(() -> new ResourceNotFoundException("Course", "id", courseId));
        courseRepository.delete(course);
    }
}
