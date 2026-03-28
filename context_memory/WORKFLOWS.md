# 子默工作记忆 · 流程与细节

> 每次对话结束前更新。记录具体的工作流程、工具用法、偏好设置等"小事"——这些是 CONTEXT.md 不记的，但下次新对话需要知道的。

## ⚡ 核心工作原则

> **NotebookLM 是主力工具，但不是唯一的。搜不到我会自己搜（search_web），自己读（read_url_content），整理好了再喂给 NotebookLM。不会因为一个工具不行就停下来。** — Zoey 要求永远记住这条。

---

## 归元 · 海外内容发布

### 视频制作流程
1. **NotebookLM** 基于语料库（如 model_01_wuwei.md）自动生成英文脚本
2. 脚本粘贴到**剪映专业版**「图文成片」→ 自动生成视频
3. 加品牌结尾页 → 导出
4. 发布到 TikTok + YouTube Shorts

### 发布节奏（3/27 更新 · 适配 Grok Phoenix 新算法）
- **X**：每天 ≥2 条**纯文字推文**（新算法文字比视频多 30% 曝光），**禁止帖内放外链**（严重降权），CTA 改为「Link in bio」
- **X 评论分发**：每天 ≥5 条，**目标：引发原作者回复**（被回复 = 150x 点赞权重），用提问型/补充型评论，不用「赞美型」
- **YouTube**：每天 1 条 Shorts
- **YouTube 评论分发**：每天 ≥5 条，搜 burnout/overthinking/productivity 等关键词，找 10万+播放的热门 Shorts 评论
- **TikTok**：每天 21:30 发视频 + 同步 YouTube Shorts（❌ 暂停等美国 eSIM）
- **Substack**：每周三发 1 篇英文长文

### X 评论分发策略（3/27 更新 · Grok Phoenix 算法适配）

> ❗ **核心变化**：Grok 新算法下，被原作者回复的评论权重 = **150× 点赞**。所以评论的目标不再是「发观点」，而是「**引发对话**」。

#### 评论类型排序（效果从高到低）
| 类型 | 举例 | 为什么有效 |
|------|------|----------|
| 🥇 **提问型** | "What if the real burnout isn't from working hard, but from working on the wrong thing?" | 大 V 爱回答问题 |
| 🥈 **补充型** | "This reminds me of Wu Wei — the art of effortless action. Not doing less, but forcing less. What do you think?" | 提供新角度 + 开放式结尾 |
| 🥉 **个人故事型** | "I burned out at 28. Then I learned this from ancient Chinese philosophy: stop pushing, start flowing." | 情绪共鸣 + 好奇心 |
| ❌ **赞美型** | "Great post! So true!" | 没人回，没有权重 |

#### 评论写法铁律
- ✅ **必须以问号或开放式结尾**（“What do you think?” / “Does anyone else feel this?”）
- ✅ **必须提供新角度**（东方哲学 / 反常识观点），不是重复原帖
- ❌ **禁止纯赞美**（“Love this!” 在新算法下 = 0 权重）
- ❌ **禁止放链接**（X 新算法严重降权含链接内容）
- ❌ **禁止模板化**（Grok 能识别重复模式，会降权）

#### 搜索关键词
- burnout, overthinking, productivity, work life balance, follow your passion, quit my job, mental health, hustle culture

### Reddit 养号（3/28 新增 · 每日常规任务）

> **账号**：u/New-Explorer-5458 · **目标**：100+ Karma 后进入正式引流阶段
> **限制**：新号每条评论需等 10 分钟冷却

#### 阶段 1：攒 Karma（当前）
- 每天 **3-5 条**评论，利用碎片时间
- 优先找：r/AskReddit、r/KidsAreFuckingStupid、r/NameThisThing 等热门搞笑帖
- 写法：**短、有趣、有共鸣**，不放链接、不推广
- ❌ 不碰政治帖

#### 阶段 2：建立人设（Karma 100+ 后）
- 转向：r/selfimprovement、r/productivity、r/philosophy、r/stoicism
- 写法：3-5 段深度回答，自然融入东方哲学
- 个人主页 bio 写 Yuanmind

#### 阶段 3：内容引流（Karma 500+ 后）
- 发原创长帖（"How Wu Wei Changed My Decision Making"）
- 评论中自然提到 YouTube/X

