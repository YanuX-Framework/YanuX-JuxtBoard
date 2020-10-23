const defaultConfig = {
    APP: "juxtboard",
    BROKER_URL: "https://yanux-broker.herokuapp.com",
    LOCAL_DEVICE_URL: "https://albuquerques.net/yanux/device0"
};

const config = {
    app: defaultConfig.APP || 'juxtboard',
    broker_url: defaultConfig.BROKER_URL || `http://${window.location.hostname}:3002`,
    local_device_url: defaultConfig.LOCAL_DEVICE_URL || 'http://localhost:3003'
};

export default config;