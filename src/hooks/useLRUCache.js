// hooks/useLRUCache.js
import { useRef, useCallback } from 'react';

export default function useLRUCache(capacity) {
  const cache = useRef(new Map());
  const lruList = useRef({ head: null, tail: null });
  const currentSize = useRef(0);

  const createNode = (key, value) => ({
    key,
    value,
    prev: null,
    next: null,
  });

  const moveToHead = useCallback((node) => {
    if (node === lruList.current.head) return;

    // Remove from current position
    if (node.prev) node.prev.next = node.next;
    if (node.next) node.next.prev = node.prev;
    if (node === lruList.current.tail) lruList.current.tail = node.prev;

    // Move to head
    node.next = lruList.current.head;
    node.prev = null;
    if (lruList.current.head) lruList.current.head.prev = node;
    lruList.current.head = node;
    if (!lruList.current.tail) lruList.current.tail = node;
  }, []);

  const removeTail = useCallback(() => {
    if (!lruList.current.tail) return;

    const keyToRemove = lruList.current.tail.key;
    if (lruList.current.tail.prev) {
      lruList.current.tail = lruList.current.tail.prev;
      lruList.current.tail.next = null;
    } else {
      lruList.current.head = null;
      lruList.current.tail = null;
    }
    cache.current.delete(keyToRemove);
    currentSize.current--;
  }, []);

  const get = useCallback((key) => {
    if (cache.current.has(key)) {
      const node = cache.current.get(key);
      moveToHead(node);
      return node.value;
    }
    return undefined;
  }, [moveToHead]);

  const put = useCallback((key, value) => {
    if (!key || !value) return; // Basic validation
    if (cache.current.has(key)) {
      const node = cache.current.get(key);
      node.value = value;
      moveToHead(node);
    } else {
      if (currentSize.current >= capacity) {
        removeTail();
      }
      const newNode = createNode(key, value);
      cache.current.set(key, newNode);
      moveToHead(newNode);
      currentSize.current++;
    }
  }, [capacity, moveToHead, removeTail]);

  const getCacheState = useCallback(() => {
    const result = [];
    let current = lruList.current.head;
    while (current) {
      result.push({ key: current.key, value: current.value });
      current = current.next;
    }
    return result;
  }, []);

  const clear = useCallback(() => {
    cache.current.clear();
    lruList.current.head = null;
    lruList.current.tail = null;
    currentSize.current = 0;
  }, []);

  return { get, put, getCacheState, clear };
}