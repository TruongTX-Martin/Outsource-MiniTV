package com.minischool.minitv;
import android.content.Context;
import android.os.Build;
import android.util.Log;
import android.view.KeyEvent;
import android.webkit.PermissionRequest;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import androidx.annotation.RequiresApi;

public class PermissionWebviewView  extends WebView {
    private Context context;

    @RequiresApi(api = Build.VERSION_CODES.JELLY_BEAN_MR1)
    public PermissionWebviewView(Context context) {
        super(context);
        this.context = context;

        this.setWebViewClient(new WebViewClient());

        WebSettings webSettings = this.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setAllowUniversalAccessFromFileURLs(true);
        webSettings.setLoadsImagesAutomatically(true);
        webSettings.setAllowFileAccessFromFileURLs(true);
        webSettings.setAllowContentAccess(true);
        webSettings.setDomStorageEnabled(true);
        webSettings.setMediaPlaybackRequiresUserGesture(true);
        webSettings.setUseWideViewPort(true);

        this.setWebChromeClient(new WebChromeClient() {
            @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
            @Override
            public void onPermissionRequest(final PermissionRequest request) {
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                    request.grant(request.getResources());
                }
            }

        });
    }





    @Override
    public void onPause() {
        super.onPause();
        Log.d("OnPause","Pau em nhe");
        this.destroy();
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        Log.d("onKeyDown:",keyCode + "");
        return super.onKeyDown(keyCode, event);
    }

    public void clearAudio(){
        this.destroy();
    }

}
