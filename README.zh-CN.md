# 详情

让原生 `mongodb` 驱动支持 `Generator`

# 安装模块

```
npm install mongo-co --save
```

# 使用方法
### config
| 属性          | 值                                          |
|---------------|------------------------------------------------|
| urlConfig | `必填项` --object:{host: '127.0.0.1', port: 27017}/Array:[{host: '127.0.0.1', port: 27017}, {host: '127.0.0.1', port: 27018}]   |
| host | 链接地址 |
| port | 链接端口 |
| username        | 设置的账户名，可不填  |
| password | 设置的账户密码，可不填 |
| dbname        | 数据库名称，可不填 |
| replicaSet       | 可不填 |
| authMechanism | 可不填 |
| authSource | 可不填 |
| ssl | 可不填 |
[更多数据库链接参数详情......](http://mongodb.github.io/node-mongodb-native/2.2/tutorials/connect/)

### 连接数据库
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

###  具体 `API` 请查看 `lib` 文件夹