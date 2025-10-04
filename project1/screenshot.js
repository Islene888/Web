// 引入必要的模块
const puppeteer = require('puppeteer');  // Puppeteer：用于控制Chrome浏览器的库
const fs = require('fs');                // fs：Node.js文件系统模块，用于文件操作
const path = require('path');            // path：Node.js路径模块，用于处理文件路径

/**
 * 基础截图功能函数
 * @param {string} url - 需要截图的网页URL地址
 * @param {string} filename - 可选参数：截图文件名，默认为'screenshot.png'
 * @returns {Promise<string>} 返回截图文件的完整路径
 */
async function takeScreenshot(url, filename = 'screenshot.png') {
  try {
    // 在控制台输出开始截图的信息
    console.log(`开始为以下网址截图: ${url}`);

    // 启动浏览器实例
    const browser = await puppeteer.launch({
      headless: true,  // 无头模式：true表示不显示浏览器界面，false可用于调试
      args: ['--no-sandbox', '--disable-setuid-sandbox']  // 安全参数，避免权限问题
    });

    // 创建新的页面标签
    const page = await browser.newPage();

    // 设置浏览器视口大小（模拟屏幕分辨率）
    await page.setViewport({
      width: 1280,           // 宽度：1280像素
      height: 800,           // 高度：800像素
      deviceScaleFactor: 1   // 设备缩放比例：1表示不缩放
    });

    // 导航到指定的URL
    console.log('正在访问页面...');
    await page.goto(url, {
      waitUntil: 'networkidle2',  // 等待策略：网络空闲2秒后认为页面加载完成
      timeout: 30000              // 超时时间：30秒
    });

    // 额外等待时间，确保动态内容（如JavaScript生成的内容）完全加载
    await page.waitForTimeout(2000);  // 等待2秒

    // 开始截图过程
    console.log('正在生成截图...');
    // 构建截图文件的完整保存路径
    const screenshotPath = path.join(__dirname, 'screenshots', filename);

    // 检查并创建screenshots目录（如果不存在）
    const screenshotsDir = path.join(__dirname, 'screenshots');
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });  // recursive:true 允许创建多级目录
    }

    // 执行截图操作
    await page.screenshot({
      path: screenshotPath,  // 保存路径
      fullPage: true,        // 截取整个页面（包括需要滚动才能看到的部分）
      type: 'png'           // 图片格式：PNG
    });

    // 输出成功信息
    console.log(`截图已保存到: ${screenshotPath}`);

    // 关闭浏览器释放资源
    await browser.close();

    // 返回截图文件路径
    return screenshotPath;

  } catch (error) {
    // 错误处理：如果截图过程中出现任何错误，输出错误信息并重新抛出错误
    console.error('截图过程中发生错误:', error);
    throw error;  // 重新抛出错误，让调用者可以处理
  }
}

/**
 * 高级截图功能函数（支持更多自定义选项）
 * @param {string} url - 需要截图的网页URL地址
 * @param {Object} options - 截图配置选项对象
 * @param {string} options.filename - 截图文件名
 * @param {number} options.width - 视口宽度
 * @param {number} options.height - 视口高度
 * @param {boolean} options.fullPage - 是否截取整个页面
 * @param {number} options.waitTime - 等待时间（毫秒）
 * @param {string} options.selector - CSS选择器，用于截取特定元素
 * @returns {Promise<string>} 返回截图文件的完整路径
 */
