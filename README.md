# Student-Login-System

A System where Teachers can add, edit and delete marks sheets for students of its class.
Students can also view their marks sheets.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the web app:-

* Node.js (You can download it directly from [Node.js](https://nodejs.org/) website)
* MongoDB (You can download it directly from [mongoDB](https://www.mongodb.com/) website)
* Angular CLI ([Read This For Installation Guide](https://www.npmjs.com/package/@angular/cli))

### Installing

A step by step series of examples that tell you how to get a development env running

* Fork this repository by clicking the Fork button on the top.

* Clone the forked repository on your system by the following command. 
  ```
  git clone https://github.com/[Your Github Username]/Student-Login-System
  ```
  You have to replace [Your Github Username] to your actual username.

* Open a terminal inside the Student-Login-System folder and type the following to get into the server folder.
  ```
  cd server
  ```
  
  Type the below command to install all server dependencies.
  ```
  npm install
  ```
  
  Type the below command to start the backend server.
  ```
  npm run start
  ```
  
  If you see the following output, it means that the backend server has started successfully.
  ```
  Server Started On Port 3000
  Connected To MongoDB
  ```
  
* Leave the backend server running and open another terminal inside the Student-Login-System folder and type the following to get into the client folder.
  ```
  cd client
  ```
  
  Type the below command to install all client dependencies.
  ```
  npm install
  ```

  Type the below command to start the local server.
  ```
  ng serve
  ```
  
  If your terminal gives a similar output as below, it means that the client server has started successfully and you can access the web app by visiting http://localhost:4200 in your browser.
  ```
  ** Angular Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200/ **

  Date: 2018-11-12T11:16:13.384Z
  Hash: de7e557ada8559b79e96
  Time: 10572ms
  chunk {main} main.js, main.js.map (main) 165 kB [initial] [rendered]
  chunk {polyfills} polyfills.js, polyfills.js.map (polyfills) 227 kB [initial] [rendered]
  chunk {runtime} runtime.js, runtime.js.map (runtime) 6.22 kB [entry] [rendered]
  chunk {scripts} scripts.js, scripts.js.map (scripts) 138 kB  [rendered]
  chunk {styles} styles.js, styles.js.map (styles) 182 kB [initial] [rendered]
  chunk {vendor} vendor.js, vendor.js.map (vendor) 3.86 MB [initial] [rendered]
  i ｢wdm｣: Compiled successfully.
  ```
  

## Built With

* [Express](https://expressjs.com/) - The web framework used
* [Angular](https://angular.io/) - A frontend framework
* [Mongoose](https://mongoosejs.com/) - Used for elegant mongodb object modeling for node.js
