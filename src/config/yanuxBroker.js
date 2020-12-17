const defaultConfig = {
    APP: 'juxtboard',
    BROKER_URL: 'http://192.168.12.1:3002' || 'https://yanux-broker.herokuapp.com',
    LOCAL_DEVICE_URL: 'http://localhost:3003' || 'https://albuquerques.net/yanux/device0'
};

const config = {
    app: defaultConfig.APP || 'juxtboard',
    broker_url: defaultConfig.BROKER_URL || `http://${window.location.hostname}:3002`,
    local_device_url: defaultConfig.LOCAL_DEVICE_URL || 'http://localhost:3003'
};

export default config;