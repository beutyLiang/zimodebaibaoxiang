/**
 * 初序 · 五行人格测试 V2.0 — 对话式引擎
 * 功能：聊天气泡渲染 / 打字指示器 / 选项交互 / 评分 / 结果卡片 / 分享
 */
(function () {
    'use strict';

    var pages = {
        home: document.getElementById('page-home'),
        chat: document.getElementById('page-chat'),
        result: document.getElementById('page-result')
    };
    var chatBody = document.getElementById('chat-body');
    var chatInput = document.getElementById('chat-input');
    var progressFill = document.getElementById('chat-progress-fill');
    var resultBox = document.getElementById('result-content');

    var scores = { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 };
    var currentStep = 0;
    var totalSteps = CHAT_FLOW.filter(function (s) { return s.type === 'question'; }).length;

    // ---- 页面切换 ----
    function showPage(name) {
        Object.values(pages).forEach(function (p) { p.classList.remove('active'); });
        pages[name].classList.add('active');
        if (name === 'chat') { window.scrollTo(0, 0); }
    }

    // ---- 聊天气泡 ----
    function addBotBubble(text, showAvatar) {
        return new Promise(function (resolve) {
            // 先显示打字指示器
            var typingRow = document.createElement('div');
            typingRow.className = 'bubble-row bot';
            if (showAvatar) {
                var av = document.createElement('div');
                av.className = 'bubble-avatar';
                av.textContent = '初';
                typingRow.appendChild(av);
            } else {
                var sp = document.createElement('div');
                sp.style.width = '40px';
                sp.style.flexShrink = '0';
                typingRow.appendChild(sp);
            }
            var typingBubble = document.createElement('div');
            typingBubble.className = 'bubble bot-bubble';
            typingBubble.innerHTML = '<div class="typing-indicator"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div>';
            typingRow.appendChild(typingBubble);
            chatBody.appendChild(typingRow);
            scrollToBottom();

            // 延迟后替换为真实内容
            var delay = 400 + Math.min(text.length * 25, 1200);
            setTimeout(function () {
                typingBubble.innerHTML = '';
                typingBubble.textContent = text;
                scrollToBottom();
                resolve();
            }, delay);
        });
    }

    function addUserBubble(text) {
        var row = document.createElement('div');
        row.className = 'bubble-row user';
        var bubble = document.createElement('div');
        bubble.className = 'bubble user-bubble';
        bubble.textContent = text;
        row.appendChild(bubble);
        chatBody.appendChild(row);
        scrollToBottom();
    }

    function addDimensionTag(text) {
        var row = document.createElement('div');
        row.className = 'bubble-row bot';
        var sp = document.createElement('div');
        sp.style.width = '40px';
        sp.style.flexShrink = '0';
        row.appendChild(sp);
        var tag = document.createElement('div');
        tag.className = 'dimension-tag';
        tag.textContent = text;
        row.appendChild(tag);
        chatBody.appendChild(row);
    }

    function adjustChatPadding() {
        var inputH = chatInput.offsetHeight || 120;
        chatBody.style.paddingBottom = (inputH + 24) + 'px';
    }

    function scrollToBottom() {
        adjustChatPadding();
        setTimeout(function () {
            chatBody.scrollTop = chatBody.scrollHeight;
        }, 60);
    }

    // ---- 显示选项按钮 ----
    function showOptions(step) {
        chatInput.innerHTML = '';
        var container = document.createElement('div');
        container.className = 'chat-options';

        if (step.type === 'intro') {
            var btn = document.createElement('button');
            btn.className = 'chat-next-btn';
            btn.textContent = step.nextBtn;
            btn.addEventListener('click', function () {
                chatInput.innerHTML = '';
                processStep(step.next);
            });
            container.appendChild(btn);
        } else if (step.type === 'question') {
            step.options.forEach(function (opt) {
                var btn = document.createElement('button');
                btn.className = 'chat-option-btn';
                btn.textContent = opt.text;
                btn.addEventListener('click', function () {
                    handleAnswer(opt, btn, step);
                });
                container.appendChild(btn);
            });
        }

        chatInput.appendChild(container);

        // 等待渲染完成后调整间距并滚动
        requestAnimationFrame(function () {
            adjustChatPadding();
            scrollToBottom();
        });
    }

    // ---- 处理答案 ----
    function handleAnswer(opt, btn, step) {
        // 标记选中
        btn.classList.add('selected');
        var allBtns = chatInput.querySelectorAll('.chat-option-btn');
        allBtns.forEach(function (b) { b.style.pointerEvents = 'none'; });

        // 记分
        scores[opt.element] += opt.score;

        // 显示用户气泡
        addUserBubble(opt.text);

        // 更新进度
        currentStep++;
        var pct = (currentStep / totalSteps) * 100;
        progressFill.style.width = pct + '%';

        // 延迟后进入下一步
        setTimeout(function () {
            chatInput.innerHTML = '';

            if (step.next === 'result') {
                showAnalyzing();
            } else {
                // 随机过渡消息
                var trans = TRANSITION_MESSAGES[Math.floor(Math.random() * TRANSITION_MESSAGES.length)];
                addBotBubble(trans, false).then(function () {
                    processStep(step.next);
                });
            }
        }, 350);
    }

    // ---- 处理步骤 ----
    function processStep(stepId) {
        var step = CHAT_FLOW.find(function (s) { return s.id === stepId; });
        if (!step) return;

        if (step.type === 'intro') {
            // 逐条发送 intro 消息
            var chain = Promise.resolve();
            step.messages.forEach(function (msg, i) {
                chain = chain.then(function () {
                    return addBotBubble(msg, i === 0);
                });
            });
            chain.then(function () {
                showOptions(step);
            });
        } else if (step.type === 'question') {
            // 显示维度标签 + 问题
            if (step.dimension) {
                addDimensionTag(step.dimension);
            }
            addBotBubble(step.message, true).then(function () {
                showOptions(step);
            });
        }
    }

    // ---- 分析中 ----
    function showAnalyzing() {
        chatInput.innerHTML = '';
        addBotBubble('好的，你的回答我都记下了 📝', true)
            .then(function () { return addBotBubble('让我用五行来解读你的体质…', false); })
            .then(function () { return addBotBubble('分析完成！✨ 你的五行人格结果出来了~', false); })
            .then(function () {
                var btn = document.createElement('button');
                btn.className = 'chat-next-btn';
                btn.textContent = '查看我的五行人格 →';
                btn.addEventListener('click', function () { renderResult(); });
                chatInput.appendChild(btn);
            });
    }

    // ---- 渲染结果 ----
    function renderResult() {
        var sorted = Object.keys(scores).sort(function (a, b) { return scores[b] - scores[a]; });
        var topEl = sorted[0];
        var subEl = sorted[1];
        var r = ELEMENT_RESULTS[topEl];
        var maxScore = 0;
        sorted.forEach(function (k) { maxScore = Math.max(maxScore, scores[k]); });

        var html = '';

        // 主结果卡
        html += '<div class="result-hero" style="background:' + r.colorSoft + '; color:' + r.color + ';">';
        html += '  <div class="result-emoji">' + r.emoji + '</div>';
        html += '  <div class="result-type" style="color:' + r.color + ';">' + r.fullName + '</div>';
        html += '  <div class="result-title-sub">' + r.title + '</div>';
        html += '</div>';

        // 五行分布
        html += '<div class="info-card"><h3>📊 你的五行能量分布</h3>';
        sorted.forEach(function (key) {
            var pct = maxScore > 0 ? Math.round((scores[key] / maxScore) * 100) : 0;
            var c = ELEMENT_RESULTS[key].color;
            html += '<div class="bar-row">';
            html += '  <div class="bar-label"><span>' + ELEMENT_RESULTS[key].emoji + ' ' + ELEMENT_RESULTS[key].name + '行</span><span style="color:' + c + ';">' + scores[key] + '分</span></div>';
            html += '  <div class="bar-track"><div class="bar-fill" style="background:' + c + ';" data-target="' + pct + '"></div></div>';
            html += '</div>';
        });
        html += '</div>';

        // ========== 八卦圆盘区域 ==========
        var foods = FOOD_THERAPY[topEl];
        var ds = getTodaySign(topEl);
        var qas = ELEMENT_QA[topEl];

        // 准备面板数据
        var WHEEL_DATA = {
            'interpret': {
                title: r.emoji + ' 五行体质解读',
                html: '<h2>你的五行体质解读</h2><p>' + r.description + '</p>' +
                    (subEl !== topEl ? '<p style="margin-top:12px; padding:10px 14px; background:rgba(30,36,38,0.05); border-radius:10px; font-size:13px;"><strong>副行·' + ELEMENT_RESULTS[subEl].name + '：</strong>' + SUB_ELEMENT_DESC[subEl] + '</p>' : '')
            },
            'wuxing-map': {
                title: '🔗 五行地图',
                html: '<h2>五行地图</h2>' +
                    '<ul><li><span class="highlight">脏腑</span>：' + r.organ + '</li>' +
                    '<li><span class="highlight">情绪</span>：' + r.emotion + '</li>' +
                    '<li><span class="highlight">季节</span>：' + r.season + '</li>' +
                    '<li><span class="highlight">时辰</span>：' + r.time + '</li></ul>' +
                    '<p>肠道路径：' + r.gutLink + '</p>'
            },
            'health-tips': {
                title: '🌿 调养建议',
                html: '<h2>初序为你定制的调养建议</h2><ul>' + r.tips.map(function (t) { return '<li>' + t + '</li>'; }).join('') + '</ul>'
            },
            'daily-sign': {
                title: r.emoji + ' 今日' + r.name + '日',
                html: '<h2>' + r.emoji + ' 今日' + r.name + '日</h2>' +
                    '<p>' + ds.dateStr + ' 周' + ds.weekday + '</p>' +
                    '<p style="margin:12px 0; font-size:0.95rem;">' + ds.sign.tip + '</p>' +
                    '<p>⏰ ' + ds.sign.time + '</p>' +
                    '<p>🍵 推荐：' + ds.sign.food + '</p>'
            },
            'wuxing-diet': {
                title: '🍵 五行食方',
                html: '<h2>你的五行食养方</h2><p>根据你的' + r.fullName + '体质，初序为你推荐：</p>' +
                    foods.map(function (f) {
                        return '<div style="padding:10px 0; border-bottom:1px solid rgba(30,36,38,0.08);"><p><span class="highlight">' + f.emoji + ' ' + f.name + '</span> — ' + f.effect + '</p><p style="font-size:0.8rem;">材料：' + f.ingredients + '<br>做法：' + f.howTo + '</p></div>';
                    }).join('')
            },
            'faq': {
                title: '❓ 常见疑问',
                html: '<h2>' + r.fullName + '常见疑问</h2>' +
                    qas.map(function (q) {
                        return '<p><strong>Q：' + q.q + '</strong></p><p>A：' + q.a + '</p>';
                    }).join('')
            }
        };

        var sectorLabels = [r.emoji + ' 体质解读', '🔗 五行地图', '🌿 调养建议', r.emoji + ' 今日' + r.name + '日', '🍵 五行食方', '❓ 常见问题'];
        var sectorKeys = ['interpret', 'wuxing-map', 'health-tips', 'daily-sign', 'wuxing-diet', 'faq'];
        var activeColor = r.color;

        html += '<p class="wheel-hint">✦ 转动圆盘，探索你的五行世界 ✦</p>';
        html += '<div class="wheel-section" id="wheel-area">';
        // 八卦外环
        html += '<div class="trigram-ring" id="trigramRing">';
        var trigrams = ['☰', '☱', '☲', '☳', '☴', '☵', '☶', '☷'];
        trigrams.forEach(function (t, i) { html += '<span class="trigram" style="--a:' + (i * 45) + 'deg">' + t + '</span>'; });
        html += '</div>';
        html += '<div class="ring ring-outer"></div><div class="ring ring-inner"></div>';

        // SVG 圆盘
        html += '<div class="wheel" id="wheel">';
        html += '<svg class="wheel-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">';
        var paths = [
            'M 100 100 L 100 5 A 95 95 0 0 1 182.3 52.5 Z',
            'M 100 100 L 182.3 52.5 A 95 95 0 0 1 182.3 147.5 Z',
            'M 100 100 L 182.3 147.5 A 95 95 0 0 1 100 195 Z',
            'M 100 100 L 100 195 A 95 95 0 0 1 17.7 147.5 Z',
            'M 100 100 L 17.7 147.5 A 95 95 0 0 1 17.7 52.5 Z',
            'M 100 100 L 17.7 52.5 A 95 95 0 0 1 100 5 Z'
        ];
        var dividers = [
            [100, 100, 100, 5], [100, 100, 182.3, 52.5], [100, 100, 182.3, 147.5],
            [100, 100, 100, 195], [100, 100, 17.7, 147.5], [100, 100, 17.7, 52.5]
        ];
        paths.forEach(function (p, i) {
            html += '<g class="wheel-sector" data-module="' + sectorKeys[i] + '" data-index="' + i + '" style="--sector-active-color:' + activeColor + ';">';
            html += '<path class="sector-path" d="' + p + '"/>';
            html += '<line class="sector-divider" x1="' + dividers[i][0] + '" y1="' + dividers[i][1] + '" x2="' + dividers[i][2] + '" y2="' + dividers[i][3] + '"/>';
            html += '</g>';
        });
        html += '<g id="textGroup">';
        sectorLabels.forEach(function (label, i) {
            html += '<text class="sector-text" data-index="' + i + '">' + label + '</text>';
        });
        html += '</g></svg>';

        // 太极中心（SVG 版本）
        html += '<div class="wheel-center">';
        html += '<svg class="taiji-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">';
        html += '<circle cx="50" cy="50" r="48" fill="#1e2426" stroke="rgba(30,36,38,0.3)" stroke-width="2"/>';
        html += '<path d="M 50 2 A 48 48 0 0 1 50 98 A 24 24 0 0 1 50 50 A 24 24 0 0 0 50 2" fill="#f5f0e6"/>';
        html += '<circle cx="50" cy="26" r="6" fill="#1e2426"/>';
        html += '<circle cx="50" cy="74" r="6" fill="#f5f0e6"/>';
        html += '</svg>';
        html += '</div>';
        html += '</div>'; // .wheel

        // 指示器
        html += '<div class="wheel-indicator" id="wheelIndicator"><svg viewBox="0 0 24 16" width="24" height="16"><polygon points="12,16 0,0 24,0" fill="currentColor"/></svg></div>';
        html += '</div>'; // .wheel-section

        // 内嵌展开区域（替代弹出层）
        html += '<div class="wheel-expand" id="wheelExpand" style="display:none;">';
        html += '  <div class="wheel-expand-header"><span class="wheel-expand-title" id="expandTitle"></span>';
        html += '    <button class="wheel-expand-close" id="expandClose">✕</button></div>';
        html += '  <div class="wheel-expand-body" id="expandBody"></div>';
        html += '</div>';

        // ========== ④ 每日打卡 ==========
        var checkinData = JSON.parse(localStorage.getItem('chuxu_checkins') || '[]');
        var todayStr = new Date().toISOString().split('T')[0];
        var todayChecked = checkinData.some(function (c) { return c.date === todayStr; });
        var streak = 0;
        for (var d = 0; d < 30; d++) {
            var checkDate = new Date();
            checkDate.setDate(checkDate.getDate() - d);
            var dStr = checkDate.toISOString().split('T')[0];
            if (checkinData.some(function (c) { return c.date === dStr; })) { streak++; } else { break; }
        }

        html += '<div class="info-card checkin-section">';
        html += '  <h3>✅ 每日打卡</h3>';
        if (todayChecked) {
            html += '  <div class="checkin-done">';
            html += '    <div class="checkin-streak">🔥 已连续打卡 ' + streak + ' 天</div>';
            html += '    <p style="color:var(--text-light); font-size:13px;">今天已打卡，明天再来哦～</p>';
            html += '  </div>';
        } else {
            html += '  <p style="font-size:13px; color:var(--text-light); margin-bottom:12px;">记录今天的身体状态，初序为你五行解读</p>';
            if (streak > 0) html += '  <div class="checkin-streak">🔥 已连续打卡 ' + streak + ' 天</div>';
            html += '  <div class="checkin-form">';
            html += '    <div class="checkin-row"><label>情绪状态</label><div class="checkin-stars" data-field="mood">☆☆☆☆☆</div></div>';
            html += '    <div class="checkin-row"><label>睡眠质量</label><div class="checkin-stars" data-field="sleep">☆☆☆☆☆</div></div>';
            html += '    <div class="checkin-row"><label>肠道舒适</label><div class="checkin-stars" data-field="gut">☆☆☆☆☆</div></div>';
            html += '    <div class="checkin-row"><label>一句话记录</label><input type="text" id="checkin-note" class="checkin-input" placeholder="今天身体怎么样？" maxlength="50"></div>';
            html += '    <button class="btn-checkin" id="btn-checkin">提交打卡 ✅</button>';
            html += '  </div>';
        }

        // 打卡日历（最近14天）
        html += '  <div class="checkin-calendar">';
        html += '    <div class="cal-title">最近14天</div>';
        html += '    <div class="cal-grid">';
        for (var j = 13; j >= 0; j--) {
            var calDate = new Date();
            calDate.setDate(calDate.getDate() - j);
            var calStr = calDate.toISOString().split('T')[0];
            var checked = checkinData.some(function (c) { return c.date === calStr; });
            html += '<div class="cal-day ' + (checked ? 'cal-checked' : '') + '" title="' + calStr + '">' + calDate.getDate() + '</div>';
        }
        html += '    </div>';
        html += '  </div>';
        html += '</div>';

        // 按钮
        html += '<button class="btn-share btn-share-primary" id="btn-share">📤 分享我的五行人格</button>';
        html += '<button class="btn-share btn-retest" id="btn-retest">🔄 重新测试</button>';
        html += '<button class="btn-share btn-retest" id="btn-invite" style="margin-top:6px;">💬 邀请闺蜜来测</button>';

        // 社群引导
        html += '<div class="community-section">';
        html += '  <h3>🌱 想获得更深入的五行调养方案？</h3>';
        html += '  <p>加入「初序」社群，每日推送你的五行节律提醒、专属体质调养内容</p>';
        html += '  <div class="qr-row">';
        html += '    <div class="qr-box"><div class="qr-placeholder">请替换为<br>公众号二维码</div><div class="qr-label">关注初序</div></div>';
        html += '    <div class="qr-box"><div class="qr-placeholder">请替换为<br>社群二维码</div><div class="qr-label">加入社群</div></div>';
        html += '  </div>';
        html += '  <div class="benefit-tags">';
        html += '    <span class="benefit-tag">📅 五行节律日签</span>';
        html += '    <span class="benefit-tag">💬 体质专属答疑</span>';
        html += '    <span class="benefit-tag">🍵 五行食养方</span>';
        html += '    <span class="benefit-tag">✅ 每日打卡</span>';
        html += '  </div>';
        html += '</div>';

        html += '<div class="brand-footer">初序 · 读懂身体说的话<br>chuxu.app</div>';

        resultBox.innerHTML = html;
        showPage('result');
        window.scrollTo({ top: 0 });

        // 保存用户体质到云端 + localStorage
        ChuxuDB.saveQuizResult(topEl, subEl, scores);
        ChuxuDB.trackEvent('test_complete', { main: topEl, sub: subEl });

        // 柱状图动画
        setTimeout(function () {
            document.querySelectorAll('.bar-fill').forEach(function (bar) {
                bar.style.width = bar.getAttribute('data-target') + '%';
            });
        }, 300);

        // ========== 八卦圆盘交互（内嵌展开版）==========
        setTimeout(function () {
            var WHEEL_EL = document.getElementById('wheel');
            var EXPAND = document.getElementById('wheelExpand');
            var EXPAND_TITLE = document.getElementById('expandTitle');
            var EXPAND_BODY = document.getElementById('expandBody');
            var EXPAND_CLOSE = document.getElementById('expandClose');
            var INDICATOR = document.getElementById('wheelIndicator');
            if (!WHEEL_EL) return;

            var N = 6, SLICE = 60, START_ANGLE = -90, BOTTOM = 90, R_TEXT = 62, CX = 100, CY = 100;
            var FRICTION = 0.96, MIN_V = 0.15, V_MULT = 0.45;
            var wRot = 0, wVel = 0, wLastAngle = 0, wLastTime = 0;
            var wDragging = false, wMoved = false, wOpening = false, wRaf = null;
            var currentModule = null;

            var textEls = WHEEL_EL.querySelectorAll('.sector-text');

            function layoutTexts() {
                textEls.forEach(function (t) {
                    var i = Number(t.dataset.index);
                    var midDeg = START_ANGLE + i * SLICE + SLICE / 2;
                    var rad = (midDeg * Math.PI) / 180;
                    var x = CX + R_TEXT * Math.cos(rad);
                    var y = CY + R_TEXT * Math.sin(rad);
                    t.setAttribute('x', x.toFixed(1));
                    t.setAttribute('y', y.toFixed(1));
                    t._cx = x; t._cy = y;
                });
                updateTextRot();
            }

            function updateTextRot() {
                textEls.forEach(function (t) {
                    t.setAttribute('transform', 'rotate(' + (-wRot) + ' ' + t._cx + ' ' + t._cy + ')');
                });
            }

            function getAngle(e) {
                var p = e.touches ? e.touches[0] : e;
                var rect = WHEEL_EL.getBoundingClientRect();
                return Math.atan2(p.clientY - rect.top - rect.height / 2, p.clientX - rect.left - rect.width / 2);
            }

            function startDrag(e) {
                if (e.target.closest && e.target.closest('.wheel-center')) return;
                wDragging = true; wMoved = false;
                wLastTime = Date.now();
                wLastAngle = getAngle(e);
            }

            function onDrag(e) {
                if (!wDragging) return;
                wMoved = true; e.preventDefault();
                var now = Date.now();
                var a = getAngle(e);
                var da = (a - wLastAngle) * (180 / Math.PI);
                var dt = (now - wLastTime) / 1000 || 0.001;
                wVel = (da / dt) * V_MULT;
                wLastAngle = a; wLastTime = now;
                wRot += da;
                applyRot();
            }

            function endDrag() {
                wDragging = false;
                if (wRaf) cancelAnimationFrame(wRaf);
                wRaf = requestAnimationFrame(inertia);
            }

            function inertia() {
                wVel *= FRICTION;
                if (Math.abs(wVel) < MIN_V) { wVel = 0; wRaf = null; return; }
                wRot += wVel;
                applyRot();
                wRaf = requestAnimationFrame(inertia);
            }

            function applyRot() {
                WHEEL_EL.style.transform = 'rotate(' + wRot + 'deg)';
                updateTextRot();
            }

            WHEEL_EL.addEventListener('touchstart', startDrag, { passive: true });
            WHEEL_EL.addEventListener('touchmove', onDrag, { passive: false });
            WHEEL_EL.addEventListener('touchend', endDrag);
            WHEEL_EL.addEventListener('mousedown', startDrag);
            document.addEventListener('mousemove', function (e) { if (wDragging && e.buttons === 1) onDrag(e); });
            document.addEventListener('mouseup', endDrag);

            function norm(d) { d %= 360; if (d < -180) d += 360; if (d > 180) d -= 360; return d; }

            function spinToBottom(idx) {
                var cur = ((wRot % 360) + 360) % 360;
                var mid = START_ANGLE + idx * SLICE + SLICE / 2;
                var delta = norm(BOTTOM - (mid + cur));
                var target = wRot + delta;
                return new Promise(function (resolve) {
                    WHEEL_EL.style.transition = 'transform 0.65s cubic-bezier(0.16,1,0.3,1)';
                    wRot = target; wVel = 0;
                    if (wRaf) { cancelAnimationFrame(wRaf); wRaf = null; }
                    applyRot();
                    setTimeout(function () { WHEEL_EL.style.transition = ''; resolve(); }, 700);
                });
            }

            function clearSel() {
                WHEEL_EL.querySelectorAll('.wheel-sector').forEach(function (s) { s.classList.remove('selected'); });
            }

            // 内嵌展开（不是弹出层）
            function openInline(moduleId) {
                var d = WHEEL_DATA[moduleId];
                if (!d) return;
                currentModule = moduleId;
                EXPAND_TITLE.textContent = d.title;
                EXPAND_BODY.innerHTML = d.html;
                EXPAND.style.display = 'block';
                EXPAND.style.borderColor = activeColor + '44';
            }

            function closeInline() {
                EXPAND.style.display = 'none';
                EXPAND_BODY.innerHTML = '';
                currentModule = null;
                clearSel();
            }

            EXPAND_CLOSE.addEventListener('click', closeInline);

            function handleSectorClick(sector) {
                if (!sector || !sector.dataset.module || wOpening) return;
                var moduleId = sector.dataset.module;
                // 点击同一个扇形则收起
                if (currentModule === moduleId) { closeInline(); return; }
                wOpening = true;
                clearSel();
                sector.classList.add('selected');
                var idx = Number(sector.dataset.index);
                spinToBottom(idx).then(function () {
                    openInline(moduleId);
                    wOpening = false;
                });
            }

            WHEEL_EL.addEventListener('click', function (e) {
                var sector = e.target.closest ? e.target.closest('.wheel-sector') : null;
                if (sector && sector.dataset.module) {
                    e.preventDefault(); e.stopPropagation();
                    handleSectorClick(sector);
                }
            });

            WHEEL_EL.addEventListener('touchend', function (e) {
                if (wMoved) return;
                var t = e.changedTouches[0];
                var el = document.elementFromPoint(t.clientX, t.clientY);
                var sector = el && el.closest ? el.closest('.wheel-sector') : null;
                if (sector && sector.dataset.module) {
                    handleSectorClick(sector);
                }
            }, { passive: true });

            layoutTexts();
            applyRot();
            if (INDICATOR) INDICATOR.style.color = activeColor;
        }, 500);
        document.getElementById('btn-share').addEventListener('click', handleShare);
        document.getElementById('btn-retest').addEventListener('click', handleRetest);
        document.getElementById('btn-invite').addEventListener('click', handleInvite);

        // 绑定打卡星星
        document.querySelectorAll('.checkin-stars').forEach(function (starEl) {
            starEl.addEventListener('click', function (e) {
                var rect = starEl.getBoundingClientRect();
                var x = e.clientX - rect.left;
                var rating = Math.min(5, Math.max(1, Math.ceil(x / (rect.width / 5))));
                starEl.setAttribute('data-rating', rating);
                var stars = '';
                for (var s = 1; s <= 5; s++) stars += (s <= rating ? '★' : '☆');
                starEl.textContent = stars;
                starEl.style.color = WUXING_COLORS[topEl];
            });
        });

        // 绑定打卡提交
        var checkinBtn = document.getElementById('btn-checkin');
        if (checkinBtn) {
            checkinBtn.addEventListener('click', function () {
                // 渐进式认证：打卡需要登录
                if (typeof ChuxuAuth !== 'undefined' && !ChuxuAuth.isLoggedIn()) {
                    showToast('请先登录后再打卡哦 🔐');
                    setTimeout(function () { location.href = 'login.html'; }, 1200);
                    return;
                }
                var mood = parseInt(document.querySelector('[data-field="mood"]').getAttribute('data-rating') || '0');
                var sleep = parseInt(document.querySelector('[data-field="sleep"]').getAttribute('data-rating') || '0');
                var gut = parseInt(document.querySelector('[data-field="gut"]').getAttribute('data-rating') || '0');
                if (mood === 0 || sleep === 0 || gut === 0) { showToast('请先给三项评分哦 ⭐'); return; }
                var note = (document.getElementById('checkin-note') || {}).value || '';
                var avg = (mood + sleep + gut) / 3;
                var fb = CHECKIN_FEEDBACK[topEl];
                var fbText = avg >= 4 ? fb.good : (avg >= 2.5 ? fb.mid : fb.low);
                fbText = fbText[Math.floor(Math.random() * fbText.length)];
                ChuxuDB.saveCheckin(topEl, mood, sleep, gut, note);
                var section = document.querySelector('.checkin-section');
                if (section) {
                    section.innerHTML = '<h3>✅ 每日打卡</h3>' +
                        '<div class="checkin-done">' +
                        '<div class="checkin-streak">🔥 已连续打卡 ' + (streak + 1) + ' 天</div>' +
                        '<div class="checkin-feedback" style="background:' + WUXING_COLORS[topEl] + '15; border-left:3px solid ' + WUXING_COLORS[topEl] + '; padding:12px 16px; border-radius:8px; margin:12px 0; font-size:14px;">' + fbText + '</div>' +
                        '<p style="color:var(--text-light); font-size:13px;">明天再来打卡哦～</p>' +
                        '</div>';
                }
                showToast('打卡成功！' + fbText);
            });
        }
    }

    // ---- 分享 ----
    function handleShare() {
        ChuxuDB.trackEvent('share_click');
        var sorted = Object.keys(scores).sort(function (a, b) { return scores[b] - scores[a]; });
        var r = ELEMENT_RESULTS[sorted[0]];
        var text = '🌿 我在「初序」五行人格测试中测出了 ' + r.fullName + '！\n\n' +
            r.emoji + ' ' + r.title + '\n' +
            '对应脏腑：' + r.organ + '\n' +
            '主导情绪：' + r.emotion + '\n\n' +
            '你是什么五行人格？来测测👇\n' +
            window.location.href;
        if (navigator.share) {
            navigator.share({ title: '初序 · 五行人格测试', text: text, url: window.location.href }).catch(function () { });
        } else {
            copyText(text);
        }
    }

    function handleInvite() {
        var text = '✨ 我刚测了一个超准的五行人格测试，发现我是' + ELEMENT_RESULTS[Object.keys(scores).sort(function (a, b) { return scores[b] - scores[a]; })[0]].fullName + '！你是什么行？快来测👇\n' + window.location.href;
        if (navigator.share) {
            navigator.share({ title: '初序 · 测测你的五行人格', text: text }).catch(function () { });
        } else {
            copyText(text);
        }
    }

    function copyText(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(function () { showToast('✅ 已复制，快去分享给闺蜜吧！'); });
        } else {
            var ta = document.createElement('textarea');
            ta.value = text;
            ta.style.cssText = 'position:fixed;left:-9999px;';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            showToast('✅ 已复制，快去分享给闺蜜吧！');
        }
    }

    function showToast(msg) {
        var t = document.createElement('div');
        t.className = 'toast';
        t.textContent = msg;
        document.body.appendChild(t);
        requestAnimationFrame(function () { t.style.opacity = '1'; });
        setTimeout(function () {
            t.style.opacity = '0';
            setTimeout(function () { document.body.removeChild(t); }, 300);
        }, 2500);
    }

    // ---- 重测 ----
    function handleRetest() {
        scores = { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 };
        currentStep = 0;
        progressFill.style.width = '0%';
        chatBody.innerHTML = '';
        chatInput.innerHTML = '';
        resultBox.innerHTML = '';
        showPage('home');
    }

    // ---- 初始化 ----
    function init() {
        ChuxuDB.trackEvent('page_view');
        document.getElementById('btn-start').addEventListener('click', function () {
            ChuxuDB.trackEvent('test_start');
            showPage('chat');
            processStep('welcome');
        });

        var base = 3281;
        var extra = Math.floor(Math.random() * 500);
        document.getElementById('test-count').textContent = (base + extra).toLocaleString();
    }

    init();
})();
