//
//  ViewController.m
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

@property (nonatomic, strong) BTAPIClient *braintreeClient;

@end

@implementation ViewController

NSString *resultCheck;
NSString *bearerToken;
NSString *price;
NSString *packageShortcode;
NSString *discountCode;
NSString *paymentResult;

@synthesize bridge = _bridge;

- (void)viewDidLoad {
  [super viewDidLoad];
  // Do any additional setup after loading the view, typically from a nib.
}

- (void)didReceiveMemoryWarning {
  [super didReceiveMemoryWarning];
  // Dispose of any resources that can be recreated.
}

RCT_EXPORT_MODULE(PayPal);
RCT_EXPORT_METHOD(buyAction:(NSString *)tokenParam price:(NSString *)realPrice name:(NSString *)packageName
                  description:(NSString *)packageDescription packageShortcode:(NSString *)shortcode
                  discountCode:(NSString *)discount)
{
  NSLog(@"%@",tokenParam);
  NSLog(@"%@",realPrice);
  NSLog(@"%@",packageName);

  bearerToken = tokenParam;
  price = realPrice;
  packageShortcode = shortcode;
  discountCode = discount;
  
  _clientTokenOrTokenizationKey = @"sandbox_2pqkx4x6_g7sz9ynwdm65gwxj";
  
  self.braintreeClient = [[BTAPIClient alloc] initWithAuthorization:_clientTokenOrTokenizationKey];

  BTPaymentRequest *paymentRequest = [[BTPaymentRequest alloc] init];
  paymentRequest.summaryTitle = packageName;
  paymentRequest.summaryDescription = packageDescription;
  paymentRequest.displayAmount = realPrice;
//  paymentRequest.callToActionText = @"$14.99 - Pay Now";
  paymentRequest.shouldHideCallToAction = NO;
//  paymentRequest.presentViewControllersFromTop = YES;
  
  // Create a BTDropInViewController
  BTDropInViewController *dropInViewController = [[BTDropInViewController alloc]
                                                  initWithAPIClient:self.braintreeClient];
  dropInViewController.delegate = self;
  dropInViewController.paymentRequest = paymentRequest;
  dropInViewController.title = @"Swing Essentials, LLC";
  
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

  dispatch_async(dispatch_get_main_queue(), ^{
    
  AppDelegate *delegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
  [delegate.rootViewController presentViewController:navigationController animated:YES completion:nil];
    
  });
  
}

- (void)userDidCancelPayment {
  NSLog(@"Cancel");
//  [self dismissViewControllerAnimated:YES completion:nil];
  AppDelegate *delegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
  [delegate.rootViewController dismissViewControllerAnimated:YES completion:nil];
}


- (void)dropInViewController:(BTDropInViewController *)viewController
  didSucceedWithTokenization:(BTPaymentMethodNonce *)paymentMethodNonce {
  
  NSLog(@"Nonce received: %@",paymentMethodNonce.nonce);
  // Send payment method nonce to your server for processing
  [self postNonceToServer:paymentMethodNonce.nonce];
  
  //  [self dismissViewControllerAnimated:YES completion:nil];
  AppDelegate *delegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
  [delegate.rootViewController dismissViewControllerAnimated:YES completion:nil];
  
}

- (void)dropInViewControllerDidCancel:(__unused BTDropInViewController *)viewController {
  [self dismissViewControllerAnimated:YES completion:nil];
}

- (void)postNonceToServer:(NSString *)paymentMethodNonce {
  
  NSLog(@"post nonce to server");
  
  NSString *package = packageShortcode;
  NSString *coupon = discountCode;
  NSString *finalToken = [NSString stringWithFormat:@"Bearer %@", bearerToken];
  
  NSNumberFormatter *numberFormatter = [[NSNumberFormatter alloc] init];
  numberFormatter.numberStyle = NSNumberFormatterDecimalStyle;
  float finalPrice = [numberFormatter numberFromString:price].floatValue;

  
//  NSString *bodyJSON = [NSString stringWithFormat:@"{\"total\": \"%f\", \"nonce\": \"%@\", \"package\": \"%@\"}", price, paymentMethodNonce, package];
  NSString *bodyJSON = [NSString stringWithFormat:@"{\"total\": \"%.02f\", \"nonce\": \"%@\", \"package\": \"%@\", \"coupon\": \"%@\"}", finalPrice, paymentMethodNonce, package, coupon];
  
  NSLog(@"%@",paymentMethodNonce);
  NSURL *paymentURL = [NSURL URLWithString:@"https://www.josephpboyle.com/api/swingessentials2.php/executemobilepayment"];
  NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:paymentURL];
  
  [request addValue:finalToken forHTTPHeaderField:@"Authorization"];
  request.HTTPBody = [bodyJSON dataUsingEncoding:NSUTF8StringEncoding];
                       //@"total=%f&nonce=%@&package=%@", (float)price,paymentMethodNonce,package] dataUsingEncoding:NSUTF8StringEncoding];
  request.HTTPMethod = @"PUT";
  
  [[[NSURLSession sharedSession] dataTaskWithRequest:request completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
    
//    NSString *paymentResult = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
    paymentResult = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];

        
    // Logging the HTTP request so we can see what is being sent to the server side
    NSLog(@"Request body %@", [[NSString alloc] initWithData:[request HTTPBody] encoding:NSUTF8StringEncoding]);
    
    // Trimming the response for success/failure check so it takes less time to determine the result
    //        NSString *trimResult =[paymentResult substringToIndex:50];
    
//    // Log the transaction result
    NSLog(@"%@",paymentResult);

    dispatch_async(dispatch_get_main_queue(), ^{

      // Checking the result for the string "Successful" and updating GUI elements
      if ([paymentResult containsString:@"Successful"]) {
        NSLog(@"Transaction is successful!");
        resultCheck = @"Transaction successful";
      } else {
        NSLog(@"Transaction failed!");
        resultCheck = @"Transaction failed!";

      }

//       Create an alert controller to display the transaction result
      UIAlertController *alert = [UIAlertController alertControllerWithTitle:resultCheck
                                                                     message:paymentResult
                                                              preferredStyle:UIAlertControllerStyleActionSheet];


      UIAlertAction *defaultAction = [UIAlertAction actionWithTitle:@"OK" style:
                                      UIAlertActionStyleDefault handler:^(UIAlertAction * action) {

                                        NSLog(@"You pressed button OK");
                                      }];

      [alert addAction:defaultAction];

      AppDelegate *delegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
      [delegate.rootViewController presentViewController:alert animated:YES completion:nil];

    });
  }] resume];
}

@end


