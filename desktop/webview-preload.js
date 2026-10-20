// Hide automation flags from VidCore's server-side fingerprinting
Object.defineProperty(navigator, 'webdriver', {
  get: () => false
});

// Mock plugins to look like a standard mobile Safari browser
Object.defineProperty(navigator, 'plugins', {
  get: () => [1, 2, 3, 4, 5]
});