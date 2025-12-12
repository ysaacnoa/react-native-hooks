//
//  Network-Monitor.swift
//  Hooks
//
//  Created by Ysaac Noe Correa De La Cruz on 11/12/25.
//

import Foundation
import Network

@objcMembers public class NetworkMonitorCore: NSObject {

    private var monitor: NWPathMonitor?
    private let queue = DispatchQueue(label: "com.libraryhooks.networkmonitor")
    private var isMonitoring = false

    private var onNetworkChange: ((String, Bool, Bool) -> Void)?

    // MARK: - Helper
    private func networkState(from path: NWPath) -> (type: String, isConnected: Bool, isInternetReachable: Bool) {
        let isConnected = (path.status == .satisfied)
        let isInternetReachable = isConnected

        let interfaceMap: [(NWInterface.InterfaceType, String)] = [
            (.wifi, "wifi"),
            (.cellular, "cellular"),
            (.wiredEthernet, "ethernet")
        ]

        let type = interfaceMap.first(where: { path.usesInterfaceType($0.0) })?.1
                   ?? (isConnected ? "unknown" : "none")

        return (type, isConnected, isInternetReachable)
    }

    // MARK: - Get Current State
    public func getCurrentState(
        resolver resolve: @escaping (Any?) -> Void,
        rejecter reject: @escaping (String?, String?, Error?) -> Void
    ) {
        let tempMonitor = NWPathMonitor()
        let tempQueue = DispatchQueue(label: "com.libraryhooks.networkmonitor.temp")

        tempMonitor.pathUpdateHandler = { [weak self] path in
            guard let self = self else { return }
            let state = self.networkState(from: path)
            let result: [String: Any] = [
                "type": state.type,
                "isConnected": state.isConnected,
                "isInternetReachable": state.isInternetReachable
            ]
            resolve(result)
            tempMonitor.cancel()
        }

        tempMonitor.start(queue: tempQueue)
    }
}