### 脚本来源
- Week 1 脚本：`docs/content/week1_tiktok_scripts.md`（7条，用 Flow 提示词）
- **Week 2 脚本**：`docs/content/notebooklm_scripts_week2.md`（NotebookLM × Wu Wei）
- **Week 3 脚本**：`docs/content/notebooklm_scripts_week3.md`（NotebookLM × Yin-Yang，当前在用）
- **Week 4 脚本**：`docs/content/notebooklm_scripts_week4.md`（NotebookLM × Yi Jing，已备好）
- **YouTube 标题描述**：`docs/content/youtube_titles_day1_to_day5.md`（实际已含 Day 1-7）
- NotebookLM 笔记本：`b4ab8513`（Wu Wei 模型，1 source），`39c239c0`（归元全模型，16 sources）

### 当前进度（截至 2026-03-26 晚）
- X：Day 11 已发（Follow Your Passion · Yin-Yang），评论分发 x5（蹭帖总曝光 3.3M+）
- YouTube：Day 11 已发，评论分发 x5（蹭 Shorts 总曝光 1.9M+）
- TikTok：Day 1 已发（3/16），❌ 暂停等美国 eSIM
- Substack：已发 2 篇，Week 2 已发

### 剪映设置
- 项目保存在：`C:/Users/Administrator/AppData/Local/JianyingPro/User Data/Projects/`
- 比例：应该用 9:16（竖屏）
- 帧率：30fps

---

## 归元 · 产品变现（Dodo Payments）

### 产品 1：The Wu Wei Decision System
- **Product ID**：`pdt_0NasAovgnzokliJp3KLzs`
- **定价**：$9 USD，一次性购买
- **收款链接**：`https://checkout.dodopayments.com/buy/pdt_0NasAovgnzokliJp3KLzs`
- **PDF 文件**：`docs/brand/Wu_Wei_Decision_System_V2.pdf`（593KB）
- **HTML 源文件**：`docs/brand/wu_wei_decision_system_v2.html`

### 产品 2：The Overthinking Detox（3/20 新增）
- **Product ID**：`pdt_0NasrfmpRqOUCjRX0YOZi`
- **定价**：$7 USD，一次性购买
- **收款链接**：`https://checkout.dodopayments.com/buy/pdt_0NasrfmpRqOUCjRX0YOZi`
- **PDF 文件**：`docs/brand/Overthinking_Detox_Guide.pdf`（529KB）
- **HTML 源文件**：`docs/brand/overthinking_detox_guide.html`
- **⚠️ 待补**：Description、Tax Category、PDF附件上传（网络恢复后用 API）

### 产品漏斗
- Overthinking Detox ($7) → Wu Wei Decision System ($9) → Bundle ($12) → 未来课程 ($49+)

### Business ID
- `bus_0NaniUzTn0utr0fhZs2jY`

### Dodo 账户
- 邮箱：`glaydsbernhwenkuph@gmail.com`
- API Key 名称：Yuanmind（有 write access）
- **⚠️ API Key 值不存文件**——每次需要时让 Zoey 提供

### 已知问题
- Dashboard UI 按钮有时不响应（Add Product / Update Product）
- PDF 自动交付未启用（Dashboard bug），前几单手动发 PDF
- **解决方案**：所有操作优先用 API，不用 Dashboard

### 支付平台状态
- **Dodo Payments** ✅ 主力（注册+验证+银行卡全完成）
- **Paddle** ❌ 被拒（域名 beautyliang.github.io 未通过）
- ~~Gumroad~~（对中国卖家不友好）❌
- ~~WildCard~~（已停服）❌

---

## 归元 · NotebookLM 笔记本
- 旧的 Wu Wei 笔记本：`b4ab8513-dc56-4b91-b2b6-ce20444794e1`（1个source，上次测试建的）
- **新的归元笔记本**：`39c239c0-bf69-4861-b1bc-0e741ca45ab3`（7本地 + 9研究 = 16 个 source）
- **市场调研笔记**：`ac589f3a`（2026-03-17 添加，东方哲学×认知科学海外市场调研）

## 初序 · NotebookLM 笔记本
- **初序笔记本**：`99bc8c0f-48ed-4c71-ab71-ba184b498cf4`（4本地 + 9研究 = 13 个 source）
- 已生成：思维导图 ✅ + 播客「拿好你的五行体质出厂说明书」✅

---

