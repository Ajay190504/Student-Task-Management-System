package com.studenttask.service;

import com.studenttask.dto.SubtaskRequest;
import com.studenttask.dto.TaskRequest;
import com.studenttask.dto.TaskResponse;
import com.studenttask.entity.*;
import com.studenttask.exception.ResourceNotFoundException;
import com.studenttask.mapper.TaskMapper;
import com.studenttask.repository.CourseRepository;
import com.studenttask.repository.SubtaskRepository;
import com.studenttask.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.PrintWriter;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final CourseRepository courseRepository;
    private final SubtaskRepository subtaskRepository;
    private final TaskMapper taskMapper;

    public List<TaskResponse> getTasks(User user, TaskStatus status, Priority priority, Category category, Long courseId, String search) {
        List<Task> tasks = taskRepository.filterTasks(user, status, priority, category, courseId, search);
        return tasks.stream().map(taskMapper::toDto).collect(Collectors.toList());
    }

    public TaskResponse getTaskById(User user, Long taskId) {
        Task task = taskRepository.findByIdAndUser(taskId, user)
                .orElseThrow(() -> new ResourceNotFoundException("Task", "id", taskId));
        return taskMapper.toDto(task);
    }

    @Transactional
    public TaskResponse createTask(User user, TaskRequest request) {
        Course course = null;
        if (request.getCourseId() != null) {
            course = courseRepository.findByIdAndUser(request.getCourseId(), user)
                    .orElse(null);
        }

        Task task = Task.builder()
                .title(request.getTitle().trim())
                .description(request.getDescription())
                .priority(request.getPriority() != null ? request.getPriority() : Priority.MEDIUM)
                .status(request.getStatus() != null ? request.getStatus() : TaskStatus.TODO)
                .category(request.getCategory() != null ? request.getCategory() : Category.ASSIGNMENT)
                .dueDate(request.getDueDate())
                .estimatedHours(request.getEstimatedHours() != null ? request.getEstimatedHours() : 1.0)
                .course(course)
                .user(user)
                .build();

        if (request.getStatus() == TaskStatus.COMPLETED) {
            task.setCompletedAt(LocalDateTime.now());
        }

        if (request.getSubtasks() != null && !request.getSubtasks().isEmpty()) {
            for (SubtaskRequest stReq : request.getSubtasks()) {
                if (stReq.getTitle() != null && !stReq.getTitle().trim().isEmpty()) {
                    Subtask subtask = Subtask.builder()
                            .title(stReq.getTitle().trim())
                            .completed(stReq.isCompleted())
                            .task(task)
                            .build();
                    task.addSubtask(subtask);
                }
            }
        }

        Task savedTask = taskRepository.save(task);
        return taskMapper.toDto(savedTask);
    }

    @Transactional
    public TaskResponse updateTask(User user, Long taskId, TaskRequest request) {
        Task task = taskRepository.findByIdAndUser(taskId, user)
                .orElseThrow(() -> new ResourceNotFoundException("Task", "id", taskId));

        Course course = null;
        if (request.getCourseId() != null) {
            course = courseRepository.findByIdAndUser(request.getCourseId(), user)
                    .orElse(null);
        }

        task.setTitle(request.getTitle().trim());
        task.setDescription(request.getDescription());
        task.setPriority(request.getPriority());
        task.setCategory(request.getCategory());
        task.setDueDate(request.getDueDate());
        task.setEstimatedHours(request.getEstimatedHours());
        task.setCourse(course);

        if (task.getStatus() != request.getStatus()) {
            task.setStatus(request.getStatus());
            if (request.getStatus() == TaskStatus.COMPLETED) {
                task.setCompletedAt(LocalDateTime.now());
            } else {
                task.setCompletedAt(null);
            }
        }

        // Update subtasks
        task.getSubtasks().clear();
        if (request.getSubtasks() != null) {
            for (SubtaskRequest stReq : request.getSubtasks()) {
                if (stReq.getTitle() != null && !stReq.getTitle().trim().isEmpty()) {
                    Subtask subtask = Subtask.builder()
                            .title(stReq.getTitle().trim())
                            .completed(stReq.isCompleted())
                            .task(task)
                            .build();
                    task.addSubtask(subtask);
                }
            }
        }

        Task updatedTask = taskRepository.save(task);
        return taskMapper.toDto(updatedTask);
    }

    @Transactional
    public TaskResponse updateTaskStatus(User user, Long taskId, TaskStatus status) {
        Task task = taskRepository.findByIdAndUser(taskId, user)
                .orElseThrow(() -> new ResourceNotFoundException("Task", "id", taskId));

        task.setStatus(status);
        if (status == TaskStatus.COMPLETED) {
            task.setCompletedAt(LocalDateTime.now());
        } else {
            task.setCompletedAt(null);
        }

        Task updatedTask = taskRepository.save(task);
        return taskMapper.toDto(updatedTask);
    }

    @Transactional
    public void deleteTask(User user, Long taskId) {
        Task task = taskRepository.findByIdAndUser(taskId, user)
                .orElseThrow(() -> new ResourceNotFoundException("Task", "id", taskId));
        taskRepository.delete(task);
    }

    @Transactional
    public TaskResponse toggleSubtask(User user, Long subtaskId) {
        Subtask subtask = subtaskRepository.findById(subtaskId)
                .orElseThrow(() -> new ResourceNotFoundException("Subtask", "id", subtaskId));

        Task task = subtask.getTask();
        if (!task.getUser().getId().equals(user.getId())) {
            throw new ResourceNotFoundException("Subtask", "id", subtaskId);
        }

        subtask.setCompleted(!subtask.isCompleted());
        subtaskRepository.save(subtask);

        return taskMapper.toDto(task);
    }

    public ByteArrayInputStream exportTasksToCsv(User user) {
        List<Task> tasks = taskRepository.findByUserOrderByDueDateAscCreatedAtDesc(user);
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        PrintWriter writer = new PrintWriter(out);

        writer.println("Task ID,Title,Category,Priority,Status,Course,Due Date,Estimated Hours,Created At");

        for (Task t : tasks) {
            String courseCode = t.getCourse() != null ? t.getCourse().getCode() : "N/A";
            String dueDateStr = t.getDueDate() != null ? t.getDueDate().toString() : "N/A";
            writer.printf("%d,\"%s\",%s,%s,%s,\"%s\",%s,%.1f,%s%n",
                    t.getId(),
                    t.getTitle().replaceAll("\"", "\"\""),
                    t.getCategory(),
                    t.getPriority(),
                    t.getStatus(),
                    courseCode,
                    dueDateStr,
                    t.getEstimatedHours() != null ? t.getEstimatedHours() : 0.0,
                    t.getCreatedAt().toString()
            );
        }

        writer.flush();
        return new ByteArrayInputStream(out.toByteArray());
    }
}
