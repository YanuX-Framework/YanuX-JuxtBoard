const defaultConfig = {
    OAUTH2_CLIENT_ID: 'juxtboard',
    OAUTH2_AUTHENTICATION_SERVER: 'http://192.168.12.1:3001' || 'https://yanux-auth.herokuapp.com',
    OAUTH2_AUTHENTICATION_SERVER_TOKEN_ENDPOINT: '/oauth2/token',
    OAUTH2_AUTHENTICATION_SERVER_AUTHORIZATION_ENDPOINT: '/oauth2/authorize',
    OAUTH2_AUTHENTICATION_SERVER_VERIFY_TOKEN_ENDPOINT: '/api/verify_oauth2',
    OAUTH2_AUTHENTICATION_SERVER_TOKEN_INTROSPECTION_ENDPOINT: '/api/token_info',
    OAUTH2_AUTHENTICATION_SERVER_PUBLIC_KEY_ENDPOINT: '/api/public_key',
    //OAUTH2_REDIRECT_URI: 'http://localhost:3007'
};

const config = {
    oauth2_client_id: defaultConfig.OAUTH2_CLIENT_ID || 'juxtboard',
    oauth2_authentication_server: defaultConfig.OAUTH2_AUTHENTICATION_SERVER || `http://${window.location.hostname}:3001`,
    oauth2_authentication_server_token_endpoint: defaultConfig.OAUTH2_AUTHENTICATION_SERVER_TOKEN_ENDPOINT || '/oauth2/token',
    oauth2_authentication_server_authorization_endpoint: defaultConfig.OAUTH2_AUTHENTICATION_SERVER_AUTHORIZATION_ENDPOINT || '/oauth2/authorize',
    oauth2_authentication_server_verify_token_endpoint: defaultConfig.OAUTH2_AUTHENTICATION_SERVER_VERIFY_TOKEN_ENDPOINT || '/api/verify_oauth2',
    oauth2_authentication_server_token_introspection_endpoint: defaultConfig.OAUTH2_AUTHENTICATION_SERVER_TOKEN_INTROSPECTION_ENDPOINT || '/api/token_info',
    oauth2_authentication_server_public_key_endpoint: defaultConfig.OAUTH2_AUTHENTICATION_SERVER_PUBLIC_KEY_ENDPOINT || '/api/public_key',
    oauth2_redirect_uri: defaultConfig.OAUTH2_REDIRECT_URI || `http://${window.location.host}/`
};

export default config;