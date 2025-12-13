import NativeHooks from './NativeHooks';
import NativeNetworkMonitor from './NativeNetworkMonitor';
import NativeSecureStorage, {
  type KeyStorage,
  type SetKeyStorage,
} from './NativeSecureStorage';
import { theme } from './theme';
import {
  AlertModal,
  Button,
  Dropdown,
  InputBase,
  InputText,
  InputWrapper,
  Tile,
  Card,
} from './components';

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
  theme,
  AlertModal,
  Button,
  Dropdown,
  InputBase,
  InputText,
  InputWrapper,
  Tile,
  Card,
};

export type { ConnectionInfo } from './NativeNetworkMonitor';
export type { KeyStorage, SetKeyStorage } from './NativeSecureStorage';
export type { Theme } from './theme/index';
