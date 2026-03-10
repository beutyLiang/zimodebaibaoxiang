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

        // 核心解读
        html += '<div class="info-card"><h3>' + r.emoji + ' 你的五行体质解读</h3>';
        html += '<p>' + r.description + '</p>';
        if (subEl !== topEl) {
            html += '<p style="margin-top:12px; padding:10px 14px; background:' + ELEMENT_RESULTS[subEl].colorSoft + '; border-radius:10px; font-size:13px;">';
            html += '<strong>副行·' + ELEMENT_RESULTS[subEl].name + '：</strong>' + SUB_ELEMENT_DESC[subEl];
            html += '</p>';
        }
        html += '</div>';

        // 五行关联
        html += '<div class="info-card"><h3>🔗 五行关联地图</h3>';
        html += '<div class="tag-list">';
        html += '  <span class="tag-item" style="background:' + r.colorSoft + ';color:' + r.color + ';">脏腑：' + r.organ + '</span>';
        html += '  <span class="tag-item" style="background:' + r.colorSoft + ';color:' + r.color + ';">情绪：' + r.emotion + '</span>';
        html += '  <span class="tag-item" style="background:' + r.colorSoft + ';color:' + r.color + ';">季节：' + r.season + '</span>';
        html += '  <span class="tag-item" style="background:' + r.colorSoft + ';color:' + r.color + ';">时辰：' + r.time + '</span>';
        html += '</div>';
        html += '<p style="margin-top:12px; font-size:13px; color:var(--text-light);">肠道路径：' + r.gutLink + '</p>';
        html += '</div>';

        // 调养建议
        html += '<div class="info-card"><h3>🌿 初序为你定制的调养建议</h3><ul>';
        r.tips.forEach(function (tip) {
            html += '<li>' + tip + '</li>';
        });
        html += '</ul></div>';

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

        // 柱状图动画
        setTimeout(function () {
            document.querySelectorAll('.bar-fill').forEach(function (bar) {
                bar.style.width = bar.getAttribute('data-target') + '%';
            });
        }, 300);

        // 绑定按钮
        document.getElementById('btn-share').addEventListener('click', handleShare);
        document.getElementById('btn-retest').addEventListener('click', handleRetest);
        document.getElementById('btn-invite').addEventListener('click', handleInvite);
    }

    // ---- 分享 ----
    function handleShare() {
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
        document.getElementById('btn-start').addEventListener('click', function () {
            showPage('chat');
            processStep('welcome');
        });

        var base = 3281;
        var extra = Math.floor(Math.random() * 500);
        document.getElementById('test-count').textContent = (base + extra).toLocaleString();
    }

    init();
})();
