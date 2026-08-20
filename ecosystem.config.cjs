module.exports = {
  apps: [
    {
      name: 'church-api',
      cwd: '/var/www/church/backend',
      script: 'index.js',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
