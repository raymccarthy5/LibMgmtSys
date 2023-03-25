import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { Card, Col, Row, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditUser = () => {

    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [firstname, setFirstame] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    
    useEffect(() => {
        setLoading(true);
        axios
          .get(`/users/id/${id}`)
          .then((res) => {
            setUser(res?.data);
            setFirstame(res?.data.firstname);
            setLastname(res?.data.lastname);
            setEmail(res.data.email);
            setLoading(false);
          })
          .catch((err) => {
            console.error(err);
            setLoading(false);
          });
    }, [id]);

    if (loading) {
      return <p>Loading...</p>;
    }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // make API call to update user details
    const response = await axios.put(`/users/update/${id}`, {
      firstname,
      lastname,
      email
    }).catch((err) => {
      const errorMessage = err.response?.data?.message || err.message || "An error occurred";
      toast.error(errorMessage);
    });
    toast.success("User edited successfully");
    setUser(response.data);
    navigate("/admin-users");
  };

  const deleteUser = (id) => {
    setLoading(true);
    axios
      .delete(`/users/${id}`)
      .then(() => {
        setLoading(false);
        toast.success("User deleted");
        navigate("/admin-users");
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  return (
    <>
    <div className='container-xxl'>
      <h2 className='m-5'>{user?.title}</h2>
      <Row className="align-items-stretch">
        <Col className='mb-5'>
          <Card>
            <Card.Body>
              <Card.Title>User Details</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="firstname">
                  <Form.Label>Firstname</Form.Label>
                  <Form.Control type="text" value={firstname} onChange={(e) => setFirstame(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="lastname" className='mt-2'>
                  <Form.Label>Lastname</Form.Label>
                  <Form.Control type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="email" className='mt-2'>
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <button className='mt-4' type="submit">Save</button>
          </Form>
        </Card.Body>
      </Card>
    </Col>
  </Row>
  <Row>
    <Col className='mb-5'>
    <Link to="/admin-users">
    <button>Back to Users</button>
    </Link>
    </Col>
    <Col>
    <button onClick={() => deleteUser(id)}>Delete User</button>
    </Col>
  </Row>
</div>
<div className="btn-container">
  <Row>
  </Row>
</div>
</>
);
};

export default EditUser;