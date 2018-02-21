//
//  PayPal.m
//  SwingEssentials
//
//  Created by Andrianos, Theodore on 2/2/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "ViewController.h"
#import "AppDelegate.h"


#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <React/RCTViewManager.h>
#import <React/RCTLog.h>

#import "BraintreeCore.h"
#import "BraintreeDropIn.h"
#import "BraintreeUI.h"

@interface ViewController ()

@property (weak, nonatomic) IBOutlet UIButton *buyButton;
@property (nonatomic, strong) BTAPIClient *braintreeClient;

@end

@implementation ViewController

RCT_EXPORT_MODULE(PayPal);

NSString *resultCheck;

@synthesize bridge = _bridge;

- (void)viewDidLoad {
  [super viewDidLoad];
  // Do any additional setup after loading the view, typically from a nib.
  
  NSLog(@"viewDidLoad");
  
  _clientTokenOrTokenizationKey = @"sandbox_2pqkx4x6_g7sz9ynwdm65gwxj";
  
  self.braintreeClient = [[BTAPIClient alloc] initWithAuthorization:_clientTokenOrTokenizationKey];
  
//  BTDropInViewController *dropInViewController = [[BTDropInViewController alloc]
//                                                  initWithAPIClient:self.braintreeClient];
//
//  [self.view addSubview:dropInViewController.view];
//  [self addChildViewController:dropInViewController];
  
}

- (void)didReceiveMemoryWarning {
  [super didReceiveMemoryWarning];
  // Dispose of any resources that can be recreated.
}

//- (IBAction)buyAction:(id)sender {
RCT_EXPORT_METHOD(buyAction)
{
  [self viewDidLoad];
  
  NSLog(@"buyAction");
  
  BTPaymentRequest *paymentRequest = [[BTPaymentRequest alloc] init];
  paymentRequest.summaryTitle = @"Test item title";
  paymentRequest.summaryDescription = @"This is a summary description";
  paymentRequest.displayAmount = @"$19.00";
  paymentRequest.callToActionText = @"$19 - Pay Now";
  paymentRequest.shouldHideCallToAction = NO;
  
  
  // Create a BTDropInViewController
  BTDropInViewController *dropInViewController = [[BTDropInViewController alloc]
                                                  initWithAPIClient:self.braintreeClient];
  
  dropInViewController.delegate = self;
  dropInViewController.paymentRequest = paymentRequest;
  dropInViewController.title = @"Your custom Drop-In title";
  
  // This is where you might want to customize your view controller (see below)
  
  // The way you present your BTDropInViewController instance is up to you.
  // In this example, we wrap it in a new, modally-presented navigation controller:
  UIBarButtonItem *item = [[UIBarButtonItem alloc]
                           initWithBarButtonSystemItem:UIBarButtonSystemItemCancel
                           target:self
                           action:@selector(userDidCancelPayment)];
  dropInViewController.navigationItem.leftBarButtonItem = item;
  UINavigationController *navigationController = [[UINavigationController alloc]
                                                  initWithRootViewController:dropInViewController];

  [self.view addSubview:navigationController.view];
  [self addChildViewController:navigationController];
//  [self presentViewController:navigationController animated:YES completion:nil];
  [self.navigationController pushViewController:navigationController animated:YES];

}


- (void)userDidCancelPayment {
  [self dismissViewControllerAnimated:YES completion:nil];
}


- (void)dropInViewController:(BTDropInViewController *)viewController
  didSucceedWithTokenization:(BTPaymentMethodNonce *)paymentMethodNonce {
  NSLog(@"Nonce received: %@",paymentMethodNonce.nonce);
  // Send payment method nonce to your server for processing
  //    [self postNonceToServer:paymentMethodNonce.nonce];
  [self dismissViewControllerAnimated:YES completion:nil];
  
}

- (void)dropInViewControllerDidCancel:(__unused BTDropInViewController *)viewController {
  [self dismissViewControllerAnimated:YES completion:nil];
}

@end


