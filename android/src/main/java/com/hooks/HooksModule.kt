package com.hooks

import android.Manifest
import android.content.Context
import android.content.res.Configuration
import android.net.ConnectivityManager
import android.net.NetworkCapabilities
import android.os.BatteryManager
import android.os.Build
import androidx.annotation.RequiresPermission
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.bridge.WritableNativeMap
import java.util.Locale
import java.util.TimeZone

@ReactModule(name = HooksModule.NAME)
class HooksModule(reactContext: ReactApplicationContext) :
  NativeHooksSpec(reactContext) {

  override fun getName(): String {
    return NAME
  }

  @RequiresPermission(Manifest.permission.ACCESS_NETWORK_STATE)
  override fun getDeviceInfo(): WritableNativeMap {
    val map = WritableNativeMap()

    map.putString("deviceName", Build.DEVICE)
    map.putString("deviceModel", Build.MODEL)
    map.putString("systemVersion", Build.VERSION.RELEASE)
    map.putBoolean("isTablet", isTablet())
    map.putDouble("batteryLevel", getBatteryLevel())
    map.putString("connectionType", getConnectionType())
    map.putString("systemLanguage", Locale.getDefault().toLanguageTag())
    map.putString("timezone", TimeZone.getDefault().id)

    return map
  }

  private fun isTablet(): Boolean{
    val configuration = reactApplicationContext.resources.configuration
    val screenLayout = configuration.screenLayout and Configuration.SCREENLAYOUT_SIZE_MASK

    return screenLayout >= Configuration.SCREENLAYOUT_SIZE_LARGE
  }

  private fun getBatteryLevel(): Double {
    val bm = reactApplicationContext.getSystemService(Context.BATTERY_SERVICE) as BatteryManager
    val level = bm.getIntProperty(BatteryManager.BATTERY_PROPERTY_CAPACITY)
    return level.toDouble()
  }

  @RequiresPermission(Manifest.permission.ACCESS_NETWORK_STATE)
  private fun getConnectionType(): String {
    val cm = reactApplicationContext.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
    val network = cm.activeNetwork ?: return "none"
    val capabilities = cm.getNetworkCapabilities(network) ?: return "none"

    return when {
      capabilities.hasTransport(NetworkCapabilities.TRANSPORT_WIFI) -> "wifi"
      capabilities.hasTransport(NetworkCapabilities.TRANSPORT_CELLULAR) -> "cellular"
      capabilities.hasTransport(NetworkCapabilities.TRANSPORT_ETHERNET) -> "ethernet"
      else -> "unknown"
    }
  }

  companion object {
    const val NAME = "Hooks"
  }
}
