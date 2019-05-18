module.exports = {
  // Make production build app.html in production, otherwise if it were named index.html it will conflict with the Express routes (it would simply be served via the Express status directory and no Express route callback will run)
  indexPath: process.env.NODE_ENV === 'production'
    ? 'app.html'
    : 'index.html',
  devServer: {
    port: 8080,
    host: 'localhost', 
    proxy: {
      // We need to proxy so Auth0 recieves http://localhost:8080 as the origin of the request
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