# qe-test.github.io

## QE Technical Test Documentation.
This repository contains automated tests written in JavaScript using Selenium WebDriver to satisfy the technical tests requirements. 

## Getting Started
The html file was hosted on: https://ekow244.github.io/qe-test.github.io/QE-index.html
To run the tests in this repository, follow the steps below:

## Prerequisites
Node.js and npm (Node Package Manager) must be installed on your system. You can download and install Node.js from the official website: https://nodejs.org.

Chrome Browser: The tests are designed to run on the Desktop Chrome browser. Make sure you have Google Chrome installed on your machine. Run the following to satisfy dependencies.

## Installation
Clone this repository to your local machine using Git

```git clone https://github.com/Ekow244/qe-test.github.io.git```

Navigate to the project's root directory:

```cd qe-test``

Install the project dependencies using npm:

```npm install```

```npm init -y 
npm install selenium-webdriver  
npm install chromedriver 
```
Run
```cp example.env .env``` to copy the environment variables to your local .env file which isn't git tracked.

Set the environment variables on your local .env

## Running the Tests
To run the tests, execute the following command in the terminal:

`node tests/*.js` to run the individual tests
or 

`npm test` to run all the tests

## Test Results
After running the tests, you will see the test results in the terminal.
