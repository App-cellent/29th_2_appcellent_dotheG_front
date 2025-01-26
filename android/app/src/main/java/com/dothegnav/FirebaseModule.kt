package com.dothegnav

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Callback
import com.google.firebase.messaging.FirebaseMessaging

class FirebaseModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "FirebaseModule"
    }

    @ReactMethod
    fun getDeviceToken(callback: Callback) {
        FirebaseMessaging.getInstance().token
            .addOnCompleteListener { task ->
                if (task.isSuccessful && task.result != null) {
                    val token = task.result
                    callback.invoke(null, token) // 성공 시 토큰 전달
                } else {
                    val exception = task.exception?.message ?: "Failed to retrieve FCM token"
                    callback.invoke(exception, null) // 실패 시 에러 메시지 전달
                }
            }
    }
}
