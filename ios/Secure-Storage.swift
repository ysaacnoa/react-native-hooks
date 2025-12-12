import Foundation
import Security
import React

@objc(SecureStorageModule)
public class SecureStorageModule: NSObject, RCTBridgeModule {

  // MARK: - Module config
  public static func moduleName() -> String! {
    return "SecureStorage"
  }

  private let serviceName = "com.libraryhooks.securestorage"

  // MARK: - setItem
  @objc(setItem:resolver:rejecter:)
  public func setItem(
    _ params: NSDictionary,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {

    guard let key = params["key"] as? String else {
      reject("INVALID_PARAMS", "Key is required", nil)
      return
    }

    let value = params["value"] as? String

    // Delete if nil
    guard let value = value else {
      resolve(true)
      return
    }

    guard let data = value.data(using: .utf8) else {
      reject("STORAGE_ERROR", "Invalid string encoding", nil)
      return
    }

    let query: [String: Any] = [
      kSecClass as String: kSecClassGenericPassword,
      kSecAttrService as String: serviceName,
      kSecAttrAccount as String: key,
      kSecValueData as String: data,
      kSecAttrAccessible as String: kSecAttrAccessibleWhenUnlockedThisDeviceOnly
    ]

    // Remove old entry if exists
    SecItemDelete(query as CFDictionary)

    let status = SecItemAdd(query as CFDictionary, nil)

    if status == errSecSuccess {
      resolve(true)
    } else {
      reject("STORAGE_ERROR", "Failed to save item: \(status)", nil)
    }
  }

  // MARK: - getItem
  @objc(getItem:resolver:rejecter:)
  public func getItem(
    _ params: NSDictionary,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {

    guard let key = params["key"] as? String else {
      reject("INVALID_PARAMS", "Key is required", nil)
      return
    }

    let query: [String: Any] = [
      kSecClass as String: kSecClassGenericPassword,
      kSecAttrService as String: serviceName,
      kSecAttrAccount as String: key,
      kSecReturnData as String: true,
      kSecMatchLimit as String: kSecMatchLimitOne
    ]

    var result: AnyObject?
    let status = SecItemCopyMatching(query as CFDictionary, &result)

    if status == errSecSuccess,
       let data = result as? Data,
       let value = String(data: data, encoding: .utf8) {
      resolve(value)
    } else if status == errSecItemNotFound {
      resolve(nil)
    } else {
      reject("STORAGE_ERROR", "Failed to get item: \(status)", nil)
    }
  }

  // MARK: - removeItem
  @objc(removeItem:resolver:rejecter:)
  public func removeItem(
    _ params: NSDictionary,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {

    guard let key = params["key"] as? String else {
      reject("INVALID_PARAMS", "Key is required", nil)
      return
    }

    let query: [String: Any] = [
      kSecClass as String: kSecClassGenericPassword,
      kSecAttrService as String: serviceName,
      kSecAttrAccount as String: key
    ]

    let status = SecItemDelete(query as CFDictionary)

    if status == errSecSuccess || status == errSecItemNotFound {
      resolve(true)
    } else {
      reject("STORAGE_ERROR", "Failed to remove item: \(status)", nil)
    }
  }

  // MARK: - getAllKeys
  @objc(getAllKeysWithResolver:rejecter:)
  public func getAllKeys(
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {

    let query: [String: Any] = [
      kSecClass as String: kSecClassGenericPassword,
      kSecAttrService as String: serviceName,
      kSecReturnAttributes as String: true,
      kSecMatchLimit as String: kSecMatchLimitAll
    ]

    var result: AnyObject?
    let status = SecItemCopyMatching(query as CFDictionary, &result)

    if status == errSecSuccess,
       let items = result as? [[String: Any]] {

      let keys = items.compactMap { $0[kSecAttrAccount as String] as? String }
      resolve(keys)

    } else if status == errSecItemNotFound {
      resolve([])
    } else {
      reject("STORAGE_ERROR", "Failed to list keys: \(status)", nil)
    }
  }

  // MARK: - clear
  @objc(clearWithResolver:rejecter:)
  public func clear(
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {

    let query: [String: Any] = [
      kSecClass as String: kSecClassGenericPassword,
      kSecAttrService as String: serviceName
    ]

    let status = SecItemDelete(query as CFDictionary)

    if status == errSecSuccess || status == errSecItemNotFound {
      resolve(true)
    } else {
      reject("STORAGE_ERROR", "Failed to clear storage: \(status)", nil)
    }
  }
}

