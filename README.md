# Tumarisiti Frontend

## Overview

Tumarisiti is a MERN-based application that allows users to upload invoices via CSV, check their transmission status with KRA, and send automated messages to suppliers. This frontend provides an intuitive interface for managing invoices, users, and viewing dashboard analytics.

## Technologies Used

- **React.js** (Frontend framework)
- **React Router** (Client-side navigation)
- **Tailwind CSS** (Styling)
- **Axios** (HTTP requests)
- **JWT Authentication** (User authentication)

## Setup Instructions

### Prerequisites

Ensure you have the following installed:

- Node.js (v16+ recommended)
- npm or yarn

### Installation

```sh
# Clone the repository
git clone
cd tumarisiti-frontend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
nano .env  # Edit and update necessary values

# Start the development server
npm start
```

## Project Structure

```sh
/src
 ├── /components       # Reusable UI components
 ├── /dashboard        # Dashboard module
 │   ├── /pages        # Dashboard-related pages
 │   ├── /services     # API service calls for dashboard
 │   ├── /hooks        # Custom hooks for dashboard
 ├── /invoices         # Invoice module
 │   ├── /pages        # Invoice-related pages
 │   ├── /services     # API service calls for invoices
 │   ├── /hooks        # Custom hooks for invoices
 ├── /users            # User management module
 │   ├── /pages        # User-related pages
 │   ├── /services     # API service calls for users
 │   ├── /hooks        # Custom hooks for users
 ├── /authprovider     # Auth provider to handle authentication
 ├── /utils            # Helper functions
 ├── /assets           # Images and static assets
 ├── App.js            # Main application component
 ├── index.js          # Entry point
```

## Features

- **User Authentication**: Login and registration using JWT
- **Invoice Upload**: Upload CSV files to check KRA transmission status
- **Dashboard Analytics**: Visual representation of invoice status and other key metrics
- **Automated Supplier Messaging**: Notify suppliers of pending transmissions
- **User Management**: Admin can manage user accounts
- **Sorting & Filtering**: View invoices by status, date, or supplier

## API Integration

- Uses **Axios** for API communication
- Base API URL is configured in `.env` file

## Environment Variables

Ensure your `.env` file contains the necessary keys:

```env
REACT_APP_AWS_URL=http://localhost:4000  # Backend API base URL

```

## License

```txt
MIT License
```

## Author

Charles Mungai- [charlesmungai5@gmail.com]
