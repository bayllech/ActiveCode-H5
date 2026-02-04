# Infinity Code - 激活码生成器

<div align="center">
  <h3>⚡ 一个现代化、高颜值的在线批量激活码/卡密生成工具 ⚡</h3>
  <br />
  
  [![在线体验](https://img.shields.io/badge/Live_Demo-在线体验-3b82f6?style=for-the-badge&logo=safari)](https://link.3ceng.cn/view/5ae202f6)
</div>

<br />

## 📖 简介

**Infinity Code** 是一个基于纯前端技术开发的轻量级激活码生成系统。它结合了极简主义与科技感的设计风格（玻璃拟态 + 动态光效），旨在为用户提供快速、安全且视觉愉悦的批量密钥生成体验。

## ✨ 核心特性

- 🎨 **极致设计**：采用现代化的玻璃拟态（Glassmorphism）设计，内置精美的日/夜间模式切换。
- 🚀 **超高性能**：基于 Web Crypto API，纯前端本地生成，支持秒级生成上万条唯一密钥。
- 🛠 **高度定制**：
    - 支持自定义前缀（如 `VIP-`）
    - 长度可调 (8-128位)
    - 字符集灵活组合（数字/大写/小写）
- 🧩 **自定义封装**：支持自定义 JSON 结果模版，自动将生成的卡密注入到指定位置（使用 `$CODE$` 占位符）。
- 📦 **开箱即用**：提供标准版（分离式结构）和 **单文件版 (`single_page.html`)**，方便不同场景分发。
- 📱 **全端适配**：完美适配 PC、平板及移动端设备。

## 🔗 在线体验

点击下方链接即可直接使用：
> **[https://link.3ceng.cn/view/5ae202f6](https://link.3ceng.cn/view/5ae202f6)**

## 📂 项目结构

```
ActiveCode-H5/
├── index.html          # 主页面结构
├── style.css           # 核心样式 (包含明暗主题定义)
├── script.js           # 业务逻辑 (生成算法、交互处理)
├── single_page.html    # [便携版] ALL-IN-ONE 单文件
├── assemble.py         # 单文件打包脚本
└── README.md           # 项目说明文档
```

## 🛠 使用说明

1. **设置参数**：输入想要的前缀（可选），设定生成的长度和数量。
2. **选择字符**：勾选需要的字符类型（数字、大写字母、小写字母）。
3. **点击生成**：系统将瞬间生成不重复的密钥列表。
4. **结果封装**：在下方的“自定义结果封装”区域输入 JSON 模版，使用 `$CODE$` 作为占位符，实时预览最终数据格式。
5. **一键复制**：支持复制纯文本列表或格式化后的 JSON 数据。

## 💻 本地开发

```bash
# 克隆项目
git clone https://github.com/bayllech/ActiveCode-H5.git

# 进入目录
cd ActiveCode-H5

# 直接在浏览器中打开 index.html 即可

# 更新单文件版本
python3 assemble.py
```

---

*无需后端服务器，所有数据均在您的浏览器本地处理，安全无忧。*
