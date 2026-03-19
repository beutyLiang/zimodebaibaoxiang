# 剪映拼接60秒视频 · 完整操作指南

> **前提**：你已经用 Flow 或即梦生成了视频素材/背景图并下载到电脑
> **工具**：剪映电脑版（免费）
> **目标**：把素材 → 变成60秒完整视频 → 上传TikTok/YouTube Shorts

---

## 🎨 V2 视觉风格（2026-03-18 升级）

> **参考**：Einzelgänger 的知性暗调 + 东方水墨美学
> **定位**：不是做氛围音乐，是做"视觉化的哲学框架"

### 色调方案
| 元素 | 颜色 | 色值参考 |
|------|------|---------|
| 背景 | 墨黑 | #0A0A0A |
| 主字幕 | 暖白/米白 | #F5F0E8 |
| 关键词/金句 | 金色 | #D4AF37 |
| 辅助色 | 墨绿 | #2D4A3E |

### 字幕规范
- **字体**：思源宋体（中文）/ Playfair Display（英文）
- **大小**：比默认大 1.5 倍
- **位置**：正中偏下
- **动画**：淡入（入场速度 0.5s）
- **每句话停顿 2-3 秒**

### 背景素材来源
1. **即梦 AI**：用 `jimeng_video_prompts.md` 里的 BG-1 到 BG-8 提示词
2. **Pexels/Pixabay**：搜 "Chinese ink painting", "zen garden", "misty mountain"
3. **Wikimedia**：宋代名画（范宽/马远/夏圭）高清扫描，免费商用

### 视频结构模板（60秒）
```
0-1s    → 黑屏+归元Logo闪现（品牌签名）
1-5s    → Hook文字 + 一张震撼水墨画面
5-40s   → 画面缓慢切换（3-4张）+ 旁白/字幕
40-55s  → 框架/公式出现（金字+暗底）
55-60s  → "This is Wu Wei." + "Follow Yuanmind"
```

---

## 通用流程（每条视频都这样做）

### 第1步：新建项目
```
打开剪映 → 点 "新建项目"
→ 画面比例选 9:16（竖屏）
```

### 第2步：导入视频
```
点 "导入" → 找到 Flow 下载的视频文件 → 双击导入
把视频从素材区拖到下方的 "时间轴" 上
```

### 第3步：复制视频让它循环
```
在时间轴上右键点你的视频 → "复制"
然后 "粘贴" 5次
现在你有 6段 × 8秒 = 48秒的背景画面
```

### 第4步：加文字
```
点顶部 "文字" → "新建文本"
→ 输入文字内容（见下方每条视频的具体文字）
→ 字体选白色，字号调大
→ 点 动画 → 入场 → 选"淡入"
→ 在时间轴上拖动文字的位置和时长

每句话之间停顿2-3秒，让观众有时间阅读
```

### 第5步：加品牌结尾页（最后15秒）
```
1. 在时间轴 45秒处，点 "背景" → 选深蓝灰色纯色背景
2. 拖动让它持续到 60秒
3. 加文字：
   → "YUANMIND 归元"（大字，白色，居中）
   → "Follow @yuanmind1 for daily wisdom"（小字）
4. 给文字加 "淡入" 动画
```

### 第6步：加背景音乐
```
点 "音频" → "音乐" → 搜索 "zen" 或 "meditation" 或 "piano"
选一首安静的 → 拖到时间轴
把音量调到 30-40%
```

### 第7步：导出
```
点右上角 "导出"
分辨率选 1080P
导出到 D:\projects\test\docs\content\videos\
```

---

## 7条视频的具体文字内容

### Video 1 ⭐ Knowledge vs Wisdom

**时间轴安排：**
```
0s        8s       16s         28s        38s    45s        60s
|─────────|─────────|───────────|──────────|──────|──────────|
 句1        句2       句3          句4        句5    品牌结尾页
```

| 时间 | 文字内容 | 样式 |
|:---|:---|:---|
| 0-8秒 | Knowledge is addition. | 白色大字，淡入 |
| 8-16秒 | Wisdom is subtraction. | 白色大字，淡入 |
| 16-28秒 | Most people waste 60% of their energy on things that won't change the outcome. | 白色小字，淡入 |
| 28-38秒 | What if you stopped? | **金色大字**，淡入 |
| 38-45秒 | — Wu Wei 无为  @yuanmind1 | 白色小字，半透明 |
| 45-60秒 | YUANMIND 归元 / Follow for daily wisdom | 品牌结尾页 |

---

### Video 2 · Emotions

