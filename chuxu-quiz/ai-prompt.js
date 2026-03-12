/**
 * ai-prompt.js — 初序 AI 个性化解读 Prompt 模版
 * 用于组装发送给 DeepSeek V3 的 Prompt
 */

// 系统角色 Prompt
var AI_SYSTEM_PROMPT = [
    '你是「初序」，一位融合中医五行理论与现代肠脑轴科学的身心解读师。',
    '',
    '## 语言风格',
    '- 温暖、专业、具象（善用生活比喻），像一位懂中医的闺蜜在和用户聊天',
    '- 使用第二人称"你"',
    '- 每段不超过3句话，留有呼吸感',
    '- 多用具象比喻（如"你的身体像春天刚发芽的树"而非"你属木"）',
    '- 调养建议必须具体到时间、食材、动作，不说空话',
    '',
    '## 输出规则',
    '- 你不是在给医疗建议，而是帮助用户理解身体发出的信号',
    '- 不要使用"建议就医"之类的免责声明',
    '- 所有内容必须与用户的具体画像和测试选项强关联',
    '- 必须严格按照指定的 JSON 格式输出，不要输出任何其他内容'
].join('\n');

// JSON 输出格式模版
var AI_OUTPUT_FORMAT = [
    '请严格按以下 JSON 格式输出，不要输出 JSON 以外的任何文字：',
    '{',
    '  "headline": "一句话体质总结（15字以内，有画面感，用自然意象）",',
    '  "body_metaphor": "用一个自然意象比喻这个人的身体状态（2-3句，结合用户的具体困扰）",',
    '  "strengths": ["优势1（1句话）", "优势2", "优势3"],',
    '  "warnings": ["需要注意的身体信号1（结合用户困扰）", "信号2"],',
    '  "gut_insight": "肠脑轴角度的解读（3-4句，结合用户的具体困扰和饮食习惯）",',
    '  "morning_routine": "晨起建议（具体到几点、做什么、持续多久）",',
    '  "evening_routine": "晚间建议（具体到几点、做什么、吃什么）",',
    '  "food_rx": {',
    '    "eat_more": ["食材1（为什么适合这个体质）", "食材2（原因）", "食材3（原因）"],',
    '    "eat_less": ["食材1（为什么要少吃）", "食材2（原因）"]',
    '  },',
    '  "emotion_tip": "情绪调养建议（结合用户的压力反应和情绪处理方式，给出1个具体可做的事）",',
    '  "weekly_challenge": "本周小挑战（一件容易做到、3分钟内完成的事）",',
    '  "closing": "收尾寄语（温暖、有力量感，1-2句，用"初序"的口吻）"',
    '}'
].join('\n');

// 五行中文映射
var WUXING_CN = {
    wood: '木', fire: '火', earth: '土', metal: '金', water: '水'
};

// 画像字段中文映射
var PROFILE_LABELS = {
    gender: { female: '女性', male: '男性', other: '未透露' },
    age: { '18-25': '18-25岁', '26-35': '26-35岁', '36-45': '36-45岁', '46+': '46岁以上' },
    concerns: {
        sleep: '睡眠不好', anxiety: '焦虑紧张', gut: '肠胃不适',
        fatigue: '容易疲倦', skin: '皮肤问题', period: '经期不规律', none: '暂无困扰'
    },
    diet: { vegetarian: '偏素食', meat: '偏肉食', balanced: '比较均衡', irregular: '不太规律' }
};

// Prompt 注入清洗（防止用户输入污染 LLM 指令）
function sanitizeForPrompt(str) {
    if (!str) return '';
    return String(str)
        .replace(/#{2,}/g, '')           // 去除 ## 标题标记
        .replace(/System\s*:/gi, '')     // 去除 System: 指令
        .replace(/Assistant\s*:/gi, '')  // 去除 Assistant: 指令
        .replace(/```/g, '')             // 去除代码块
        .substring(0, 200);              // 限制长度
}

/**
 * 组装完整的用户数据 Prompt
 * @param {Object} scores - 五行评分 { wood:N, fire:N, earth:N, metal:N, water:N }
 * @param {Object} profile - 用户画像 { gender, age, concerns, diet }
 * @param {Object} answers - 用户的每道题选项 { q1: '选项文本', q2: '...', ... }
 * @returns {String} 用户数据部分的 Prompt
 */
function buildUserPrompt(scores, profile, answers) {
    var sorted = Object.keys(scores).sort(function (a, b) { return scores[b] - scores[a]; });
    var topEl = sorted[0];
    var subEl = sorted[1];

    var lines = [];
    lines.push('## 用户画像');
    lines.push('- 性别：' + (PROFILE_LABELS.gender[profile.gender] || '未知'));
    lines.push('- 年龄段：' + (PROFILE_LABELS.age[profile.age] || '未知'));

    if (profile.concerns && Array.isArray(profile.concerns)) {
        var concernTexts = profile.concerns.map(function (c) { return PROFILE_LABELS.concerns[c] || c; });
        lines.push('- 近期困扰：' + concernTexts.join('、'));
    }
    lines.push('- 饮食习惯：' + (PROFILE_LABELS.diet[profile.diet] || '未知'));

    lines.push('');
    lines.push('## 五行评分');
    sorted.forEach(function (el) {
        var label = el === topEl ? '（主行）' : (el === subEl ? '（副行）' : '');
        lines.push('- ' + WUXING_CN[el] + '：' + scores[el] + '分' + label);
    });

    lines.push('');
    lines.push('## 测试选项详情');
    if (answers) {
        Object.keys(answers).forEach(function (qId) {
            lines.push('- ' + qId + ': ' + sanitizeForPrompt(answers[qId]));
        });
    }

    lines.push('');
    lines.push(AI_OUTPUT_FORMAT);

    return lines.join('\n');
}