## 初序 · 小红书
- **3月18日正式启动 Day 1** ✅ 已发
- **7天计划**：`docs/content/小红书7天发布计划_Week1.md`
- Day 1-3 文案：`docs/content/小红书Day1-3文案.md`
- Day 4-7 文案：从 `docs/M1_V3_Day1-10.md` 改编
- 品牌素材：`chuxu-brand/`（头像/背景图/Logo/色系）
- 发布节奏：每天1篇，**9:00-9:30**（固定时间，2026-03-19起）
- 变现路径：免费内容→测评9.9→带货佣金→社群39.9→课程99→咨询199
- **五行测试**：计划 3/26 上线。**上线前文案不提测试引导**，先跑内容质量；上线后统一同步加入 CTA
- **子默每日提醒**：今天发什么→封面图→昨天评论→前天复盘→置顶评论

---

## 📧 Zoey 每日固定任务

> 子默开对话时主动提醒：每天第一件事**处理邮件**

---

## 📡 知远 · 研究员任务管理

> **2026-03-28 升级** — 知远是研究员，之前没给「研究型」任务导致浪费。现在改为**每周一分配具体调研任务，周五交付**。

### 📌 本周任务（3/31 周一分配 → 4/4 周五交）

#### 任务 1：抖音竞品数据追踪
- 跟踪 5 个对标账号（参考 `docs/research/抖音对标账号清单_0327.md`）
- 记录每个账号最近 7 天：新发视频数、最高播放量视频、评论区高频词（前5个）
- **交付**：一张表格，每个账号一行，附截图

#### 任务 2：初序目标用户评论挖掘
- 去 5 个对标账号最热视频下面，各翻 20 条评论（共 100 条）
- 整理出：用户最常提的问题/痛点/疑问（分类归纳）
- **交付**：痛点词云 + TOP 10 高频问题清单

#### 任务 3：大健康行业门店调研
- 找 3 个做"体检报告解读"或"健康管理"的线下门店/机构案例
- 看他们怎么收费、怎么获客、有没有线上入口
- **交付**：每个案例 200 字总结 + 对我们模型的启发

### ⚙️ 任务分配机制
| 项目 | 规则 |
|------|------|
| **分配时间** | 每周一，子默发给知远 |
| **交付时间** | 每周五 18:00 前 |
| **任务数量** | 每周 2-3 个，不超过 3 个 |
| **格式要求** | 出结论不出报告，每个任务不超过 500 字 |
| **质量标准** | 必须有数据来源、有截图、有自己的判断 |
| **紧急任务** | Zoey 随时加，48h 内交 |

### 📊 评估标准（子默打分 1-5）
- **完成度**：交了没有？完整吗？
- **质量**：数据准不准？有没有自己的洞察？
- **可用度**：给到 Zoey 能直接用，还是要大改？

> 连续 2 周评分 ≥4 → 加任务难度；连续 2 周 ≤2 → 需要谈话调整

---

### 🔔 持续跟踪事项
- **广州海珠区 OPC 一人公司政策**（2026-03-19 公布，正式文件待发布）
  - 子默每周一检查 gz.gov.cn 是否发布正式文件
  - 发布后第一时间通知 Zoey 并整理申请条件

---

## 📊 数据复盘计划

### 小红书
- **3/24（周二）第一次复盘** — Day 1-7 全发完后，看 CES 排名、最佳话题、发布时间效果
- **3/31（周一）深度复盘** — 两周数据看趋势，调整第三周策略
- 日常只看违规提示，不盯数据

### 海外（X / YouTube / Substack）
- **3/22（周日）第一次复盘** — 子默拉数据 + 明哲分析
  - 看：①最高 impressions 推文 ②哪条有点击 ③Substack 订阅增长
- **3/29（周日）深度复盘** — 明哲出报告，策略调整
- Zoey 届时截图 X + YouTube 后台数据，子默整理发明哲

---

## 📚 商业学习跟踪
- 固定时间：**周三 + 周日**
- 学习计划：`docs/learning/学习计划.md`
- **3/19（周三）学习缺席** ❌ — 没跑，没跟进
- **3/23（周日）补上** — 连做 2 次（补周三 + 周日正常），子默主动提醒

---

## Zoey 健康方案
- 执行表：`docs/personal/week1_health_plan.md`（3/15-3/21）
- 补剂：Cellssense + PQQ Pro + Life Blood + VD3
- 银耳汤：周日炖好，周一/三/五各喝一碗
