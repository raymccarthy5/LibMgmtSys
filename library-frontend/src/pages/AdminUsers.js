import { useState, useEffect } from "react";
import axios from "../api/axios";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function UserTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

useEffect(() => {
  setLoading(true);
  axios
    .get("/users")
    .then((res) => {
      setUsers(res.data);
      setLoading(false);
    })
    .catch((err) => {
      console.error(err);
      setLoading(false);
    });
}, []);

const search = async () => {
  try {
    const response = await axios.get(`/users/id/${searchQuery}`);
    const data = response.data;
    setUsers([data]);
  } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "An error occurred";
      toast.error(errorMessage);
    setUsers([]);
  }
  };

return (
  <div className="container mt-2">
    {loading ? (
    <p>Loading...</p>
    ) : (
    <>
    <div className="container py-5 input-group">
        <input type="text" 
        className="form-control py-2" 
        placeholder="Search users by ID..." 
        aria-label="Search reservations by title, author or category" 
        aria-describedby="basic-addon2"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span className="admin-search p-3">
            <BsSearch className='fs-5' onClick={search}/>
        </span>
      </div>
      <div><h2>Admin Users</h2><p style={{ color: 'red' }}>To-do: Pagination, Sorting</p></div>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Firstname</th>
          <th>Lastname</th>
          <th>Email</th>
          <th>Balance Owed</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
        <tr key={user?.id}>
          <td>{user?.id}</td>
          <td>{user?.firstname}</td>
          <td>{user?.lastname}</td>
          <td>{user?.email}</td>
          <td>€{user?.fine}</td>
          <td>{user?.role}</td>
          <td>
          <Link to={`/edit-user/${user?.id}`}><button>Manage</button></Link>
          </td>
        </tr>
        ))}
      </tbody>
    </table>
    <Link to={`/add-user`}><button className="mb-5">Add User</button></Link>
    </>
    
    )
    }
    
  </div>
  );
}

export default UserTable;