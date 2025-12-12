#import "Secure-Storage.h"
#import "Hooks-Swift.h"

@implementation SecureStorage {
  SecureStorageModule *_storage;
}

RCT_EXPORT_MODULE()

- (instancetype)init {
  if (self = [super init]) {
    _storage = [[SecureStorageModule alloc] init];
  }
  return self;
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
  return std::make_shared<facebook::react::NativeSecureStorageSpecJSI>(params);
}

#pragma mark - TurboModule methods

/// setItem
- (void)setItem:(JS::NativeSecureStorage::SetKeyStorage &)params
        resolve:(RCTPromiseResolveBlock)resolve
         reject:(RCTPromiseRejectBlock)reject
{

  NSString *key = params.key();
  NSString *value = params.value();

  id valueForDict = value != nil ? value : [NSNull null];

  NSDictionary *dict = @{
    @"key": key ?: @"",
    @"value": valueForDict
  };

  [_storage setItem:dict resolver:resolve rejecter:reject];
}

/// getItem
- (void)getItem:(JS::NativeSecureStorage::KeyStorage &)params
        resolve:(RCTPromiseResolveBlock)resolve
         reject:(RCTPromiseRejectBlock)reject
{
  NSString *key = params.key();

  NSDictionary *dict = @{ @"key": key ?: @"" };

  [_storage getItem:dict resolver:resolve rejecter:reject];
}

/// removeItem
- (void)removeItem:(JS::NativeSecureStorage::KeyStorage &)params
           resolve:(RCTPromiseResolveBlock)resolve
            reject:(RCTPromiseRejectBlock)reject
{
  NSString *key = params.key();

  NSDictionary *dict = @{ @"key": key ?: @"" };

  [_storage removeItem:dict resolver:resolve rejecter:reject];
}

/// getAllKeys
- (void)getAllKeys:(RCTPromiseResolveBlock)resolve
            reject:(RCTPromiseRejectBlock)reject
{
  [_storage getAllKeysWithResolver:resolve rejecter:reject];
}

/// clear
- (void)clear:(RCTPromiseResolveBlock)resolve
       reject:(RCTPromiseRejectBlock)reject
{
  [_storage clearWithResolver:resolve rejecter:reject];
}

@end

