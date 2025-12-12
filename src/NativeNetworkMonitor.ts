import { TurboModuleRegistry, type TurboModule } from 'react-native';

export interface ConnectionInfo {
  type: 'wifi' | 'cellular' | 'none' | 'unknown';
  isConnected: boolean;
  isInternetReachable: boolean;
}

export interface Spec extends TurboModule {
  getCurrentState(): Promise<ConnectionInfo>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('NetworkMonitor');
