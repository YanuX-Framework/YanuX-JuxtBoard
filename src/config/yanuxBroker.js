const config = {
    APP: "juxtboard",
    BROKER_URL: "https://yanux-broker.herokuapp.com",
    //LOCAL_DEVICE_URL: "https://albuquerques.net/yanux/device0"
};

export default {
    app: config.APP || 'juxtboard',
    broker_url: config.BROKER_URL || `http://${window.location.hostname}:3002`,
    local_device_url: config.LOCAL_DEVICE_URL || 'http://localhost:3003'
};