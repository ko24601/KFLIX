const { app, BrowserWindow, session } = require('electron');
const path = require('path');
const http = require('http');
const handler = require('serve-handler');

// Hide automation flags so anti-bot scripts don't flag the desktop app
app.commandLine.appendSwitch('disable-features', 'BlinkGenPropertyTrees');
app.commandLine.appendSwitch('--disable--print-preview');

const server = http.createServer((request, response) => {
  return handler(request, response, {
    public: path.join(__dirname, '../assets')
  });
});

let mainWindow;

function createWindow() {
  server.listen(0, async () => {
    const port = server.address().port;

    const vidcoreSession = session.fromPartition('persist:vidcore');
    await vidcoreSession.clearCache();
    await vidcoreSession.clearStorageData();

    // Spoof headers to mimic mobile Safari
    vidcoreSession.webRequest.onBeforeSendHeaders((details, callback) => {
      if (details.url.includes('vidcore.io')) {
        details.requestHeaders['User-Agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1';
        details.requestHeaders['Referer'] = 'https://vidcore.io/';
        details.requestHeaders['Origin'] = 'https://vidcore.io';
      }
      callback({ requestHeaders: details.requestHeaders });
    });

    // Strip automation footprints inside the webview session
    vidcoreSession.setPreloads([
      path.join(__dirname, 'webview-preload.js')
    ]);

    mainWindow = new BrowserWindow({
      width: 1280,
      height: 720,
      backgroundColor: '#141414',
      title: 'KVIX',
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: false,
        webSecurity: false,
        allowRunningInsecureContent: true,
        webviewTag: true,
        preload: path.join(__dirname, '../desktop/preload.js')
      }
    });

    mainWindow.loadURL(`http://localhost:${port}/netflix_clone.html`);
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    server.close();
    app.quit();
  }
});