module.exports = {
  // Make production build app.html in production, otherwise if it were named index.html it will conflict with the Express routes (it would simply be served via the Express status directory and no Express route callback will run)
  indexPath: process.env.NODE_ENV === 'production'
    ? 'app.html'
    : 'index.html',
  devServer: {
    https: true,
    port: 8080,
    host: 'localhost', 
    historyApiFallback: true,
    proxy: {
      // Remember to restart Vue server after making changes
      '/user': {
        target: 'https://localhost:8081',
        secure: false,
      },
      '/test': {
        target: 'https://localhost:8081',
        changeOrigin: true
      },
      '/auth/google/callback/*': {
        target: 'https://localhost:8081',
        changeOrigin: true
      },
      '/auth/google': {
        target: 'https://localhost:8081',
        changeOrigin: true
      },
      '/auth/facebook': {
        target: 'https://localhost:8081',
        changeOrigin: true
      },
      '/testyo': {
        target: 'https://localhost:8081',
        changeOrigin: true
      },
    }
  }
};