#!/bin/bash

# WELCOME MESSAGE
printf "+---------------------------------------------------------------------------+\n"
printf "| BUDLIB INSTALLER SCRIPT                                                   |\n"
printf "+---------------------------------------------------------------------------+\n"

# INSTALLING DEPENDENCIES
printf "| [INFO] Downloading dependencies...                                        |\n"
npm install &> /dev/null
printf "| [DONE] Dependencies downloaded.                                           |\n"
printf "|                                                                           |\n"

# CREATE THE PRODUCTION BUILD OF THE APPLICATION
printf "| [INFO] Creating production build...                                       |\n"
npm run build &> /dev/null
printf "| [DONE] Production build created in folder \"./build\"                       |\n"
printf "|                                                                           |\n"

# CREATE THE ELECTRON PACKAGE OF THE APPLICATION
printf "| [INFO] Packaging into electron app...                                     |\n"
npm run package-linux &> /dev/null
printf "| [DONE] Electron app created in folder \"./electron-build/budlib-linux-x64\" |\n"
printf "+---------------------------------------------------------------------------+\n\n"
