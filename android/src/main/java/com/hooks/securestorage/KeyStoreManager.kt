package com.hooks.securestorage

import android.security.keystore.KeyGenParameterSpec
import android.security.keystore.KeyProperties
import java.security.KeyStore
import javax.crypto.KeyGenerator
import javax.crypto.SecretKey

class KeyStoreManager {

  private val keyStore: KeyStore = KeyStore.getInstance(KEYSTORE_PROVIDER).apply {
    load(null)
  }

  init {
    if (!keyStore.containsAlias(KEY_ALIAS)) {
      generateKey()
    }
  }

  fun getSecretKey(): SecretKey {
    val entry = keyStore.getEntry(KEY_ALIAS, null) as KeyStore.SecretKeyEntry
    return entry.secretKey
  }

  private fun generateKey() {
    val keyGenerator = KeyGenerator.getInstance(
      KeyProperties.KEY_ALGORITHM_AES,
      KEYSTORE_PROVIDER
    )

    val spec = KeyGenParameterSpec.Builder(
      KEY_ALIAS,
      KeyProperties.PURPOSE_ENCRYPT or KeyProperties.PURPOSE_DECRYPT
    )
      .setBlockModes(KeyProperties.BLOCK_MODE_GCM)
      .setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_NONE)
      .setRandomizedEncryptionRequired(true)
      .build()

    keyGenerator.init(spec)
    keyGenerator.generateKey()
  }

  companion object {
    private const val KEYSTORE_PROVIDER = "AndroidKeyStore"
    private const val KEY_ALIAS = "SecureStorageKey"
  }
}
