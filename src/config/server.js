const defaultConfig = {
    SERVER_URL: 'http://192.168.12.1:3008'
}

const config = {
    server_url: defaultConfig.SERVER_URL || `http://${window.location.hostname}:3008`
}

export default config;