import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { Card, Col, Row, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditBook = () => {

    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [publicationYear, setPublicationYear] = useState('');
    const [quantityAvailable, setQuantityAvailable] = useState('');
    const [rating, setRating] = useState('');
    const [isbn, setIsbn] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    
    useEffect(() => {
        setLoading(true);
        axios
          .get(`/books/${id}`)
          .then((res) => {
            setBook(res.data);
            setTitle(res.data.title);
            setAuthor(res.data.author);
            setGenre(res.data.genre);
            setPublicationYear(res.data.publicationYear);
            setQuantityAvailable(res.data.quantityAvailable);
            setRating(res.data.rating);
            setIsbn(res.data.isbn);
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
    const response = await axios.put(`/books/${id}`, {
      title,
      author,
      genre,
      publicationYear,
      quantityAvailable,
      rating,
      isbn
    }).catch((err) => {
      const errorMessage = err.response?.data?.message || err.message || "An error occurred";
      toast.error(errorMessage);
    });
    toast.success("Book saved");
    navigate("/admin-books");
    setBook(response.data);
  };

  const deleteBook = (id) => {
    setLoading(true);
    axios
      .delete(`/books/${id}`)
      .then(() => {
        setLoading(false);
        toast.success("Book deleted");
        navigate("/admin-books");
      })
      .catch((err) => {
        const errorMessage = err.response?.data?.message || err.message || "An error occurred";
        toast.error(errorMessage);
        setLoading(false);
      });
  };

  return (
    <>
    <div className='container-xxl'>
      <h2 className='m-5'>{book?.title}</h2>
      <Row className="align-items-stretch">
        <Col className='mb-5'>
          <Card>
            <Card.Body>
              <Card.Title>Book Details</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="author">
                  <Form.Label>Author</Form.Label>
                  <Form.Control type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="genre">
              <Form.Label>Genre</Form.Label>
              <Form.Control type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="publicationYear">
              <Form.Label>Publication Year</Form.Label>
              <Form.Control type="text" value={publicationYear} onChange={(e) => setPublicationYear(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="quantityAvailable">
              <Form.Label>Quantity Available</Form.Label>
              <Form.Control type="text" value={quantityAvailable} onChange={(e) => setQuantityAvailable(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="rating">
              <Form.Label>Rating</Form.Label>
              <Form.Control type="text" value={rating} onChange={(e) => setRating(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="isbn">
              <Form.Label>ISBN</Form.Label>
              <Form.Control type="text" value={isbn} onChange={(e) => setIsbn(e.target.value)} />
            </Form.Group>
            <button className='mt-4' type="submit">Save</button>
          </Form>
        </Card.Body>
      </Card>
    </Col>
  </Row>
  <Row>
    <Col className='mb-5'>
    <Link to="/admin-books">
    <button>Back to Books</button>
    </Link>
    </Col>
    <Col>
    <button onClick={() => deleteBook(id)}>Delete Book</button>
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

export default EditBook;
