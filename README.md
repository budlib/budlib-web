# BudLib web interface

A web based front end for the [budlib-api](https://github.com/budlib/budlib-api)

## Dependencies

- Node version 16.13.1 or above

## How to run on web browser

1. Clone the repository on your machine

2. Make sure that [BudLib API](https://github.com/budlib/budlib-api) is running and is accessible

3. Running the below command from the repository's root directory will get the react server running. You can launch your browser and visit the default URL `http://localhost:3000`

   ```bash
   $ npm install
   $ npm start
   ```

## How to run on Electron app

1. Clone the repository on your machine

2. Make sure that [BudLib API](https://github.com/budlib/budlib-api) is running and is accessible

3. Create the build of the web application

   ```bash
   $ npm run build
   ```

4. Run the run electron packaging script depending on your OS

   ```bash
   $ npm run package-mac         # for macOS
   $ npm run package-win         # for Windows
   $ npm run package-linux       # for Linux
   ```

5. The above command will create a `release-builds` directory, with the build of the web application. For example, when using Windows, you will electron executable file under `release-builds/budlib-win32-ia32/budlib.exe`.

## Contributors

- [Bhavyai Gupta](https://github.com/zbhavyai)
- [Michael Man Yin Lee](https://github.com/mikeePy)

## Attribution

- [Bootstrap theme](https://startbootstrap.com/theme/sb-admin-2) by Start BootStrap
- [Icons and logo](https://www.flaticon.com/free-icons/book) from Smashicons
- [Dashboard images](https://iconscout.com/illustration-pack/indian-doodle) from Iconscout
