---

# POS System API

This is the backend API for the POS (Point of Sale) system, developed using Java 17 and Tomcat 10. The API interacts with the customer and item databases to manage the essential operations of the POS system.

## Features

- **Customer Management**: 
  - Add, update, and retrieve customer information.
  - Load customer data into the frontend from the database.
  - Customer ID dropdown populated dynamically from the database.

- **Item Management**: 
  - Add, update, and retrieve item details.
  - Manual input of item IDs (auto-ID generation disabled).

- **Order Management**:
  - Save orders with associated customers and items.

## Technologies Used

- **Java 17**: For backend development.
- **Tomcat 10**: Application server.
- **HTML/CSS/JavaScript**: For frontend development.
- **Database**: For storing customer and item data.

## Getting Started

### Prerequisites

- Java 17
- Tomcat 10
- Database setup (e.g., MySQL)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/pos-system-api.git
   ```

2. **Build the project**:
   Navigate to the project directory and build the project using your preferred build tool.

3. **Deploy to Tomcat**:
   Deploy the generated WAR file to your Tomcat server.

4. **Database Setup**:
   Set up the database with the necessary tables for customers and items.

### Running the Application

1. **Start the Tomcat server** for the backend API.

2. **Run the frontend**:
   - Make sure you're using Live Server.
   - The frontend can be accessed via `http://localhost:5501`.

## API Endpoints

- **Customers**:
  - `GET /customers`: Retrieve a list of customers.
  - `POST /customers`: Add a new customer.
  - `PUT /customers/{id}`: Update an existing customer.

- **Items**:
  - `GET /items`: Retrieve a list of items.
  - `POST /items`: Add a new item.
  - `PUT /items/{id}`: Update an existing item.

- **Orders**:
  - `POST /orders`: Save a new order.

## License

This project is licensed under the MIT License.

---
