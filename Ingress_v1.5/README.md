# Ingress 打卡点系统

## 项目简介
Ingress 是一个基于 Vue.js 和 Node.js 的打卡点管理系统，支持多种用户角色（管理员、普通用户、访客）进行打卡和占领操作。系统的特色在于需要三种不同类型的用户都在同一打卡点打卡后，才能实现占领。

## 功能特点
- 多角色用户系统（管理员、普通用户、访客）
- 实时打卡状态显示
- 基于角色的权限控制
- JWT 用户认证
- 响应式界面设计

## 技术栈
### 前端
- Vue.js 3
- Vue Router
- Axios
- LocalStorage
- CSS Grid/Flexbox

### 后端
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt.js

## 系统要求
- Node.js >= 14.0.0
- MongoDB >= 4.0.0
- npm >= 6.0.0

## 快速开始

### 前端部署
```bash
# 克隆项目
git clone https://github.com/your-username/ingress.git

# 进入项目目录
cd ingress

# 安装依赖
npm install

# 启动开发服务器
npm run serve
```

### 后端部署
```bash
# 进入后端目录
cd ingress-backend

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env
# 编辑 .env 文件，设置必要的环境变量

# 启动服务器
npm start
```

## 项目结构
```
ingress/
├── src/
│   ├── components/        # 组件文件
│   ├── router/           # 路由配置
│   ├── store/            # 状态管理
│   ├── config/           # 配置文件
│   └── App.vue           # 根组件
├── public/               # 静态资源
└── package.json          # 项目配置文件

ingress-backend/
├── models/               # 数据模型
├── routes/              # 路由处理
├── middleware/          # 中间件
└── server.js            # 服务器入口文件
```

## API 文档

### 认证接口
- POST `/api/auth/login` - 用户登录
- POST `/api/auth/register` - 用户注册

### 打卡点接口
- GET `/api/checkpoints` - 获取所有打卡点
- POST `/api/checkpoints/checkin` - 用户打卡
- POST `/api/checkpoints/capture` - 占领打卡点

## 使用说明

### 用户登录
1. 访问系统首页
2. 输入用户名和密码
3. 选择用户类型
4. 点击登录按钮

### 打卡操作
1. 在仪表板查看打卡点
2. 点击"打卡"按钮进行打卡
3. 等待其他类型用户打卡
4. 所有类型用户打卡后可进行占领

## 开发指南

### 代码规范
- 使用 ESLint 进行代码检查
- 遵循 Vue.js 官方风格指南
- 使用 Prettier 进行代码格式化

### 提交规范
```
feat: 添加新功能
fix: 修复问题
docs: 修改文档
style: 修改格式
refactor: 代码重构
test: 添加测试
chore: 修改构建过程或辅助工具
```

## 测试
```bash
# 运行单元测试
npm run test:unit

# 运行端到端测试
npm run test:e2e
```

## 部署
1. 构建前端项目
```bash
npm run build
```

2. 配置后端环境变量
3. 启动 MongoDB 服务
4. 运行后端服务器

## 贡献指南
1. Fork 本仓库
2. 创建特性分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request


## 致谢
感谢所有贡献者对项目的支持！
