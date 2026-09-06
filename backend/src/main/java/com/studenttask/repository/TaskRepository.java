package com.studenttask.repository;

import com.studenttask.entity.Category;
import com.studenttask.entity.Course;
import com.studenttask.entity.Priority;
import com.studenttask.entity.Task;
import com.studenttask.entity.TaskStatus;
import com.studenttask.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByUserOrderByDueDateAscCreatedAtDesc(User user);

    Optional<Task> findByIdAndUser(Long id, User user);

    long countByUser(User user);

    long countByUserAndStatus(User user, TaskStatus status);

    long countByUserAndCourse(User user, Course course);

    @Query("SELECT COUNT(t) FROM Task t WHERE t.user = :user AND t.dueDate < :today AND t.status != 'COMPLETED'")
    long countOverdueTasks(@Param("user") User user, @Param("today") LocalDate today);

    @Query("SELECT COUNT(t) FROM Task t WHERE t.user = :user AND t.dueDate = :today AND t.status != 'COMPLETED'")
    long countDueTodayTasks(@Param("user") User user, @Param("today") LocalDate today);

    @Query("SELECT t.priority, COUNT(t) FROM Task t WHERE t.user = :user GROUP BY t.priority")
    List<Object[]> countTasksByPriorityGroup(@Param("user") User user);

    @Query("SELECT t.category, COUNT(t) FROM Task t WHERE t.user = :user GROUP BY t.category")
    List<Object[]> countTasksByCategoryGroup(@Param("user") User user);

    @Query("SELECT t.status, COUNT(t) FROM Task t WHERE t.user = :user GROUP BY t.status")
    List<Object[]> countTasksByStatusGroup(@Param("user") User user);

    @Query("SELECT t FROM Task t WHERE t.user = :user " +
           "AND (:status IS NULL OR t.status = :status) " +
           "AND (:priority IS NULL OR t.priority = :priority) " +
           "AND (:category IS NULL OR t.category = :category) " +
           "AND (:courseId IS NULL OR t.course.id = :courseId) " +
           "AND (:search IS NULL OR LOWER(t.title) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(t.description) LIKE LOWER(CONCAT('%', :search, '%'))) " +
           "ORDER BY t.dueDate ASC, t.createdAt DESC")
    List<Task> filterTasks(@Param("user") User user,
                           @Param("status") TaskStatus status,
                           @Param("priority") Priority priority,
                           @Param("category") Category category,
                           @Param("courseId") Long courseId,
                           @Param("search") String search);
}