async function takeAdvancedScreenshot(url, options = {}) {
  // 使用解构赋值提取配置选项，并设置默认值
  const {
    filename = 'screenshot.png',  // 默认文件名
    width = 1280,                 // 默认宽度
    height = 800,                 // 默认高度
    fullPage = true,              // 默认截取整个页面
    waitTime = 2000,              // 默认等待2秒
    selector = null               // 默认不指定特定元素（截取整个页面）
  } = options;

  try {
    console.log(`开始高级截图功能，目标网址: ${url}`);

    // 启动浏览器（配置与基础函数相同）
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // 使用用户指定的视口尺寸
    await page.setViewport({ width, height, deviceScaleFactor: 1 });

    // 导航到页面
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

    // 使用用户指定的等待时间
    await page.waitForTimeout(waitTime);

    // 确保截图目录存在
    const screenshotsDir = path.join(__dirname, 'screenshots');
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }

    // 构建完整的截图文件路径
    const screenshotPath = path.join(screenshotsDir, filename);

    // 根据是否指定了CSS选择器来决定截图方式
    if (selector) {
      // 如果指定了CSS选择器，只截取特定元素
      const element = await page.$(selector);  // 查找指定的页面元素
      if (element) {
        // 如果找到了元素，对该元素进行截图
        await element.screenshot({ path: screenshotPath });
        console.log(`元素截图已保存: ${screenshotPath}`);
      } else {
        // 如果没有找到指定元素，抛出错误
        throw new Error(`未找到指定元素: ${selector}`);
      }
    } else {
      // 如果没有指定CSS选择器，截取整个页面
      await page.screenshot({
        path: screenshotPath,
        fullPage: fullPage,  // 使用用户指定的fullPage设置
        type: 'png'
      });
      console.log(`整页截图已保存: ${screenshotPath}`);
    }

    // 关闭浏览器
    await browser.close();
    return screenshotPath;

  } catch (error) {
    console.error('高级截图功能出错:', error);
    throw error;
  }
}

/**
 * 批量截图功能函数（可以同时为多个网址截图）
 * @param {Array<string>} urls - 需要截图的URL数组
 * @param {Object} options - 截图配置选项（与高级截图函数相同）
 * @returns {Promise<Array>} 返回包含所有截图结果的数组
 */
async function takeMultipleScreenshots(urls, options = {}) {
  const results = [];  // 存储所有截图结果的数组

  // 遍历URL数组，为每个URL进行截图
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    // 为每个截图生成唯一的文件名（如果用户没有指定）
    const filename = options.filename || `screenshot_${i + 1}.png`;

    try {
      // 显示当前处理进度
      console.log(`正在处理 ${i + 1}/${urls.length}: ${url}`);

      // 调用高级截图函数，为当前URL截图
      const result = await takeAdvancedScreenshot(url, {
        ...options,  // 展开用户提供的选项
        filename: `${i + 1}_${filename}`  // 在文件名前添加序号，避免重名
      });

      // 将成功结果添加到结果数组
      results.push({
        url: url,           // 原始URL
        success: true,      // 成功标记
        path: result,       // 截图文件路径
        timestamp: new Date().toISOString()  // 时间戳
      });

    } catch (error) {
      // 如果某个URL截图失败，记录错误但继续处理其他URL
      console.error(`截图失败 ${url}:`, error.message);
      results.push({
        url: url,           // 原始URL
        success: false,     // 失败标记
        error: error.message,  // 错误信息
        timestamp: new Date().toISOString()  // 时间戳
      });
    }
  }

  // 返回所有结果（包括成功和失败的）
  return results;
}

// 导出函数，使其他文件可以引用这些功能
module.exports = {
  takeScreenshot,           // 基础截图功能
  takeAdvancedScreenshot,   // 高级截图功能
  takeMultipleScreenshots   // 批量截图功能
};

// 命令行使用逻辑：当直接运行此文件时执行
if (require.main === module) {
  // 从命令行参数获取URL和文件名
  const url = process.argv[2];        // 第一个参数：URL
  const filename = process.argv[3];   // 第二个参数：文件名（可选）

  // 检查是否提供了必需的URL参数
  if (!url) {
    console.log('使用方法: node screenshot.js <URL> [文件名]');
    console.log('示例: node screenshot.js https://example.com my-screenshot.png');
    process.exit(1);  // 退出程序，返回错误代码1
  }

  // 执行截图操作
  takeScreenshot(url, filename)
    .then((path) => {
      // 截图成功时的处理
      console.log('✅ 截图完成！');
      console.log(`📁 文件保存位置: ${path}`);
    })
    .catch((error) => {
      // 截图失败时的处理
      console.error('❌ 截图失败:', error.message);
      process.exit(1);  // 退出程序，返回错误代码1
    });
}