module.exports = {
    apps: [
        {
            name: "backend",
            script: "/backend/bin/start.js",
            env_production: {
                NODE_ENV: "production"
            },
            env_development: {
                NODE_ENV: "development"
            }
        },
        {
            name: "app1",
            script: "./app.js",
            env_production: {
                NODE_ENV: "production"
            },
            env_development: {
                NODE_ENV: "development"
            }
        }
    ]
}