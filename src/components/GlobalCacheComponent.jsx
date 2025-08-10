// Global Cache Service (singleton)
class GlobalCacheService {
  constructor() {
    this.cache = new Map(); // Main storage
    this.weakCache = new WeakMap(); // For object keys to prevent leaks
  }

  get(key) {
    // console.log(`Global get for key: ${key}`); // Uncomment for get logs
    if (typeof key === 'object') {
      return this.weakCache.get(key);
    }
    return this.cache.get(key);
  }

  set(key, value) {
    // console.log(`Global set for key: ${key}, value: ${JSON.stringify(value)}`); // Uncomment for set logs
    if (typeof key === 'object') {
      this.weakCache.set(key, value);
    } else {
      this.cache.set(key, value);
    }
  }

  clear(key) {
    // console.log(`Global clear for key: ${key}`); // Uncomment for clear logs
    if (typeof key === 'object') {
      this.weakCache.delete(key);
    } else {
      this.cache.delete(key);
    }
  }
}
export const globalCache = new GlobalCacheService(); // Singleton instance
