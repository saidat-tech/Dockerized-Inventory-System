![AWS](https://img.shields.io/badge/AWS-Cloud-orange)
![Docker](https://img.shields.io/badge/Docker-Container-blue)
![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![DevOps](https://img.shields.io/badge/DevOps-Project-red)

# Dockerized-Inventory-System

## Project Overview

This project demonstrates how to containerize a cloud-based inventory management application using Docker. 
- What is Docker? 

Docker is a tool that packages an application and everything it needs to run, together into a container.The application is packaged into a Docker container to ensure consistent deployments across development, testing, and production environments.

The system runs a Node.js backend built with Express.js and serves a React-based frontend interface that allows users to manage infrastructure inventory assets.

## Why Docker?

Docker allows organisations to package applications with their dependencies into containers, ensuring consistency across environments. It improves deployment speed, supports microservices architecture, enables CI/CD automation, reduces infrastructure costs, and allows easy scaling. DevOps engineers use Docker because it enables reliable, repeatable, and automated deployments while integrating well with Kubernetes and cloud platforms.

By containerizing the application, the project eliminates inconsistencies and makes deployment easier across systems.

## Architecture Overview

The application runs inside a Docker container that includes the Node.js runtime and all required dependencies. The container exposes a web service that allows users to access the inventory system through a browser.

User requests are sent to the containerized application, where the Express API processes inventory operations and the React frontend renders the user interface.

## Skip to Step 7 to see how Docker is being put to action.

## Step 1 — Create the project folder

- Go to your Downloads folder and create the project folder then move into the project folder:
~~~
cd ~/Downloads
mkdir -p dockerized-inventory-system
cd dockerized-inventory-system
~~~
<img width="341" height="59" alt="Image" src="https://github.com/user-attachments/assets/c07004f5-b251-4125-b6de-c59825536b4b" />

<img width="418" height="66" alt="Image" src="https://github.com/user-attachments/assets/bfa60b31-90fd-477a-b5ad-b5dbc4811bd0" />

- Check where you are with the code below:
~~~
pwd
~~~
You should be inside:
~~~
~/Downloads/dockerized-inventory-system
~~~

<img width="501" height="65" alt="Image" src="https://github.com/user-attachments/assets/957e35d3-e5ee-4bb8-9cba-88a66a74e19c" />

This step is important. If you are not in the project folder, Docker will build from the entire Downloads folder, which will make the build context too large.

## Step 2 — Create app.js

- Create the file using:
~~~
touch app.js
~~~
- Then open the file with: 
~~~
nano app.js
~~~

<img width="496" height="102" alt="Image" src="https://github.com/user-attachments/assets/466286bc-35d5-4a2a-885e-22097bb9faac" />

Paste this code in:
~~~
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

let inventory = [
    { id: 1, name: "Cisco Catalyst 9300", qty: 2, category: "Networking" },
    { id: 2, name: "PowerEdge R750", qty: 5, category: "Servers" }
];

app.get('/api/inventory', (req, res) => res.json(inventory));

app.post('/api/inventory', (req, res) => {
    const newItem = { id: Date.now(), ...req.body };
    inventory.push(newItem);
    res.status(201).json(newItem);
});

app.put('/api/inventory/:id', (req, res) => {
    const { id } = req.params;
    inventory = inventory.map(item =>
        item.id == id ? { ...item, ...req.body } : item
    );
    res.json({ message: "Update Successful" });
});

app.delete('/api/inventory/:id', (req, res) => {
    inventory = inventory.filter(item => item.id != req.params.id);
    res.status(204).send();
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Inventory System running at: ${PORT}`);
});
~~~

Save with:
~~~
Ctrl + X
Y
Enter
~~~


## Step 3 — Create public/index.html

- Creat a folder named public and file named index.html inside it.
~~~
mkdir public
~~~
~~~
touch index.html
~~~
- Open the file with:
~~~
nano public/index.html
~~~
<img width="542" height="216" alt="Image" src="https://github.com/user-attachments/assets/aad5b251-2a8d-4e4d-8241-0b4a96f7873a" />

- Paste this simple working version first:
~~~
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>InventoryOS</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #0d1117;
      color: white;
      padding: 40px;
    }
    h1 {
      color: #58a6ff;
    }
  </style>
</head>
<body>
  <h1>Inventory System is running</h1>
  <p>Your Dockerized Inventory App is working successfully.</p>
</body>
</html>
~~~

## Step 4 — Install Node.js locally

- Install Node.js on your local machine.
- Search for Node.js on your search engine.
  
  <img width="587" height="252" alt="Image" src="https://github.com/user-attachments/assets/07149497-c84f-416f-9465-7c8f9750ff10" />
  
- Click on **Get Node.js**

  <img width="397" height="141" alt="Image" src="https://github.com/user-attachments/assets/283c54b9-d2f0-4227-b0ad-6e8c948266b8" />
  
- Edit the requirement; I changed **Windows - Linux** and **Docker - nvm**

<img width="778" height="111" alt="Image" src="https://github.com/user-attachments/assets/3d1f1488-c174-4af6-a9e1-6886609cf247" />

-So you have something like this:

 <img width="805" height="506" alt="Image" src="https://github.com/user-attachments/assets/f50b1e61-766b-4188-b7d3-6de5c195d9b7" />
 
- Then copy the code to install your Node.js

- Check to confirm that **node** and **npm** are installed:
  
~~~
node -v
npm -v
~~~

<img width="487" height="131" alt="Image" src="https://github.com/user-attachments/assets/af2b6b21-15ee-4294-bb73-644fef099978" />

## Step 5 — Create package.json

- Inside your dockerized-inventory-system, run:
~~~
npm init -y
~~~
- Then install Express:
~~~
npm install express
~~~

- Confirm the files inside with:
  
~~~
ls
~~~

- You should now see:
  
~~~
app.js
package.json
package-lock.json
public
~~~

## Step 6 — Update package.json

- Inside your dockerized-inventory-system, initialize npm; run:

~~~
npm init -y
~~~

- Open the package.json:
  
~~~
nano package.json
~~~

- Find the scripts section and change it to this:

~~~
"scripts": {
  "start": "node app.js"
}
~~~
So your package.json should look similar to:
~~~
{
  "name": "dockerized-inventory-system",
  "version": "1.0.0",
  "description": "Dockerized inventory system project",
  "main": "app.js",
  "scripts": {
    "start": "node app.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.21.2"
  }
}
~~~

## Step 7 — Create Dockerfile

- Create the file named Dockerfile:
  
~~~
touch Dockerfile
~~~

~~~
nano Dockerfile
~~~

<img width="494" height="107" alt="Image" src="https://github.com/user-attachments/assets/6454371e-7f37-4d9c-8126-82c595caedc1" />

Paste this exact content:

~~~
FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
~~~

- This installs dependencies inside the container, exposes the same port your app uses and runs the app through npm start.

## Step 8 — Create .dockerignore

- Create the file with:
~~~
touch .dockerignore
~~~

- Open the file:
~~~
nano .dockerignore
~~~
<img width="492" height="96" alt="Image" src="https://github.com/user-attachments/assets/1c6c539a-375b-45a0-b2db-5e46adfaf70b" />

- Paste:
~~~
node_modules
.git
.gitignore
npm-debug.log
README.md
~~~

- This file helps keep the Docker context small and clean.

## Step 9 — Check your folder before building
- Check your folder to confirm your folers and files.

<img width="681" height="140" alt="Image" src="https://github.com/user-attachments/assets/bda6e308-4344-4c47-8c9f-2e7e97186084" />

You should have:
~~~
app.js
package.json
package-lock.json
Dockerfile
.dockerignore
public/index.html
~~~

## Step 10 — Build the Docker image

Before building, make sure you are inside the project folder:
- Check with:

~~~
pwd
~~~

Then build with:

~~~
docker build -t inventory-app .
~~~

<img width="725" height="240" alt="Image" src="https://github.com/user-attachments/assets/91a2cf20-11e4-44e2-8a5d-d2b354dff88f" />
<img width="729" height="204" alt="Image" src="https://github.com/user-attachments/assets/c08c6e89-5867-48aa-b1d4-f9aff5918524" />

Note:
The **period (.)** means **“use this current folder.”**
If you run this from ~/Downloads or anywhere else, Docker will try to build your entire Downloads folder or the folder you are in.

## Step 11 — Run the container

- Run the container with:
~~~
docker run -d -p 3000:3000 --name inventory-container inventory-app
~~~

<img width="494" height="73" alt="Image" src="https://github.com/user-attachments/assets/f33288bd-3261-4353-9edb-0d67bd8d6606" />

- This will map the local machine port 3000 to the container port 3000.
  
## Step 12 — Verify it is running

- Verify the container is running with:
  
~~~
docker ps
~~~

- You should see inventory-container with **status Up**.

<img width="739" height="122" alt="Image" src="https://github.com/user-attachments/assets/a5027f1e-3ac8-41ac-8fd7-d052264944ff" />

- Then check logs with:
~~~
docker logs inventory-container
~~~

- You should see:
~~~
Inventory System running at: 3000
~~~

<img width="495" height="136" alt="Image" src="https://github.com/user-attachments/assets/a919f371-fb71-4f01-ad67-6c71e44e283f" />

- Then open in your browser with:
  
~~~
http://localhost:3000
~~~

- You should see the page.

<img width="698" height="304" alt="Image" src="https://github.com/user-attachments/assets/428a667f-c1a7-40cd-8761-68d8d3e40593" />


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
