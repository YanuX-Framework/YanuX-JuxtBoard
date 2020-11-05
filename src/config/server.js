const defaultConfig = {
    SERVER_URL: 'http://localhost:3096'
}

const config = {
    server_url: defaultConfig.SERVER_URL || `http://${window.location.hostname}:3096`
}

export default config;