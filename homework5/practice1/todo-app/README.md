# To-Do List 应用

一个使用 Node.js + Express + SQLite 构建的简易任务管理应用。

## 功能特性

✅ **完整的 CRUD 操作**
- 添加新任务（包含标题和可选描述）
- 查看所有任务
- 编辑现有任务
- 删除任务
- 标记任务为完成/未完成

✅ **智能过滤系统**
- 查看全部任务
- 只看待完成任务
- 只看已完成任务

✅ **实时统计**
- 总任务数量
- 已完成任务数量
- 待完成任务数量

✅ **用户体验优化**
- 响应式设计，支持移动端
- 实时消息提示
- 加载动画
- 模态框编辑
- 键盘快捷键支持

## 技术栈

- **后端**: Node.js + Express.js
- **数据库**: SQLite3
- **前端**: HTML5 + CSS3 + 原生 JavaScript
- **API**: RESTful API 设计

## 项目结构

```
todo-app/
├── server.js              # 主服务器文件
├── package.json           # 项目配置和依赖
├── database.db            # SQLite 数据库文件（运行后自动生成）
├── README.md              # 项目说明文档
├── db/
│   └── init.js           # 数据库初始化脚本
└── public/               # 前端静态文件
    ├── index.html        # 主页面
    ├── style.css         # 样式文件
    └── app.js           # 前端 JavaScript 逻辑
```

## 安装和运行

### 1. 安装依赖

```bash
cd todo-app
npm install
```

### 2. 启动应用

```bash
# 开发模式（使用 nodemon，文件变更时自动重启）
npm run dev

# 或者直接运行
npm start
```

### 3. 访问应用

打开浏览器访问：http://localhost:3000

## API 接口说明

### 获取所有任务
```
GET /tasks
```

**响应示例：**
```json
[
  {
    "id": 1,
    "title": "学习 Node.js",
    "description": "完成 Express 教程",
    "completed": 0,
    "created_at": "2024-01-15 10:30:00"
  }
]
```

### 添加新任务
```
POST /tasks
Content-Type: application/json

{
  "title": "任务标题",
  "description": "任务描述（可选）"
}
```

### 更新任务
```
PUT /tasks/:id
Content-Type: application/json

{
  "title": "新标题",
  "description": "新描述",
  "completed": true
}
```

### 删除任务
```
DELETE /tasks/:id
```

## 数据库结构

### tasks 表

| 字段名 | 类型 | 说明 |
|--------|------|------|
| id | INTEGER PRIMARY KEY | 任务唯一标识（自增） |
| title | TEXT NOT NULL | 任务标题 |
| description | TEXT | 任务描述（可选） |
| completed | INTEGER DEFAULT 0 | 完成状态（0=未完成，1=已完成） |
| created_at | DATETIME DEFAULT CURRENT_TIMESTAMP | 创建时间 |

## 主要功能代码说明

### 1. 数据库初始化 (db/init.js)
- 自动创建数据库文件
- 初始化 tasks 表结构
- 提供数据库连接函数

### 2. Express 服务器 (server.js)
- 实现所有 RESTful API 端点
- 静态文件服务
- 错误处理中间件
- CORS 支持

### 3. 前端交互 (public/app.js)
- 使用 Fetch API 与后端通信
- DOM 操作和事件处理
- 状态管理和数据渲染
- 用户交互反馈

### 4. 界面设计 (public/style.css)
- 现代化的渐变色设计
- 响应式布局
- 动画效果和过渡
- 无障碍设计支持

## 使用说明

### 添加任务
1. 在顶部输入框中输入任务标题
2. （可选）输入任务描述
3. 点击"添加任务"按钮或按回车键

### 管理任务
- **完成任务**: 点击任务左侧的复选框
- **编辑任务**: 点击"编辑"按钮，在弹出窗口中修改
- **删除任务**: 点击"删除"按钮并确认

### 筛选任务
- **全部**: 显示所有任务
- **待完成**: 只显示未完成的任务
- **已完成**: 只显示已完成的任务

## 开发特性

### 安全性
- HTML 内容转义防止 XSS 攻击
- SQL 参数化查询防止 SQL 注入
- 输入验证和错误处理

### 性能优化
- 静态资源缓存
- 数据库连接管理
- 前端状态管理

### 用户体验
- 加载状态提示
- 操作结果反馈
- 键盘导航支持
- 移动端适配

## 扩展建议

1. **用户系统**: 添加用户注册和登录功能
2. **任务分类**: 支持任务标签和分类
3. **截止日期**: 添加任务到期时间提醒
4. **数据导出**: 支持导出任务数据
5. **搜索功能**: 添加任务搜索和排序
6. **团队协作**: 支持多用户共享任务列表

## 故障排除

### 常见问题

**Q: 启动时提示端口被占用**
A: 修改 server.js 中的 PORT 变量或关闭占用 3000 端口的其他程序

**Q: 数据库连接失败**
A: 确保项目目录有写入权限，SQLite 会自动创建数据库文件

**Q: 前端页面无法加载**
A: 检查静态文件路径和服务器状态

## 学习价值

这个项目适合：
- Node.js 和 Express 初学者
- 学习 RESTful API 设计
- 理解前后端分离架构
- 掌握 SQLite 数据库操作
- 练习现代 JavaScript 开发

通过这个项目，你将学到完整的 Web 应用开发流程，从后端 API 设计到前端交互实现。