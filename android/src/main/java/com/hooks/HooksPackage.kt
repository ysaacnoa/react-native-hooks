package com.hooks

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider
import com.hooks.networkmonitor.NetworkMonitorModule
import com.hooks.securestorage.SecureStorageModule
import java.util.HashMap

class HooksPackage : BaseReactPackage() {
  override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? {
    return when (name) {
      HooksModule.NAME -> HooksModule(reactContext)
      SecureStorageModule.NAME -> SecureStorageModule(reactContext)
      NetworkMonitorModule.NAME -> NetworkMonitorModule(reactContext)
      else -> null
    } as NativeModule?
  }

  override fun getReactModuleInfoProvider(): ReactModuleInfoProvider {
    return ReactModuleInfoProvider {
      val moduleInfos: MutableMap<String, ReactModuleInfo> = HashMap()
      // ✔ HooksModule
      moduleInfos[HooksModule.NAME] =
        ReactModuleInfo(
          HooksModule.NAME,
          HooksModule.NAME,
          false,
          false,
          false,
          true   // TurboModule
        )

      // ✔ SecureStorageModule
      moduleInfos[SecureStorageModule.NAME] =
        ReactModuleInfo(
          SecureStorageModule.NAME,
          SecureStorageModule.NAME,
          false,
          false,
          false,
          true   // TurboModule
        )

      // ✔ NetworkMonitorModule
      moduleInfos[NetworkMonitorModule.NAME] =
        ReactModuleInfo(
          NetworkMonitorModule.NAME,
          NetworkMonitorModule.NAME,
          false,
          false,
          false,
          true   // TurboModule
        )

      moduleInfos
    }
  }
}
