import Foundation
import UIKit
import Network

@objcMembers public class HookDevice: NSObject{
  private let monitor = NWPathMonitor()
  private var currentPath: NWPath?
  
  override public init(){
    super.init()
    monitor.pathUpdateHandler = {
      [weak self] path in self?.currentPath = path
    }
    monitor.start(queue: DispatchQueue(label: "HooksnetworkMonitor"))
  }

  // PUBLIC API
  public func getDeviceInfo() -> [String: Any] {
      let mapping: [DeviceInfoKey: () -> Any] = [
        .deviceName: { UIDevice.current.name },
        .deviceModel: { UIDevice.current.model },
        .systemVersion: { UIDevice.current.systemVersion },
        .isTablet: { UIDevice.current.userInterfaceIdiom == .pad },
        .batteryLevel: { Self.getBatteryLevel() },
        .connectionType: { self.getConnectionType() },
        .systemLanguage: { Locale.current.identifier },
        .timezone: { TimeZone.current.identifier }
      ]

      return Dictionary(uniqueKeysWithValues: mapping.map { key, provider in
        (key.rawValue, provider())
      })
    }
  
  // MARK: - Battery
    private static func getBatteryLevel() -> Double {
      UIDevice.current.isBatteryMonitoringEnabled = true
      return Double(UIDevice.current.batteryLevel * 100)
    }
  
  // MARK: - Connection Type
    private func getConnectionType() -> String {
      guard let path = currentPath else {
        return "unknown"
      }

      let interface = path.availableInterfaces.first {
        path.usesInterfaceType($0.type)
      }

      return ConnectionMapper.map(type: interface?.type)
    }
}

// MARK: - Device Info Keys (Evita strings sueltos)
private enum DeviceInfoKey: String {
  case deviceName
  case deviceModel
  case systemVersion
  case isTablet
  case batteryLevel
  case connectionType
  case systemLanguage
  case timezone
}

// MARK: - Connection Mapper
private enum ConnectionMapper {
  static func map(type: NWInterface.InterfaceType?) -> String {
    switch type {
      case .wifi: return "wifi"
      case .cellular: return "cellular"
      case .wiredEthernet: return "ethernet"
      case .loopback: return "loopback"
      case .other: return "other"
      default: return "none"
    }
  }
}
