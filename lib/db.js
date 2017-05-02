'use strict';
const query = require('./query');
const admin = require('./admin');
const getPromiseResult = Symbol('#getPromiseResult');
const getCollectionResult = Symbol('#getCollectionResult');

class Collections {
  constructor(db) {
    this.Db = db;
  }
  /**
   *  获取对应名称的 collection
   *  Get a colltion
   **/
  getQuery(collectionName) {
    return query(this.Db, collectionName);
  }
  /**
   * 返回Admin db实例
   * Return the Admin db instance
   * @method
   * @return {Admin} return the new Admin db instance
   */
  admin() {
    return admin(this.Db);
  }
  /**
   *  获取原生驱动的 promise 结果
   *  Get a native driver promise results
   **/
  * [getPromiseResult](params) {
    const { functionName, args = [] } = params;
    let result;
    try {
      result = {
        data: yield this.Db[functionName](...args)
      };
    } catch (error) {
      result = {
        error
      };
    }
    return result;
  }
  /**
   *  统一 collection 获取结果格式
   *  Unified access result format to collection
   **/
  * [getCollectionResult](params) {
    const { functionName, args = [] } = params;
    let result;
    yield callback => {
      this.Db[functionName](...args, (...res) => {
        result = res;
        callback();
      });
    };
    return result;
  }
  /* eslint-disable max-len, comma-spacing, indent*/
  /**
   * 为集合分配默认排序规则
   * Create a new collection on a server with the specified options. Use this to create capped collections.
   * More information about command options available at https://docs.mongodb.com/manual/reference/command/create/
   * url: http://mongodb.github.io/node-mongodb-native/2.2/tutorials/collations/
   *
   * @params: name, options
   */
  /* eslint-enable */
  * createCollection(...args) {
    yield yield this[getPromiseResult]({
      functionName: 'createCollection',
      args
    });
  }
  /* eslint-disable max-len, comma-spacing, indent*/
  /**
   * 创建新的集合
   * Create a new collection on a server with the specified options. Use this to create capped collectio
   * url: http://mongodb.github.io/node-mongodb-native/2.2/tutorials/collections/
   *
   * @params: name, options
   */
  /* eslint-enable */
  * createCollection(...args) {
    return yield this[getPromiseResult]({
      functionName: 'createCollection',
      args
    });
  }
  /**
   * 打开数据库
   * Open the database
   */
  * open() {
    return yield this[getPromiseResult]({
      functionName: 'open'
    });
  }
  /* eslint-disable max-len, comma-spacing, indent*/
  /**
   * 执行命令
   * Execute a command
   * @method
   * @param {object} command The command hash
   * @param {object} [options=null] Optional settings.
   * @param {(ReadPreference|string)} [options.readPreference=null] The preferred read preference (ReadPreference.PRIMARY, ReadPreference.PRIMARY_PREFERRED, ReadPreference.SECONDARY, ReadPreference.SECONDARY_PREFERRED, ReadPreference.NEAREST).
   */
  /* eslint-enable */
  * command() {
    return yield this[getPromiseResult]({
      functionName: 'command'
    });
  }
  /**
   * 关闭数据库及其底层连接
   * Close the db and its underlying connections
   * @method
   * @param {boolean} force Force close, emitting no events
   * @param {Db~noResultCallback} [callback] The result callback
   * @return {Promise} returns Promise if no callback passed
   */
  close(callback) {
    if (!!callback) {
      if (typeof callback === 'function') {
        this.Db.close(callback);
      } else {
        this.Db.close();
      }
    } else {
      new Promise(resolve => {
        resolve();
      });
    }
  }
  /* eslint-disable max-len, comma-spacing, indent*/
  /**
   * 获取特定的集合（包含实际的收集信息）。
   * 如果应用程序不使用严格模式，您可以使用它，而不用回调，方式如下：`var collection = db.collection（'mycollection'）;`
   * Fetch a specific collection (containing the actual collection information). If the application does not use strict mode you can
   * can use it without a callback in the following way: `var collection = db.collection('mycollection');`
   *
   * @method
   * @param {string} name the collection name we wish to access.
   * @param {object} [options=null] Optional settings.
   * @param {(number|string)} [options.w=null] The write concern.
   * @param {number} [options.wtimeout=null] The write concern timeout.
   * @param {boolean} [options.j=false] Specify a journal write concern.
   * @param {boolean} [options.raw=false] Return document results as raw BSON buffers.
   * @param {object} [options.pkFactory=null] A primary key factory object for generation of custom _id keys.
   * @param {(ReadPreference|string)} [options.readPreference=null] The preferred read preference (ReadPreference.PRIMARY, ReadPreference.PRIMARY_PREFERRED, ReadPreference.SECONDARY, ReadPreference.SECONDARY_PREFERRED, ReadPreference.NEAREST).
   * @param {boolean} [options.serializeFunctions=false] Serialize functions on any object.
   * @param {boolean} [options.strict=false] Returns an error if the collection does not exist
   * @param {object} [options.readConcern=null] Specify a read concern for the collection. (only MongoDB 3.2 or higher supported)
   * @param {object} [options.readConcern.level='local'] Specify a read concern level for the collection operations, one of [local|majority]. (only MongoDB 3.2 or higher supported)
   * @param {Db~collectionResultCallback} callback The collection result callback
   * @return {Collection} return the new Collection instance if not in strict mode
   */
  /* eslint-enable */
  collection(...args) {
    return this.Db.colltion(...args);
  }
  /**
   * 获取所有数据库统计信息
   * Get all the db statistics.
   *
   * @method
   * @param {object} [options=null] Optional settings.
   * @param {number} [options.scale=null] Divide the returned sizes by scale value.
   * @param {Db~resultCallback} [callback] The collection result callback
   * @return {Promise} returns Promise if no callback passed
   */
  * stats(...args) {
    return yield this[getCollectionResult]({
      functionName: 'stats',
      args
    });
  }
  /* eslint-disable max-len, comma-spacing, indent*/
  /**
   * 获取指定数据库的所有集合信息的列表。
   * Get the list of all collection information for the specified db.
   *
   * @method
   * @param {object} filter Query to filter collections by
   * @param {object} [options=null] Optional settings.
   * @param {number} [options.batchSize=null] The batchSize for the returned command cursor or if pre 2.8 the systems batch collection
   * @param {(ReadPreference|string)} [options.readPreference=null] The preferred read preference (ReadPreference.PRIMARY, ReadPreference.PRIMARY_PREFERRED, ReadPreference.SECONDARY, ReadPreference.SECONDARY_PREFERRED, ReadPreference.NEAREST).
   * @return {CommandCursor}
   */
  /* eslint-enable */
  listCollections(...args) {
    return this.Db.listCollections(...args);
  }
  /* eslint-disable max-len, comma-spacing, indent*/
  /**
   * 评估服务器上的JavaScript
   * Evaluate JavaScript on the server
   *
   * @method
   * @param {Code} code JavaScript to execute on server.
   * @param {(object|array)} parameters The parameters for the call.
   * @param {object} [options=null] Optional settings.
   * @param {boolean} [options.nolock=false] Tell MongoDB not to block on the evaulation of the javascript.
   * @deprecated Eval is deprecated on MongoDB 3.2 and forward
   */
  /* eslint-enable */
  * eval(...args) {
    return yield this[getPromiseResult]({
      functionName: 'eval',
      args
    });
  }
  /* eslint-disable max-len, comma-spacing, indent*/
  /**
   * Rename a collection.
   *
   * @method
   * @param {string} fromCollection Name of current collection to rename.
   * @param {string} toCollection New name of of the collection.
   * @param {object} [options=null] Optional settings.
   * @param {boolean} [options.dropTarget=false] Drop the target name collection if it previously exists.
   */
  /* eslint-enable */
  * renameCollection(...args) {
    return yield this[getPromiseResult]({
      functionName: 'renameCollection',
      args
    });
  }
  /* eslint-disable max-len, comma-spacing, indent*/
  /**
   * 从数据库中删除一个集合，永久删除它。 新的访问将创建一个新的集合。
   * Drop a collection from the database, removing it permanently. New accesses will create a new collection.
   *
   * @method
   * @param {string} name Name of collection to drop
   */
  /* eslint-enable */
  * dropCollection(...args) {
    return yield this[getPromiseResult]({
      functionName: 'dropCollection',
      args
    });
  }
  /**
   * 删除数据库，从服务器永久删除数据库。
   * Drop a database, removing it permanently from the server.
   *
   */
  * dropDatabase(...args) {
    return yield this[getPromiseResult]({
      functionName: 'dropDatabase',
      args
    });
  }
  /**
   * 获取当前数据库的所有集合。
   * Fetch all collections for the current db.
   */
  * collections() {
    return yield this[getPromiseResult]({
      functionName: 'collections'
    });
  }
  /* eslint-disable max-len, comma-spacing, indent*/
  /**
   * 以管理员身份在数据库上运行命令。
   * Runs a command on the database as admin.
   * @method
   * @param {object} command The command hash
   * @param {object} [options=null] Optional settings.
   * @param {(ReadPreference|string)} [options.readPreference=null] The preferred read preference (ReadPreference.PRIMARY, ReadPreference.PRIMARY_PREFERRED, ReadPreference.SECONDARY, ReadPreference.SECONDARY_PREFERRED, ReadPreference.NEAREST).
   */
  /* eslint-enable */
  * executeDbAdminCommand(...args) {
    return yield this[getPromiseResult]({
      functionName: 'executeDbAdminCommand',
      args
    });
  }
  /* eslint-disable max-len, comma-spacing, indent*/
  /**
   * Creates an index on the db and collection collection.
   * @method
   * @param {string} name Name of the collection to create the index on.
   * @param {(string|object)} fieldOrSpec Defines the index.
   * @param {object} [options=null] Optional settings.
   * @param {(number|string)} [options.w=null] The write concern.
   * @param {number} [options.wtimeout=null] The write concern timeout.
   * @param {boolean} [options.j=false] Specify a journal write concern.
   * @param {boolean} [options.unique=false] Creates an unique index.
   * @param {boolean} [options.sparse=false] Creates a sparse index.
   * @param {boolean} [options.background=false] Creates the index in the background, yielding whenever possible.
   * @param {boolean} [options.dropDups=false] A unique index cannot be created on a key that has pre-existing duplicate values. If you would like to create the index anyway, keeping the first document the database indexes and deleting all subsequent documents that have duplicate value
   * @param {number} [options.min=null] For geospatial indexes set the lower bound for the co-ordinates.
   * @param {number} [options.max=null] For geospatial indexes set the high bound for the co-ordinates.
   * @param {number} [options.v=null] Specify the format version of the indexes.
   * @param {number} [options.expireAfterSeconds=null] Allows you to expire data on indexes applied to a data (MongoDB 2.2 or higher)
   * @param {number} [options.name=null] Override the autogenerated index name (useful if the resulting name is larger than 128 bytes)
   * @param {object} [options.partialFilterExpression=null] Creates a partial index based on the given filter object (MongoDB 3.2 or higher)
   */
  /* eslint-enable */
  * createIndex(...args) {
    return yield this[getPromiseResult]({
      functionName: 'createIndex',
      args
    });
  }
  /* eslint-disable max-len, comma-spacing, indent*/
  /**
   * 确保索引存在，如果它不创建它
   * Ensures that an index exists, if it does not it creates it
   * @method
   * @deprecated since version 2.0
   * @param {string} name The index name
   * @param {(string|object)} fieldOrSpec Defines the index.
   * @param {object} [options=null] Optional settings.
   * @param {(number|string)} [options.w=null] The write concern.
   * @param {number} [options.wtimeout=null] The write concern timeout.
   * @param {boolean} [options.j=false] Specify a journal write concern.
   * @param {boolean} [options.unique=false] Creates an unique index.
   * @param {boolean} [options.sparse=false] Creates a sparse index.
   * @param {boolean} [options.background=false] Creates the index in the background, yielding whenever possible.
   * @param {boolean} [options.dropDups=false] A unique index cannot be created on a key that has pre-existing duplicate values. If you would like to create the index anyway, keeping the first document the database indexes and deleting all subsequent documents that have duplicate value
   * @param {number} [options.min=null] For geospatial indexes set the lower bound for the co-ordinates.
   * @param {number} [options.max=null] For geospatial indexes set the high bound for the co-ordinates.
   * @param {number} [options.v=null] Specify the format version of the indexes.
   * @param {number} [options.expireAfterSeconds=null] Allows you to expire data on indexes applied to a data (MongoDB 2.2 or higher)
   * @param {number} [options.name=null] Override the autogenerated index name (useful if the resulting name is larger than 128 bytes)
   */
  /* eslint-enable */
  * ensureIndex(...args) {
    return yield this[getPromiseResult]({
      functionName: 'ensureIndex',
      args
    });
  }
  addChild(...args) {
    return this.Db.addChild(...args);
  }
  /* eslint-disable max-len, comma-spacing, indent*/
  /**
   * 创建一个共享当前套接字连接的新Db实例。
   * 请注意，新的db实例与原始实例的父子关系相关，以便事件在子数据库实例上正确发布。
   * 缓存子数据库实例，因此执行db（'db1'）两次将返回相同的实例。
   * 您可以使用选项noListener和returnNonCachedInstance控制这些行为。
   *
   * Create a new Db instance sharing the current socket connections. Be aware that the new db instances are
   * related in a parent-child relationship to the original instance so that events are correctly emitted on child
   * db instances. Child db instances are cached so performing db('db1') twice will return the same instance.
   * You can control these behaviors with the options noListener and returnNonCachedInstance.
   *
   * @method
   * @param {string} name The name of the database we want to use.
   * @param {object} [options=null] Optional settings.
   * @param {boolean} [options.noListener=false] Do not make the db an event listener to the original connection.
   * @param {boolean} [options.returnNonCachedInstance=false] Control if you want to return a cached instance or have a new one created
   * @return {Db}
   */
  /* eslint-enable */
  db(...args) {
    return this.Db.db(...args);
  }
  /* eslint-disable max-len, comma-spacing, indent*/
  /**
   * 将用户添加到数据库
   * Add a user to the database.
   * @method
   * @param {string} username The username.
   * @param {string} password The password.
   * @param {object} [options=null] Optional settings.
   * @param {(number|string)} [options.w=null] The write concern.
   * @param {number} [options.wtimeout=null] The write concern timeout.
   * @param {boolean} [options.j=false] Specify a journal write concern.
   * @param {object} [options.customData=null] Custom data associated with the user (only Mongodb 2.6 or higher)
   * @param {object[]} [options.roles=null] Roles associated with the created user (only Mongodb 2.6 or higher)
   */
  /* eslint-enable */
  * addUser(...args) {
    return yield this[getPromiseResult]({
      functionName: 'addUser',
      args
    });
  }
  /**
   * 从数据库中删除用户
   * Remove a user from a database
   * @method
   * @param {string} username The username.
   * @param {object} [options=null] Optional settings.
   * @param {(number|string)} [options.w=null] The write concern.
   * @param {number} [options.wtimeout=null] The write concern timeout.
   * @param {boolean} [options.j=false] Specify a journal write concern.
   */
  * removeUser(...args) {
    return yield this[getPromiseResult]({
      functionName: 'removeUser',
      args
    });
  }
  /* eslint-disable max-len, comma-spacing, indent*/
  /**
   * 对服务器进行身份验证。
   * Authenticate a user against the server.
   * @method
   * @param {string} username The username.
   * @param {string} [password] The password.
   * @param {object} [options=null] Optional settings.
   * @param {string} [options.authMechanism=MONGODB-CR] The authentication mechanism to use, GSSAPI, MONGODB-CR, MONGODB-X509, PLAIN
   */
  /* eslint-enable */
  * authenticate(...args) {
    return yield this[getPromiseResult]({
      functionName: 'authenticate',
      args
    });
  }
  /**
   * 从服务器注销用户，在所有连接上关闭并删除所有验证信息
   * Logout user from server, fire off on all connections and remove all auth info
   * @method
   * @param {object} [options=null] Optional settings.
   * @param {string} [options.dbName=null] Logout against different database than current.
   * @param {Db~resultCallback} [callback] The command result callback
   * @return {Promise} returns Promise if no callback passed
   */
  * logout(...args) {
    return yield this[getPromiseResult]({
      functionName: 'logout',
      args
    });
  }
  /* eslint-disable max-len, comma-spacing, indent*/
  /**
   * 检索此集合索引信息。
   * Retrieves this collections index info.
   * @method
   * @param {string} name The name of the collection.
   * @param {object} [options=null] Optional settings.
   * @param {boolean} [options.full=false] Returns the full raw index information.
   * @param {(ReadPreference|string)} [options.readPreference=null] The preferred read preference (ReadPreference.PRIMARY, ReadPreference.PRIMARY_PREFERRED, ReadPreference.SECONDARY, ReadPreference.SECONDARY_PREFERRED, ReadPreference.NEAREST).
   */
  /* eslint-enable */
  * indexInformation(...args) {
    return yield this[getPromiseResult]({
      functionName: 'indexInformation',
      args
    });
  }
  /**
   * 取消所有套接字
   * Unref all sockets
   * @method
   */
  unref() {
    return this.Db.unref();
  }
  setMaxListeners(...args) {
    return this.Db.setMaxListeners(...args);
  }
  getMaxListeners() {
    return this.Db.getMaxListeners();
  }
  emit(...args) {
    return this.Db.emit(...args);
  }
  addListener(...args) {
    return this.Db.addListener(...args);
  }
  prependListener(...args) {
    return this.Db.prependListener(...args);
  }
  get on() {
    return this.addListener;
  }
  once(...args) {
    return this.Db.once(...args);
  }
  prependOnceListener(...args) {
    return this.Db.prependOnceListener(...args);
  }
  removeListener(...args) {
    return this.Db.removeListener(...args);
  }
  removeAllListeners(...args) {
    return this.Db.removeAllListeners(...args);
  }
  listeners(...args) {
    return this.Db.listeners(...args);
  }
  listenerCount(...args) {
    return this.Db.listenerCount(...args);
  }
  eventNames() {
    return this.Db.eventNames();
  }
}
module.exports = db => {
  return new Collections(db);
};