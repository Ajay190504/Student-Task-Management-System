package com.studenttask.service;

import com.studenttask.dto.DashboardStatsDto;
import com.studenttask.entity.User;
import com.studenttask.entity.TaskStatus;
import com.studenttask.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final TaskRepository taskRepository;

    public DashboardStatsDto getDashboardStats(User user) {
        long totalTasks = taskRepository.countByUser(user);
        long completedTasks = taskRepository.countByUserAndStatus(user, TaskStatus.COMPLETED);
        long pendingTasks = totalTasks - completedTasks;
        long overdueTasks = taskRepository.countOverdueTasks(user, LocalDate.now());
        long dueTodayTasks = taskRepository.countDueTodayTasks(user, LocalDate.now());

        double completionRate = totalTasks > 0 ? (double) completedTasks / totalTasks * 100 : 0.0;
        
        // Productivity score calculation: base completion rate adjusted by overdue tasks
        double productivityScore = Math.max(0, Math.min(100, completionRate - (overdueTasks * 5)));

        Map<String, Long> tasksByPriority = new HashMap<>();
        List<Object[]> priorityResults = taskRepository.countTasksByPriorityGroup(user);
        for (Object[] row : priorityResults) {
            tasksByPriority.put(row[0].toString(), (Long) row[1]);
        }

        Map<String, Long> tasksByCategory = new HashMap<>();
        List<Object[]> categoryResults = taskRepository.countTasksByCategoryGroup(user);
        for (Object[] row : categoryResults) {
            tasksByCategory.put(row[0].toString(), (Long) row[1]);
        }

        Map<String, Long> tasksByStatus = new HashMap<>();
        List<Object[]> statusResults = taskRepository.countTasksByStatusGroup(user);
        for (Object[] row : statusResults) {
            tasksByStatus.put(row[0].toString(), (Long) row[1]);
        }

        return DashboardStatsDto.builder()
                .totalTasks(totalTasks)
                .completedTasks(completedTasks)
                .pendingTasks(pendingTasks)
                .overdueTasks(overdueTasks)
                .dueTodayTasks(dueTodayTasks)
                .completionRate(Math.round(completionRate * 10.0) / 10.0)
                .productivityScore(Math.round(productivityScore * 10.0) / 10.0)
                .tasksByPriority(tasksByPriority)
                .tasksByCategory(tasksByCategory)
                .tasksByStatus(tasksByStatus)
                .build();
    }
}
