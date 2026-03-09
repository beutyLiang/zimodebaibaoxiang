/**
 * 五行肠养 · 体质测试 — 交互逻辑 V2.0
 * 功能：页面导航 / 答题流程 / 计分引擎 / 结果渲染 / 社群导流
 */

(function () {
    'use strict';

    // ---- DOM 引用 ----
    const pages = {
        home: document.getElementById('page-home'),
        quiz: document.getElementById('page-quiz'),
        loading: document.getElementById('page-loading'),
        result: document.getElementById('page-result')
    };

    const els = {
        btnStart: document.getElementById('btn-start'),
        progressFill: document.getElementById('progress-fill'),
        progressText: document.getElementById('progress-text'),
        dimension: document.getElementById('quiz-dimension'),
        question: document.getElementById('quiz-question'),
        options: document.getElementById('quiz-options'),
        resultBox: document.getElementById('result-content'),
        totalTests: document.getElementById('total-tests'),
        starField: document.getElementById('star-field')
    };

    // ---- 状态 ----
    let currentIndex = 0;
    const answers = [];
    const totalQuestions = QUIZ_DATA.length;

    // ---- 五行中文名 ----
    const ELEMENT_NAMES = { wood: '木', fire: '火', earth: '土', metal: '金', water: '水' };

    // ======== 星点背景 ========
    function createStarField() {
        if (!els.starField) return;
        var count = 35;
        for (var i = 0; i < count; i++) {
            var star = document.createElement('div');
            star.className = 'star';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.animationDelay = (Math.random() * 5).toFixed(2) + 's';
            star.style.animationDuration = (2 + Math.random() * 4).toFixed(2) + 's';
            var size = 1 + Math.random() * 2;
            star.style.width = size + 'px';
            star.style.height = size + 'px';
            els.starField.appendChild(star);
        }
    }

    // ======== 页面切换 ========
    function showPage(name) {
        Object.values(pages).forEach(function (p) { p.classList.remove('active'); });
        pages[name].classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // ======== 进度条 ========
    function updateProgress() {
        var pct = ((currentIndex + 1) / totalQuestions) * 100;
        els.progressFill.style.width = pct + '%';
        els.progressText.textContent = (currentIndex + 1) + ' / ' + totalQuestions;

        // 五行渐变色进度
        var colors = ['#3DA56E', '#C9544D', '#C6983A', '#3A7AB5', '#A0A0A8'];
        var ci = Math.floor((pct / 100) * (colors.length - 1));
        var c1 = colors[Math.min(ci, colors.length - 1)];
        var c2 = colors[Math.min(ci + 1, colors.length - 1)];
        els.progressFill.style.background = 'linear-gradient(90deg, ' + c1 + ', ' + c2 + ')';
    }

    // ======== 渲染题目 ========
    function renderQuestion() {
        var q = QUIZ_DATA[currentIndex];

        els.dimension.textContent = q.dimensionLabel;
        els.dimension.className = 'quiz-dimension ' + q.dimension;
        els.question.textContent = q.question;

        els.options.innerHTML = '';
        q.options.forEach(function (opt, i) {
            var btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = opt.text;
            btn.setAttribute('id', 'option-' + currentIndex + '-' + i);
            btn.addEventListener('click', function () { selectOption(opt.element, btn); });
            els.options.appendChild(btn);
        });

        updateProgress();

        // 入场动画
        var body = els.options.parentElement;
        body.style.animation = 'none';
        void body.offsetHeight;
        body.style.animation = 'pageEnter 0.45s cubic-bezier(0.22,1,0.36,1)';
    }

    // ======== 选项点击 ========
    function selectOption(element, btn) {
        btn.classList.add('selected');

        var allBtns = els.options.querySelectorAll('.option-btn');
        allBtns.forEach(function (b) { b.style.pointerEvents = 'none'; });

        answers[currentIndex] = element;

        setTimeout(function () {
            currentIndex++;
            if (currentIndex < totalQuestions) {
                renderQuestion();
            } else {
                showLoading();
            }
        }, 380);
    }

    // ======== 加载过渡 ========
    function showLoading() {
        showPage('loading');
        setTimeout(function () { showResult(); }, 3000);
    }

    // ======== 计分引擎 ========
    function calcScores() {
        var scores = { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 };
        answers.forEach(function (el) {
            if (scores.hasOwnProperty(el)) scores[el]++;
        });
        return scores;
    }

    function getTopElement(scores) {
        var max = -1, top = 'earth';
        Object.keys(scores).forEach(function (k) {
            if (scores[k] > max) { max = scores[k]; top = k; }
        });
        return top;
    }

    // ======== 渲染结果 ========
    function showResult() {
        var scores = calcScores();
        var topEl = getTopElement(scores);
        var r = ELEMENT_RESULTS[topEl];

        var sorted = Object.keys(scores).sort(function (a, b) {
            return scores[b] - scores[a];
        });

        var html = '';

        // ---- 顶部：体质图标 + 标题 ----
        html += '<div class="result-header">';
        html += '  <div class="result-element-icon" style="color:' + r.color + '; background:' + r.color + '18; border: 2px solid ' + r.color + '44;">' + r.name + '</div>';
        html += '  <h1 class="result-title" style="color:' + r.color + ';">' + r.fullName + '</h1>';
        html += '  <p class="result-subtitle">' + r.type + '</p>';
        html += '</div>';

        // ---- 核心解读 ----
        html += '<div class="result-card">';
        html += '  <h3>📖 你的五行肠道体质解读</h3>';
        html += '  <p>' + r.description + '</p>';
        html += '</div>';

        // ---- 五行关联地图 ----
        html += '<div class="result-card">';
        html += '  <h3>🔗 五行关联地图</h3>';
        html += '  <ul>';
        html += '    <li><strong>对应脏腑：</strong>' + r.organ + '</li>';
        html += '    <li><strong>主导情绪：</strong>' + r.emotion + '</li>';
        html += '    <li><strong>肠道路径：</strong>' + r.gutLink + '</li>';
        html += '    <li><strong>关键节律：</strong>' + r.rhythm + '</li>';
        html += '  </ul>';
        html += '</div>';

        // ---- 五行分布图 ----
        html += '<div class="result-card">';
        html += '  <h3>📊 你的五行分布</h3>';
        sorted.forEach(function (key) {
            var pct = Math.round((scores[key] / totalQuestions) * 100);
            var color = ELEMENT_RESULTS[key].color;
            html += '<div class="result-bar-container">';
            html += '  <div class="result-bar-label">';
            html += '    <span>' + ELEMENT_NAMES[key] + '（' + ELEMENT_RESULTS[key].type + '）</span>';
            html += '    <span style="color:' + color + ';">' + scores[key] + '题 · ' + pct + '%</span>';
            html += '  </div>';
            html += '  <div class="result-bar">';
            html += '    <div class="result-bar-fill" style="width:0%;background:' + color + ';" data-target="' + pct + '"></div>';
            html += '  </div>';
            html += '</div>';
        });
        html += '</div>';

        // ---- 调养建议（全部展示，不锁定）----
        html += '<div class="result-card">';
        html += '  <h3>🌿 个性化调养建议</h3>';
        html += '  <ul>';
        r.tips.forEach(function (tip) {
            html += '<li>' + tip + '</li>';
        });
        html += '  </ul>';
        html += '</div>';

        // ---- 操作按钮 ----
        html += '<button class="btn-share" id="btn-share">📤 分享我的五行体质报告</button>';
        html += '<button class="btn-retest" id="btn-retest">🔄 重新测试</button>';

        // ---- 社群温和引导 ----
        html += '<div class="community-guide">';
        html += '  <p class="community-guide-title">🌱 想获得更深入的五行调养方案？</p>';
        html += '  <p class="community-guide-desc">加入「五行肠养」社群，每日推送五行节律日历、专属体质调养内容，与同频伙伴一起打卡</p>';
        html += '  <div class="community-qr-area">';
        // 公众号二维码
        html += '    <div class="qr-card">';
        html += '      <div class="qr-placeholder" id="qr-gongzhonghao">请替换为<br>公众号二维码</div>';
        html += '      <span class="qr-card-label">关注公众号</span>';
        html += '    </div>';
        // 企微社群二维码
        html += '    <div class="qr-card">';
        html += '      <div class="qr-placeholder" id="qr-qiwei">请替换为<br>企微社群二维码</div>';
        html += '      <span class="qr-card-label">加入社群</span>';
        html += '    </div>';
        html += '  </div>';
        // 福利标签
        html += '  <div class="community-benefits">';
        html += '    <span class="benefit-tag">📅 五行节律日历</span>';
        html += '    <span class="benefit-tag">💬 体质专属答疑</span>';
        html += '    <span class="benefit-tag">🎁 调养方案礼包</span>';
        html += '    <span class="benefit-tag">✅ 每日打卡社群</span>';
        html += '  </div>';
        html += '</div>';

        // ---- Hashtag ----
        html += '<p class="result-hashtag">' + r.hashtag + '</p>';

        els.resultBox.innerHTML = html;
        showPage('result');

        // 柱状图入场动画
        setTimeout(function () {
            var bars = document.querySelectorAll('.result-bar-fill');
            bars.forEach(function (bar) {
                bar.style.width = bar.getAttribute('data-target') + '%';
            });
        }, 250);

        // 绑定按钮
        document.getElementById('btn-share').addEventListener('click', handleShare);
        document.getElementById('btn-retest').addEventListener('click', handleRetest);
    }

    // ======== 分享 ========
    function handleShare() {
        var scores = calcScores();
        var topEl = getTopElement(scores);
        var r = ELEMENT_RESULTS[topEl];
        var shareText = '🔮 我在「五行肠养」体质测试中测出了 ' + r.fullName + '！\n\n' +
            '对应脏腑：' + r.organ + '\n' +
            '主导情绪：' + r.emotion + '\n\n' +
            r.hashtag + '\n来测测你是什么体质？👇';

        if (navigator.share) {
            navigator.share({
                title: '五行肠养 · 体质测试结果',
                text: shareText,
                url: window.location.href
            }).catch(function () { });
        } else {
            copyToClipboard(shareText);
        }
    }

    function copyToClipboard(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(function () {
                showToast('✅ 已复制到剪贴板，快去分享吧！');
            });
        } else {
            var ta = document.createElement('textarea');
            ta.value = text;
            ta.style.cssText = 'position:fixed;left:-9999px;';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            showToast('✅ 已复制到剪贴板，快去分享吧！');
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

    // ======== 重新测试 ========
    function handleRetest() {
        currentIndex = 0;
        answers.length = 0;
        showPage('home');
    }

    // ======== 初始化 ========
    function init() {
        createStarField();

        els.btnStart.addEventListener('click', function () {
            showPage('quiz');
            renderQuestion();
        });

        var base = 2847;
        var extra = Math.floor(Math.random() * 300);
        els.totalTests.textContent = (base + extra).toLocaleString();
    }

    init();
})();
