import NativeHooks from './NativeHooks';
import NativeNetworkMonitor from './NativeNetworkMonitor';
import NativeSecureStorage, {
  type KeyStorage,
  type SetKeyStorage,
} from './NativeSecureStorage';

function getDeviceInfo() {
  return NativeHooks.getDeviceInfo();
}

function setItem({ key, value }: SetKeyStorage) {
  return NativeSecureStorage.setItem({ key, value });
}

function getItem({ key }: KeyStorage) {
  return NativeSecureStorage.getItem({ key });
}

function removeItem({ key }: KeyStorage) {
  return NativeSecureStorage.removeItem({ key });
}

function getAllKeys() {
  return NativeSecureStorage.getAllKeys();
}

function clearStorage() {
  return NativeSecureStorage.clear();
}

function getConnectionInfo() {
  return NativeNetworkMonitor.getCurrentState();
}

export {
  getDeviceInfo,
  setItem,
  getItem,
  removeItem,
  getAllKeys,
  clearStorage,
  getConnectionInfo,
};

export type { ConnectionInfo } from './NativeNetworkMonitor';
export type { KeyStorage, SetKeyStorage } from './NativeSecureStorage';
