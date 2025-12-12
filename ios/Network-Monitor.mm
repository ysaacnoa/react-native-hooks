#import "Network-Monitor.h"
#import "Hooks-Swift.h"

@implementation NetworkMonitor{
  NetworkMonitorCore *_monitor;
}

RCT_EXPORT_MODULE()

- (instancetype)init
{
  self = [super init];
  if (self) {
    _monitor = [[NetworkMonitorCore alloc] init];
  }
  return self;
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params {
  return std::make_shared<facebook::react::NativeNetworkMonitorSpecJSI>(params);
}

- (void)getCurrentState:(nonnull RCTPromiseResolveBlock)resolve reject:(nonnull RCTPromiseRejectBlock)reject {
  [_monitor getCurrentStateWithResolver:resolve rejecter:reject];
}

@end
