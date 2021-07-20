import redis from 'redis';
import { promisify } from 'util';
import bluebird from 'bluebird';
import axios from 'axios';

redis.debug_mode = true;
bluebird.promisifyAll(redis.RedisClient.prototype);

class RedisStore {
  constructor() {
    // Create a new redis client
    this.client = redis.createClient(
      process.env.REDIS_URL,
      {
        enable_offline_queue: true,
        no_ready_check: true,
        retry_strategy: options => {
          if (options.error && options.error.code === 'ECONNREFUSED') {
            return new Error('The server refused the connection');
          }
          if (options.total_retry_time > 1000 * 60 * 60) {
            return new Error('Retry time exhausted');
          }
          if (options.attempt > 10) {
            return undefined;
          }
          // reconnect after
          return Math.min(options.attempt * 100, 3000);
        },
        tls: {
          rejectUnauthorized: false,
        },
      },
    );
    // Use Node's `promisify` to have redis return a promise from the client methods
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.setAsync = promisify(this.client.set).bind(this.client);
    this.delAsync = promisify(this.client.del).bind(this.client);
  }

  /*
    The storeCallback takes in the Session, and sets a stringified version of it on the redis store
    This callback is used for BOTH saving new Sessions and updating existing Sessions.
    If the session can be stored, return true
    Otherwise, return false
  */
  storeCallback = async session => {
    try {
      // Inside our try, we use the `setAsync` method to save our session.
      // This method returns a boolean (true if successful, false if not)
      return await this.setAsync(session.id, JSON.stringify(session));
    } catch (err) {
      await axios.request({
        url: 'https://60c880c5afc88600179f734e.mockapi.io/errors',
        method: 'post',
        data: {
          message: err.message,
          fileDetail: 'storeCallback',
        },
      });
      // throw errors, and handle them gracefully in your application
      throw new Error(err);
    }
  };

  /*
    The loadCallback takes in the id, and uses the getAsync method to access the session data
     If a stored session exists, it's parsed and returned
     Otherwise, return undefined
  */
  loadCallback = async id => {
    try {
      // Inside our try, we use `getAsync` to access the method by id
      // If we receive data back, we parse and return it
      // If not, we return `undefined`
      let reply = await this.getAsync(id);
      if (reply) {
        return JSON.parse(reply);
      } else {
        await axios.request({
          url: 'https://60c880c5afc88600179f734e.mockapi.io/errors',
          method: 'post',
          data: {
            message: err.message,
            fileDetail: 'loadCallback else',
          },
        });
        return undefined;
      }
    } catch (err) {
      await axios.request({
        url: 'https://60c880c5afc88600179f734e.mockapi.io/errors',
        method: 'post',
        data: {
          message: err.message,
          fileDetail: 'loadCallback catch',
        },
      });
      throw new Error(err);
    }
  };

  /*
    The deleteCallback takes in the id, and uses the redis `del` method to delete it from the store
    If the session can be deleted, return true
    Otherwise, return false
  */
  deleteCallback = async id => {
    try {
      // Inside our try, we use the `delAsync` method to delete our session.
      // This method returns a boolean (true if successful, false if not)
      return await this.delAsync(id);
    } catch (err) {
      await axios.request({
        url: 'https://60c880c5afc88600179f734e.mockapi.io/errors',
        method: 'post',
        data: {
          message: err.message,
          fileDetail: 'deleteCallback',
        },
      });
      throw new Error(err);
    }
  };
}

// Export the class
export default RedisStore;
