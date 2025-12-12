import { TurboModuleRegistry, type TurboModule } from 'react-native';

export interface DeviceInfo {
  deviceName: string;
  deviceModel: string;
  systemVersion: string;
  isTablet: boolean;
  batteryLevel: number;
  connectionType: string;
  systemLanguage: string;
  timezone: string;
}

export interface Spec extends TurboModule {
  getDeviceInfo(): DeviceInfo;
}

export default TurboModuleRegistry.getEnforcing<Spec>('Hooks');
