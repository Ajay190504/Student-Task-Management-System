package com.studenttask.dto;

import lombok.*;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardStatsDto {

    private long totalTasks;
    private long completedTasks;
    private long pendingTasks;
    private long overdueTasks;
    private long dueTodayTasks;
    private double completionRate;
    private double productivityScore;
    private Map<String, Long> tasksByPriority;
    private Map<String, Long> tasksByCategory;
    private Map<String, Long> tasksByStatus;
}
