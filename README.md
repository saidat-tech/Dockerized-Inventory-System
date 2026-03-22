# Dockerized-Inventory-System

## Project Overview

This project demonstrates how an inventory management application can be containerized using Docker to provide a consistent and portable runtime environment.

The application is built with Node.js and Express, and serves a frontend interface from a public directory. 

By packaging the application into a Docker container, the project removes environment inconsistencies and makes deployment easier across systems.

## Technologies Used

- Node.js
- Express.js
- Docker

## Project Structure

```bash
dockerized-inventory-system/
├── app.js
├── package.json
├── package-lock.json
├── Dockerfile
├── .dockerignore
└── public/
    └── index.html
```

## How to Run

### Build the image

```bash
docker build -t inventory-app .
```

### Run the container

```bash
docker run -d -p 3000:3000 --name inventory-container inventory-app
```

### Access the application

Open:

```bash
http://localhost:3000
```

## Skills Demonstrated

- Docker image creation
- Containerized application deployment
- Dependency management
- Debugging container startup issues
- Port mapping and service exposure

## Lessons Learned

During this project, key troubleshooting areas included:

- building from the correct directory
- creating a valid Dockerfile
- ensuring Node.js dependencies were installed
- aligning application and container ports
- serving static frontend files correctly

These troubleshooting steps improved my understanding of practical DevOps workflows and container debugging.
