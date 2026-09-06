package com.studenttask.repository;

import com.studenttask.entity.User;
import com.studenttask.entity.UserSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserSessionRepository extends JpaRepository<UserSession, Long> {

    Optional<UserSession> findBySessionId(String sessionId);

    List<UserSession> findByUserAndRevokedFalseOrderByLastActiveDesc(User user);

    List<UserSession> findByUserOrderByLastActiveDesc(User user);
}
