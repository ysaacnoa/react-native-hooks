package com.hooks.networkmonitor

import android.Manifest
import android.content.Context
import android.net.*
import androidx.annotation.RequiresPermission
import com.facebook.react.bridge.*
import com.facebook.react.module.annotations.ReactModule
import com.hooks.NativeNetworkMonitorSpec

@ReactModule(name = NetworkMonitorModule.NAME)
class NetworkMonitorModule(reactContext: ReactApplicationContext) :
  NativeNetworkMonitorSpec(reactContext) {

  private val connectivityManager =
    reactContext.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager

  // ---------------- GET STATE ----------------
  @RequiresPermission(Manifest.permission.ACCESS_NETWORK_STATE)
  private fun getCurrentNetworkState(): WritableMap {
    val map = WritableNativeMap()

    val network = connectivityManager.activeNetwork
    val caps = connectivityManager.getNetworkCapabilities(network)

    if (caps == null) {
      map.putString("type", "none")
      map.putBoolean("isConnected", false)
      map.putBoolean("isInternetReachable", false)
      return map
    }

    val type = when {
      caps.hasTransport(NetworkCapabilities.TRANSPORT_WIFI) -> "wifi"
      caps.hasTransport(NetworkCapabilities.TRANSPORT_CELLULAR) -> "cellular"
      else -> "unknown"
    }

    map.putString("type", type)
    map.putBoolean("isConnected", true)
    map.putBoolean("isInternetReachable",
      caps.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)
    )

    return map
  }

  // ---------------- TURBO METHODS ----------------
  @RequiresPermission(Manifest.permission.ACCESS_NETWORK_STATE)
  override fun getCurrentState(promise: Promise) {
    try {
      promise.resolve(getCurrentNetworkState())
    } catch (e: Exception) {
      promise.reject("NETWORK_ERROR", "Failed to get state: ${e.message}", e)
    }
  }

  companion object {
    const val NAME = "NetworkMonitor"
  }
}

