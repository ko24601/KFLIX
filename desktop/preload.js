const { contextBridge, shell, ipcRenderer } = require('electron');

// Expose secure API bridge for the frontend UI
contextBridge.exposeInMainWorld('electronAPI', {
  openExternal: (url) => shell.openExternal(url),
  send: (channel, data) => ipcRenderer.send(channel, data),
  on: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(...args))
});

// Mock global Node variables
window.__dirname = '/';
window.__filename = '/index.js';

// Comprehensive path polyfill
const pathMock = {
  join: function(...args) {
    return '/' + args.flat().filter(arg => typeof arg === 'string').join('/').replace(/\/+/g, '/');
  },
  resolve: function(...args) {
    return pathMock.join(...args);
  },
  dirname: function(p) {
    return p ? p.split('/').slice(0, -1).join('/') || '/' : '/';
  },
  basename: function(p) {
    return p ? p.split('/').pop() : '';
  },
  extname: function(p) {
    const idx = p ? p.lastIndexOf('.') : -1;
    return idx !== -1 ? p.slice(idx) : '';
  },
  sep: '/'
};

window.path = pathMock;

// Intercept CommonJS require calls inside the web bundle
window.require = function(moduleName) {
  if (moduleName === 'path' || moduleName === 'node:path') {
    return pathMock;
  }
  if (moduleName === 'electron') {
    return { shell, ipcRenderer };
  }
  throw new Error(`Module "${moduleName}" is not mocked in browser context.`);
};
window.require.resolve = (m) => m;