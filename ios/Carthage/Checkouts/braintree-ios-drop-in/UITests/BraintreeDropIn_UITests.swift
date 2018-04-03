/*
 IMPORTANT
 Hardware keyboard should be disabled on simulator for tests to run reliably.
 */

import XCTest

class BraintreeDropIn_TokenizationKey_CardForm_UITests: XCTestCase {
    
    var app: XCUIApplication!
    
    override func setUp() {
        super.setUp()
        continueAfterFailure = false
        app = XCUIApplication()
        app.launchArguments.append("-EnvironmentSandbox")
        app.launchArguments.append("-TokenizationKey")
        app.launchArguments.append("-ThreeDSecureDefault")
        app.launchArguments.append("-Integration:BraintreeDemoDropInViewController")
        app.launch()
        sleep(1)
        self.waitForElementToBeHittable(app.buttons["Add Payment Method"])
        app.buttons["Add Payment Method"].tap()
    }
    
    func testDropIn_dismissesWhenCancelled() {
        self.waitForElementToBeHittable(app.buttons["Cancel"])
        app.buttons["Cancel"].forceTapElement()
        XCTAssertTrue(app.buttons["Cancelled🎲"].exists);
    }
    
    func testDropIn_displaysPaymentOptions_applePay_card_payPal() {
        self.waitForElementToBeHittable(app.staticTexts["Credit or Debit Card"])
        sleep(1)
        XCTAssertTrue(app.staticTexts["Credit or Debit Card"].exists);
        XCTAssertTrue(app.staticTexts["PayPal"].exists);
        XCTAssertTrue(app.staticTexts["Apple Pay"].exists);
    }
    
    func testDropIn_cardInput_receivesNonce() {
        self.waitForElementToBeHittable(app.staticTexts["Credit or Debit Card"])
        app.staticTexts["Credit or Debit Card"].tap()
        
        let elementsQuery = app.scrollViews.otherElements
        let cardNumberTextField = elementsQuery.textFields["Card Number"]
        
        self.waitForElementToBeHittable(cardNumberTextField)
        cardNumberTextField.typeText("4111111111111111")
        
        self.waitForElementToBeHittable(app.staticTexts["2019"])
        app.staticTexts["11"].forceTapElement()
        app.staticTexts["2019"].forceTapElement()
        
        let securityCodeField = elementsQuery.textFields["CVV"]
        self.waitForElementToBeHittable(securityCodeField)
        securityCodeField.forceTapElement()
        securityCodeField.typeText("123")
        
        let postalCodeField = elementsQuery.textFields["12345"]
        self.waitForElementToBeHittable(postalCodeField)
        postalCodeField.forceTapElement()
        postalCodeField.typeText("12345")
        
        app.buttons["Add Card"].forceTapElement()
        
        self.waitForElementToAppear(app.staticTexts["ending in 11"])
        
        XCTAssertTrue(app.staticTexts["ending in 11"].exists);
    }
    
    func testDropIn_cardInput_showsInvalidState_withInvalidCardNumber() {
        self.waitForElementToBeHittable(app.staticTexts["Credit or Debit Card"])
        app.staticTexts["Credit or Debit Card"].tap()
        
        let elementsQuery = app.scrollViews.otherElements
        let cardNumberTextField = elementsQuery.textFields["Card Number"]
        
        self.waitForElementToBeHittable(cardNumberTextField)
        cardNumberTextField.typeText("4141414141414141")
        
        self.waitForElementToAppear(elementsQuery.staticTexts["You must provide a valid Card Number."])
    }
    
    func testDropIn_cardInput_hidesInvalidCardNumberState_withDeletion() {
        self.waitForElementToBeHittable(app.staticTexts["Credit or Debit Card"])
        app.staticTexts["Credit or Debit Card"].tap()
        
        let elementsQuery = app.scrollViews.otherElements
        let cardNumberTextField = elementsQuery.textFields["Card Number"]
        
        self.waitForElementToBeHittable(cardNumberTextField)
        cardNumberTextField.typeText("4141414141414141")
        
        self.waitForElementToAppear(elementsQuery.staticTexts["You must provide a valid Card Number."])
        
        cardNumberTextField.typeText("\u{8}")
        
        XCTAssertFalse(elementsQuery.textFields["Invalid: Card Number"].exists);
    }
}

class BraintreeDropIn_CardForm_RequestOptions_UITests: XCTestCase {

    var app: XCUIApplication!

