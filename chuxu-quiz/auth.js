/**
 * 初序 · 用户认证模块
 * 功能：注册 / 登录 / 退出 / 状态管理
 * 基于 Supabase Auth
 */
var ChuxuAuth = (function () {
    'use strict';

    var SUPABASE_URL = 'https://byjqjpklizpnulybsrqz.supabase.co';
    var SUPABASE_KEY = 'sb_publishable_noGNyOuxTbaMBN0J27diUA_H2yqIX3e';
    var ADMIN_EMAILS = ['glaydsbernhwenkuph@gmail.com'];

    var client = null;
    var currentUser = null;

    function init() {
        if (typeof supabase !== 'undefined' && supabase.createClient) {
            client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
            // 监听登录状态变化
            client.auth.onAuthStateChange(function (event, session) {
                currentUser = session ? session.user : null;
                updateUI();
            });
            // 初始检查
            client.auth.getSession().then(function (res) {
                if (res.data.session) {
                    currentUser = res.data.session.user;
                }
                updateUI();
            });
        }
    }

    // ---- 注册 ----
    function signUp(email, password) {
        if (!client) return Promise.reject(new Error('服务未连接'));
        return client.auth.signUp({ email: email, password: password })
            .then(function (res) {
                if (res.error) throw res.error;
                return res.data;
            });
    }

    // ---- 登录 ----
    function signIn(email, password) {
        if (!client) return Promise.reject(new Error('服务未连接'));
        return client.auth.signInWithPassword({ email: email, password: password })
            .then(function (res) {
                if (res.error) throw res.error;
                currentUser = res.data.user;
                updateUI();
                return res.data;
            });
    }

    // ---- 退出 ----
    function signOut() {
        if (!client) return Promise.resolve();
        return client.auth.signOut().then(function () {
            currentUser = null;
            updateUI();
        });
    }

    // ---- 获取当前用户 ----
    function getUser() {
        return currentUser;
    }

    function isLoggedIn() {
        return !!currentUser;
    }

    function isAdmin() {
        return currentUser && ADMIN_EMAILS.indexOf(currentUser.email) !== -1;
    }

    // ---- 更新页面 UI ----
    function updateUI() {
        var loginBtn = document.getElementById('header-login-btn');
        var userInfo = document.getElementById('header-user-info');
        var userName = document.getElementById('header-user-name');
        var adminLink = document.getElementById('header-admin-link');

        if (!loginBtn) return;

        if (currentUser) {
            loginBtn.style.display = 'none';
            if (userInfo) userInfo.style.display = 'flex';
            if (userName) userName.textContent = currentUser.email.split('@')[0];
            if (adminLink) adminLink.style.display = isAdmin() ? 'inline' : 'none';
        } else {
            loginBtn.style.display = 'inline-block';
            if (userInfo) userInfo.style.display = 'none';
        }
    }

    return {
        init: init,
        signUp: signUp,
        signIn: signIn,
        signOut: signOut,
        getUser: getUser,
        isLoggedIn: isLoggedIn,
        isAdmin: isAdmin,
        ADMIN_EMAILS: ADMIN_EMAILS
    };
})();

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ChuxuAuth.init);
} else {
    ChuxuAuth.init();
}
