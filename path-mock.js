module.exports = {
  join: function(...args) {
    return '/' + args.flat().filter(arg => typeof arg === 'string').join('/').replace(/\/+/g, '/');
  },
  resolve: function(...args) {
    return module.exports.join(...args);
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