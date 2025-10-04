# 前端页面自动截图测试工具

基于 Puppeteer 的网页自动截图工具，用于前端页面的自动化测试。

## 项目介绍

这个工具可以自动对网页进行截图，主要用途：
- 视觉回归测试
- 跨浏览器兼容性测试
- 响应式设计验证
- 自动化质量保证

## 功能特性

- ✅ 基础网页截图
- ✅ 批量URL处理
- ✅ 多种视口尺寸（手机/平板/桌面）
- ✅ 全页面或元素截图
- ✅ 自动化测试套件

## 安装使用

1. **安装依赖**
   ```bash
   npm install
   ```

2. **基础截图**
   ```bash
   node screenshot.js https://example.com
   ```

3. **自定义文件名**
   ```bash
   node screenshot.js https://example.com 我的截图.png
   ```

4. **运行测试**
   ```bash
   npm test
   ```

## 项目结构

```
project1/
├── package.json      # 项目配置
├── screenshot.js     # 主要功能
├── test.js          # 测试套件
├── README.md        # 说明文档
└── screenshots/     # 输出目录
```

## 使用示例

### JavaScript API

```javascript
const { takeAdvancedScreenshot } = require('./screenshot');

// 高级截图
await takeAdvancedScreenshot('https://example.com', {
  filename: '自定义截图.png',
  width: 1920,
  height: 1080,
  fullPage: true
});
```

### 批量截图

```javascript
const urls = [
  'https://example.com',
  'https://github.com'
];

const results = await takeMultipleScreenshots(urls);
```

## 测试功能

运行 `npm test` 会执行以下测试：

1. **基础截图测试** - 简单网页截图
2. **高级选项测试** - 自定义参数截图
3. **批量测试** - 多个URL截图
4. **响应式测试** - 不同设备尺寸
5. **性能测试** - 截图速度测试

## 配置选项

```javascript
{
  filename: '截图名称.png',    // 文件名
  width: 1280,              // 视口宽度
  height: 800,              // 视口高度
  fullPage: true,           // 全页面截图
  waitTime: 2000,           // 等待时间(ms)
  selector: '#element'      // 特定元素截图
}
```

## 常见问题

**截图空白？**
- 增加 `waitTime` 等待时间

**网络超时？**
- 检查网络连接
- 增加超时时间

**权限错误？**
- 检查文件夹权限

## 研究背景

这个项目基于以下技术研究：

1. **Puppeteer 官方文档** - 自动化浏览器控制
2. **视觉回归测试** - 前端测试最佳实践
3. **Web 自动化测试** - 现代测试框架

## 应用场景

- 🔄 持续集成/持续部署 (CI/CD)
- 📱 跨设备兼容性测试
- 🎨 UI/UX 设计验证
- 📊 自动化报告生成
- 🔍 质量保证流程
