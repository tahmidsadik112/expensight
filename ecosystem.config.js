module.exports = {
  apps: [
    {
      name: 'expensight-api',
      script: './dist/src/server.js',
      merge_logs: true,
      restart_delay: 5000,
      kill_timeout: 10000,
      log: '/var/log/app/expensight.log',
      exec_mode: 'cluster',

      // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
      instances: 'max',
      autorestart: true,
      watch: false,
      error_file: 'err.log',
      out_file: 'out.log',
      log_file: 'combined.log',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],

  deploy: {
    production: {
      key: '~/.ssh/id_deploy_bot.pub',
      user: 'deploy_bot',
      host: '52.221.208.59',
      ref: 'origin/master',
      repo: 'git@github.com:tahmidsadik112/expensight.git',
      ssh_options: 'StrictHostKeyChecking=no',
      path: '/home/deploy_bot/expensight',
      'post-deploy':
        'export NODE_ENV=production && yarn install --prod=false && yarn build && pm2 startOrReload ecosystem.config.js --env production && pm2 save',
    },
  },
};
