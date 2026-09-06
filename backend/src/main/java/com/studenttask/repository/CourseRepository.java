package com.studenttask.repository;

import com.studenttask.entity.Course;
import com.studenttask.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {

    List<Course> findByUserOrderByCodeAsc(User user);

    Optional<Course> findByIdAndUser(Long id, User user);

    Boolean existsByCodeAndUser(String code, User user);
}
