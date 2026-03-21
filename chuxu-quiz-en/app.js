/**
 * Element Quiz by Yuanmind — App Engine
 * Simplified version: no Supabase, no auth
 * Pure static with email collection
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

    var currentStep = 0;
    var totalSteps = CHAT_FLOW.filter(function (s) { return s.type === 'question'; }).length;
    var userProfile = {};
    var userAnswers = {};
    var scores = { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 };

    // ---- Page Switch ----
    function showPage(name) {
        Object.keys(pages).forEach(function (k) {
            pages[k].classList.toggle('active', k === name);
        });
        if (name === 'result') {
            pages.result.scrollTop = 0;
        }
    }

    // ---- Chat Bubbles ----
    function addBotBubble(text, showAvatar) {
        var row = document.createElement('div');
        row.className = 'chat-row bot';

        if (showAvatar) {
            var av = document.createElement('div');
            av.className = 'bubble-avatar';
            av.textContent = 'Y';
            row.appendChild(av);
        } else {
            var spacer = document.createElement('div');
            spacer.style.width = '28px';
            spacer.style.flexShrink = '0';
            row.appendChild(spacer);
        }

        var bub = document.createElement('div');
        bub.className = 'bubble bot-bubble';
        bub.textContent = text;
        row.appendChild(bub);
        chatBody.appendChild(row);
        scrollToBottom();
    }

    function addUserBubble(text) {
        var row = document.createElement('div');
        row.className = 'chat-row user';
        var bub = document.createElement('div');
        bub.className = 'bubble user-bubble';
        bub.textContent = text;
        row.appendChild(bub);
        chatBody.appendChild(row);
        scrollToBottom();
    }

    function addDimensionTag(text) {
        var tag = document.createElement('div');
        tag.className = 'dimension-tag';
        tag.innerHTML = '<span>' + text + '</span>';
        chatBody.appendChild(tag);
        scrollToBottom();
    }

    function addTypingIndicator() {
        var row = document.createElement('div');
        row.className = 'chat-row bot';
        row.id = 'typing-row';

        var av = document.createElement('div');
        av.className = 'bubble-avatar';
        av.textContent = 'Y';
        row.appendChild(av);

        var bub = document.createElement('div');
        bub.className = 'bubble bot-bubble typing-indicator';
        bub.innerHTML = '<span></span><span></span><span></span>';
        row.appendChild(bub);
        chatBody.appendChild(row);
        scrollToBottom();
    }

    function removeTypingIndicator() {
        var el = document.getElementById('typing-row');
        if (el) el.remove();
    }

    function scrollToBottom() {
        setTimeout(function () {
            chatBody.scrollTop = chatBody.scrollHeight;
        }, 50);
    }

    // ---- Show Options ----
    function showOptions(step) {
        chatInput.innerHTML = '';
        var grid = document.createElement('div');
        grid.className = 'option-grid';

        if (step.type === 'intro') {
            var btn = document.createElement('button');
            btn.className = 'btn-next';
            btn.textContent = step.nextBtn;
            btn.onclick = function () {
                chatInput.innerHTML = '';
                processStep(step.next);
            };
            grid.appendChild(btn);
        } else if (step.multiSelect) {
            var selected = [];
            step.options.forEach(function (opt) {
                var btn = document.createElement('button');
                btn.className = 'opt-btn';
                btn.textContent = opt.text;
                btn.onclick = function () {
                    var idx = selected.indexOf(opt.value);
                    if (idx > -1) {
                        selected.splice(idx, 1);
                        btn.classList.remove('multi-selected');
                    } else {
                        selected.push(opt.value);
                        btn.classList.add('multi-selected');
                    }
                };
                grid.appendChild(btn);
            });
            var confirmBtn = document.createElement('button');
            confirmBtn.className = 'btn-confirm-multi';
            confirmBtn.textContent = 'Confirm ✓';
            confirmBtn.onclick = function () {
                if (selected.length === 0) return;
                var labels = selected.map(function (v) {
                    var o = step.options.find(function (x) { return x.value === v; });
                    return o ? o.text : v;
                });
                addUserBubble(labels.join(', '));
                userProfile[step.field] = selected;
                chatInput.innerHTML = '';
                showTransition(step.next);
            };
            grid.appendChild(confirmBtn);
        } else {
            step.options.forEach(function (opt) {
                var btn = document.createElement('button');
                btn.className = 'opt-btn';
                btn.textContent = opt.text;
                btn.onclick = function () {
                    // Highlight selected
                    grid.querySelectorAll('.opt-btn').forEach(function (b) {
                        b.classList.remove('selected');
                        b.disabled = true;
                    });
                    btn.classList.add('selected');

                    addUserBubble(opt.text);
                    chatInput.innerHTML = '';

                    if (step.type === 'question') {
                        scores[opt.element] += opt.score;
                        currentStep++;
                        updateProgress();
                    } else if (step.type === 'profile') {
                        userProfile[step.field] = opt.value;
                    }

                    showTransition(step.next);
                };
                grid.appendChild(btn);
            });
        }

        chatInput.appendChild(grid);
        scrollToBottom();
    }

    function showTransition(nextId) {
        if (nextId === 'result') {
            showAnalyzing();
            return;
        }

        addTypingIndicator();
        var msg = TRANSITION_MESSAGES[Math.floor(Math.random() * TRANSITION_MESSAGES.length)];

        setTimeout(function () {
            removeTypingIndicator();
            addBotBubble(msg, false);
            setTimeout(function () {
                processStep(nextId);
            }, 400);
        }, 800);
    }

    function updateProgress() {
        var pct = Math.round((currentStep / totalSteps) * 100);
        progressFill.style.width = pct + '%';
    }

    // ---- Process Step ----
    function processStep(stepId) {
        var step = CHAT_FLOW.find(function (s) { return s.id === stepId; });
        if (!step) return;

        if (step.dimension) {
            addDimensionTag(step.dimension);
        }

        if (step.type === 'intro') {
            // Show intro messages one by one
            var msgs = step.messages;
            var i = 0;
            function showNext() {
                if (i < msgs.length) {
                    addTypingIndicator();
                    setTimeout(function () {
                        removeTypingIndicator();
                        addBotBubble(msgs[i], i === 0);
                        i++;
                        setTimeout(showNext, 300);
                    }, 600);
                } else {
                    showOptions(step);
                }
            }
            showNext();
        } else {
            addTypingIndicator();
            setTimeout(function () {
                removeTypingIndicator();
                addBotBubble(step.message, true);
                setTimeout(function () {
                    showOptions(step);
                }, 200);
            }, 700);
        }
    }

    // ---- Analyzing ----
    function showAnalyzing() {
        var overlay = document.createElement('div');
        overlay.className = 'analyzing-overlay';
        overlay.id = 'analyzing-overlay';
        overlay.innerHTML = '<div class="analyzing-spinner"></div>'
            + '<p class="analyzing-text">Analyzing your elements...</p>'
            + '<p class="analyzing-sub">Mapping your unique body type pattern</p>';
        document.body.appendChild(overlay);

        setTimeout(function () {
            overlay.remove();
            renderResult();
        }, 2500);
    }

    // ---- Render Result ----
    function renderResult() {
        showPage('result');

        // Calculate primary and secondary elements
        var sorted = Object.keys(scores).sort(function (a, b) { return scores[b] - scores[a]; });
        var primary = sorted[0];
        var secondary = sorted[1];
        var el = ELEMENT_RESULTS[primary];
        var total = Object.values(scores).reduce(function (a, b) { return a + b; }, 0) || 1;

        var container = document.getElementById('result-content');
        container.innerHTML = '';

        // Header
        var header = '<div class="result-header">'
            + '<p class="result-eyebrow">Your Element Profile</p>'
            + '<div class="result-element-emoji">' + el.emoji + '</div>'
            + '<p class="result-element-name" style="color:' + el.color + '">You are: ' + el.fullName + '</p>'
            + '<p class="result-element-title">' + el.title + '</p>'
            + '</div>';

        // System & Emotion
        var infoHtml = '<div class="result-card">'
            + '<h3>Your Profile</h3>'
            + '<p><strong>System:</strong> ' + el.system + '</p>'
            + '<p><strong>Core Emotion:</strong> ' + el.emotion + '</p>'
            + '<p><strong>Season:</strong> ' + el.season + '</p>'
            + '<p><strong>Peak Recharge Time:</strong> ' + el.time + '</p>'
            + '</div>';

        // Description
        var descHtml = '<div class="result-card">'
            + '<h3>What This Means</h3>'
            + '<p>' + el.description + '</p>'
            + '</div>';

        // Body Connection
        var bodyHtml = '<div class="result-card">'
            + '<h3>Mind-Body Connection</h3>'
            + '<p>' + el.bodyLink + '</p>'
            + '</div>';

        // Tips
        var tipsHtml = '<div class="result-card"><h3>Your Balance Tips</h3><ul>';
        el.tips.forEach(function (tip) {
            tipsHtml += '<li>' + tip + '</li>';
        });
        tipsHtml += '</ul></div>';

        // Sub element
        var subHtml = '<div class="sub-element-box">'
            + '<p><strong>Secondary: ' + ELEMENT_RESULTS[secondary].emoji + ' '
            + ELEMENT_RESULTS[secondary].fullName + '</strong></p>'
            + '<p>' + SUB_ELEMENT_DESC[secondary] + '</p>'
            + '</div>';

        // Simple Radar (text-based percentages)
        var radarHtml = '<div class="result-card"><h3>Your Element Distribution</h3>';
        sorted.forEach(function (key) {
            var pct = Math.round((scores[key] / total) * 100);
            var r = ELEMENT_RESULTS[key];
            radarHtml += '<div style="margin:0.6rem 0;">'
                + '<div style="display:flex;justify-content:space-between;margin-bottom:0.3rem;">'
                + '<span style="font-size:0.85rem;">' + r.emoji + ' ' + r.name + '</span>'
                + '<span style="font-size:0.85rem;color:' + r.color + ';">' + pct + '%</span>'
                + '</div>'
                + '<div style="height:6px;background:rgba(255,255,255,0.06);border-radius:3px;overflow:hidden;">'
                + '<div style="height:100%;width:' + pct + '%;background:' + r.color + ';border-radius:3px;transition:width 1s ease;"></div>'
                + '</div></div>';
        });
        radarHtml += '</div>';

        // Email Gate
        var emailHtml = '<div class="email-gate" id="email-gate">'
            + '<h3>🔓 Get Your Complete Report</h3>'
            + '<p>Receive your full personalized balance plan — including food recommendations, daily routines, and seasonal adjustments.</p>'
            + '<input type="email" id="email-input" placeholder="Enter your email">'
            + '<button onclick="submitEmail()">Send Me My Report →</button>'
            + '</div>';

        // CTA
        var ctaHtml = '<div class="result-cta">'
            + '<h3>Get Your Personalized Balance Plan</h3>'
            + '<p>A simple system to restore your energy, reduce internal imbalance, and feel better — starting today.</p>'
            + '<p style="font-size:0.85rem;color:var(--text);margin-bottom:0.5rem;">✅ Understand your dominant imbalance<br>'
            + '✅ Daily food, habits & routines<br>'
            + '✅ What to avoid (most people get this wrong)</p>'
            + '<a href="https://checkout.dodopayments.com/buy/pdt_0NasrfmpRqOUCjRX0YOZi" class="cta-btn" target="_blank">Get My Balance Plan — $7</a>'
            + '<p class="cta-sub">No supplements. No complex routines.<br>Most people notice changes within days.</p>'
            + '</div>';

        // Share
        var shareHtml = '<div class="share-row">'
            + '<button class="share-btn" onclick="shareOnX()">Share on X</button>'
            + '<button class="share-btn" onclick="copyLink()">Copy Link</button>'
            + '<button class="share-btn" onclick="retakeQuiz()">Retake Quiz</button>'
            + '</div>';

        // Disclaimer
        var disclaimerHtml = '<div class="disclaimer">'
            + 'This quiz is for informational and entertainment purposes only. '
            + 'It is not a medical diagnosis. The Five Elements framework is based '
            + 'on traditional Eastern philosophy and should not replace professional '
            + 'medical advice. Always consult a healthcare provider for health concerns.'
            + '</div>';

        container.innerHTML = header + infoHtml + descHtml + bodyHtml + radarHtml
            + tipsHtml + subHtml + emailHtml + ctaHtml + shareHtml + disclaimerHtml;
    }

    // ---- Email Submission ----
    window.submitEmail = function () {
        var input = document.getElementById('email-input');
        var email = input.value.trim();
        if (!email || email.indexOf('@') === -1) {
            input.style.borderColor = '#C9544D';
            return;
        }
        // Store locally for now (can integrate Mailchimp later)
        var emails = JSON.parse(localStorage.getItem('yuanmind_emails') || '[]');
        emails.push({ email: email, time: new Date().toISOString(), scores: scores });
        localStorage.setItem('yuanmind_emails', JSON.stringify(emails));

        var gate = document.getElementById('email-gate');
        gate.innerHTML = '<p class="email-success">✅ Check your inbox! Your complete report is on its way.</p>'
            + '<p style="font-size:0.8rem;color:var(--text-muted);margin-top:0.5rem;">(Report delivery coming soon)</p>';
    };

    // ---- Share ----
    window.shareOnX = function () {
        var sorted = Object.keys(scores).sort(function (a, b) { return scores[b] - scores[a]; });
        var el = ELEMENT_RESULTS[sorted[0]];
        var text = "I just took the Five Elements Body Type Quiz and I'm "
            + el.emoji + " " + el.fullName + " — " + el.title
            + "!\n\nTake yours: " + window.location.href;
        window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(text), '_blank');
    };

    window.copyLink = function () {
        var text = window.location.href;
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text);
        } else {
            var ta = document.createElement('textarea');
            ta.value = text;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
        }
        showToast('Link copied!');
    };

    window.retakeQuiz = function () {
        scores = { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 };
        currentStep = 0;
        userProfile = {};
        userAnswers = {};
        chatBody.innerHTML = '';
        chatInput.innerHTML = '';
        progressFill.style.width = '0%';
        showPage('home');
    };

    function showToast(msg) {
        var toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = msg;
        document.body.appendChild(toast);
        setTimeout(function () { toast.remove(); }, 2000);
    }

    // ---- Init ----
    function init() {
        document.getElementById('btn-start').addEventListener('click', function () {
            showPage('chat');
            processStep('welcome');
        });

        // Random test count
        var count = 3281 + Math.floor(Math.random() * 200);
        document.getElementById('test-count').textContent = count.toLocaleString();
    }

    init();
})();
