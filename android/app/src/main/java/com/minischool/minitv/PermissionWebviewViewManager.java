package com.minischool.minitv;

import android.os.Build;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

public class PermissionWebviewViewManager extends SimpleViewManager<PermissionWebviewView> {
    public static final String REACT_CLASS = "PermissionWebviewViewManager";
    private String source;
    private PermissionWebviewView permissionWebviewView ;

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @RequiresApi(api = Build.VERSION_CODES.JELLY_BEAN_MR1)
    @Override
    public PermissionWebviewView createViewInstance(ThemedReactContext context) {
        permissionWebviewView = new PermissionWebviewView(context);
        return permissionWebviewView;//If your customview has more constructor parameters pass it from here.
    }

    @ReactProp(name = "sourceUri")
    public void setSource(PermissionWebviewView view, String source) {
        view.loadUrl(source);
    }

    @Override
    public void receiveCommand(@NonNull PermissionWebviewView root, String commandId, @Nullable ReadableArray args) {
        super.receiveCommand(root, commandId, args);
        switch (commandId) {
            case "clearAudio":
                root.clearAudio();
                break;
        }
    }
}
