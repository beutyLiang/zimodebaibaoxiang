---
description: 部署代码到 GitHub Pages
---

# 部署流程

## 1. 暂存修改的文件
// turbo
```bash
cd d:\projects\test
git add -A
```

## 2. 查看即将提交的变更
// turbo
```bash
cd d:\projects\test
git diff --cached --stat
```

## 3. 提交代码
提交信息格式：`类型: 中文描述`
- `feat:` 新功能
- `fix:` 修复
- `style:` 样式调整
- `refactor:` 重构
- `revert:` 回退

```bash
cd d:\projects\test
git commit -m "类型: 描述"
```

## 4. 推送到 GitHub
// turbo
```bash
cd d:\projects\test
git push origin main
```

## 5. 验证部署
- GitHub Pages 通常需要 **1-2 分钟** 完成部署
- 提醒用户 **Ctrl+Shift+R** 清缓存强制刷新
- 线上地址：
  - index.html: https://beutyliang.github.io/zimodebaibaoxiang/chuxu-quiz/index.html
  - index2.html: https://beutyliang.github.io/zimodebaibaoxiang/chuxu-quiz/index2.html
  - 后台: https://beutyliang.github.io/zimodebaibaoxiang/chuxu-quiz/admin.html
