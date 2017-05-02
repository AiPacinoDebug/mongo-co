# Description

Let `mongodb` drive support` generator`

# Install the module

```
npm install mongo-co --save
```

# Instructions

### config
| KEY          | value                                          |
|---------------|------------------------------------------------|
| urlConfig | `Required fields` --object:{host: '127.0.0.1', port: 27017}/Array:[{host: '127.0.0.1', port: 27017}, {host: '127.0.0.1', port: 27018}]   |
| username        | Do not have to fill in  |
| password | Do not have to fill in |
| dbname        | Do not have to fill in |
| replicaSet       | Do not have to fill in |
| authMechanism | Do not have to fill in |
| authSource | Do not have to fill in |
| ssl | Do not have to fill in |
[More database connection parameter details......](http://mongodb.github.io/node-mongodb-native/2.2/tutorials/connect/)

### CONNECT
```
const mongo = require('mongo-co');
const co = require('co');
const config = ...;
co(function * () {
  try {
    const connectDB = yield mongo(config);
    const menus = connectDB.getQuery('menus');
    const list = yield menus.find();
    console.log('list:', list);
    }
});
```

###  Please refer to `lib`......