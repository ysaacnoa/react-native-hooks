package com.hooks.securestorage

import android.util.Base64
import javax.crypto.Cipher
import javax.crypto.SecretKey
import javax.crypto.spec.GCMParameterSpec

class CryptoManager(
  private val secretKey: SecretKey
) {
  private val transformation = "AES/GCM/NoPadding"
  private val gcmTagLength = 128

  fun encrypt(value: String): Pair<String, String> {
    val cipher = Cipher.getInstance(transformation)
    cipher.init(Cipher.ENCRYPT_MODE, secretKey)

    val encrypted = cipher.doFinal(value.toByteArray(Charsets.UTF_8))
    val iv = cipher.iv

    return Base64.encodeToString(encrypted, Base64.DEFAULT) to
      Base64.encodeToString(iv, Base64.DEFAULT)
  }

  fun decrypt(data: String, ivString: String): String {
    val cipher = Cipher.getInstance(transformation)
    val iv = Base64.decode(ivString, Base64.DEFAULT)

    cipher.init(
      Cipher.DECRYPT_MODE,
      secretKey,
      GCMParameterSpec(gcmTagLength, iv)
    )

    val decoded = Base64.decode(data, Base64.DEFAULT)
    val decryptedBytes = cipher.doFinal(decoded)

    return String(decryptedBytes, Charsets.UTF_8)
  }
}
