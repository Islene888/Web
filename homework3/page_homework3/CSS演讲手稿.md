# CSS 样式控制演讲手稿
**How CSS Controls HTML Styles | CSS如何控制HTML样式**

---

## 1. 项目概述 | Project Overview

**HTML与CSS分离 | HTML-CSS Separation**
- HTML负责内容结构 | HTML handles content structure
- CSS负责视觉样式 | CSS controls visual styling
- 提高可维护性 | Improves maintainability

**文件组成 | File Structure**
- `index.html` - 内容结构 | Content structure
- `styles.css` - 样式控制 | Style control

---

## 2. 连接原理 | Connection Principle

### HTML引入CSS | HTML Links CSS
```html
<head>
    <link rel="stylesheet" href="styles.css">
</head>
```

### 选择器对应 | Selector Matching
```html
<div class="header">           <!-- HTML element -->
```
```css
.header { display: flex; }     /* CSS selector */
```

**工作流程 | Workflow:**
1. 浏览器读取HTML | Browser reads HTML
2. 下载CSS文件 | Downloads CSS file
3. 应用样式规则 | Applies style rules

---

## 3. 核心控制机制 | Core Control Mechanisms

### 盒模型 | Box Model
```css
.content-box {
    width: 100%;       /* 宽度 | Width */
    padding: 20px;     /* 内边距 | Padding */
    border: 2px solid; /* 边框 | Border */
    margin: 20px 0;    /* 外边距 | Margin */
}
```

### 弹性布局 | Flexbox Layout
```css
.header {
    display: flex;                  /* 启用弹性布局 | Enable flexbox */
    justify-content: space-between; /* 左右分布 | Space between */
    align-items: center;            /* 垂直居中 | Center align */
}
```

### 网格布局 | Grid Layout
```css
.two-column {
    display: grid;                  /* 网格布局 | Grid layout */
    grid-template-columns: 1fr 1fr; /* 两等宽列 | Two equal columns */
    gap: 20px;                      /* 间距 | Gap */
}
```

---

## 4. 实际应用 | Practical Implementation

### 页面整体 | Page Structure
```css
body {
    font-family: Arial, sans-serif; /* 全局字体 | Global font */
    padding: 40px 20px;            /* 页面边距 | Page padding */
}

.mockup-container {
    max-width: 1200px;  /* 最大宽度 | Max width */
    margin: 0 auto;     /* 水平居中 | Center horizontally */
}
```

### 表单控制 | Form Control
```css
.form-row-double {
    display: grid;                  /* 网格布局 | Grid layout */
    grid-template-columns: 1fr 1fr; /* 双列 | Two columns */
    gap: 15px;                      /* 间距 | Gap */
}

.input-box {
    width: 100%;        /* 占满宽度 | Full width */
    height: 35px;       /* 设置高度 | Set height */
    border: 2px solid;  /* 添加边框 | Add border */
}
```

---

## 5. 响应式设计 | Responsive Design

### 媒体查询 | Media Queries
```css
/* 平板适配 | Tablet adaptation */
@media (max-width: 768px) {
    .header {
        flex-direction: column; /* 垂直排列 | Vertical layout */
    }

    .form-row-double {
        grid-template-columns: 1fr; /* 单列 | Single column */
    }
}

/* 手机适配 | Mobile adaptation */
@media (max-width: 480px) {
    body { padding: 20px 10px; }
    .site-title { font-size: 20px; }
}
```

**断点选择 | Breakpoint Selection:**
- 手机 Mobile: <480px
- 平板 Tablet: 481-768px
- 桌面 Desktop: >769px

---

## 6. 优先级规则 | Priority Rules

**CSS优先级 | CSS Priority (高→低 | High→Low):**
1. 内联样式 | Inline styles
2. ID选择器 | ID selectors (#id)
3. 类选择器 | Class selectors (.class)
4. 标签选择器 | Element selectors (div, p)

**布局选择 | Layout Choice:**
- **Flexbox**: 一维布局 | 1D layout (导航栏 | navigation)
- **Grid**: 二维布局 | 2D layout (页面布局 | page layout)

---

## 7. 工作原理总结 | Working Principle Summary

**CSS控制HTML的4个步骤 | 4 Steps of CSS Controlling HTML:**

1. **结构定义 | Structure Definition**
   - HTML提供语义化标签 | HTML provides semantic tags

2. **样式选择 | Style Selection**
   - CSS选择器精确定位元素 | CSS selectors target elements

3. **规则应用 | Rule Application**
   - 浏览器解析并应用样式 | Browser parses and applies styles

4. **响应式适配 | Responsive Adaptation**
   - 媒体查询适配不同设备 | Media queries adapt to devices

**核心优势 | Core Advantages:**
- 分离关注点 | Separation of concerns
- 代码重用性 | Code reusability
- 更好的维护性 | Better maintainability

---

**演讲者 | Presenter:** Ella
**项目 | Project:** 瓦列霍公共图书馆网站 | Vallejo Public Library Website