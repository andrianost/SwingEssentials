//
//  PayPal.h
//  SwingEssentials
//
//  Created by Andrianos, Theodore on 2/2/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTViewManager.h>

@interface ViewController : UIViewController <RCTBridgeModule>  //RCTViewManager

@property (nonatomic, strong) UIWindow *window;
@property (nonatomic, strong) NSString *clientTokenOrTokenizationKey;

@end
