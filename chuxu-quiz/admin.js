/**
 * 初序 · 管理后台逻辑 V3
 * 用户管理体系：Auth + user_profiles 双检查 + 完整 CRUD + 重置密码
 */
(function () {
    'use strict';

    var SUPABASE_URL = 'https://byjqjpklizpnulybsrqz.supabase.co';
    var SUPABASE_KEY = 'sb_publishable_noGNyOuxTbaMBN0J27diUA_H2yqIX3e';

    var db = null;
    var ELEMENT_NAMES = { wood: '🌿木', fire: '🔥火', earth: '🌾土', metal: '🌙金', water: '🌊水' };
    var ELEMENT_COLORS = { wood: '#2D8B55', fire: '#C9544D', earth: '#C6983A', metal: '#8C8C98', water: '#2E6B9E' };
    var ROLE_MAP = { admin: '🔑 管理员', user: '👤 用户' };

    function init() {
        if (typeof supabase === 'undefined') { showAuthError('Supabase SDK 加载失败'); return; }
        db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        checkAdmin();
        setupTabs();
    }

    // ---- 管理员验证（双检查）----
    function checkAdmin() {
        db.auth.getSession().then(function (res) {
            if (!res.data.session) {
                location.href = 'admin-login.html';
                return;
            }
            var user = res.data.session.user;
            // 检查 user_profiles 里的角色
            db.from('user_profiles').select('role').eq('user_id', user.id).then(function (r) {
                if (!r.data || r.data.length === 0 || r.data[0].role !== 'admin') {
                    showAuthError('⛔ 无管理员权限（' + user.email + '）<br><a href="index.html">返回首页</a>');
                    return;
                }
                document.getElementById('auth-check').style.display = 'none';
                loadAllData();
            });
        });
    }

    function showAuthError(msg) { document.querySelector('.auth-check-inner').innerHTML = msg; }

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

    function loadAllData() {
        loadOverview();
        loadFunnel();
        loadCheckins();
        loadRecords();
        loadUserManagement();
    }

    // ---- ① 数据概览 ----
    function loadOverview() {
        var today = new Date().toISOString().split('T')[0];
        db.from('quiz_results').select('id', { count: 'exact', head: true }).then(function (r) {
            document.getElementById('stat-total-tests').textContent = r.count || 0;
        });
        db.from('quiz_results').select('id', { count: 'exact', head: true })
            .gte('created_at', today + 'T00:00:00').then(function (r) {
                document.getElementById('stat-today-tests').textContent = r.count || 0;
            });
        db.from('checkins').select('id', { count: 'exact', head: true }).then(function (r) {
            document.getElementById('stat-total-checkins').textContent = r.count || 0;
        });
        db.from('user_profiles').select('id', { count: 'exact', head: true }).then(function (r) {
            document.getElementById('stat-total-users').textContent = r.count || 0;
        });

        db.from('quiz_results').select('main_element').then(function (r) {
            if (!r.data) return;
            var counts = { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 };
            r.data.forEach(function (row) { if (counts[row.main_element] !== undefined) counts[row.main_element]++; });
            new Chart(document.getElementById('chart-elements'), {
                type: 'doughnut',
                data: {
                    labels: Object.keys(counts).map(function (k) { return ELEMENT_NAMES[k]; }),
                    datasets: [{ data: Object.values(counts), backgroundColor: Object.keys(counts).map(function (k) { return ELEMENT_COLORS[k]; }) }]
                },
                options: { responsive: true, plugins: { legend: { position: 'bottom', labels: { color: '#ccc' } } } }
            });
        });

        db.from('quiz_results').select('created_at')
            .gte('created_at', new Date(Date.now() - 7 * 86400000).toISOString()).then(function (r) {
                if (!r.data) return;
                var days = {};
                for (var i = 6; i >= 0; i--) { var d = new Date(Date.now() - i * 86400000).toISOString().split('T')[0]; days[d] = 0; }
                r.data.forEach(function (row) { var d = row.created_at.split('T')[0]; if (days[d] !== undefined) days[d]++; });
                new Chart(document.getElementById('chart-daily'), {
                    type: 'bar',
                    data: {
                        labels: Object.keys(days).map(function (d) { return d.substring(5); }),
                        datasets: [{ label: '测试人数', data: Object.values(days), backgroundColor: '#2D8B55aa' }]
                    },
                    options: { responsive: true, scales: { y: { beginAtZero: true, ticks: { color: '#888' } }, x: { ticks: { color: '#888' } } }, plugins: { legend: { labels: { color: '#ccc' } } } }
                });
            });
    }

    // ---- ② 用户行为漏斗 ----
    function loadFunnel() {
        var events = ['page_view', 'test_start', 'test_complete', 'share_click'];
        var labels = ['访问页面', '开始测试', '完成测试', '点击分享'];
        Promise.all(events.map(function (evt) {
            return db.from('events').select('id', { count: 'exact', head: true }).eq('event', evt);
        })).then(function (results) {
            var container = document.getElementById('funnel-container');
            var maxCount = Math.max(1, results[0].count || 1);
            var html = '';
            results.forEach(function (r, i) {
                var count = r.count || 0;
                var pct = Math.max(Math.round((count / maxCount) * 100), 10);
                var convRate = i > 0 ? Math.round((count / Math.max(1, results[i - 1].count || 1)) * 100) : 100;
                html += '<div class="funnel-step"><div class="funnel-bar" style="width:' + pct + '%; background: linear-gradient(90deg, #2D8B55, #C6983A);"><span>' + labels[i] + ': ' + count + '</span></div>';
                if (i > 0) html += '<div class="funnel-rate">转化率 ' + convRate + '%</div>';
                html += '</div>';
            });
            container.innerHTML = html;
        });

        db.from('events').select('*').order('created_at', { ascending: false }).limit(30).then(function (r) {
            if (!r.data) return;
            var html = '';
            r.data.forEach(function (row) {
                html += '<tr><td>' + new Date(row.created_at).toLocaleString('zh-CN') + '</td><td>' + (row.user_id || '').substring(0, 12) + '</td><td>' + row.event + '</td><td>' + (row.data ? JSON.stringify(row.data).substring(0, 40) : '-') + '</td></tr>';
            });
            document.getElementById('events-tbody').innerHTML = html || '<tr><td colspan="4">暂无数据</td></tr>';
        });
    }

    // ---- ③ 打卡统计 ----
    function loadCheckins() {
        db.from('checkins').select('*').then(function (r) {
            if (!r.data || r.data.length === 0) {
                ['stat-checkin-users', 'stat-avg-mood', 'stat-avg-sleep', 'stat-avg-gut'].forEach(function (id) {
                    document.getElementById(id).textContent = id.includes('user') ? '0' : '-';
                });
                return;
            }
            var users = {}, totalMood = 0, totalSleep = 0, totalGut = 0;
            r.data.forEach(function (c) { users[c.user_id] = true; totalMood += c.mood || 0; totalSleep += c.sleep || 0; totalGut += c.gut || 0; });
            var n = r.data.length;
            document.getElementById('stat-checkin-users').textContent = Object.keys(users).length;
            document.getElementById('stat-avg-mood').textContent = (totalMood / n).toFixed(1);
            document.getElementById('stat-avg-sleep').textContent = (totalSleep / n).toFixed(1);
            document.getElementById('stat-avg-gut').textContent = (totalGut / n).toFixed(1);

            var days = {};
            for (var i = 6; i >= 0; i--) { var d = new Date(Date.now() - i * 86400000).toISOString().split('T')[0]; days[d] = 0; }
            r.data.forEach(function (c) { var d = c.created_at.split('T')[0]; if (days[d] !== undefined) days[d]++; });
            new Chart(document.getElementById('chart-checkin-trend'), {
                type: 'line',
                data: {
                    labels: Object.keys(days).map(function (d) { return d.substring(5); }),
                    datasets: [{ label: '打卡次数', data: Object.values(days), borderColor: '#2D8B55', tension: 0.3, fill: true, backgroundColor: '#2D8B5522' }]
                },
                options: { responsive: true, scales: { y: { beginAtZero: true, ticks: { color: '#888' } }, x: { ticks: { color: '#888' } } }, plugins: { legend: { labels: { color: '#ccc' } } } }
            });
        });
    }

    // ---- ④ 测试记录 ----
    function loadRecords() {
        db.from('quiz_results').select('*').order('created_at', { ascending: false }).limit(50).then(function (r) {
            if (!r.data) return;
            var html = '';
            r.data.forEach(function (row) {
                var scores = row.scores || {};
                var scoreStr = Object.keys(scores).map(function (k) { return (ELEMENT_NAMES[k] || k) + scores[k]; }).join(' ');
                html += '<tr><td>' + new Date(row.created_at).toLocaleString('zh-CN') + '</td><td>' + (row.user_id || '').substring(0, 12) + '</td><td>' + (ELEMENT_NAMES[row.main_element] || row.main_element) + '</td><td>' + (ELEMENT_NAMES[row.sub_element] || '-') + '</td><td style="font-size:12px;">' + scoreStr + '</td></tr>';
            });
            document.getElementById('records-tbody').innerHTML = html || '<tr><td colspan="5">暂无数据</td></tr>';
        });
    }

    // ---- ⑤ 用户管理（完整 CRUD）----
    function loadUserManagement() {
        db.from('user_profiles').select('*').order('created_at', { ascending: false }).then(function (r) {
            var tbody = document.getElementById('user-mgmt-tbody');
            if (!r.data || r.data.length === 0) {
                tbody.innerHTML = '<tr><td colspan="7" style="color:#8b949e;">暂无用户</td></tr>';
                return;
            }
            var html = '';
            r.data.forEach(function (u) {
                html += '<tr>';
                html += '<td>' + new Date(u.created_at).toLocaleString('zh-CN') + '</td>';
                html += '<td>' + (u.email || '-') + '</td>';
                html += '<td>' + (u.nickname || '-') + '</td>';
                html += '<td>' + (ROLE_MAP[u.role] || u.role || 'user') + '</td>';
                html += '<td>' + (u.phone || '-') + '</td>';
                html += '<td>' + (u.note || '-') + '</td>';
                html += '<td class="action-cell">';
                html += '<button class="btn-action btn-edit" onclick="editUser(\'' + u.id + '\',\'' + (u.nickname || '') + '\',\'' + (u.phone || '') + '\',\'' + (u.note || '') + '\',\'' + (u.role || 'user') + '\')">编辑</button>';
                html += '<button class="btn-action btn-reset" onclick="resetPassword(\'' + u.email + '\')">重置密码</button>';
                html += '<button class="btn-action btn-del" onclick="deleteUser(\'' + u.id + '\',\'' + u.email + '\')">删除</button>';
                html += '</td></tr>';
            });
            tbody.innerHTML = html;
        });
    }

    // 新增用户
    window.showAddUserForm = function () { document.getElementById('add-user-form').style.display = 'block'; };
    window.hideAddUserForm = function () {
        document.getElementById('add-user-form').style.display = 'none';
        document.getElementById('add-user-msg').textContent = '';
    };

    window.doAddUser = function () {
        var email = document.getElementById('new-user-email').value.trim();
        var pass = document.getElementById('new-user-pass').value;
        var nickname = document.getElementById('new-user-nickname').value.trim();
        var role = document.getElementById('new-user-role').value;
        var note = document.getElementById('new-user-note').value.trim();
        var msgEl = document.getElementById('add-user-msg');

        if (!email || !pass) { msgEl.textContent = '请填写邮箱和密码'; msgEl.style.color = '#E57373'; return; }
        if (pass.length < 6) { msgEl.textContent = '密码至少6位'; msgEl.style.color = '#E57373'; return; }

        msgEl.textContent = '添加中...'; msgEl.style.color = '#ccc';

        db.auth.signUp({ email: email, password: pass }).then(function (res) {
            if (res.error) { msgEl.textContent = '失败：' + res.error.message; msgEl.style.color = '#E57373'; return; }
            var userId = res.data.user ? res.data.user.id : '';
            db.from('user_profiles').insert({
                user_id: userId, email: email,
                nickname: nickname || email.split('@')[0],
                role: role || 'user', note: note || ''
            }).then(function (ir) {
                if (ir.error) { msgEl.textContent = '用户创建成功但资料保存失败：' + ir.error.message; msgEl.style.color = '#E57373'; return; }
                msgEl.textContent = '✅ 用户添加成功！'; msgEl.style.color = '#81C784';
                document.getElementById('new-user-email').value = '';
                document.getElementById('new-user-pass').value = '';
                document.getElementById('new-user-nickname').value = '';
                document.getElementById('new-user-note').value = '';
                loadUserManagement();
            });
        });
    };

    // 编辑用户
    window.editUser = function (id, nickname, phone, note, role) {
        var html = '<div class="edit-modal" id="edit-modal">';
        html += '<div class="edit-card"><h3>编辑用户</h3>';
        html += '<div class="form-row"><label>昵称</label><input id="edit-nickname" value="' + nickname + '"></div>';
        html += '<div class="form-row"><label>手机</label><input id="edit-phone" value="' + phone + '"></div>';
        html += '<div class="form-row"><label>角色</label><select id="edit-role"><option value="user"' + (role === 'user' ? ' selected' : '') + '>普通用户</option><option value="admin"' + (role === 'admin' ? ' selected' : '') + '>管理员</option></select></div>';
        html += '<div class="form-row"><label>备注</label><input id="edit-note" value="' + note + '"></div>';
        html += '<div class="form-row"><button class="btn-admin btn-primary" onclick="doEditUser(\'' + id + '\')">保存</button><button class="btn-admin" onclick="closeModal()">取消</button></div>';
        html += '<div class="form-msg" id="edit-msg"></div></div></div>';
        document.body.insertAdjacentHTML('beforeend', html);
    };

    window.doEditUser = function (id) {
        var data = {
            nickname: document.getElementById('edit-nickname').value.trim(),
            phone: document.getElementById('edit-phone').value.trim(),
            role: document.getElementById('edit-role').value,
            note: document.getElementById('edit-note').value.trim()
        };
        db.from('user_profiles').update(data).eq('id', id).then(function (r) {
            if (r.error) { document.getElementById('edit-msg').textContent = '保存失败：' + r.error.message; return; }
            closeModal();
            loadUserManagement();
        });
    };

    window.closeModal = function () {
        var modal = document.getElementById('edit-modal');
        if (modal) modal.remove();
    };

    // 重置密码
    window.resetPassword = function (email) {
        if (!confirm('确定要发送密码重置邮件给 ' + email + '？')) return;
        db.auth.resetPasswordForEmail(email, {
            redirectTo: window.location.origin + window.location.pathname.replace('admin.html', 'login.html')
        }).then(function (r) {
            if (r.error) { alert('发送失败：' + r.error.message); return; }
            alert('✅ 密码重置邮件已发送至 ' + email);
        });
    };

    // 删除用户
    window.deleteUser = function (id, email) {
        if (!confirm('确定要删除用户 ' + email + '？\n删除后该用户将无法登录系统。')) return;
        db.from('user_profiles').delete().eq('id', id).then(function (r) {
            if (r.error) { alert('删除失败：' + r.error.message); return; }
            loadUserManagement();
        });
    };

    window.handleLogout = function () {
        if (db) db.auth.signOut().then(function () { location.href = 'admin-login.html'; });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else { init(); }
})();
