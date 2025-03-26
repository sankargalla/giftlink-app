# GiftLink

GiftLink is a full-stack web application that connects users who wish to give away household items with users who prefer to find free household items rather than purchasing new ones.

## Features

- User authentication (Registration, Login, Logout)
- Home Page with a "Get Started" button
- Listings Page displaying all available gifts
- Search functionality with filters (Category, Condition, Age, etc.)
- Gift details page with comments section
- User profile with editable username
- Navigation bar with Register, Login, Home, and Search links

## Installation

### Clone the repository:
```sh
git clone https://github.com/yourusername/giftlink.git
```

### Navigate to the project directory:
```sh
cd giftlink
```

### Install dependencies:
```sh
npm install
```

### Set up environment variables:
Create a `.env` file in the root directory and configure the necessary credentials.

### Start the backend server:
```sh
npm run server
```

### Start the frontend development server:
```sh
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Gifts
- `GET /api/gifts` - Fetch all gift listings
- `GET /api/gifts/:id` - Fetch gift details

### Comments
- `POST /api/comments` - Add a comment on a gift

### User Profile
- `GET /api/users/profile` - Fetch user profile
- `PUT /api/users/profile` - Update user profile

## Technologies Used

**Frontend:** React, Bootstrap  
**Backend:** Node.js, Express.js  
**Database:** MongoDB  
**Authentication:** JWT (JSON Web Token)
