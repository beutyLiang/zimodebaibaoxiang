/**
 * 初序 · Supabase 数据层
 * 功能：匿名用户管理 / 测试结果存储 / 打卡云同步 / 行为埋点
 */

var ChuxuDB = (function () {
    'use strict';

    // ---------- Supabase 配置 ----------
    var SUPABASE_URL = 'https://byjqjpklizpnulybsrqz.supabase.co';
    var SUPABASE_KEY = 'sb_publishable_noGNyOuxTbaMBN0J27diUA_H2yqIX3e';

    var db = null;

    // ---------- 初始化 ----------
    function init() {
        if (typeof supabase !== 'undefined' && supabase.createClient) {
            db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
            console.log('[初序] 数据层已连接');
        } else {
            console.warn('[初序] Supabase SDK 未加载，数据将仅保存在本地');
        }
        ensureUserId();
    }

    // ---------- 匿名用户 ID ----------
    function ensureUserId() {
        var uid = localStorage.getItem('chuxu_uid');
        if (!uid) {
            uid = 'u_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 8);
            localStorage.setItem('chuxu_uid', uid);
        }
        return uid;
    }

    function getUserId() {
        return localStorage.getItem('chuxu_uid') || ensureUserId();
    }

    // ---------- 保存测试结果 ----------
    function saveQuizResult(mainElement, subElement, scores) {
        var record = {
            user_id: getUserId(),
            main_element: mainElement,
            sub_element: subElement,
            scores: scores,
            user_agent: navigator.userAgent.substring(0, 200),
            referrer: document.referrer || window.location.search || ''
        };

        // 无论 Supabase 是否可用，都保存到本地
        localStorage.setItem('chuxu_element', mainElement);
        localStorage.setItem('chuxu_sub_element', subElement);
        localStorage.setItem('chuxu_scores', JSON.stringify(scores));

        if (!db) return Promise.resolve(false);

        return db.from('quiz_results').insert(record)
            .then(function (res) {
                if (res.error) {
                    console.warn('[初序] 保存测试结果失败:', res.error.message);
                    return false;
                }
                console.log('[初序] 测试结果已保存到云端');
                return true;
            })
            .catch(function (err) {
                console.warn('[初序] 网络错误:', err);
                return false;
            });
    }

    // ---------- 保存打卡记录 ----------
    function saveCheckin(element, mood, sleep, gut, note) {
        var todayStr = new Date().toISOString().split('T')[0];

        var record = {
            user_id: getUserId(),
            element: element,
            mood: mood,
            sleep: sleep,
            gut: gut,
            note: note || ''
        };

        // 同时保存到 localStorage（兜底）
        var local = JSON.parse(localStorage.getItem('chuxu_checkins') || '[]');
        record.date = todayStr;
        local.push(record);
        localStorage.setItem('chuxu_checkins', JSON.stringify(local));

        if (!db) return Promise.resolve(false);

        // 云端不需要 date 字段（用 created_at）
        var cloudRecord = {
            user_id: record.user_id,
            element: record.element,
            mood: record.mood,
            sleep: record.sleep,
            gut: record.gut,
            note: record.note
        };

        return db.from('checkins').insert(cloudRecord)
            .then(function (res) {
                if (res.error) {
                    console.warn('[初序] 打卡保存失败:', res.error.message);
                    return false;
                }
                console.log('[初序] 打卡已同步到云端');
                return true;
            })
            .catch(function (err) {
                console.warn('[初序] 网络错误:', err);
                return false;
            });
    }

    // ---------- 行为埋点 ----------
    function trackEvent(eventName, data) {
        if (!db) return;

        var record = {
            user_id: getUserId(),
            event: eventName,
            data: data || {}
        };

        db.from('events').insert(record)
            .then(function (res) {
                if (res.error) console.warn('[初序] 埋点失败:', res.error.message);
            })
            .catch(function () { /* 静默失败 */ });
    }

    // ---------- 暴露 API ----------
    return {
        init: init,
        getUserId: getUserId,
        saveQuizResult: saveQuizResult,
        saveCheckin: saveCheckin,
        trackEvent: trackEvent
    };
})();

// 页面加载后自动初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ChuxuDB.init);
} else {
    ChuxuDB.init();
}
