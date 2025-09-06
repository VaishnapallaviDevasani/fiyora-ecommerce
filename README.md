# 🛍️ FashionExplore - Backend

This is the **backend API** for **FashionExplore**, a fashion e-commerce application.  
It provides **user authentication, product management, and cart functionality** using **Node.js, Express, MongoDB, and JWT**.

## 🚀 Features

### 👤 User Authentication
- Register new users
- Login with **JWT authentication**

### 👗 Products Management
- Add, update, delete products
- Categorize products by **category** and **subCategory**
- Store product images and size options

### 🛒 Cart Management
- Add items to user’s cart
- Update or remove items
- Get user’s cart data

### 📦 MongoDB Database
- Stores **users, products, and cart data**

## 🛠️ Tech Stack
- **Node.js** – Backend runtime  
- **Express.js** – Web framework  
- **MongoDB + Mongoose** – Database & ODM  
- **JWT (JSON Web Tokens)** – Authentication  
- **Bcrypt.js** – Password hashing  
- **Cloudinary** – Image storage (optional)

## 📂 Project Structure
FashionExplore/
│
├── controllers/        # Request handlers (auth, cart, product, etc.)
├── middleware/         # Auth middleware
├── models/             # Mongoose models (User, Product)
├── routes/             # API route definitions
├── server.js           # Entry point
└── package.json
💡 Future Improvements
Add order & payment modules
Admin panel for product management
Cloud storage for images (AWS S3 / Cloudinary)
👩‍💻 Author

Vaishnapallavi Devasani
