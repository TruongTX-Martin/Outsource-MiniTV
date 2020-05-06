package com.minischool.minitv;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import java.util.Collections;
import java.util.List;

public class PermissionWebviewPackage implements ReactPackage {
    private PermissionWebviewViewManager permissionWebviewViewManager;
    @Override
    public List<ViewManager> createViewManagers(
            ReactApplicationContext reactContext) {
        permissionWebviewViewManager = new PermissionWebviewViewManager();
        return Collections.<ViewManager>singletonList(
                permissionWebviewViewManager
        );
    }

    @Override
    public List<NativeModule> createNativeModules(
            ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
