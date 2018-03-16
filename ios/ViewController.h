//
//  ViewController.h
//  SwingEssentials
//
//  Created by Andrianos, Theodore on 2/2/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <Foundation/Foundation.h>

#import <React/RCTBridgeModule.h>
#import <React/RCTViewManager.h>
#import <React/RCTEventDispatcher.h>

#import "BraintreeCore.h"
#import "BraintreeDropIn.h"
#import "BraintreeUI.h"
#import "BTDropInViewController.h"


@interface ViewController : UIViewController <RCTBridgeModule, BTDropInViewControllerDelegate>  //RCTViewManager

@property (nonatomic, strong) UIWindow *window;
@property (nonatomic, strong) NSString *clientTokenOrTokenizationKey;


@end
