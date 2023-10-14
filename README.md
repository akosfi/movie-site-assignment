# Movie site made with Next.js

## Getting Started

To get started with this project, follow these steps:

### 1. Clone the repository:

```bash
git clone https://github.com/akosfi/movie-site.git

# or

gh repo clone akosfi/movie-site
```

### 2. Navigate to the project directory:

```bash
cd movie-site
```

### 3. Install dependencies with npm:

```bash
npm i
```

### 4. Run the application

#### **IMPORTANT!**

Create an **.env** file based on the **.env.example** file.

If you run the site with the provided **docker-compose.yml** file (4/C), a MongoDB database is not needed to be set up, as it will be set up automatically. Otherwise you should set up a database manually for the application to work correctly.

#### 4/A. Start the development server:

```bash
npm run dev
```

Application should be running on http://localhost:3000

#### 4/B. Start the production server:

```bash
npm run build
npm run start
```

Application should be running on http://localhost:3000

#### 4/C. Start the production server locally with the provided **docker-compose.yml**.

```bash
docker-compose up
```

Application should be running on http://localhost:$NODE_LOCAL_PORT
