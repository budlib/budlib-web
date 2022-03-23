# BudLib web interface

A web based front end for the [budlib-api](https://github.com/budlib/budlib-api)

## Dependencies

- Node version 16.13.1 or above

## How to run

1. Clone the repository on your machine

2. Make sure that [BudLib API](https://github.com/budlib/budlib-api) is running and is accessible

3. Running the below command from the repository's root directory will get the react server running. You can launch your browser and visit the default URL `http://localhost:3000`

   ```bash
   $ npm install
   $ npm start
   ```

## Compiling Electron App
1. Create a build of the web application first
   ```bash
   $ npm run build
   ```
2. run package script as listed in package.json. For example if we were to compile a windows application:
   ```bash
   $ npm run package-win
   ```


## Contributors

- [Bhavyai Gupta](https://github.com/zbhavyai)
- [Michael Man Yin Lee](https://github.com/mikeePy)