    override func setUp() {
        super.setUp()
        continueAfterFailure = false
        app = XCUIApplication()
        app.launchArguments.append("-EnvironmentSandbox")
        app.launchArguments.append("-TokenizationKey")
        app.launchArguments.append("-ThreeDSecureDefault")
        app.launchArguments.append("-Integration:BraintreeDemoDropInViewController")
        app.launchArguments.append("-MaskSecurityCode")
        app.launch()
        sleep(1)
        self.waitForElementToBeHittable(app.buttons["Add Payment Method"])
        app.buttons["Add Payment Method"].tap()
    }

    func testDropIn_maskSecurityCodeOption_enablesSecureTextEntry() {
        self.waitForElementToBeHittable(app.staticTexts["Credit or Debit Card"])
        app.staticTexts["Credit or Debit Card"].tap()

        let elementsQuery = app.scrollViews.otherElements
        let cardNumberTextField = elementsQuery.textFields["Card Number"]

        self.waitForElementToBeHittable(cardNumberTextField)
        cardNumberTextField.typeText("4111111111111111")

        let securityCodeField = elementsQuery.secureTextFields["CVV"]
        self.waitForElementToBeHittable(securityCodeField)

        XCTAssertFalse(elementsQuery.textFields["CVV"].exists)
    }
}

class BraintreeDropIn_ClientToken_CardForm_UITests: XCTestCase {
    
    var app: XCUIApplication!
    
    override func setUp() {
        super.setUp()
        continueAfterFailure = false
        app = XCUIApplication()
        app.launchArguments.append("-EnvironmentSandbox")
        app.launchArguments.append("-ClientToken")
        app.launchArguments.append("-ThreeDSecureDefault")
        app.launchArguments.append("-Integration:BraintreeDemoDropInViewController")
        app.launch()
        sleep(1)
        self.waitForElementToBeHittable(app.buttons["Add Payment Method"])
        app.buttons["Add Payment Method"].tap()
    }
    
    func testDropIn_cardInput_receivesNonce() {
        self.waitForElementToBeHittable(app.staticTexts["Credit or Debit Card"])
        app.staticTexts["Credit or Debit Card"].tap()
        
        let elementsQuery = app.scrollViews.otherElements
        let cardNumberTextField = elementsQuery.textFields["Card Number"]
        
        self.waitForElementToBeHittable(cardNumberTextField)
        cardNumberTextField.typeText("4111111111111111")
        
        self.waitForElementToBeHittable(app.staticTexts["2019"])
        app.staticTexts["11"].forceTapElement()
        app.staticTexts["2019"].forceTapElement()
        
        let securityCodeField = app.scrollViews.otherElements.textFields["CVV"]
        self.waitForElementToBeHittable(securityCodeField)
        securityCodeField.forceTapElement()
        securityCodeField.typeText("123")
        
        let postalCodeField = app.scrollViews.otherElements.textFields["12345"]
        self.waitForElementToBeHittable(postalCodeField)
        postalCodeField.forceTapElement()
        postalCodeField.typeText("12345")
        
        app.buttons["Add Card"].forceTapElement()
        
        self.waitForElementToAppear(app.staticTexts["ending in 11"])
        
        XCTAssertTrue(app.staticTexts["ending in 11"].exists);
    }
    
    func testDropIn_nonUnionPayCardNumber_showsNextButton() {
        self.waitForElementToBeHittable(app.staticTexts["Credit or Debit Card"])
        app.staticTexts["Credit or Debit Card"].tap()
        
        XCTAssertTrue(app.buttons["Next"].exists)
    }
    
    func testDropIn_hidesValidateButtonAfterCardNumberEntered() {
        self.waitForElementToBeHittable(app.staticTexts["Credit or Debit Card"])
        app.staticTexts["Credit or Debit Card"].tap()
        
        let elementsQuery = app.scrollViews.otherElements
        let cardNumberTextField = elementsQuery.textFields["Card Number"]
        
        self.waitForElementToBeHittable(cardNumberTextField)
        cardNumberTextField.typeText("4111111111111111")
        
        XCTAssertFalse(app.buttons["Next"].exists)
    }
    
