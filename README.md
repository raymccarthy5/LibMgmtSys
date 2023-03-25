# Library Management System

A Library Management System built using Spring Boot for the backend, React and ES6 for the frontend, and MySQL for the database.

## Backend

The backend is a RESTful API built using Spring Boot. It provides endpoints for user authentication, book management, reservation management, and payment processing. The API also integrates with Stripe for payment processing and sends email notifications using the JavaMailSender library.

### Services

- AuthenticationService: Handles user registration, authentication, and password updates. It also includes role-based access control with roles for regular users and admin users.
- UserService: Handles user management, including CRUD operations and fine management.
- BookService: Handles book management, including CRUD operations and search functionality based on title, author, or genre.
- ReservationService: Handles reservation management, including CRUD operations, and checks for reservation conflicts.
- StripeClient: Handles payment processing via Stripe integration.
- EmailService: Handles sending email notifications when reservations are created or updated.

### Key Components

- JwtService: Generates and validates JSON Web Tokens (JWT) for authentication.
- JwtAuthenticationFilter: Intercepts HTTP requests and checks for valid JWT tokens in the request headers.

## Frontend

The frontend is a React application built with ES6, which communicates with the backend API for data management. It includes components for user registration, login, book management, reservation management, and payment processing.

### Components

- Authentication components: User registration, login, and password updates.
- Book components: Book management, including creating, updating, deleting, and searching for books.
- Reservation components: Reservation management, including creating, updating, deleting, and checking for reservation conflicts.
- Payment components: Payment processing for user fines using Stripe integration.

## API Endpoints

| Endpoint                     | HTTP Method | Description                                    |
|------------------------------|-------------|------------------------------------------------|
| `/api/v1/auth/register`      | POST        | Register a new user                            |
| `/api/v1/auth/register-admin`| POST        | Register a new admin                           |
| `/api/v1/auth/authenticate`  | POST        | Authenticate a user                            |
| `/api/v1/auth/update-password`| POST       | Update a user's password                       |
| `/api/v1/books`              | GET         | Retrieve all books                             |
| `/api/v1/books`              | POST        | Add a new book                                 |
| `/api/v1/books/{id}`         | GET         | Retrieve a book by ID                          |
| `/api/v1/books/{id}`         | PUT         | Update a book by ID                            |
| `/api/v1/books/{id}`         | DELETE      | Delete a book by ID                            |
| `/api/v1/books/search`       | GET         | Search for books by title, author, or genre   |
| `/api/v1/reservations`       | GET         | Retrieve all reservations                      |
| `/api/v1/reservations`       | POST        | Create a new reservation                       |
| `/api/v1/reservations/{id}`  | GET         | Retrieve a reservation by ID                   |
| `/api/v1/reservations/{id}`  | PUT         | Update a reservation by ID                     |
| `/api/v1/reservations/{id}`  | DELETE      | Delete a reservation by ID                     |
| `/api/v1/payments`           | POST        | Process a payment for user fines              |

## Setup and Running
1. Clone the repository.
2. Set up the MySQL database and update the `application.properties` file with the appropriate database connection details.
3. Run the backend using `./mvnw spring-boot:run`.
4. Install the frontend dependencies using `npm install`.
5. Run the frontend using `npm start`.

## Contributing
Feel free to contribute to this project by submitting pull requests for new features, bug fixes, or improvements.

1. Fork the repository.
2. Create a new branch for your changes.
3. Make your changes and test them thoroughly.
4. Push your changes to your forked repository.
5. Create a pull request and describe the changes you've made.

Before submitting a pull request, please make sure that your changes are well-tested and follow the established code style and structure of the project.

## Acknowledgements

- Thanks to the Spring Boot and React communities for providing comprehensive documentation and support.
- Special thanks to Stripe for their easy-to-use payment processing API.

## Contact

If you have any questions or suggestions, feel free to open an issue or reach out to the project maintainer.
