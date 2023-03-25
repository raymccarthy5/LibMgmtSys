package com.x00179223.librarybackend.service;
import com.x00179223.librarybackend.model.Reservation;

import java.util.List;

public interface ReservationService {
    Reservation reserveBook(Long bookId, Long userId);

    Reservation checkOutBook(Long reservationId);

    Reservation checkInBook(Long reservationId);

    Reservation cancelReservation(Long reservationId);

    List<Reservation> findAllReservations();

    Reservation findReservationById(Long id);

    List<Reservation> findReservationsByUserId(Long userId);

    Reservation extendDueDate(Long reservationId);

    List<Reservation> findOverdueCheckins();

    void purgeNonPickedUpReservations();

    void addFine(Long reservationId, Long userId);

    List<Reservation> findOverduePickups();

}
