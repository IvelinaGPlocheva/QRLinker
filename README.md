QR Code Generator
=======

Pre-requisites
==============

- Ubuntu 20.04 or up, other operating systems may vary.
- docker.io
- docker-compose
- Git

Quick Start
===========

 - Clone the repository and navigate to the project's root directory
 - Run the following commands:
```
bin/docker-compose run --rm --no-deps website npm install
bin/docker-compose up
```

 - http://localhost:3000 (Node.js website)
 - http://localhost:8081 (Mongo-Express)


All npm commands are run as follows:
 ```
 bin/docker-compose run --rm --no-deps website <command>
 ```

Configuration
==============

The following environment variables can be set to configure the application:
 - **RUNAS**: The user that the container will run as.
 - **VAR_ROOT**: The root directory for shared files.
 - **DB_URL**: The URL for the MongoDB database.
 - **NODE_ENV**: The Node.js environment (e.g. development or production).

Volumes
=======
The following volumes are shared between the host and the container:

 - **${VAR_ROOT}/shared**: The shared directory.
 - **${VAR_ROOT}/home**: The home directory.
 - **../**: The source directory.

Restart policy
=======
The containers are set to restart unless stopped.

Ports
======
 - The website service run on port **3000** and it is exposed to the host machine.
 - The Mongo-Express service run on port **8081** and it is exposed to the host machine.
 - The Mongo service run on port **27017** and it is exposed to the host machine.

Note
====
 - Make sure to set the correct path for the volumes and the environment variables.
 - The application depends on MongoDB to run, and the volume is shared between the host and the container.
 - The "website" service is running the command "npm start" to start the application.
