package com.x00179223.librarybackend.repository;


import com.x00179223.librarybackend.model.Book;
import com.x00179223.librarybackend.model.Reservation;
import com.x00179223.librarybackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByUser(User user);
    List<Reservation> findByBook(Book book);

    @Query("SELECT r FROM Reservation r WHERE r.pickUpBy < :now AND r.checkedOutAt IS NULL")
    List<Reservation> findAllByPickUpByBeforeAndCheckedOutAtIsNull(LocalDateTime now);

    @Query("SELECT r FROM Reservation r WHERE r.user.id = :userId")
    List<Reservation> findReservationsByUserId(Long userId);

    @Query("SELECT r FROM Reservation r WHERE r.checkedOutAt IS NOT NULL AND r.dueDate < :currentDateTime AND r.returned = false")
    List<Reservation> findAllByCheckedOutAtIsNotNullAndDueDateBeforeAndReturnedIsFalse(@Param("currentDateTime") LocalDateTime currentDateTime);
}