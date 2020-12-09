const defaultConfig = {
    SERVER_URL: 'http://localhost:3008'
}

const config = {
    server_url: defaultConfig.SERVER_URL || `http://${window.location.hostname}:3008`
}

export default config;