/**
 * 初序 · 用户认证模块
 * 功能：注册 / 登录 / 退出 / 状态管理
 * 基于 Supabase Auth
 */
var ChuxuAuth = (function () {
    'use strict';

    var client = null;
    var currentUser = null;
    var currentUserRole = null;

    function init() {
        if (typeof supabase !== 'undefined' && supabase.createClient) {
            client = supabase.createClient(CHUXU_CONFIG.SUPABASE_URL, CHUXU_CONFIG.SUPABASE_KEY);
            // 监听登录状态变化
            client.auth.onAuthStateChange(function (event, session) {
                currentUser = session ? session.user : null;
                if (currentUser) { loadUserRole(); } else { currentUserRole = null; updateUI(); }
            });
            // 初始检查
            client.auth.getSession().then(function (res) {
                if (res.data.session) {
                    currentUser = res.data.session.user;
                    loadUserRole();
                } else {
                    updateUI();
                }
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
        return currentUserRole === 'admin';
    }

    // 查询用户角色
    function loadUserRole() {
        if (!client || !currentUser) return;
        client.from('user_profiles').select('role').eq('user_id', currentUser.id).then(function (r) {
            if (r.data && r.data.length > 0) {
                currentUserRole = r.data[0].role;
            }
            updateUI();
        });
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
        isAdmin: isAdmin
    };
})();

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ChuxuAuth.init);
} else {
    ChuxuAuth.init();
}
