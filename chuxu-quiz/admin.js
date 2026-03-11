/**
 * 初序 · 管理后台逻辑
 */
(function () {
    'use strict';

    var SUPABASE_URL = 'https://byjqjpklizpnulybsrqz.supabase.co';
    var SUPABASE_KEY = 'sb_publishable_noGNyOuxTbaMBN0J27diUA_H2yqIX3e';
    var ADMIN_EMAILS = ['zoey@chuxu.app'];

    var db = null;
    var ELEMENT_NAMES = { wood: '🌿木', fire: '🔥火', earth: '🌾土', metal: '🌙金', water: '🌊水' };
    var ELEMENT_COLORS = { wood: '#2D8B55', fire: '#C9544D', earth: '#C6983A', metal: '#8C8C98', water: '#2E6B9E' };

    // ---- 初始化 ----
    function init() {
        if (typeof supabase === 'undefined') {
            showAuthError('Supabase SDK 加载失败');
            return;
        }
        db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        checkAdmin();
        setupTabs();
    }

    // ---- 管理员验证 ----
    function checkAdmin() {
        db.auth.getSession().then(function (res) {
            if (!res.data.session) {
                showAuthError('请先<a href="login.html">登录</a>');
                return;
            }
            var email = res.data.session.user.email;
            if (ADMIN_EMAILS.indexOf(email) === -1) {
                showAuthError('⛔ 无管理员权限（' + email + '）');
                return;
            }
            // 认证通过
            document.getElementById('auth-check').style.display = 'none';
            loadAllData();
        });
    }

    function showAuthError(msg) {
        document.querySelector('.auth-check-inner').innerHTML = msg;
    }

    // ---- 标签页切换 ----
    function setupTabs() {
        document.querySelectorAll('.nav-item[data-tab]').forEach(function (tab) {
            tab.addEventListener('click', function () {
                var target = tab.getAttribute('data-tab');
                document.querySelectorAll('.nav-item').forEach(function (n) { n.classList.remove('active'); });
                document.querySelectorAll('.tab-panel').forEach(function (p) { p.classList.remove('active'); });
                tab.classList.add('active');
                document.getElementById('panel-' + target).classList.add('active');
            });
        });
    }

    // ---- 加载所有数据 ----
    function loadAllData() {
        loadOverview();
        loadFunnel();
        loadCheckins();
        loadUsers();
    }

    // ---- ① 数据概览 ----
    function loadOverview() {
        var today = new Date().toISOString().split('T')[0];

        // 总测试
        db.from('quiz_results').select('id', { count: 'exact', head: true }).then(function (r) {
            document.getElementById('stat-total-tests').textContent = r.count || 0;
        });

        // 今日测试
        db.from('quiz_results').select('id', { count: 'exact', head: true })
            .gte('created_at', today + 'T00:00:00').then(function (r) {
                document.getElementById('stat-today-tests').textContent = r.count || 0;
            });

        // 总打卡
        db.from('checkins').select('id', { count: 'exact', head: true }).then(function (r) {
            document.getElementById('stat-total-checkins').textContent = r.count || 0;
        });

        // 总事件
        db.from('events').select('id', { count: 'exact', head: true }).then(function (r) {
            document.getElementById('stat-total-events').textContent = r.count || 0;
        });

        // 五行分布图
        db.from('quiz_results').select('main_element').then(function (r) {
            if (!r.data) return;
            var counts = { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 };
            r.data.forEach(function (row) { if (counts[row.main_element] !== undefined) counts[row.main_element]++; });
            new Chart(document.getElementById('chart-elements'), {
                type: 'doughnut',
                data: {
                    labels: Object.keys(counts).map(function (k) { return ELEMENT_NAMES[k]; }),
                    datasets: [{
                        data: Object.values(counts),
                        backgroundColor: Object.keys(counts).map(function (k) { return ELEMENT_COLORS[k]; })
                    }]
                },
                options: { responsive: true, plugins: { legend: { position: 'bottom', labels: { color: '#ccc' } } } }
            });
        });

        // 每日趋势（近7天）
        db.from('quiz_results').select('created_at')
            .gte('created_at', new Date(Date.now() - 7 * 86400000).toISOString()).then(function (r) {
                if (!r.data) return;
                var days = {};
                for (var i = 6; i >= 0; i--) {
                    var d = new Date(Date.now() - i * 86400000).toISOString().split('T')[0];
                    days[d] = 0;
                }
                r.data.forEach(function (row) {
                    var d = row.created_at.split('T')[0];
                    if (days[d] !== undefined) days[d]++;
                });
                new Chart(document.getElementById('chart-daily'), {
                    type: 'bar',
                    data: {
                        labels: Object.keys(days).map(function (d) { return d.substring(5); }),
                        datasets: [{ label: '测试人数', data: Object.values(days), backgroundColor: '#2D8B55aa' }]
                    },
                    options: {
                        responsive: true,
                        scales: { y: { beginAtZero: true, ticks: { color: '#888' } }, x: { ticks: { color: '#888' } } },
                        plugins: { legend: { labels: { color: '#ccc' } } }
                    }
                });
            });
    }

    // ---- ② 用户行为漏斗 ----
    function loadFunnel() {
        var events = ['page_view', 'test_start', 'test_complete', 'share_click'];
        var labels = ['访问页面', '开始测试', '完成测试', '点击分享'];
        var promises = events.map(function (evt) {
            return db.from('events').select('id', { count: 'exact', head: true }).eq('event', evt);
        });

        Promise.all(promises).then(function (results) {
            var container = document.getElementById('funnel-container');
            var maxCount = Math.max(1, results[0].count || 1);
            var html = '';
            results.forEach(function (r, i) {
                var count = r.count || 0;
                var pct = Math.round((count / maxCount) * 100);
                var convRate = i > 0 ? Math.round((count / Math.max(1, results[i - 1].count || 1)) * 100) : 100;
                html += '<div class="funnel-step">';
                html += '  <div class="funnel-bar" style="width:' + pct + '%; background: linear-gradient(90deg, #2D8B55, #C6983A);">';
                html += '    <span>' + labels[i] + ': ' + count + '</span>';
                html += '  </div>';
                if (i > 0) html += '  <div class="funnel-rate">转化率 ' + convRate + '%</div>';
                html += '</div>';
            });
            container.innerHTML = html;
        });

        // 最近事件列表
        db.from('events').select('*').order('created_at', { ascending: false }).limit(30).then(function (r) {
            if (!r.data) return;
            var html = '';
            r.data.forEach(function (row) {
                var time = new Date(row.created_at).toLocaleString('zh-CN');
                var uid = (row.user_id || '').substring(0, 12);
                var data = row.data ? JSON.stringify(row.data).substring(0, 40) : '-';
                html += '<tr><td>' + time + '</td><td>' + uid + '</td><td>' + row.event + '</td><td>' + data + '</td></tr>';
            });
            document.getElementById('events-tbody').innerHTML = html || '<tr><td colspan="4">暂无数据</td></tr>';
        });
    }

    // ---- ③ 打卡统计 ----
    function loadCheckins() {
        db.from('checkins').select('*').then(function (r) {
            if (!r.data || r.data.length === 0) {
                document.getElementById('stat-checkin-users').textContent = '0';
                document.getElementById('stat-avg-mood').textContent = '-';
                document.getElementById('stat-avg-sleep').textContent = '-';
                document.getElementById('stat-avg-gut').textContent = '-';
                return;
            }

            var users = {};
            var totalMood = 0, totalSleep = 0, totalGut = 0;
            r.data.forEach(function (c) {
                users[c.user_id] = true;
                totalMood += c.mood || 0;
                totalSleep += c.sleep || 0;
                totalGut += c.gut || 0;
            });
            var n = r.data.length;
            document.getElementById('stat-checkin-users').textContent = Object.keys(users).length;
            document.getElementById('stat-avg-mood').textContent = (totalMood / n).toFixed(1);
            document.getElementById('stat-avg-sleep').textContent = (totalSleep / n).toFixed(1);
            document.getElementById('stat-avg-gut').textContent = (totalGut / n).toFixed(1);

            // 趋势图
            var days = {};
            for (var i = 6; i >= 0; i--) {
                var d = new Date(Date.now() - i * 86400000).toISOString().split('T')[0];
                days[d] = 0;
            }
            r.data.forEach(function (c) {
                var d = c.created_at.split('T')[0];
                if (days[d] !== undefined) days[d]++;
            });
            new Chart(document.getElementById('chart-checkin-trend'), {
                type: 'line',
                data: {
                    labels: Object.keys(days).map(function (d) { return d.substring(5); }),
                    datasets: [{ label: '打卡次数', data: Object.values(days), borderColor: '#2D8B55', tension: 0.3, fill: true, backgroundColor: '#2D8B5522' }]
                },
                options: {
                    responsive: true,
                    scales: { y: { beginAtZero: true, ticks: { color: '#888' } }, x: { ticks: { color: '#888' } } },
                    plugins: { legend: { labels: { color: '#ccc' } } }
                }
            });
        });
    }

    // ---- ④ 用户列表 ----
    function loadUsers() {
        db.from('quiz_results').select('*').order('created_at', { ascending: false }).limit(50).then(function (r) {
            if (!r.data) return;
            var html = '';
            r.data.forEach(function (row) {
                var time = new Date(row.created_at).toLocaleString('zh-CN');
                var uid = (row.user_id || '').substring(0, 12);
                var scores = row.scores || {};
                var scoreStr = Object.keys(scores).map(function (k) { return (ELEMENT_NAMES[k] || k) + scores[k]; }).join(' ');
                html += '<tr><td>' + time + '</td><td>' + uid + '</td><td>' + (ELEMENT_NAMES[row.main_element] || row.main_element) + '</td><td>' + (ELEMENT_NAMES[row.sub_element] || '-') + '</td><td style="font-size:12px;">' + scoreStr + '</td></tr>';
            });
            document.getElementById('users-tbody').innerHTML = html || '<tr><td colspan="5">暂无数据</td></tr>';
        });
    }

    // 退出登录
    window.handleLogout = function () {
        if (db) db.auth.signOut().then(function () { location.href = 'login.html'; });
    };

    // 启动
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
