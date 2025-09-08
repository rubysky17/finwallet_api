const { cpus } = required("node:os")

const cpuLen = cpus().length

module.exports = {
    apps: [
        {
            name: 'finwallet',
            script: './dist/main.js',
            autorestart: true,
            exec_mode: 'cluster',
            watch: false,
            instances: cpuLen,
            max_memory_restart: '1G',
            args: '',
            env: {
                NODE_ENV: process.env.NODE_ENV,
                PORT: process.env.APP_PORT,
            },
        },
    ],
}