# Latitude and Longitude Converter Web App

## Overview

This is a single-page web application designed to convert geographic coordinates from **Decimal Degrees (DD)** to **Degrees, Minutes, Seconds (DMS)** format. The app also includes a Google Map integration that allows users to view the coordinates on the map and save the converted data to a database.

## Features

- Convert coordinates from **Decimal Degrees (DD)** to **Degrees, Minutes, Seconds (DMS)**.
- Google Maps integration to display the converted coordinates with a marker.
- Save converted coordinates to a database via AJAX.
- Auto-versioning of JS and CSS files to avoid browser cache issues after updates.

## Getting Started

To run the application locally, follow these steps:

### Prerequisites

Ensure you have the following installed:

- **Node.js**
- **MySQL** running on port 3306 (or update the configuration if using a different port or database server - server/src/db/config.ts).

### Backend Setup

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Initialize the database:
   ```bash
   npm run init-db
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Open a new terminal window and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Create the environment configuration file:
   ```bash
   cp .env.example .env
   ```
3. Install the frontend dependencies:
   ```bash
   npm install
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```

## Running the App in the Browser

Once both the backend and frontend servers are running, open your browser and navigate to:
`http://localhost:5173/`
This will load the web app where you can input coordinates, convert them, and interact with the map.

## Notes

- If you are using a different database configuration, update the DB_CONFIG in `server/src/db/config.ts` accordingly.
- The default Google Map location is set to `Tampa Bay, Florida`.
- I appended a timestamp to JS import in `frontend/index.html` but Vite automatically handles cache busting in production builds by adding a hash to the file names when you build your app. For production, the query string approach isn't necessary since Vite already creates file names like `main.abc123.js` that include a unique hash based on the file contents. So I commented the line I added.
- For database creation, I added alter file: server/src/db/db_alter.txt but it's not necessary because we can create table by `npm run init-db`. But you can create the database running the query in this file manually.

Thank you!
