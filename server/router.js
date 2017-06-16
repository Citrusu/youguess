/**
 * Created by Citrus on 2017/6/16.
 */
const fs = require('fs');
const router = function (root, app) {
    const rootDir = root;

    app.get('/', function (req, res) {
        res.sendFile(rootDir + '/index.html');
    });

    //处理其它资源
    app.use((req, res) => {
        let url = req.url;
        fs.stat(rootDir + url, function (err) {
            if (err) {
                console.log(`404 not found ${url}`);
                res.sendStatus(404);
            } else {
                //console.log('ok');
                res.sendFile(rootDir + url);
            }
        })
    });

};

module.exports = router;