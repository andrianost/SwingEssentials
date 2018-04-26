package com.swingessentials;

import com.facebook.react.ReactActivity;
import com.inprogress.reactnativeyoutube.ReactNativeYouTube;
import com.brentvatne.react.ReactVideoPackage;
import org.devio.rn.splashscreen.SplashScreen;
import android.os.Bundle;
import com.dooboolab.RNIap.RNIapPackage;

public class MainActivity extends ReactActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);
        super.onCreate(savedInstanceState);
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "SwingEssentials";
    }
}
