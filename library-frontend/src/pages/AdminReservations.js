import { React, useState, useEffect } from "react";
import axios from "../api/axios";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import formatDate from "../components/formatDate";
import { toast } from "react-toastify";

const AdminReservations = () => {

  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

useEffect(() => {
setLoading(true);
axios.get("/reservations")
.then((res) => {
    setReservations(res.data);
    setLoading(false);
})
.catch((err) => {
    const errorMessage = err.response?.data?.message || err.message || "An error occurred";
    toast.error(errorMessage);
    setLoading(false);
});
}, []);

const search = async () => {
    try {
      const response = await axios.get(`/reservations/${searchQuery}`);
      const data = response.data;
      setReservations([data]);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "An error occurred";
      toast.error(errorMessage);
      setReservations([]);
    }
    };

return (
<div className="container-xxl mt-2">
    {loading ? (
    <p>Loading...</p>
    ) : (
    <>
    <div className="container py-5 input-group">
        <input type="text" 
        className="form-control py-2" 
        placeholder="Search reservations by ID..." 
        aria-label="Search reservations by ID" 
        aria-describedby="basic-addon2"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span className="admin-search p-3">
            <BsSearch className='fs-5' onClick={search}/>
        </span>
      </div>
    <div><h2>Admin Reservations</h2><p style={{ color: 'red' }}>To-do: Pagination, Sorting</p></div>
    <div>
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
        <td>{reservation.id}</td>
        <td>{reservation.user.email}</td>
        <td>{formatDate(reservation.reservedAt)}</td>
        <td>{formatDate(reservation.pickUpBy)}</td>
        <td>{formatDate(reservation.checkedOutAt)}</td>
        <td>{formatDate(reservation.dueDate)}</td>
        <td>{reservation.returned ? "Yes" : "No"}</td>           
        <td>
        <Link to={`/edit-reservation/${reservation.id}`}><button>Manage</button></Link>
        </td>
        </tr>
        ))}
    </tbody>
    </table>
    </div>
    </>
    )
    }
    <Link to="/admin-books">
    <button className="mb-5">Add Reservation</button>
    </Link>
    </div>
);
}

export default AdminReservations;