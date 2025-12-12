#import "Hooks.h"
#import "Hooks-Swift.h"

@implementation Hooks {
  HookDevice *_hooks;
}

RCT_EXPORT_MODULE()

- (instancetype) init{
  if (self = [super init]) {
    _hooks = [[HookDevice alloc] init];
  }
  return self;
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeHooksSpecJSI>(params);
}

- (nonnull NSDictionary *)getDeviceInfo {
  return [_hooks getDeviceInfo];
}

@end
