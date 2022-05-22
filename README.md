# BudLib web interface

A web based front end for the [budlib-api](https://github.com/budlib/budlib-api)

## How to deploy

Check the [wiki](https://github.com/budlib/budlib-web/wiki) for deployment instructions.

## How to build and run

1. The following are required to build and run this project:

   - Node version 16.13.1 or above
   - [BudLib API](https://github.com/budlib/budlib-api) is running and is accessible

2. Clone the repository on your machine, or download the zip file

   ```bash
   $ git clone git@github.com:budlib/budlib-web.git
   ```

3. Install the dependencies

   ```bash
   $ npm install
   ```

4. To run the development build using the below command. You can launch your browser and visit the default URL `http://localhost:3000`

   ```
   $ npm start
   ```

5. To run the production build in an **Electron app**

   1. Create the production build

      ```bash
      $ npm run build
      ```

   2. Run the run electron packaging script depending on your OS

      ```bash
      $ npm run package-win         # for Windows
      $ npm run package-linux       # for Linux
      $ npm run package-mac         # for macOS
      ```

   3. The above command will create a `electron-build` directory, containing the electron build of the web application. For example, when using Windows, you will find electron executable file created as `electron-build/budlib-win32-x64/budlib.exe`.

**Note**: The initial credentials to use the application are `admin@localhost` and `easypassword`

## Contributors

- [Bhavyai Gupta](https://github.com/zbhavyai)
- [Mike Lee](https://github.com/mikeePy)

## Attribution

- [Bootstrap theme](https://startbootstrap.com/theme/sb-admin-2) by Start BootStrap
- [Icons and logo](https://www.flaticon.com/free-icons/book) from Smashicons
- [Dashboard images](https://iconscout.com/illustration-pack/indian-doodle) from Iconscout
