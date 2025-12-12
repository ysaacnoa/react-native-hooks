package com.hooks.securestorage

import android.content.Context
import android.content.SharedPreferences

class SecurePrefsStore(context: Context) {

  private val prefs: SharedPreferences =
    context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)

  fun save(key: String, data: String, iv: String) {
    prefs.edit().apply {
      putString("${key}_data", data)
      putString("${key}_iv", iv)
      apply()
    }
  }

  fun load(key: String): Pair<String, String>? {
    val data = prefs.getString("${key}_data", null)
    val iv = prefs.getString("${key}_iv", null)

    if (data == null || iv == null) return null

    return data to iv
  }

  fun remove(key: String) {
    prefs.edit().apply {
      remove("${key}_data")
      remove("${key}_iv")
      apply()
    }
  }

  fun getAllKeys(): List<String> {
    return prefs.all.keys
      .filter { it.endsWith("_data") }
      .map { it.removeSuffix("_data") }
  }

  fun clear() {
    prefs.edit().clear().apply()
  }

  companion object {
    private const val PREFS_NAME = "secure_storage_prefs"
  }
}
