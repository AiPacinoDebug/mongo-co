'use strict';
const getPromiseResult = Symbol('#getPromiseResult');
class Admin {
  constructor(db) {
    this.db = db;
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
        data: yield this.db.admin()[functionName](...args)
      };
    } catch (error) {
      result = {
        error
      };
    }
    return result;
  }
  /* eslint-disable max-len, comma-spacing, indent*/
  /**
   * 执行命令
   * Execute a command
   * @method
   * @param {object} command The command hash
   * @param {object} [options=null] Optional settings.
   * @param {(ReadPreference|string)} [options.readPreference=null] The preferred read preference (ReadPreference.PRIMARY, ReadPreference.PRIMARY_PREFERRED, ReadPreference.SECONDARY, ReadPreference.SECONDARY_PREFERRED, ReadPreference.NEAREST).
   * @param {number} [options.maxTimeMS=null] Number of milliseconds to wait before aborting the query.
   */
  /* eslint-enable */
  * command(...args) {
    yield yield this[getPromiseResult]({
      functionName: 'command',
      args
    });
  }
  /**
   * 检索数据库客户端的当前实例的服务器信息
   * Retrieve the server information for the current
   * instance of the db client
   */
  * buildInfo(...args) {
    yield yield this[getPromiseResult]({
      functionName: 'buildInfo',
      args
    });
  }
  /**
   * 检索数据库客户端的当前实例的服务器信息
   * Retrieve the server information for the current
   * instance of the db client
   */
  * serverInfo() {
    yield yield this[getPromiseResult]({
      functionName: 'serverInfo'
    });
  }
  /**
   * 检索此数据库的服务器状态。
   * Retrieve this db's server status.
   */
  * serverStatus() {
    yield yield this[getPromiseResult]({
      functionName: 'serverStatus'
    });
  }
  /**
   * 检索MongoDB当前的分析级别
   * Retrieve the current profiling Level for MongoDB
   */
  * profilingLevel() {
    yield yield this[getPromiseResult]({
      functionName: 'profilingLevel'
    });
  }
  /**
   * Ping MongoDB服务器并检索结果
   * Ping the MongoDB server and retrieve results
   */
  * ping(...args) {
    yield yield this[getPromiseResult]({
      functionName: 'ping',
      args
    });
  }
  /**
   * 对服务器进行身份验证。
   * Authenticate a user against the server.
   * @method
   * @param {string} username The username.
   * @param {string} [password] The password.
   */
  * authenticate(...args) {
    yield yield this[getPromiseResult]({
      functionName: 'authenticate',
      args
    });
  }
  /**
   * 从服务器注销用户，在所有连接上关闭并删除所有验证信息
   * Logout user from server, fire off on all connections and remove all auth info
   */
  * logout() {
    yield yield this[getPromiseResult]({
      functionName: 'logout'
    });
  }
  /* eslint-disable max-len, comma-spacing, indent*/
  /**
   * 将用户添加到数据库。
   * Add a user to the database.
   * @method
   * @param {string} username The username.
   * @param {string} password The password.
   * @param {object} [options=null] Optional settings.
   * @param {(number|string)} [options.w=null] The write concern.
   * @param {number} [options.wtimeout=null] The write concern timeout.
   * @param {boolean} [options.j=false] Specify a journal write concern.
   * @param {boolean} [options.fsync=false] Specify a file sync write concern.
   * @param {object} [options.customData=null] Custom data associated with the user (only Mongodb 2.6 or higher)
   * @param {object[]} [options.roles=null] Roles associated with the created user (only Mongodb 2.6 or higher)
   */
  /* eslint-enable */
  * addUser(...args) {
    yield yield this[getPromiseResult]({
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
   * @param {boolean} [options.fsync=false] Specify a file sync write concern.
   */
  * removeUser(...args) {
    yield yield this[getPromiseResult]({
      functionName: 'removeUser',
      args
    });
  }
  /**
   * 设置MongoDB当前的分析级别
   * Set the current profiling level of MongoDB
   *
   * @param {string} level The new profiling level (off, slow_only, all).
   */
  * setProfilingLevel(...args) {
    yield this[getPromiseResult]({
      functionName: 'setProfilingLevel',
      args
    });
  }
  /**
   * 检索MongoDB当前的分析信息
   * Retrive the current profiling information for MongoDB
   */
  * profilingInfo() {
    yield this[getPromiseResult]({
      functionName: 'setProfilingLevel'
    });
  }
  /**
   * 验证现有集合
   * Validate an existing collection
   *
   * @param {string} collectionName The name of the collection to validate.
   * @param {object} [options=null] Optional settings.
   */
  * validateCollection(...args) {
    yield this[getPromiseResult]({
      functionName: 'validateCollection',
      args
    });
  }
  /**
   * 列出可用的数据库
   * List the available databases
   */
  * listDatabases() {
    yield this[getPromiseResult]({
      functionName: 'listDatabases'
    });
  }
  /**
   * 获取ReplicaSet状态
   * Get ReplicaSet status
   */
  * replSetGetStatus() {
    yield this[getPromiseResult]({
      functionName: 'replSetGetStatus'
    });
  }
}
module.exports = (db) => {
  return new Admin(db);
};