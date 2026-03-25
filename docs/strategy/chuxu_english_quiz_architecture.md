# 初序 · English Five Elements Quiz Architecture

> **目标：将中文五行测评改编为英文版，用于海外 Lead Generation**
> **子默整理 · 2026-03-21**

---

## 1. 产品定位

| 项目 | 中文版 | 英文版 |
|------|--------|--------|
| **品牌** | 初序 | Chuxu (or "Element Quiz by Yuanmind") |
| **叙事** | 中医五行体质 | "Ancient Eastern Body Type System" |
| **目的** | 功能展示 | **Lead Gen（收邮箱）** → 引流到 $9 PDF |
| **结果页** | 完整结果免费 | 基础结果免费 + 详细报告需邮箱 |
| **语言** | 中文 | 英文 |
| **FDA 合规** | N/A | 必须：no medical claims |

## 2. 用户漏斗

```
[看到推文/Reddit] → [点击测评链接] → [做8题] → [看基础结果]
                                                      ↓
                                        [输入邮箱获取详细报告]
                                                      ↓
                                        [邮件内推 $9 Body Type PDF]
```

## 3. 技术架构

### 复用中文版
- `app2.js` — 对话式引擎（核心逻辑不变）
- `style.css` + `style2.css` — 样式基本复用
- 评分算法 — 完全复用

### 需要修改的
| 文件 | 改什么 |
|------|--------|
| `quiz-data-en.js` | 翻译所有问题+选项+结果 |
| `index-en.html` | 英文页面 + 英文字体 |
| `style-en.css` | 字体改为 Inter/Outfit |
| 去掉 Supabase | 暂不需要后端，纯静态 |
| 去掉登录系统 | 不需要注册 |
| 加邮箱收集 | 结果页加邮箱表单 |

### 新增功能
- **邮箱收集表单** — 结果页显示基础结果，详细报告需输入邮箱
- **Mailchimp/ConvertKit 集成** — 存邮箱 + 自动发欢迎邮件
- **分享按钮** — Share on X / Copy link

## 4. 内容翻译策略

### 品牌调性
- 中文版：温暖、亲切、像朋友聊天
- 英文版：**Warm but authoritative** — 像一个 wellness coach

### 关键术语翻译
| 中文 | 英文 | 理由 |
|------|------|------|
| 五行 | Five Elements | 最通用 |
| 木 | Wood | 标准 |
| 火 | Fire | 标准 |
| 土 | Earth | 标准 |
| 金 | Metal | 标准 |
| 水 | Water | 标准 |
| 肝 | Liver system | 避免直接说 organ |
| 脾 | Digestive system | 更容易理解 |
| 气 | Energy flow | 西方能接受 |
| 疏泄 | Emotional release | 意译 |

### FDA 合规语言
| ❌ 不能说 | ✅ 这样说 |
|----------|----------|
| This cures / treats | This may support |
| Your liver is weak | Your Wood element energy is low |
| You have a disease | You may experience tendencies toward |
| Medical diagnosis | Body type tendency |

### 问题翻译示例（Q1）

**中文原文：**
> 当你压力很大的时候，身体最先出现的反应是？

**英文版：**
> When you're under heavy stress, what's your body's first reaction?

| 中文选项 | 英文选项 |
|---------|----------|
| 🔥 心跳加快、脸发烫、想发火 | 🔥 Heart races, face flushes, urge to snap |
| 😰 心慌胸闷、坐立不安、睡不着 | 😰 Chest tightness, restless, can't sleep |
| 🫤 胃不舒服、食欲变差、一直想吃 | 🫤 Stomach upset, appetite swings |
| 😢 呼吸变浅、想叹气、胸口发紧 | 😢 Shallow breathing, sighing, chest feels tight |
| 😨 手脚发冷、想躲起来、脑子发空 | 😨 Cold hands/feet, want to hide, mind goes blank |

## 5. 结果页设计

### 免费展示（不需要邮箱）
- 你的主行：Wood / Fire / Earth / Metal / Water
- Emoji + 颜色标识
- 一句话描述
- 五行比例雷达图

### 详细报告（需要邮箱）
- 完整体质分析
- 4 条个性化建议
- 每日调养时间表
- 推荐食物清单

### CTA（行动号召）
```
Want your complete Five Elements body guide?

Your personalized 20-page wellness blueprint
based on your unique element profile.

[Get My Full Report — $9]
```

## 6. 部署方案

| 方案 | 说明 |
|------|------|
| **GitHub Pages** | 免费，和中文版一样 |
| **路径** | `beutyliang.github.io/zimodebaibaoxiang/en/quiz/` |
| **域名** | 以后可以绑 quiz.yuanmind.com |

## 7. 开发步骤

| 步骤 | 预计时间 | 说明 |
|------|---------|------|
| 1 | 2h | 翻译 quiz-data.js → quiz-data-en.js |
| 2 | 1h | 创建 index-en.html + style-en.css |
| 3 | 1h | 去掉 Supabase/登录，改为纯静态 |
| 4 | 1h | 加邮箱收集表单 |
| 5 | 30min | 测试 + 部署 |
| **总计** | **~5.5h** | 可在 1-2 天内完成 |

## 8. 成功指标

| 指标 | 目标 |
|------|------|
| 测评完成率 | > 60% |
| 邮箱收集率 | > 30%（完成测评的人） |
| $9 PDF 转化率 | > 5%（收到邮件的人） |

## 9. Disclaimer（必须放在页面底部）

```
This quiz is for informational and entertainment purposes only.
It is not a medical diagnosis. The Five Elements framework is based
on traditional Eastern philosophy and should not replace professional
medical advice. Always consult a healthcare provider for health concerns.
```
