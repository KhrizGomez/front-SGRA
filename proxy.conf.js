const backendConfig = {
    "target": "http://127.0.0.1:8080",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug",
    "onProxyReq": function (proxyReq, req, res) {
        proxyReq.removeHeader('Origin');
        proxyReq.removeHeader('Referer');
    },
    "onProxyRes": function (proxyRes, req, res) {
        proxyRes.headers['Access-Control-Allow-Origin'] = 'http://localhost:4200';
        proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, PATCH, OPTIONS';
        proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
    }
};

module.exports = {
    "/api": backendConfig,
    "/archivos-sgra": backendConfig
};
