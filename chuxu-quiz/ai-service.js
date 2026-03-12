/**
 * ai-service.js — 初序 AI 个性化解读服务
 * 调用 DeepSeek V3 API 生成个性化报告
 *
 * ⚠️ 安全提醒：API Key 暂存前端，仅用于 MVP 测试。
 * 正式上线前必须迁移到 Supabase Edge Function。
 */

var AI_SERVICE = (function () {
    'use strict';

    var API_URL = 'https://api.deepseek.com/chat/completions';
    var API_KEY = 'sk-58236ee21abb47458c60f6b76845cb79';
    var MODEL = 'deepseek-chat';

    /**
     * 调用 DeepSeek 生成个性化解读
     * @param {Object} scores - { wood:N, fire:N, earth:N, metal:N, water:N }
     * @param {Object} profile - { gender, age, concerns, diet }
     * @param {Object} answers - { q1:'选项文本', q2:'...', ... }
     * @returns {Promise<Object>} 解析后的 JSON 报告
     */
    function generateReport(scores, profile, answers) {
        var userPrompt = buildUserPrompt(scores, profile, answers);

        return fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + API_KEY
            },
            body: JSON.stringify({
                model: MODEL,
                messages: [
                    { role: 'system', content: AI_SYSTEM_PROMPT },
                    { role: 'user', content: userPrompt }
                ],
                temperature: 0.8,
                max_tokens: 2000
            })
        })
            .then(function (res) {
                if (!res.ok) throw new Error('AI API 错误: ' + res.status);
                return res.json();
            })
            .then(function (data) {
                var content = data.choices[0].message.content;
                // 提取 JSON（可能被 ```json 包裹）
                var jsonMatch = content.match(/\{[\s\S]*\}/);
                if (!jsonMatch) throw new Error('AI 返回格式错误');
                return JSON.parse(jsonMatch[0]);
            });
    }

    /**
     * 带缓存的报告生成
     * 相同的评分+画像组合会复用缓存结果
     */
    function getReport(scores, profile, answers) {
        var cacheKey = 'chuxu_ai_report_' + JSON.stringify(scores) + '_' + JSON.stringify(profile);
        var cached = localStorage.getItem(cacheKey);

        if (cached) {
            try {
                return Promise.resolve(JSON.parse(cached));
            } catch (e) { /* 缓存损坏，重新生成 */ }
        }

        return generateReport(scores, profile, answers).then(function (report) {
            localStorage.setItem(cacheKey, JSON.stringify(report));
            return report;
        });
    }

    return {
        generateReport: generateReport,
        getReport: getReport
    };
})();
