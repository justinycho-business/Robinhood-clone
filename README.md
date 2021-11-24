# Mr. Hood
https://robinhood-clone-jjeg.herokuapp.com/

## What is Mr. Hood?
Mr. Hood is a fullstack app that uses Flask/Python on the backend and React/Javascript on the front. It is a Robinhood clone designed to help make investing easier. It allows users to build a portfolio that gives them the ability to manage a variety of diverse stock options.

## Database Design
The app uses PostgreSQL in conjunction with SQLAlchemy to setup the relational database used for querying.

## Frontend Overview
The app displays content using the below technologies.

### Technologies Used

#### React
This is a React application. Display logic is handled by the React libraries.

#### Redux
The Redux store is responsible for state management. Thunks were created to make API calls to the backend in order to retrieve data.

## Backend Overview
The app runs on a Flask server.

### Technologies Used

#### Flask PyPI
As developers using Python on the backend, we decided to use the Flask framework. It provided us with the tools and libraries that allowed us to build the app.

#### PostgreSQL
We went with PostgreSQL because of how easy it is to write queries with it. We felt like we can trust our data and manage it with relative ease.

#### SQLAlchemy
We consider SQLAlchemy to be the ORM of choice for working with relational databases in Python since it is easy to implement and does not require advanced knowledge of SQL.

## What's Next?
There are a couple of bugs that need fixing and a couple of additional features we might want to implement in the near future, like a page for News on the many companies users are investing in and a Dark Mode option that can be toggled for accessibility.
