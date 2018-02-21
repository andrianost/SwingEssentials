// RNTMapManager.m
#import <MapKit/MapKit.h>

#import <React/RCTViewManager.h>

#import "BraintreeCore.h"
#import "BraintreeDropIn.h"
#import "BraintreeUI.h"

@interface RNTMapManager : RCTViewManager
@end

@implementation RNTMapManager

RCT_EXPORT_MODULE()
RCT_EXPORT_VIEW_PROPERTY(zoomEnabled, BOOL)


- (UIView *)view
{
  return [[MKMapView alloc] init];
  
//  BTAPIClient *braintreeClient = [[BTAPIClient alloc] initWithAuthorization:@"sandbox_2pqkx4x6_g7sz9ynwdm65gwxj"];
//
//  BTDropInViewController *dropInViewController = [[BTDropInViewController alloc]
//                                                  initWithAPIClient:braintreeClient];
//  return dropInViewController;
}

@end