    func pendDropIn_showsSpinnerDuringUnionPayCapabilitiesFetch() {
        self.waitForElementToBeHittable(app.staticTexts["Credit or Debit Card"])
        app.staticTexts["Credit or Debit Card"].tap()
        
        let elementsQuery = app.scrollViews.otherElements
        let cardNumberTextField = elementsQuery.textFields["Card Number"]
        
        self.waitForElementToBeHittable(cardNumberTextField)
        cardNumberTextField.typeText("6212345678901232")
        
        self.waitForElementToBeHittable(app.buttons["Next"])
        app.buttons["Next"].forceTapElement()
        XCTAssertTrue(app.activityIndicators.count == 1 && app.activityIndicators["In progress"].exists)
    }
    
    func pendDropIn_unionPayCardNumber_receivesNonce() {
        self.waitForElementToBeHittable(app.staticTexts["Credit or Debit Card"])
        app.staticTexts["Credit or Debit Card"].tap()
        
        let elementsQuery = app.scrollViews.otherElements
        let cardNumberTextField = elementsQuery.textFields["Card Number"]
        
        self.waitForElementToBeHittable(cardNumberTextField)
        cardNumberTextField.typeText("6212345678901232")
        
        self.waitForElementToBeHittable(app.buttons["Next"])
        app.buttons["Next"].forceTapElement()
        
        let expiryTextField = elementsQuery.textFields["MM/YYYY"]
        self.waitForElementToBeHittable(expiryTextField)
        
        self.waitForElementToBeHittable(app.staticTexts["2019"])
        app.staticTexts["11"].forceTapElement()
        app.staticTexts["2019"].forceTapElement()
        
        elementsQuery.textFields["Security Code"].typeText("565")
        app.typeText("65")
        
        app.staticTexts["Mobile Number"].forceTapElement()
        app.typeText("1235566543")
        
        app.buttons["Add Card"].forceTapElement()
        
        self.waitForElementToBeHittable(app.alerts.buttons["OK"])
        app.alerts.buttons["OK"].tap()
        
        self.waitForElementToBeHittable(app.textFields["SMS Code"])
        app.textFields["SMS Code"].forceTapElement()
        app.typeText("12345")
        
        self.waitForElementToBeHittable(app.buttons["Confirm"])
        app.buttons["Confirm"].forceTapElement()
        
        self.waitForElementToAppear(app.staticTexts["ending in 32"])
        
        XCTAssertTrue(app.staticTexts["ending in 32"].exists);
    }
    
    func testDropIn_cardInput_doesNotShowCardIOButton_inSimulator() {
        self.waitForElementToBeHittable(app.staticTexts["Credit or Debit Card"])
        app.staticTexts["Credit or Debit Card"].tap()
        
        let elementsQuery = app.scrollViews.otherElements
        let cardNumberTextField = elementsQuery.textFields["Card Number"]
        
        self.waitForElementToBeHittable(cardNumberTextField)
        cardNumberTextField.typeText("4111111111111111")
        XCTAssertFalse(app.staticTexts["Scan with card.io"].exists);
    }
}


class BraintreeDropIn_PayPal_UITests: XCTestCase {
    
    var app: XCUIApplication!
    
    override func setUp() {
        super.setUp()
        continueAfterFailure = false
        app = XCUIApplication()
        app.launchArguments.append("-EnvironmentSandbox")
        app.launchArguments.append("-TokenizationKey")
        app.launchArguments.append("-Integration:BraintreeDemoDropInViewController")
        app.launch()
        sleep(1)
        self.waitForElementToBeHittable(app.buttons["Add Payment Method"])
        app.buttons["Add Payment Method"].tap()
    }
    
    func testDropIn_paypal_showsPayPal() {
        self.waitForElementToBeHittable(app.staticTexts["Credit or Debit Card"])
        XCTAssertTrue(app.staticTexts["PayPal"].exists);
    }
    
    func testDropIn_paypal_receivesNonce() {
        if #available(iOS 11.0, *) {
            // SFSafariAuthenticationSession flow cannot be fully automated, so returning early
            return
        }
        
        self.waitForElementToBeHittable(app.staticTexts["PayPal"])
        app.staticTexts["PayPal"].tap()
        sleep(3)
        
        let webviewElementsQuery = app.webViews.element.otherElements
        
        self.waitForElementToBeHittable(webviewElementsQuery.links["Proceed with Sandbox Purchase"])
        
        webviewElementsQuery.links["Proceed with Sandbox Purchase"].forceTapElement()
        
        self.waitForElementToAppear(app.staticTexts["bt_buyer_us@paypal.com"])
        
