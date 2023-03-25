import { React, useState, useEffect, useContext } from "react";
import axios from "../api/axios";
import AuthContext from "../context/AuthProvider";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Favourites = () => {

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);
    axios.get(`/users/favourites/${id}`)
    .then((res) => {
      setBooks(res.data);
      setLoading(false);
    })
    .catch((err) => {
      const errorMessage = err.response?.data?.message || err.message || "An error occurred";
      toast.error(errorMessage);
      setLoading(false);
    });
  }, [id]);

  const reserveBook = async (bookId) => {
    setLoading(true)
    try{
      const response = await axios.post('/reservations', {
        userId: id,
        bookId,
      });
      console.log(response);
      toast.success("Book reserved")
      setLoading(false);
    }catch (err){
      const errorMessage = err.response?.data?.message || err.message || "An error occurred";
      toast.error(errorMessage);
      setLoading(false);
    }
  };

  const removeFavourite = async (bookId) => {
    setLoading(true)
    try{
      const response = await axios.put('/users/remove-favourite', {
        userId: id,
        bookId,
      });
      console.log(response);
      toast.success("Favourite Removed")
      setBooks(books.filter(book => book.id !== bookId));
      setLoading(false);
    }catch (err){
      const errorMessage = err.response?.data?.message || err.message || "An error occurred";
      toast.error(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="container-xxl mt-2">
      {loading ? (
      <p>Loading...</p>
      ) : (
      <>
      <div className="container m-5 input-group">
      </div>
      <div><h2>Favourites</h2><p style={{ color: 'red' }}>To-do: Pagination, Sorting</p></div>
      <div className="table-responsive">
      { books.length > 0 ? (
      <table className="mb-5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Rating</th>
            <th>Quantity Av.</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
          <tr key={book?.id}>
            <td>{book?.id}</td>
            <td>{book?.title}</td>
            <td>{book?.author}</td>
            <td>{book?.genre}</td>
            <td>{book?.rating}/5</td>
            <td>{book?.quantityAvailable}</td>
            <td>
            <button
              onClick={() => reserveBook(book.id)}
              disabled={book.quantityAvailable < 1}
              className={book.quantityAvailable < 1 ? "btn btn-secondary" : "button"}
            >
              {book.quantityAvailable<1 ? "Out of Stock": "Reserve"}
            </button>
            <button onClick={() => removeFavourite(book.id)}>Remove</button>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
      ) : <h1 className="py-5">No favourites found...</h1>
      }
      </div>
    
      </>
      )
      }
      <Link to="/books">
      <button className="mb-5">Back to Books</button></Link>
    </div>
    );
  }
  
export default Favourites;