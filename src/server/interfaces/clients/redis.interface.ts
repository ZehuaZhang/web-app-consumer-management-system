import redis from 'redis'

export interface EnhancedRedisClient extends redis.RedisClient {
  getAsync: (key: string) => Promise<any>
}
