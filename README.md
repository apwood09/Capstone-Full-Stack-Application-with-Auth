# HomeKeep: Asset & Maintenance Manager

An application dashboard intended to help homeowners or renters track their assets and maintain a digital log of service history, repairs,upgrades and documents (URL). 

# 🚀 Key Features
- Asset Management: add, track, and delete home assets

- Maintenance Logs: maintain a record of all services, repairs, upgrades and documents 

- Visual Documentation: upload image links and supporting documents to your logs 

- Industrial Aesthetics: a responsive, glassmorphic UI featuring a high-contrast Red, Grey, and Yellow design system

- Secure Authentication: JWT-based secure user registration and login

# 🛠 Tech Stack

Frontend
- Framework: React

- Styling: Tailwind CSS (Customized Industrial Theme)

- Tooling: Vite

Backend
- Framework: Flask

- Database: PostgreSQL (SQLAlchemy)

- Authentication: Flask-JWT-Extended

- Migrations: Flask-Migrate

# 📦 Getting Started

Prerequisites
- Node.js (v24+)

- Python (v3.14+)

- PostgreSQL

# 🎨 Design Philosophy
This application utilizes a Glassmorphism aesthetic combined with an industrial-inspired palette:

- Charcoal Grey: stable, neutral base.

- Deep Red: high-priority actions and destructive operations

- Caution Yellow: rimary "Action" color, drawing the eye to critical user inputs and buttons

# 🔑 Security
This project uses JWT (JSON Web Tokens) to ensure that your home asset data is private. User authentication is managed via flask-jwt-extended, ensuring that each user can only perform CRUD operations on their own assets.

APPLICATION RENDER LINK! 
https://capstone-full-stack-application-with-auth.onrender.com/login
