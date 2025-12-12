import { TurboModuleRegistry, type TurboModule } from 'react-native';

export interface SetKeyStorage {
  key: string;
  value?: string;
}

export interface KeyStorage {
  key: string;
}

export interface Spec extends TurboModule {
  setItem(params: SetKeyStorage): Promise<boolean>;
  getItem(params: KeyStorage): Promise<string | null>;
  removeItem(params: KeyStorage): Promise<boolean>;
  getAllKeys(): Promise<string[]>;
  clear(): Promise<boolean>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('SecureStorage');