        XCTAssertTrue(app.staticTexts["bt_buyer_us@paypal.com"].exists)
    }

    func testDropIn_paypal_cancelPopupShowsSelectPaymentMethodView() {
        if #available(iOS 11.0, *) {
            return
        }

        self.waitForElementToBeHittable(app.staticTexts["PayPal"])
        app.staticTexts["PayPal"].tap()
        sleep(3)

        let webviewElementsQuery = app.webViews.element.otherElements

        self.waitForElementToBeHittable(webviewElementsQuery.links["Cancel Sandbox Purchase"])

        webviewElementsQuery.links["Cancel Sandbox Purchase"].forceTapElement()

        self.waitForElementToAppear(app.staticTexts["Select Payment Method"])

        XCTAssertTrue(app.staticTexts["Select Payment Method"].exists)
    }
}

class BraintreeDropIn_PayPal_Disabled_UITests: XCTestCase {
    
    var app: XCUIApplication!
    
    override func setUp() {
        super.setUp()
        continueAfterFailure = false
        app = XCUIApplication()
        app.launchArguments.append("-EnvironmentSandbox")
        app.launchArguments.append("-TokenizationKey")
        app.launchArguments.append("-DisablePayPal")
        app.launchArguments.append("-Integration:BraintreeDemoDropInViewController")
        app.launch()
        sleep(1)
        self.waitForElementToBeHittable(app.buttons["Add Payment Method"])
        app.buttons["Add Payment Method"].tap()
    }
    
    func testDropIn_paypal_doesNotShowPayPal_whenDisabled() {
        self.waitForElementToBeHittable(app.staticTexts["Credit or Debit Card"])
        XCTAssertFalse(app.staticTexts["PayPal"].exists);
    }
}

class BraintreeDropIn_ThreeDSecure_UITests: XCTestCase {
    
    var app: XCUIApplication!
    
    override func setUp() {
        super.setUp()
        continueAfterFailure = false
        app = XCUIApplication()
        app.launchArguments.append("-EnvironmentSandbox")
        app.launchArguments.append("-ClientToken")
        app.launchArguments.append("-ThreeDSecureRequired")
        app.launchArguments.append("-Integration:BraintreeDemoDropInViewController")
        app.launch()
        sleep(1)
        self.waitForElementToBeHittable(app.buttons["Add Payment Method"])
        app.buttons["Add Payment Method"].tap()
    }
    
    func testDropIn_threeDSecure_showsThreeDSecureWebview_andTransacts() {
        self.waitForElementToBeHittable(app.staticTexts["Credit or Debit Card"])
        app.staticTexts["Credit or Debit Card"].tap()
        
        let elementsQuery = app.scrollViews.otherElements
        let cardNumberTextField = elementsQuery.textFields["Card Number"]
        
        self.waitForElementToBeHittable(cardNumberTextField)
        cardNumberTextField.typeText("4111111111111111")
        
        self.waitForElementToBeHittable(app.staticTexts["2019"])
        app.staticTexts["11"].forceTapElement()
        app.staticTexts["2019"].forceTapElement()
        
        let securityCodeField = elementsQuery.textFields["CVV"]
        self.waitForElementToBeHittable(securityCodeField)
        securityCodeField.forceTapElement()
        securityCodeField.typeText("123")
        
        let postalCodeField = elementsQuery.textFields["12345"]
        self.waitForElementToBeHittable(postalCodeField)
        postalCodeField.forceTapElement()
        postalCodeField.typeText("12345")
        
        app.buttons["Add Card"].forceTapElement()
        
        self.waitForElementToAppear(app.staticTexts["Added Protection"])
        
        let textField = app.secureTextFields.element(boundBy: 0)
        self.waitForElementToBeHittable(textField)
        textField.forceTapElement()
        sleep(2)
        textField.typeText("1234")
        
        app.buttons["Submit"].forceTapElement()
        
        self.waitForElementToAppear(app.staticTexts["ending in 11"])
        
        XCTAssertTrue(app.staticTexts["ending in 11"].exists);
        
        self.waitForElementToBeHittable(app.buttons["Complete Purchase"])
        app.buttons["Complete Purchase"].forceTapElement()
        
        let existsPredicate = NSPredicate(format: "label LIKE 'created*'")
        
        self.waitForElementToAppear(app.buttons.containing(existsPredicate).element(boundBy: 0))
    }
    
