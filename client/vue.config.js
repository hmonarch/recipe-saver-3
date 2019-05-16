module.exports = {
  devServer: {
    port: 8080,
    host: 'localhost', 
    proxy: {
      // We need to proxy /login so Auth0 recieves http://localhost:8080 as the origin of the request
      // Remember to restart Vue server after making changes
      '/login': {
        target: 'http://localhost:8081',
        secure: false
      },
      '/user': {
        target: 'http://localhost:8081',
        secure: false,
      },
      '/callback': {
        target: 'http://localhost:8081',
        secure: false,
      },
      '/test': {
        target: 'http://localhost:8081',
        changeOrigin: true
      },
    }
  }
};