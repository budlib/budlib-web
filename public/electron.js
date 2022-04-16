const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
    autoHideMenuBar: true,
    icon: path.join(__dirname, '/public/favicon.ico'),
  });

  // and load the index.html of the app.
  win.loadFile('build/index.html');
  win.loadURL(`file://${path.join(__dirname, '../build/index.html')}`);

  win.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    win.loadURL(url);
  });
}

// This method will be called when Electron has finished initialization and is ready to create browser windows.
app.whenReady().then(createWindow);

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// quit when all windows are closed, except on macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
