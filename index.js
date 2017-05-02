'use strict';
const { MongoClient: client } = require('mongodb');
module.exports = function() {
  /**
   * 根据 config 获取 mongodb 的链接字符串
   */
  const getUrl = (config) => {
    const {
      urlConfig,
      dbname,
      username,
      password,
      replicaSet,
      authMechanism,
      authSource,
      ssl
    } = config;

    if (!urlConfig || !!urlConfig && typeof urlConfig !== 'object') {
      throw 'Mongo parameters config not be empty!';// eslint-disable-line
    }

    //  默认链接字符串头
    let urlStr = 'mongodb://';
    if (!!username && !!password) {
      urlStr += `${username}:${password}@`;
    }

    //  如果有多个URL的情况下
    if (Array.isArray(urlConfig)) {
      for (let i = 0; i < urlConfig.length; i++) {
        const { host, port } = urlConfig[i];
        if (!!host) {
          urlStr += !!port ? `${host}:${port}` : host;
          if (urlConfig.length > 1 && i !== urlConfig.length - 1) {
            urlStr += ',';
          }
        }
      }
    } else {
      const { host, port } = urlConfig;
      urlStr += !!port ? `${host}:${port}` : host;
    }

    //  指定数据库
    if (!!dbname) {
      urlStr += `/${dbname}`;
    }

    if (!!replicaSet || !!authMechanism || !!authSource || !!ssl) {
      urlStr += '?';
      let params = '';
      if (!!replicaSet) params += `replicaSet=${replicaSet}`;

      if (!!authMechanism) {
        if (!!params) params += '&';
        params += `authMechanism=${authMechanism}`;
      }

      if (!!authSource) {
        if (!!params) params += '&';
        params += `authSource=${authSource}`;
      }

      if (!!ssl) {
        if (!!params) params += '&';
        params += `ssl=true`;
      }
      urlStr += params;
    }
    return urlStr;
  };
  /**
   * 获取已经链接的数据库驱动
   */
  const getDB = function *(config) {
    try {
      if (!!config) {
        const { server } = config;
        const connectUrl = getUrl(config);
        let db;
        if (!!server) {
          db = yield client.connect(connectUrl, {
            server
          });
        } else {
          db = yield client.connect(connectUrl);
        }
        return require('./lib/db')(db);
      } else {
        throw `Config can not be empty!`;
      }
    } catch (error) {
      throw error;
    }
  };
  try {
    return getDB;
  } catch (err) {
    throw err;
  }
}