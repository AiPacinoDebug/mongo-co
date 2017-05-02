'use strict';
const getResult = Symbol('#getResult');
const getCollectionPromiseResult = Symbol('#getCollectionPromiseResult');
class Drive {
  constructor(db, collectionName) {
    this.db = db;
    this.collectionName = collectionName;
    this.collection = db.collection(collectionName);
  }
  /**
   *  统一获取结果格式
   *  Unified access result format
   **/
  * [getResult](params) {
    const { functionName, args, isToArray } = params;
    let result;
    yield callback => {
      //  得到结果统一回调
      //  Results unified callback
      const setResult = (error, data) => {
        result = {
          error,
          data
        };
        callback();
      };
      if (!!isToArray) {
        this.collection[functionName](...args).toArray(setResult);
      } else {
        this.collection[functionName](...args, setResult);
      }
    };
    return result;
  }
  /**
   *  获取原生驱动的 promise 得到结果统一回调
   *  Get a native driver promise results
   **/
  * [getCollectionPromiseResult](params) {
    const { functionName, args = [] } = params;
    let result;
    try {
      result = {
        data: yield this.collection[functionName](...args)
      };
    } catch (error) {
      result = {
        error
      };
    }
    return result;
  }
  /**
    * 为一个查询创建一个游标,可以用来遍历结果从MongoDB
    * Creates a cursor for a query that can be used to iterate over results from MongoDB
    * url: http://mongodb.github.io/node-mongodb-native/2.2/tutorials/collations/
    **/
  * find(...args) {
    return yield this[getResult]({
      functionName: 'find',
      args,
      isToArray: true
    });
  }
  /**
   *  no toArray find
   **/
  * $find(...args) {
    return yield this[getResult]({
      functionName: 'find',
      args
    });
  }
  /**
   * 为索引分配默认排序规则
   * Assign a Default Collation to an Index
   * url: http://mongodb.github.io/node-mongodb-native/2.2/tutorials/create-indexes/
   *
   * @params: fieldOrSpec, options
   */
  * createIndex(...args) {
    return yield this[getCollectionPromiseResult]({
      functionName: 'createIndex',
      args
    });
  }
  /* eslint-disable max-len, comma-spacing, indent*/
  /**
   * 查找文档并以一个原子操作进行更新，在操作期间需要一个写入锁定。
   * Find a document and update it in one atomic operation, requires a write lock for the duration of the operation.
   * url: http://mongodb.github.io/node-mongodb-native/2.2/tutorials/collations/
   *
   * @params: filter, update, options
   */
  /* eslint-enable */
  * findOneAndUpdate(...args) {
    return yield this[getCollectionPromiseResult]({
      functionName: 'findOneAndUpdate',
      args
    });
  }
  /* eslint-disable max-len, comma-spacing, indent*/
  /**
   * 查找文档并在一个原子操作中删除它，在操作期间需要一个写入锁定。
   * Find a document and delete it in one atomic operation, requires a write lock for the duration of the operation.
   * url: http://mongodb.github.io/node-mongodb-native/2.2/tutorials/collations/
   *
   * @params: filter, options
   */
  /* eslint-enable */
  * findOneAndDelete(...args) {
    return yield this[getCollectionPromiseResult]({
      functionName: 'findOneAndDelete',
      args
    });
  }
  /**
   * 对集合执行聚合框架管道，需要MongoDB> = 2.2
   * Execute an aggregation framework pipeline against the collection, needs MongoDB >= 2.2
   * url: http://mongodb.github.io/node-mongodb-native/2.2/tutorials/aggregation/
   *
   * @params: pipeline, options
   */
  * aggregate(...args) {
    return yield this[getResult]({
      functionName: 'aggregate',
      args
    });
  }
  /* eslint-disable max-len, comma-spacing, indent*/
  /**
   * 将单个文档插入到MongoDB中。 如果传入的文件不包含 _id 字段，
   * 一个将被添加到驱动程序缺少它的每个文档，突变文档。 这个行为可以通过设置** forceServerObjectId **标志来覆盖。
   *
   * Inserts a single document into MongoDB. If documents passed in do not contain the **_id** field,
   * one will be added to each of the documents missing it by the driver, mutating the document. This behavior
   * can be overridden by setting the **forceServerObjectId** flag.
   *
   * url: http://mongodb.github.io/node-mongodb-native/2.2/tutorials/crud/
   * @params: doc, options
   */
  /* eslint-enable */
  * insertOne(...args) {
    return yield this[getCollectionPromiseResult]({
      functionName: 'insertOne',
      args
    });
  }
  /* eslint-disable max-len, comma-spacing, indent*/
  /**
   * 将一系列文档插入MongoDB。 如果传入的文件不包含** _ id **字段，
   * 一个将被添加到驱动程序丢失它的每个文档，使文档变得更细。 这个行为可以通过设置** forceServerObjectId **标志来覆盖。
   * Inserts an array of documents into MongoDB. If documents passed in do not contain the **_id** field,
   * one will be added to each of the documents missing it by the driver, mutating the document. This behavior
   * can be overridden by setting the **forceServerObjectId** flag.
   *
   * url: http://mongodb.github.io/node-mongodb-native/2.2/tutorials/crud/
   * @params: docs, options
   */
  /* eslint-enable */
  * insertMany(...args) {
    return yield this[getCollectionPromiseResult]({
      functionName: 'insertMany',
      args
    });
  }
  /**
   * 更新MongoDB上的单个文档
   * Update a single document on MongoDB
   *
   * url: http://mongodb.github.io/node-mongodb-native/2.2/tutorials/crud/
   * @params: filter, update, options
   */
  * updateOne(...args) {
    return yield this[getCollectionPromiseResult]({
      functionName: 'updateOne',
      args
    });
  }
  /**
   * Update multiple documents on MongoDB
   * 更新MongoDB上的多个文档
   *
   * url: http://mongodb.github.io/node-mongodb-native/2.2/tutorials/crud/
   * @params: filter, update, options
   */
  * updateMany(...args) {
    return yield this[getCollectionPromiseResult]({
      functionName: 'updateMany',
      args
    });
  }
  /**
   * 删除MongoDB上的文档
   * Delete a document on MongoDB
   *
   * url: http://mongodb.github.io/node-mongodb-native/2.2/tutorials/crud/
   * @params: filter, options
   */
  * deleteOne(...args) {
    return yield this[getCollectionPromiseResult]({
      functionName: 'updateMany',
      args
    });
  }
  /**
   * 删除MongoDB上的多个文档
   * Delete multiple documents on MongoDB
   *
   * url: http://mongodb.github.io/node-mongodb-native/2.2/tutorials/crud/
   * @filter, options
   */
  * deleteMany(...args) {
    return yield this[getCollectionPromiseResult]({
      functionName: 'deleteMany',
      args
    });
  }
  get removeOne() {
    return this.deleteOne;
  }
  get removeMany() {
    return this.removeMany;
  }
  /**
   * 批量执行api
   * Perform a bulkWrite operation without a fluent API
   *
   * url: http://mongodb.github.io/node-mongodb-native/2.2/tutorials/crud/
   * @params: operations, options
   */
  * bulkWrite(...args) {
    return yield this[getCollectionPromiseResult]({
      functionName: 'bulkWrite',
      args
    });
  }
  /* eslint-disable max-len, comma-spacing, indent*/
  /**
   * 启动在批量写入操作中，操作将按照添加的顺序执行，为每个交换机类型创建一个新的操作。
   * Initiate an In order bulk write operation, operations will be serially executed in the order they are added, creating a new operation for each switch in types.
   *
   * url: http://mongodb.github.io/node-mongodb-native/2.2/tutorials/crud/
   */
  /* eslint-enable */
  initializeOrderedBulkOp() {
    return this.collations.initializeOrderedBulkOp();
  }
  /* eslint-disable max-len, comma-spacing, indent*/
  /**
   * 将单个文档或一组文档插入MongoDB。
   * 如果传递的文件不包含** _ id **字段，
   * 则会将一个文件添加到驱动程序丢失的每个文档中，
   * 从而使文档变得更加突出。
   * 可以通过设置** forceServerObjectId **标志来覆盖此行为。
   *
   * Inserts a single document or a an array of documents into MongoDB. If documents passed in do not contain the **_id** field,
   * one will be added to each of the documents missing it by the driver, mutating the document. This behavior
   * can be overridden by setting the **forceServerObjectId** flag.
   * @params: docs, options
   */
  /* eslint-enable */
  * insert(...args) {
    return yield this[getResult]({
      functionName: 'insert',
      args
    });
  }
  /**
   * 替换MongoDB上的文档
   * Replace a document on MongoDB
   * @params: filter, doc, options
   */
  * replaceOne(...args) {
    return yield this[getCollectionPromiseResult]({
      functionName: 'replaceOne',
      args
    });
  }
  /**
   * 更新文件。
   * Updates documents.
   * @params: selector, document, options
   */
  * update(...args) {
    return yield this[getCollectionPromiseResult]({
      functionName: 'update',
      args
    });
  }
  /**
   * 删除文件
   * Remove documents.
   * @params: selector, options
   */
  * remove(...args) {
    return yield this[getCollectionPromiseResult]({
      functionName: 'remove',
      args
    });
  }
  /* eslint-disable max-len, comma-spacing, indent*/
  /**
   * 保存文档。 简单的全文替换功能。 不建议效率，使用原子操作员和更新代替更高效的操作。
   * Save a document. Simple full document replacement function. Not recommended for efficiency, use atomic
   * operators and update instead for more efficient operations.
   *
   * @params: doc, options
   */
  /* eslint-enable */
  * save(...args) {
    return yield this[getCollectionPromiseResult]({
      functionName: 'save',
      args
    });
  }
  /**
   *  已经照原生 promise 处理
   *  获取第一个匹配的文档查询
   *  Fetches the first document that matches the query
   **/
  * findOne(...args) {
    return yield this[getCollectionPromiseResult]({
      functionName: 'findOne',
      args
    });
  }
  /* eslint-disable max-len, comma-spacing, indent*/
  /**
   * 重命名集合
   * Rename the collection.
   *
   * @method
   * @param {string} newName New name of of the collection.
   * @param {object} [options=null] Optional settings.
   * @param {boolean} [options.dropTarget=false] Drop the target name collection if it previously exists.
   */
  /* eslint-enable */
  * rename(...args) {
    return yield this[getCollectionPromiseResult]({
      functionName: 'rename',
      args
    });
  }
  /* eslint-disable max-len, comma-spacing, indent*/
  /**
   * 将从数据库中收集,永久删除它。新访问将创建一个新的集合。
   * Drop the collection from the database, removing it permanently. New accesses will create a new collection.
   *
   * @method
   * @param {object} [options=null] Optional settings.
   */
  /* eslint-enable */
  * drop(...args) {
    return yield this[getCollectionPromiseResult]({
      functionName: 'drop',
      args
    });
  }
  /**
   * 返回集合的选择。
   * Returns the options of the collection.
   *
   */
  * options() {
    return yield this[getCollectionPromiseResult]({
      functionName: 'options'
    });
  }
  /**
   * 返回如果集合是一个限制集合
   * Returns if the collection is a capped collection
   *
   */
  * isCapped() {
    return yield this[getCollectionPromiseResult]({
      functionName: 'isCapped'
    });
  }
  /**
   * 集合中创建多个索引,这个方法只支持MongoDB 2.6或更高版本。
   * MongoDB的早期版本将抛出一个命令不支持错误。
   * 在http://docs.mongodb.org/manual/reference/command/c上定义索引规范
   *
   * Creates multiple indexes in the collection, this method is only supported for
   * MongoDB 2.6 or higher. Earlier version of MongoDB will throw a command not supported
   * error. Index specifications are defined at http://docs.mongodb.org/manual/reference/command/createIndexes/.
   * @method
   * @param {array} indexSpecs An array of index specifications to be created
   */
  * createIndexes(...args) {
    return yield this[getCollectionPromiseResult]({
      functionName: 'createIndexes',
      args
    });
  }
  /**
   * 从集合中删除索引。
   * Drops an index from this collection.
   * @method
   * @param {string} indexName Name of the index to drop.
   * @param {object} [options=null] Optional settings.
   * @param {(number|string)} [options.w=null] The write concern.
   * @param {number} [options.wtimeout=null] The write concern timeout.
   * @param {boolean} [options.j=false] Specify a journal write concern.
   */
  * dropIndex(...args) {
    return yield this[getCollectionPromiseResult]({
      functionName: 'dropIndex',
      args
    });
  }
  /**
   * 从集合中删除所有索引。
   * Drops all indexes from this collection.
   */
  * dropIndexes(...args) {
    return yield this[getCollectionPromiseResult]({
      functionName: 'dropIndexes',
      args
    });
  }
  get dropAllIndexes() {
    return this.dropIndexes;
  }
  /* eslint-disable max-len, comma-spacing, indent*/
  /**
   * 重建所有索引的集合
   * Reindex all indexes on the collection
   * Warning: reIndex is a blocking operation(indexes are rebuilt in the foreground) and will be slow for large collections.
   */
  /* eslint-enable */
  * reIndex(...args) {
    return yield this[getCollectionPromiseResult]({
      functionName: 'reIndex',
      args
    });
  }
  /* eslint-disable max-len, comma-spacing, indent*/
  /**
   * 获取集合的所有索引信息的列表。
   * Get the list of all indexes information for the collection.
   *
   * @method
   * @param {object} [options=null] Optional settings.
   * @param {number} [options.batchSize=null] The batchSize for the returned command cursor or if pre 2.8 the systems batch collection
   * @param {(ReadPreference|string)} [options.readPreference=null] The preferred read preference(ReadPreference.PRIMARY, ReadPreference.PRIMARY_PREFERRED, ReadPreference.SECONDARY, ReadPreference.SECONDARY_PREFERRED, ReadPreference.NEAREST).
   * @return {CommandCursor}
   */
  /* eslint-enable */
  get listIndexes() {
    return this.collation.listIndexes;
  }
  /* eslint-disable max-len, comma-spacing, indent*/
  /**
   * 确保索引存在，如果它不创建
   * Ensures that an index exists, if it does not it creates it
   * @method
   * @deprecated use createIndexes instead
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
   * @param {number} [options.expireAfterSeconds=null] Allows you to expire data on indexes applied to a data(MongoDB 2.2 or higher)
   * @param {number} [options.name=null] Override the autogenerated index name(useful if the resulting name is larger than 128 bytes)
   * @param {object} [options.collation=null] Specify collation(MongoDB 3.4 or higher) settings for update operation(see 3.4 documentation for available fields).
   */
  /* eslint-enable */
  * ensureIndex(...args) {
    return yield this[getCollectionPromiseResult]({
      functionName: 'ensureIndex',
      args
    });
  }
  /**
   * 检查是否存在一个或多个索引集合,失败在第一次不存在的索引
   * Checks if one or more indexes exist on the collection, fails on first non-existing index
   * @method
   * @param {(string|array)} indexes One or more index names to check.
   */
  * indexExists(...args) {
    return yield this[getCollectionPromiseResult]({
      functionName: 'indexExists',
      args
    });
  }
  /**
   * 检索此集合索引信息。
   * Retrieves this collections index info.
   * @method
   * @param {object} [options=null] Optional settings.
   * @param {boolean} [options.full=false] Returns the full raw index information.
   */
  * indexInformation(...args) {
    return yield this[getCollectionPromiseResult]({
      functionName: 'indexInformation',
      args
    });
  }
  /* eslint-disable max-len, comma-spacing, indent*/
  /**
   * 将DB中的匹配文件的数目计数到查询
   * Count number of matching documents in the db to a query.
   * @method
   * @param {object} query The query for the count.
   * @param {object} [options=null] Optional settings.
   * @param {boolean} [options.limit=null] The limit of documents to count.
   * @param {boolean} [options.skip=null] The number of documents to skip for the count.
   * @param {string} [options.hint=null] An index name hint for the query.
   * @param {(ReadPreference|string)} [options.readPreference=null] The preferred read preference(ReadPreference.PRIMARY, ReadPreference.PRIMARY_PREFERRED, ReadPreference.SECONDARY, ReadPreference.SECONDARY_PREFERRED, ReadPreference.NEAREST).
   * @param {number} [options.maxTimeMS=null] Number of miliseconds to wait before aborting the query.
   */
  /* eslint-enable */
  * count(...args) {
    return yield this[getCollectionPromiseResult]({
      functionName: 'count',
      args
    });
  }
  /* eslint-disable max-len, comma-spacing, indent*/
  /**
   * 不同的命令返回返回给定值的不同值的列表
   * The distinct command returns returns a list of distinct values for the given key across a collection.
   * @method
   * @param {string} key Field of the document to find distinct values for.
   * @param {object} query The query for filtering the set of documents to which we apply the distinct filter.
   * @param {object} [options=null] Optional settings.
   * @param {(ReadPreference|string)} [options.readPreference=null] The preferred read preference(ReadPreference.PRIMARY, ReadPreference.PRIMARY_PREFERRED, ReadPreference.SECONDARY, ReadPreference.SECONDARY_PREFERRED, ReadPreference.NEAREST).
   * @param {number} [options.maxTimeMS=null] Number of miliseconds to wait before aborting the query.
   */
  /* eslint-enable */
  * distinct(...args) {
    return yield this[getCollectionPromiseResult]({
      functionName: 'distinct',
      args
    });
  }
  /**
   * 检索集合上的所有索引。
   * Retrieve all the indexes on the collection.
   */
  * indexes() {
    return yield this[getCollectionPromiseResult]({
      functionName: 'indexes'
    });
  }
  /**
   * 获取所有集合统计信息。
   * Get all the collection statistics.
   *
   * @method
   * @param {object} [options=null] Optional settings.
   * @param {number} [options.scale=null] Divide the returned sizes by scale value.
   */
  * stats(...args) {
    return yield this[getCollectionPromiseResult]({
      functionName: 'stats',
      args
    });
  }
  /* eslint-disable max-len, comma-spacing, indent*/
  /**
   * 找到一个文档,在一个原子操作,需要一个写锁操作的持续时间。
   * Find a document and replace it in one atomic operation, requires a write lock for the duration of the operation.
   *
   * @method
   * @param {object} filter Document selection filter.
   * @param {object} replacement Document replacing the matching document.
   * @param {object} [options=null] Optional settings.
   * @param {object} [options.projection=null] Limits the fields to return for all matching documents.
   * @param {object} [options.sort=null] Determines which document the operation modifies if the query selects multiple documents.
   * @param {number} [options.maxTimeMS=null] The maximum amount of time to allow the query to run.
   * @param {boolean} [options.upsert=false] Upsert the document if it does not exist.
   * @param {boolean} [options.returnOriginal=true] When false, returns the updated document rather than the original. The default is true.
   */
  /* eslint-enable */
  * findOneAndReplace(...args) {
    return yield this[getCollectionPromiseResult]({
      functionName: 'findOneAndReplace',
      args
    });
  }
  /* eslint-disable max-len, comma-spacing, indent*/
  /**
   * 查询且更新一个数据
   * Find and update a document.
   * @method
   * @param {object} query Query object to locate the object to modify.
   * @param {array} sort If multiple docs match, choose the first one in the specified sort order as the object to manipulate.
   * @param {object} doc The fields/vals to be updated.
   * @param {object} [options=null] Optional settings.
   * @param {(number|string)} [options.w=null] The write concern.
   * @param {number} [options.wtimeout=null] The write concern timeout.
   * @param {boolean} [options.j=false] Specify a journal write concern.
   * @param {boolean} [options.remove=false] Set to true to remove the object before returning.
   * @param {boolean} [options.upsert=false] Perform an upsert operation.
   * @param {boolean} [options.new=false] Set to true if you want to return the modified object rather than the original. Ignored for remove.
   * @param {object} [options.fields=null] Object containing the field projection for the result returned from the operation.
   * @deprecated use findOneAndUpdate, findOneAndReplace or findOneAndDelete instead
   */
  /* eslint-enable */
  * findAndModify(...args) {
    return yield this[getCollectionPromiseResult]({
      functionName: 'findAndModify',
      args
    });
  }
  /* eslint-disable max-len, comma-spacing, indent*/
  /**
   * 查询且删除一个数据
   * Find and remove a document.
   * @method
   * @param {object} query Query object to locate the object to modify.
   * @param {array} sort If multiple docs match, choose the first one in the specified sort order as the object to manipulate.
   * @param {object} [options=null] Optional settings.
   * @param {(number|string)} [options.w=null] The write concern.
   * @param {number} [options.wtimeout=null] The write concern timeout.
   * @param {boolean} [options.j=false] Specify a journal write concern.
   */
  /* eslint-enable */
  * findAndRemove(...args) {
    return yield this[getCollectionPromiseResult]({
      functionName: 'findAndRemove',
      args
    });
  }
  /* eslint-disable max-len, comma-spacing, indent*/
  /**
   * 返回游标数为一组并行允许并行读
   * Return N number of parallel cursors for a collection allowing parallel reading of entire collection. There are
   * no ordering guarantees for returned results.
   * @method
   * @param {object} [options=null] Optional settings.
   * @param {(ReadPreference|string)} [options.readPreference=null] The preferred read preference(ReadPreference.PRIMARY, ReadPreference.PRIMARY_PREFERRED, ReadPreference.SECONDARY, ReadPreference.SECONDARY_PREFERRED, ReadPreference.NEAREST).
   * @param {number} [options.batchSize=null] Set the batchSize for the getMoreCommand when iterating over the query results.
   * @param {number} [options.numCursors=1] The maximum number of parallel command cursors to return(the number of returned cursors will be in the range 1:numCursors)
   * @param {boolean} [options.raw=false] Return all BSON documents as Raw Buffer documents.
   */
  /* eslint-enable */
  * parallelCollectionScan(...args) {
    return yield this[getCollectionPromiseResult]({
      functionName: 'parallelCollectionScan',
      args
    });
  }
  /* eslint-disable max-len, comma-spacing, indent*/
  /**
   * 执行geonear命令搜索集合中的项目
   * Execute the geoNear command to search for items in the collection
   *
   * @method
   * @param {number} x Point to search on the x axis, ensure the indexes are ordered in the same order.
   * @param {number} y Point to search on the y axis, ensure the indexes are ordered in the same order.
   * @param {object} [options=null] Optional settings.
   * @param {(ReadPreference|string)} [options.readPreference=null] The preferred read preference(ReadPreference.PRIMARY, ReadPreference.PRIMARY_PREFERRED, ReadPreference.SECONDARY, ReadPreference.SECONDARY_PREFERRED, ReadPreference.NEAREST).
   * @param {number} [options.num=null] Max number of results to return.
   * @param {number} [options.minDistance=null] Include results starting at minDistance from a point(2.6 or higher)
   * @param {number} [options.maxDistance=null] Include results up to maxDistance from the point.
   * @param {number} [options.distanceMultiplier=null] Include a value to multiply the distances with allowing for range conversions.
   * @param {object} [options.query=null] Filter the results by a query.
   * @param {boolean} [options.spherical=false] Perform query using a spherical model.
   * @param {boolean} [options.uniqueDocs=false] The closest location in a document to the center of the search region will always be returned MongoDB > 2.X.
   * @param {boolean} [options.includeLocs=false] Include the location data fields in the top level of the results MongoDB > 2.X.
   */
  /* eslint-enable */
  * geoNear(...args) {
    return yield this[getCollectionPromiseResult]({
      functionName: 'geoNear',
      args
    });
  }
  /* eslint-disable max-len, comma-spacing, indent*/
  /**
   * 使用集合上的土草堆索引执行地理搜索。
   * Execute a geo search using a geo haystack index on a collection.
   *
   * @method
   * @param {number} x Point to search on the x axis, ensure the indexes are ordered in the same order.
   * @param {number} y Point to search on the y axis, ensure the indexes are ordered in the same order.
   * @param {object} [options=null] Optional settings.
   * @param {(ReadPreference|string)} [options.readPreference=null] The preferred read preference(ReadPreference.PRIMARY, ReadPreference.PRIMARY_PREFERRED, ReadPreference.SECONDARY, ReadPreference.SECONDARY_PREFERRED, ReadPreference.NEAREST).
   * @param {number} [options.maxDistance=null] Include results up to maxDistance from the point.
   * @param {object} [options.search=null] Filter the results by a query.
   * @param {number} [options.limit=false] Max number of results to return.
   */
  /* eslint-enable */
  * geoHaystackSearch(...args) {
    return yield this[getCollectionPromiseResult]({
      functionName: 'geoHaystackSearch',
      args
    });
  }
  /* eslint-disable max-len, comma-spacing, indent*/
  /**
   * 在集合中运行组命令
   * Run a group command across a collection
   *
   * @method
   * @param {(object|array|function|code)} keys An object, array or function expressing the keys to group by.
   * @param {object} condition An optional condition that must be true for a row to be considered.
   * @param {object} initial Initial value of the aggregation counter object.
   * @param {(function|Code)} reduce The reduce function aggregates(reduces) the objects iterated
   * @param {(function|Code)} finalize An optional function to be run on each item in the result set just before the item is returned.
   * @param {boolean} command Specify if you wish to run using the internal group command or using eval, default is true.
   * @param {object} [options=null] Optional settings.
   * @param {(ReadPreference|string)} [options.readPreference=null] The preferred read preference(ReadPreference.PRIMARY, ReadPreference.PRIMARY_PREFERRED, ReadPreference.SECONDARY, ReadPreference.SECONDARY_PREFERRED, ReadPreference.NEAREST).
   * @deprecated MongoDB 3.6 or higher will no longer support the group command. We recommend rewriting using the aggregation framework.
   */
  /* eslint-enable */
  * group(...args) {
    return yield this[getCollectionPromiseResult]({
      functionName: 'group',
      args
    });
  }
  /* eslint-disable max-len, comma-spacing, indent*/
  /**
   * Run Map Reduce across a collection. Be aware that the inline option for out will return an array of results not a collection.
   *
   * @method
   * @param {(function|string)} map The mapping function.
   * @param {(function|string)} reduce The reduce function.
   * @param {object} [options=null] Optional settings.
   * @param {(ReadPreference|string)} [options.readPreference=null] The preferred read preference(ReadPreference.PRIMARY, ReadPreference.PRIMARY_PREFERRED, ReadPreference.SECONDARY, ReadPreference.SECONDARY_PREFERRED, ReadPreference.NEAREST).
   * @param {object} [options.out=null] Sets the output target for the map reduce job. *{inline:1} | {replace:'collectionName'} | {merge:'collectionName'} | {reduce:'collectionName'}*
   * @param {object} [options.query=null] Query filter object.
   * @param {object} [options.sort=null] Sorts the input objects using this key. Useful for optimization, like sorting by the emit key for fewer reduces.
   * @param {number} [options.limit=null] Number of objects to return from collection.
   * @param {boolean} [options.keeptemp=false] Keep temporary data.
   * @param {(function|string)} [options.finalize=null] Finalize function.
   * @param {object} [options.scope=null] Can pass in variables that can be access from map/reduce/finalize.
   * @param {boolean} [options.jsMode=false] It is possible to make the execution stay in JS. Provided in MongoDB > 2.0.X.
   * @param {boolean} [options.verbose=false] Provide statistics on job execution time.
   * @param {boolean} [options.bypassDocumentValidation=false] Allow driver to bypass schema validation in MongoDB 3.2 or higher.
   */
  /* eslint-enable */
  * mapReduce(...args) {
    return yield this[getCollectionPromiseResult]({
      functionName: 'mapReduce',
      args
    });
  }
  /* eslint-disable max-len, comma-spacing, indent*/
  /**
   * 启动一个批批写操作。所有操作都是缓冲区
   * Initiate a Out of order batch write operation. All operations will be buffered into insert/update/remove commands executed out of order.
   *
   * @method
   * @param {object} [options=null] Optional settings.
   * @param {(number|string)} [options.w=null] The write concern.
   * @param {number} [options.wtimeout=null] The write concern timeout.
   * @param {boolean} [options.j=false] Specify a journal write concern.
   * @return {UnorderedBulkOperation}
   */
  /* eslint-enable */
  get initializeUnorderedBulkOp() {
    return this.collection.initializeUnorderedBulkOp;
  }
}
module.exports = (db, collectionName) => {
  return new Drive(db, collectionName);
};