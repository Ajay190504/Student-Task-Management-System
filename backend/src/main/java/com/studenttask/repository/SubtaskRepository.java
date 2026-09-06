package com.studenttask.repository;

import com.studenttask.entity.Subtask;
import com.studenttask.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubtaskRepository extends JpaRepository<Subtask, Long> {

    List<Subtask> findByTask(Task task);
}
