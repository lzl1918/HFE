const http = require('http');
const fs = require('fs');
const path = require('path');

class FileDataCache {
    constructor() {
        this.files = new Map();
    };

    get(filePath) {
        const cacheContent = this.files[filePath];
        if (cacheContent !== undefined) {
            return cacheContent;
        }
        try {
            const fileData = fs.readFileSync(filePath);
            this.files[filePath] = fileData;
            return fileData;
        } catch {
            this.files[filePath] = null;
            return null;
        }

    };
}

const fileDataCache = new FileDataCache();

http.createServer((req, rep) => {
    if (req.method !== 'GET') {
        rep.statusCode = 405;
        rep.end();
        return;
    }
    const reqUrl = req.url === '/' ? '/index.html' : req.url;
    console.log(`-> ${req.url}`);
    const pathName = path.join('./', path.normalize(reqUrl));
    const fileData = fileDataCache.get(pathName);
    if (fileData) {
        rep.write(fileData);
        rep.statusCode = 200;
    } else {
        rep.statusCode = 404;
    }
    console.log(`<- ${rep.statusCode} for ${req.url}`);
    rep.end();
}).listen(80, err => {
    if (err) {
        console.error(err);
        console.info('Failed to start server');
    } else {
        console.info(`Server started on port 80`);
    }
});

