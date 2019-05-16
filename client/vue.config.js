module.exports = {
  devServer: {
    proxy: {
      // We need to proxy /login so Auth0 recieves http://localhost:8080 as the origin of the request
      '/login': {
        target: 'http://localhost:8081',
        secure: false
      }
    }
  }
};