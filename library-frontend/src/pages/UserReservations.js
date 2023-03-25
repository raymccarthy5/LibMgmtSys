import React, { useState, useEffect, useContext } from 'react';
import axios from '../api/axios';
import { Card, Col, Row } from "react-bootstrap";
import AuthContext from "../context/AuthProvider";
import formatDate from "../components/formatDate";
import { toast } from 'react-toastify';

const UserReservations = () => {

  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/reservations/userId/${id}`)
      .then((res) => {
        setReservations(res?.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const cancelReservation = async (reservationId) => {
    try {
      await axios.delete(`/reservations/cancel/${reservationId}`);
      toast.success("Reservation Cancelled!");
      setReservations(reservations.filter(reservation => reservation.id !== reservationId));
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "An error occurred";
      toast.error(errorMessage);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
    <div className='container-xxl'>
      <h1 className='m-5'>Your Reservations</h1>
      <Row>
        <Col className='mb-5'>
          <Card>
            <Card.Body>
              <Card.Title>Reservations</Card.Title>
              <Card.Text>
              <table>
              <thead>
                  <tr>
                  <th>ID</th>
                  <th>Email</th>
                  <th>Reserved At</th>
                  <th>Pick Up By</th>
                  <th>Checked Out At</th>
                  <th>Return Date</th>
                  <th>Returned</th>
                  <th>Actions</th>
                  </tr>
              </thead>
              <tbody>
              {reservations.map((reservation) => (
              <tr key={reservation.id}>
              <td>ID: {reservation.id}</td>
              <td>{reservation.user.email}</td>
              <td>{formatDate(reservation.reservedAt)}</td>
              <td>{formatDate(reservation.pickUpBy)}</td>
              <td>{formatDate(reservation.checkedOutAt)}</td>
              <td>{formatDate(reservation.dueDate)}</td>
              <td>{reservation.returned ? "Yes" : "No"}</td>           
              <td>
              { !reservation.checkedOutAt ? (
                <button onClick={() => cancelReservation(reservation.id)}>Cancel</button>) : <button
                disabled={reservation.checkedOutAt}
                className={reservation.checkedOutAt ? "btn btn-secondary" : "button"}
                >
                {reservation.checkedOutAt ? "Checked Out": "Cancel"}
                </button>
                }
              </td>
              </tr>
              ))}
              </tbody>
              </table>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
    </>
  );
}

export default UserReservations