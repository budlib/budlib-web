::TO PREVENT COMMANDS GETTING PRINTED BEFORE EXECUTION
@echo off

title BudLib Installer Script

::WELCOME MESSAGE
echo +---------------------------------------------------------------------------+
echo  BUDLIB INSTALLER SCRIPT
echo +---------------------------------------------------------------------------+

::INSTALLING DEPENDENCIES
echo  [INFO] Downloading dependencies...
call npm install > NUL 2>&1
title BudLib Installer Script
echo  [DONE] Dependencies downloaded
echo.

::CREATE THE PRODUCTION BUILD OF THE APPLICATION
echo  [INFO] Creating production build...
call npm run build > NUL 2>&1
title BudLib Installer Script
echo  [DONE] Production build created in folder "./build"
echo.

::CREATE THE ELECTRON PACKAGE OF THE APPLICATION
echo  [INFO] Packaging into electron app...
call npm run package-win > NUL 2>&1
title BudLib Installer Script
echo  [DONE] Electron app created in folder "./electron-build/budlib-win32-x64"
echo +---------------------------------------------------------------------------+
echo.

@pause
