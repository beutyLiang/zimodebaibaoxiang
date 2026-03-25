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

### 发布节奏（3/20 更新）
- **X**：每天 ≥2 条（至少 1 条带 CTA），美国上午=中国晚上，**晚上 20:00-21:00 是黄金时间**
- **YouTube**：每天 1 条 Shorts
- **TikTok**：每天 21:30 发视频 + 同步 YouTube Shorts（❌ 暂停等美国 eSIM）
- **Substack**：每周三发 1 篇英文长文

### 脚本来源
- Week 1 脚本：`docs/content/week1_tiktok_scripts.md`（7条，用 Flow 提示词）
- **Week 2 脚本**：`docs/content/notebooklm_scripts_week2.md`（NotebookLM × Wu Wei，当前在用）
- **Week 3 脚本**：`docs/content/notebooklm_scripts_week3.md`（NotebookLM × Yin-Yang，已备好）
- **Week 4 脚本**：`docs/content/notebooklm_scripts_week4.md`（NotebookLM × Yi Jing，已备好）
- **YouTube 标题描述**：`docs/content/youtube_titles_day1_to_day5.md`（实际已含 Day 1-7）
- NotebookLM 笔记本：`b4ab8513`（Wu Wei 模型，1 source），`39c239c0`（归元全模型，16 sources）

### 当前进度（截至 2026-03-21 晚）
- X：Day 8 已发（共鸣型），评论分发 x1
- YouTube：已发到 Day 7（Stop Comparing，用TikTok视频同步）
- TikTok：Day 1 已发（3/16），❓ 暂停等美国 eSIM
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

## 📡 海外每日信息雷达（知远执行，每天交付）

> **2026-03-22 调整** — 原为 Zoey 执行，因英文门槛改为知远负责
> 知远扫完后用中文整理要点 → 交子默 → 子默转 Zoey
> 详细计划见：`docs/strategy/overseas_info_radar_plan.md`

### 每天 3 步（共 30 分钟）
1. **扫需求（10分钟）**：Reddit 搜 "I struggle with" / "I feel stuck" → 整理中文要点
2. **扫赚钱项目（10分钟）**：Gumroad Discover + Product Hunt → 记录产品名+定价+痛点
3. **扫爆款内容（10分钟）**：X 看 Dan Koe / Sahil Bloom → 标记可蹭帖子

### 每天交付格式
📌 今日痛点：（用户原话）
💰 热卖产品：名字 + 价格 + 为什么卖
🔥 可蹭帖子：链接 + 为什么能蹭
💡 $7方案：产品名 + 具体解决什么
🚀 **是否今天上线：YES / NO** + 理由

### 铁律
- 每天最多推 **1 个产品方向**
- 所有报告必须包含“我们今天能卖什么”，否则不算完成

### 团队闭环
> 知远找机会（1个）→ 子默 48h 做出来 → 明哲改成能卖 → Zoey 推出去验证

---

## 📡 国内商业周报（知远执行，每周一交付）

> **2026-03-21 新增** — 知远负责国内商业情报，Zoey 不需要额外花时间
> 每周一子默提醒知远跑报告 → 知远交付 → 子默整理要点给 Zoey

### 扫描范围（4 大板块）

| 板块 | 扫描内容 | 关注重点 |
|------|---------|---------|
| 🏥 健康行业政策 | 药监局/卫健委/市场监管总局最新通知 | 肠道项目合规、益生菌标准、健康类内容审核 |
| 📱 小红书趋势 | 健康/养生类爆款话题 + 竞品账号动态 | 初序内容方向参考 |
| 📹 抖音趋势 | 健康/养生类爆款视频 + 对标账号 | 选题方向、爆款结构、流量玩法 |
| 📺 视频号趋势 | 健康/知识类视频 + 私域打法 | 视频号生态差异、转化路径参考 |
| 🏢 竞品动态 | 华大基因/热心肠/同类 AI 代运营/新入局者 | 定价变化、新产品、融资动态 |
| 🔧 工具与平台 | 国内新 AI 工具/支付渠道/小程序平台变化 | 效率提升、成本优化 |
| 📰 最新商业动态 | 36氪/虎嗅/创业邦/财经头条 | 融资事件、行业并购、新商业模式、政策红利 |

### 交付格式（明哲审核版）

```
# 知远国内商业周报 — 第 X 周（日期）

## 🔴 本周必知
- 情报：...
- 💰 我们可以卖什么：（必须具体到产品）

## 🟡 值得关注
- 情报：...
- 💰 可变现动作：...

## 🟢 趋势信号
- ...

## 💡 知远建议
- ...
```

### ⚠️ 铁律
- 每条 🔴 和 🟡 必须附带"我们可以卖什么"，否则不算完成

### 存档位置
- `docs/research/知远周报_YYYYMMDD.md`

### 第一份周报（3/23）专项任务
- 🔴 **华大基因 C 端 ROI 摸底**：安馨可在抖音/小红书的投放投产比，对我们定价的参考
- 🔴 **小红书敏感词实测**：知远发现"粪菌移植"在小红书被限流，需确认替代词（FMT/菌群干预/肠道微生态重启）

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
