### Prerequisites
- Docker installed and running on your machine
- Docker Compose installed

### Installation and Setup
- Clone the repository

```sh
git clone <repository-url>
cd <repository-directory>
```
- Create an .env file in the root directory of the project, you can copy .env.example 

### Start the application

To build and start the application, run:

```sh
npm start
```
This will use Docker Compose to build and start the application and database containers in the background.

### Access the application

The application will be available at http://localhost:3000 and to verify from your browser directly, you can visit a public endpoint with data http://localhost:3000/api/policies/public 

### Running Tests
To run tests:

```sh
npm test
```
This will execute tests inside the app container.

### Stopping the Application
To stop the application and remove the containers:

```sh
npm run stop
```
To stop and clean up the environment, including removing volumes, images, and orphaned containers:

```sh
npm run clean
```

### Building the Project
To build the project (compile TypeScript files):

```sh
npm run build
```
This will execute the build process.