| 时间 | 文字内容 | 样式 |
|:---|:---|:---|
| 0-6秒 | Your emotions are not your enemy. | 白色大字 |
| 6-12秒 | They are messengers. | 白色大字 |
| 12-24秒 | Anger = your boundary was crossed | 白色小字 |
|  | Anxiety = you sense a threat |  |
|  | Sadness = you lost something valued |  |
| 24-32秒 | Don't kill the messenger. | 白色中字 |
| 32-40秒 | Read the message. | **金色大字** |
| 40-45秒 | — Zhong Dao 中道  @yuanmind1 | 小字 |
| 45-60秒 | 品牌结尾页 | — |

---

### Video 3 · Leadership

| 时间 | 文字内容 | 样式 |
|:---|:---|:---|
| 0-7秒 | The best leaders look idle. | 白色大字 |
| 7-14秒 | Not because they're lazy. | 白色中字 |
| 14-24秒 | Because they only act at critical moments. | 白色中字 |
| 24-34秒 | Most managers confuse 'being busy' with 'being effective.' | 白色小字 |
| 34-42秒 | They are not the same. | **白色大字加粗** |
| 42-45秒 | — Wu Wei 无为  @yuanmind1 | 小字 |
| 45-60秒 | 品牌结尾页 | — |

---

### Video 4 · Bamboo vs Oak

| 时间 | 文字内容 | 样式 |
|:---|:---|:---|
| 0-7秒 | The oak tree stands firm in the storm. | 白色大字 |
| 7-11秒 | It breaks. | 白色大字 |
| 11-16秒 | The bamboo bends. | 白色大字 |
| 16-20秒 | It survives. | 白色大字 |
| 20-32秒 | In a chaotic world, adaptability beats rigidity. | 白色中字 |
| 32-40秒 | Every. Single. Time. | **金色大字** |
| 40-45秒 | — Yin-Yang 阴阳  @yuanmind1 | 小字 |
| 45-60秒 | 品牌结尾页 | — |

---

### Video 5 · Comparison

| 时间 | 文字内容 | 样式 |
|:---|:---|:---|
| 0-8秒 | Compare yourself with who you were 3 months ago. | 白色大字 |
| 8-14秒 | Everything else is noise. | **白色大字加粗** |
| 14-22秒 | You're comparing your full reality | 白色中字 |
| 22-28秒 | to everyone else's highlight reel. | 白色中字 |
| 28-36秒 | That comparison produces zero useful information | 白色小字 |
| 36-42秒 | and infinite anxiety. | **金色大字** |
| 42-45秒 | — Wu Wei 无为  @yuanmind1 | 小字 |
| 45-60秒 | 品牌结尾页 | — |

---

### Video 6 · Timing

| 时间 | 文字内容 | 样式 |
|:---|:---|:---|
| 0-6秒 | The right action | 白色大字 |
| 6-12秒 | at the wrong time | 白色大字 |
| 12-18秒 | is the wrong action. | **白色大字加粗** |
| 18-26秒 | Don't just ask 'should I do it?' | 白色中字 |
| 26-36秒 | Ask 'should I do it NOW?' | **金色大字** |
| 36-42秒 | Timing is everything. The ancients knew this. | 白色中字 |
| 42-45秒 | — Yi Jing 易经  @yuanmind1 | 小字 |
| 45-60秒 | 品牌结尾页 | — |

---

### Video 7 · Precise Effort

| 时间 | 文字内容 | 样式 |
|:---|:---|:---|
| 0-8秒 | Working 12 hours a day doesn't mean | 白色中字 |
| 8-16秒 | you produced 12 hours of value. | 白色中字 |
| 16-24秒 | Effort is not a virtue. | 白色大字 |
| 24-34秒 | Precise effort is. | **金色，字号最大** |
| 34-42秒 | Your best work happens in your most focused 4 hours. | 白色小字 |
| 42-45秒 | — Wu Wei 无为  @yuanmind1 | 小字 |
| 45-60秒 | 品牌结尾页 | — |

---

## 💡 提高效率的技巧

1. **做完 Video 1 后，"另存为"模板**
   → 做 Video 2 时，打开模板，只换文字内容就行
   → 背景、音乐、结尾页都不用重新做

2. **批量导出**
   → 7条全做完再一起导出，省时间

3. **品牌结尾页只做一次**
   → 第一次做好后复制到每条视频里

---

## 📋 做完后检查清单

- [ ] Video 1 导出 ✅ (60秒)
- [ ] Video 2 导出 ✅ (60秒)
- [ ] Video 3 导出 ✅ (60秒)
- [ ] Video 4 导出 ✅ (60秒)
- [ ] Video 5 导出 ✅ (60秒)
- [ ] Video 6 导出 ✅ (60秒)
- [ ] Video 7 导出 ✅ (60秒)