    func testDropIn_threeDSecure_returnsToPaymentSelectionView_whenCancelled() {
        self.waitForElementToBeHittable(app.staticTexts["Credit or Debit Card"])
        app.staticTexts["Credit or Debit Card"].tap()
        
        let elementsQuery = app.scrollViews.otherElements
        let cardNumberTextField = elementsQuery.textFields["Card Number"]
        
        self.waitForElementToBeHittable(cardNumberTextField)
        cardNumberTextField.typeText("4111111111111111")
        
        self.waitForElementToBeHittable(app.staticTexts["2019"])
        app.staticTexts["11"].forceTapElement()
        app.staticTexts["2019"].forceTapElement()
        
        let securityCodeField = elementsQuery.textFields["CVV"]
        self.waitForElementToBeHittable(securityCodeField)
        securityCodeField.forceTapElement()
        securityCodeField.typeText("123")
        
        let postalCodeField = elementsQuery.textFields["12345"]
        self.waitForElementToBeHittable(postalCodeField)
        postalCodeField.forceTapElement()
        postalCodeField.typeText("12345")
        
        app.buttons["Add Card"].forceTapElement()
        
        self.waitForElementToAppear(app.staticTexts["Added Protection"])
        
        app.buttons["Done"].forceTapElement()
        self.waitForElementToBeHittable(app.staticTexts["Credit or Debit Card"])
        self.waitForElementToAppear(app.staticTexts["Select Payment Method"])
        
        self.waitForElementToBeHittable(app.buttons["Cancel"])
        app.buttons["Cancel"].forceTapElement()
        
        self.waitForElementToAppear(app.buttons["Cancelled🎲"])
        XCTAssertTrue(app.buttons["Cancelled🎲"].exists);
    }
}


class BraintreeDropIn_Venmo_Disabled_UITests: XCTestCase {
    
    var app: XCUIApplication!
    
    override func setUp() {
        super.setUp()
        continueAfterFailure = false
        app = XCUIApplication()
        app.launchArguments.append("-EnvironmentSandbox")
        app.launchArguments.append("-TokenizationKey")
        app.launchArguments.append("-ForceVenmo")
        app.launchArguments.append("-DisableVenmo")
        app.launchArguments.append("-Integration:BraintreeDemoDropInViewController")
        app.launch()
        sleep(1)
        self.waitForElementToBeHittable(app.buttons["Add Payment Method"])
        app.buttons["Add Payment Method"].tap()
    }
    
    func testDropIn_venmo_doesNotShow_whenDisabled() {
        self.waitForElementToBeHittable(app.staticTexts["Credit or Debit Card"])
        XCTAssertFalse(app.staticTexts["Venmo"].exists);
    }
}

class BraintreeDropIn_Venmo_UITests: XCTestCase {
    
    var app: XCUIApplication!
    
    override func setUp() {
        super.setUp()
        continueAfterFailure = false
        app = XCUIApplication()
        app.launchArguments.append("-EnvironmentSandbox")
        app.launchArguments.append("-TokenizationKey")
        app.launchArguments.append("-ForceVenmo")
        app.launchArguments.append("-Integration:BraintreeDemoDropInViewController")
        app.launch()
        sleep(1)
        self.waitForElementToBeHittable(app.buttons["Add Payment Method"])
        app.buttons["Add Payment Method"].tap()
    }
    
    func testDropIn_venmo_doesShow() {
        self.waitForElementToBeHittable(app.staticTexts["Credit or Debit Card"])
        XCTAssertTrue(app.staticTexts["Venmo"].exists);
    }
}

class BraintreeDropIn_Error_UITests: XCTestCase {
    
    var app: XCUIApplication!
    
    override func setUp() {
        super.setUp()
        continueAfterFailure = false
        app = XCUIApplication()
        app.launchArguments.append("-EnvironmentSandbox")
        app.launchArguments.append("-TokenizationKey")
        app.launchArguments.append("-BadUrlScheme")
        app.launchArguments.append("-Integration:BraintreeDemoDropInViewController")
        app.launch()
        sleep(1)
        self.waitForElementToBeHittable(app.buttons["Add Payment Method"])
        app.buttons["Add Payment Method"].tap()
    }
    
    func testDropIn_paypal_receivesError_whenUrlSchemeIsIncorrect() {
        self.waitForElementToBeHittable(app.staticTexts["PayPal"])
        app.staticTexts["PayPal"].tap()
        sleep(3)
        
        let existsPredicate = NSPredicate(format: "label LIKE '*Application does not support One Touch callback*'")
        
        self.waitForElementToAppear(app.buttons.containing(existsPredicate).element(boundBy: 0))
    }
}
