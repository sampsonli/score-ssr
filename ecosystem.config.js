/**
 * Created by sampson on 2017/5/7.
 */
module.exports = {
    apps: [
        {
            name: 'score',
            script: './build/main.js',
            kill_timeout: 3000,
            env: {
                NODE_ENV: 'development',
                PORT: 3000,
                HOST: '0.0.0.0'
            },
            env_production: {
                NODE_ENV: 'production',
                PORT: 3000,
                HOST: '0.0.0.0'
            }
        }
    ],
    deploy: {
        production: {
            user: 'root',
            host: 'wxminapp.com',
            ref: 'origin/master',
            ssh_options: ['StrictHostKeyChecking=no', 'PasswordAuthentication=no'],
            repo: 'git@github.com:sampsonli/score-ssr.git',
            path: '/root/project/score_ssr',
            'post-deploy': 'npm install && npm run build && pm2 startOrRestart ecosystem.config.js --env production'
        },
        development: {
            user: 'root',
            host: 'wxminapp.com',
            ref: 'origin/dev',
            ssh_options: ['StrictHostKeyChecking=no', 'PasswordAuthentication=no'],
            repo: 'git@github.com:sampsonli/score-ssr.git',
            path: '/root/project/score_ssr_dev',
            'post-deploy': 'npm install && npm run build && pm2 startOrRestart ecosystem.config.js'
        }
    }
}
