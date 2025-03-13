# Movie Booking Backend Server

## Overview
This module requires you to create a backend server that replicates a movie booking site. The project consists of two types of users authenticated using JWT tokens:

1. **Normal User**
   - Browse the list of movies with their status.
   - Status can be:
     - Time (one-time duration, e.g., 3 PM - 6 PM).
     - House full.
     - Number of seats remaining.
     - Option to book/cancel (users can book/cancel for free).
   - Alter (increment/decrement) the number of seats remaining in case of booking/cancellation.
     - Minimum: 1 person.
     - Maximum: 4 people per booking.
     - Cancellation removes all booked seats by that user for the selected movie.
   - Can create an account with default permission as "user" (Signup/Login using credentials).
   - Cannot add/remove a new movie (only admins can do this).

2. **Admin**
   - Can add a new movie by providing:
     - Movie name.
     - Number of available seats.
     - Time.
     - Image (uploaded from the file system).
   - Cannot remove a movie if even one seat is occupied.
   - Can log in (admin credentials are pre-created via a separate endpoint, no signup for admins).
   - Cannot book/cancel movie tickets.
   - Can browse the list of movies with their status.
   - Cannot alter the number of seats like normal users.

## Technologies & Tools Required
- **Backend:** Node.js with Express.js.
- **Database:** MongoDB Atlas (use Mongoose for integration).
- **Authentication:** JWT-based authentication.
- **Testing:** Postman Desktop.
- **Deployment:** Deploy the backend on any free hosting service, such as:
  - Railway (free tier available).
  - Heroku (free tier available).
  - AWS (requires card details, but has a free tier).
  - DigitalOcean (requires card details, but has a free tier).
  - Render (completely free option available).

## Requirements & Points Allocation
1. Use **Express.js** as the framework for Node.js. **(+5 PTS)**
2. Use **Mongoose** for MongoDB Atlas integration. **(+5 PTS)**
3. Follow a proper **MVC framework** (excluding the View layer since it is a backend-only project). **(+5 PTS)**
4. Implement **JWT authentication**:
   - Signup available only for normal users.
   - Admin login credentials:
     - Username: `admin`
     - Password: `123456`
   - No signup option for admins. **(+5 PTS)**
5. Protect routes based on user roles (admin and normal user). **(+5 PTS)**

## API Testing Guidelines
Use **Postman Desktop** to test all API endpoints. Ensure authentication is implemented correctly and permissions are enforced.

## Submission Guidelines
1. Submit your **name, BITS email, GitHub ID URL, and phone number**.
2. Submit the **GitHub repository URL** for your module (`Module 3`).
3. Submit the **deployed backend URL** (Deployment is mandatory).

---
Ensure your repository includes a well-documented `README.md`, proper API routes, and follows best practices in structuring a backend application. Good luck!

