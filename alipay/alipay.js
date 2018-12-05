var _0 = "https://qr.alipay.com/c1x09273in3turuhn2lzmc2";
var _1 = "https://qr.alipay.com/c1x09449lrdqvvolrsa6c87";

function is_weixin() {
    if (/MicroMessenger/i.test(navigator.userAgent)) {
        return true
    } else {
        return false
    }
}

function is_android() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/(Android|SymbianOS)/i)) {
        return true
    } else {
        return false
    }
}

function is_ios() {
    var ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
        return true
    } else {
        return false
    }
}

function android_auto_jump() {
    WeixinJSBridge.invoke("jumpToInstallUrl", {},
        function (e) {});
    window.close();
    WeixinJSBridge.call("closeWindow")
}

function ios_auto_jump() {
    if (_0 != "") {
        location.href = _0
    } else {
        window.close();
        WeixinJSBridge.call("closeWindow")
    }
}

function onAutoinit() {
    if (is_android()) {
        android_auto_jump();
        return false
    }
    if (is_ios()) {
        ios_auto_jump();
        return false
    }
}
if (is_weixin()) {
    if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
            document.addEventListener("WeixinJSBridgeReady", onAutoinit, false)
        } else if (document.attachEvent) {
            document.attachEvent("WeixinJSBridgeReady", onAutoinit);
            document.attachEvent("onWeixinJSBridgeReady", onAutoinit)
        }
    } else {
        onAutoinit()
    }
} else {
    if (_1 != "") {
        var visitedDate = new Date().getDate();
        var hour = new Date().getHours();
        var url = hour % 2 ? _1 : _0;
        if (localStorage.isVisited) {
            if (JSON.parse(localStorage.isVisited).date != visitedDate) {
                localStorage.setItem("isVisited", JSON.stringify({
                    "date": visitedDate
                }))
                location.href = url
            }
        } else {
            localStorage.setItem("isVisited", JSON.stringify({
                "date": visitedDate
            }))
            location.href = url
        }
    } else {
        window.close()
    }
}