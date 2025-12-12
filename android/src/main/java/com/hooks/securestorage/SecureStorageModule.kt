package com.hooks.securestorage

import com.facebook.react.bridge.*
import com.facebook.react.module.annotations.ReactModule
import com.hooks.NativeSecureStorageSpec

@ReactModule(name = SecureStorageModule.NAME)
class SecureStorageModule(reactContext: ReactApplicationContext) :
  NativeSecureStorageSpec(reactContext) {

  private val keyStoreManager = KeyStoreManager()
  private val cryptoManager = CryptoManager(keyStoreManager.getSecretKey())
  private val storage = SecurePrefsStore(reactContext)

  override fun getName() = NAME

  override fun setItem(params: ReadableMap?, promise: Promise?) {
    if (params == null || promise == null) return

    val key = params.getString("key")
    val value = params.getString("value")

    if (key == null) {
      promise.reject("INVALID_PARAMS", "Key is required")
      return
    }

    if (value == null) {
      promise.resolve(true)
      return
    }

    try {
      val (data, iv) = cryptoManager.encrypt(value)
      storage.save(key, data, iv)
      promise.resolve(true)
    } catch (e: Exception) {
      promise.reject("STORAGE_ERROR", e.message, e)
    }
  }

  override fun getItem(params: ReadableMap?, promise: Promise?) {
    if (params == null || promise == null) return

    val key = params.getString("key")
      ?: return promise.reject("INVALID_PARAMS", "Key is required")

    try {
      val pair = storage.load(key)
      if (pair == null) {
        promise.resolve(null)
        return
      }

      val (data, iv) = pair
      promise.resolve(cryptoManager.decrypt(data, iv))
    } catch (e: Exception) {
      promise.reject("STORAGE_ERROR", e.message, e)
    }
  }

  override fun removeItem(params: ReadableMap?, promise: Promise?) {
    if (params == null || promise == null) return

    val key = params.getString("key")
      ?: return promise.reject("INVALID_PARAMS", "Key is required")

    try {
      storage.remove(key)
      promise.resolve(true)
    } catch (e: Exception) {
      promise.reject("STORAGE_ERROR", e.message, e)
    }
  }

  override fun getAllKeys(promise: Promise) {
    try {
      val array = WritableNativeArray()
      storage.getAllKeys().forEach(array::pushString)
      promise.resolve(array)
    } catch (e: Exception) {
      promise.reject("STORAGE_ERROR", e.message, e)
    }
  }

  override fun clear(promise: Promise) {
    try {
      storage.clear()
      promise.resolve(true)
    } catch (e: Exception) {
      promise.reject("STORAGE_ERROR", e.message, e)
    }
  }

  companion object {
    const val NAME = "SecureStorage"
  }
}
