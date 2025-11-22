/**
 * 猫咪事实应用主类 (TypeScript版本)
 * 负责管理整个应用的状态和API交互
 * 作业6 - 使用REST API的网页应用 + TypeScript类型安全
 */

/**
 * API响应数据接口
 * 定义从Cat Facts API返回的数据结构
 */
interface ApiResponse {
    fact: string;        // 猫咪事实文本
    length: number;      // 事实文本长度
}

/**
 * 猫咪事实数据接口
 * 应用内部存储的事实数据结构
 */
interface CatFact {
    id: number;          // 唯一标识符
    text: string;        // 事实文本内容
    timestamp: Date;     // 添加时间戳
}

/**
 * 统计数据接口
 * 用于类型化统计信息
 */
interface Statistics {
    totalFacts: number;     // 总事实数
    longestFact: number;    // 最长事实字符数
    avgLength: number;      // 平均长度
}

/**
 * DOM元素接口
 * 确保获取的DOM元素不为null
 */
interface DOMElements {
    getFactBtn: HTMLButtonElement;
    getMultipleBtn: HTMLButtonElement;
    clearBtn: HTMLButtonElement;
    loading: HTMLDivElement;
    error: HTMLDivElement;
    factsContainer: HTMLDivElement;
    totalFactsSpan: HTMLSpanElement;
    longestFactSpan: HTMLSpanElement;
    avgLengthSpan: HTMLSpanElement;
}

/**
 * 猫咪事实应用主类
 */
class CatFactsApp {
    /**
     * API基础URL - 只读属性
     */
    private readonly apiUrl: string = 'https://catfact.ninja';

    /**
     * 存储所有获取到的事实数据的数组
     */
    private facts: CatFact[] = [];

    /**
     * DOM元素引用缓存
     */
    private elements!: DOMElements;

    /**
     * 构造函数：初始化应用
     */
    constructor() {
        // 调用初始化方法
        this.init();
    }

    /**
     * 应用初始化方法
     * 获取DOM元素引用、绑定事件监听器并更新统计数据
     */
    private init(): void {
        this.cacheElements();   // 缓存DOM元素引用
        this.bindEvents();      // 绑定按钮点击事件
        this.updateStats();     // 初始化统计数据显示
    }

    /**
     * 缓存所有需要的DOM元素引用
     * 使用类型断言确保元素存在
     */
    private cacheElements(): void {
        // 类型安全的DOM元素获取
        const getElement = <T extends HTMLElement>(id: string): T => {
            const element = document.getElementById(id) as T | null;
            if (!element) {
                throw new Error(`Element with id '${id}' not found`);
            }
            return element;
        };

        this.elements = {
            getFactBtn: getElement<HTMLButtonElement>('getFactBtn'),
            getMultipleBtn: getElement<HTMLButtonElement>('getMultipleBtn'),
            clearBtn: getElement<HTMLButtonElement>('clearBtn'),
            loading: getElement<HTMLDivElement>('loading'),
            error: getElement<HTMLDivElement>('error'),
            factsContainer: getElement<HTMLDivElement>('factsContainer'),
            totalFactsSpan: getElement<HTMLSpanElement>('totalFacts'),
            longestFactSpan: getElement<HTMLSpanElement>('longestFact'),
            avgLengthSpan: getElement<HTMLSpanElement>('avgLength')
        };
    }

    /**
     * 绑定所有用户界面事件
     * 为按钮添加点击事件监听器
     */
    private bindEvents(): void {
        // 绑定事件：使用箭头函数保持this指向
        this.elements.getFactBtn.addEventListener('click', () => this.getRandomFact());
        this.elements.getMultipleBtn.addEventListener('click', () => this.getMultipleFacts(5));
        this.elements.clearBtn.addEventListener('click', () => this.clearAllFacts());
    }

    /**
     * 通用API数据获取方法
     * 使用async/await处理异步HTTP请求
     * @param endpoint - API端点路径
     * @returns Promise<ApiResponse> 返回类型化的API响应
     */
    private async fetchData(endpoint: string): Promise<ApiResponse> {
        try {
            // 发送HTTP GET请求到API
            const response: Response = await fetch(`${this.apiUrl}${endpoint}`);

            // 检查HTTP响应状态
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // 将响应转换为JSON格式并返回类型化数据
            const data: ApiResponse = await response.json();
            return data;
        } catch (error) {
            // 错误日志记录
            console.error('Fetch error:', error);
            // 重新抛出错误供调用者处理
            throw error;
        }
    }

    /**
     * 获取单个随机猫咪事实
     * 调用API并显示结果
     */
    private async getRandomFact(): Promise<void> {
        this.showLoading();  // 显示加载状态
        try {
            // 调用API获取单个事实
            const data: ApiResponse = await this.fetchData('/fact');
            // 将事实添加到页面显示
            this.addFactToDisplay(data.fact);
            this.hideLoading();  // 隐藏加载状态
        } catch (error) {
            // 发生错误时显示错误信息
            this.showError();
            this.hideLoading();
        }
    }

    /**
     * 批量获取多个随机猫咪事实
     * 并发请求提高性能，分阶段显示结果
     * @param count - 要获取的事实数量
     */
    private async getMultipleFacts(count: number): Promise<void> {
        this.showLoading();  // 显示加载状态
        try {
            // 创建Promise数组用于并发请求
            const promises: Promise<ApiResponse>[] = [];
            for (let i = 0; i < count; i++) {
                promises.push(this.fetchData('/fact'));
            }

            // Promise.all并发执行所有请求
            const results: ApiResponse[] = await Promise.all(promises);

            // 循环显示每个结果，添加延迟创建动画效果
            for (const result of results) {
                this.addFactToDisplay(result.fact);
                await this.delay(300);  // 300ms延迟
            }

            this.hideLoading();
        } catch (error) {
            this.showError();
            this.hideLoading();
        }
    }

    /**
     * 将猫咪事实添加到页面显示
     * 创建事实卡片并添加到DOM中
     * @param factText - 要显示的猫咪事实文本
     */
    private addFactToDisplay(factText: string): void {
        // 清除欢迎消息（如果存在）
        this.clearWelcomeMessage();

        // 生成唯一ID：时间戳+随机数确保唯一性
        const factId: number = Date.now() + Math.random();

        // 将事实数据存储到内存数组中
        const newFact: CatFact = {
            id: factId,
            text: factText,
            timestamp: new Date()
        };
        this.facts.push(newFact);

        // 创建新的事实卡片DOM元素
        const factElement: HTMLDivElement = document.createElement('div');
        factElement.className = 'fact-card';
        factElement.setAttribute('data-fact-id', factId.toString());

        // 使用模板字符串构建事实卡片HTML
        factElement.innerHTML = `
            <div class="fact-header">
                <span class="fact-number">#${this.facts.length}</span>
                <button class="remove-fact-btn" onclick="app.removeFact(${factId})">&times;</button>
            </div>
            <div class="fact-content">
                <p>${this.escapeHtml(factText)}</p>
            </div>
            <div class="fact-footer">
                <span class="fact-length">${factText.length} characters</span>
                <span class="fact-time">${this.formatTime(new Date())}</span>
            </div>
        `;

        // 将新卡片添加到容器中
        this.elements.factsContainer.appendChild(factElement);

        // 设置初始动画状态（透明且向下偏移）
        factElement.style.opacity = '0';
        factElement.style.transform = 'translateY(20px)';

        // 使用requestAnimationFrame确保CSS更改被应用后再开始动画
        requestAnimationFrame(() => {
            factElement.style.transition = 'all 0.5s ease';
            factElement.style.opacity = '1';
            factElement.style.transform = 'translateY(0)';
        });

        // 更新统计数据
        this.updateStats();
        // 滚动到底部显示新内容
        this.scrollToBottom();
    }

    /**
     * 删除指定ID的猫咪事实
     * 从数据数组和DOM中移除事实卡片
     * @param factId - 要删除的事实ID
     */
    public removeFact(factId: number): void {
        // 从数据数组中过滤掉指定ID的事实
        this.facts = this.facts.filter((fact: CatFact) => fact.id !== factId);

        // 通过data属性选择器找到对应的DOM元素
        const factElement: HTMLElement | null = document.querySelector(`[data-fact-id="${factId}"]`);
        if (factElement) {
            // 添加移除动画：向左滑出效果
            factElement.style.transition = 'all 0.3s ease';
            factElement.style.opacity = '0';
            factElement.style.transform = 'translateX(-100%)';

            // 动画完成后执行清理操作
            setTimeout(() => {
                factElement.remove();           // 从DOM中移除元素
                this.updateStats();             // 更新统计数据
                this.updateFactNumbers();       // 重新编号剩余卡片

                // 如果没有事实了，显示欢迎消息
                if (this.facts.length === 0) {
                    this.showWelcomeMessage();
                }
            }, 300); // 与CSS动画时间一致
        }
    }

    /**
     * 更新所有事实卡片的编号
     * 删除事实后重新排序编号显示
     */
    private updateFactNumbers(): void {
        // 获取所有现存的事实卡片
        const factCards: NodeListOf<HTMLElement> = document.querySelectorAll('.fact-card');

        // 遍历并更新每张卡片的编号
        factCards.forEach((card: HTMLElement, index: number) => {
            const numberSpan: HTMLElement | null = card.querySelector('.fact-number');
            if (numberSpan) {
                // 编号从1开始（index+1）
                numberSpan.textContent = `#${index + 1}`;
            }
        });
    }

    /**
     * 清除所有猫咪事实
     * 删除所有事实数据和DOM元素，带有分阶段动画
     */
    private clearAllFacts(): void {
        // 清空数据数组
        this.facts = [];

        // 获取所有现存的事实卡片
        const factCards: NodeListOf<HTMLElement> = this.elements.factsContainer.querySelectorAll('.fact-card');

        // 分阶段删除动画：每张卡片延迟100ms
        factCards.forEach((card: HTMLElement, index: number) => {
            setTimeout(() => {
                // 缩放消失动画
                card.style.transition = 'all 0.3s ease';
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';

                // 动画完成后移除元素
                setTimeout(() => {
                    card.remove();
                }, 300);
            }, index * 100); // 每张卡片间隔100ms
        });

        // 所有动画完成后显示欢迎消息并更新统计
        setTimeout(() => {
            this.showWelcomeMessage();
            this.updateStats();
        }, factCards.length * 100 + 300);
    }

    /**
     * 清除欢迎消息
     * 在显示第一个事实时调用
     */
    private clearWelcomeMessage(): void {
        const welcomeMessage: HTMLElement | null = document.querySelector('.welcome-message');
        if (welcomeMessage) {
            welcomeMessage.remove();
        }
    }

    /**
     * 显示欢迎消息
     * 在没有事实时显示初始界面
     */
    private showWelcomeMessage(): void {
        // 检查是否已有欢迎消息，避免重复添加
        if (!this.elements.factsContainer.querySelector('.welcome-message')) {
            this.elements.factsContainer.innerHTML = `
                <div class="welcome-message">
                    <h3>Welcome to Cat Facts Explorer!</h3>
                    <p>Click the button above to discover amazing facts about cats.</p>
                    <div class="cat-emoji">🐈</div>
                </div>
            `;
        }
    }

    /**
     * 更新统计数据显示
     * 计算并显示事实总数、最长事实字符数、平均长度
     */
    private updateStats(): void {
        // 计算统计数据
        const stats: Statistics = this.calculateStats();

        // 更新DOM中的统计数字显示
        this.elements.totalFactsSpan.textContent = stats.totalFacts.toString();
        this.elements.longestFactSpan.textContent = stats.longestFact.toString();
        this.elements.avgLengthSpan.textContent = stats.avgLength.toString();

        // 触发统计数字的视觉更新动画
        this.animateStatUpdate();
    }

    /**
     * 计算统计数据
     * @returns Statistics 统计数据对象
     */
    private calculateStats(): Statistics {
        const totalFacts: number = this.facts.length;

        // 计算最长事实的字符数：使用Math.max和map
        const longestFact: number = totalFacts > 0 ?
            Math.max(...this.facts.map((f: CatFact) => f.text.length)) : 0;

        // 计算平均长度：使用reduce求和再除以数量
        const avgLength: number = totalFacts > 0 ?
            Math.round(this.facts.reduce((sum: number, f: CatFact) => sum + f.text.length, 0) / totalFacts) : 0;

        return {
            totalFacts,
            longestFact,
            avgLength
        };
    }

    /**
     * 统计数字动画效果
     * 当统计数据更新时，添加视觉反馈动画
     */
    private animateStatUpdate(): void {
        // 获取所有统计数字元素
        const statNumbers: NodeListOf<HTMLElement> = document.querySelectorAll('.stat-number');

        statNumbers.forEach((stat: HTMLElement) => {
            // 放大并改变颜色
            stat.style.transform = 'scale(1.1)';
            stat.style.color = '#667eea';

            // 200ms后恢复原状
            setTimeout(() => {
                stat.style.transform = 'scale(1)';
                stat.style.color = '';
            }, 200);
        });
    }

    /**
     * 滚动到事实容器底部
     * 添加新事实时确保用户看到最新内容
     */
    private scrollToBottom(): void {
        this.elements.factsContainer.scrollTop = this.elements.factsContainer.scrollHeight;
    }

    /**
     * 显示加载状态
     * API请求期间显示加载动画
     */
    private showLoading(): void {
        this.elements.loading.classList.remove('hidden');
        this.elements.error.classList.add('hidden');
    }

    /**
     * 隐藏加载状态
     */
    private hideLoading(): void {
        this.elements.loading.classList.add('hidden');
    }

    /**
     * 显示错误消息
     * 网络或API错误时向用户显示友好提示
     */
    private showError(): void {
        this.elements.error.classList.remove('hidden');
        this.elements.loading.classList.add('hidden');

        // 5秒后自动隐藏错误消息
        setTimeout(() => {
            this.hideError();
        }, 5000);
    }

    /**
     * 隐藏错误消息
     */
    private hideError(): void {
        this.elements.error.classList.add('hidden');
    }

    /**
     * 格式化时间显示
     * 将日期对象转换为本地化时间字符串
     * @param date - 要格式化的日期对象
     * @returns 格式化后的时间字符串
     */
    private formatTime(date: Date): string {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }

    /**
     * 延迟函数
     * 用于创建异步延迟，配合动画效果
     * @param ms - 延迟毫秒数
     * @returns Promise<void> 延迟Promise
     */
    private delay(ms: number): Promise<void> {
        return new Promise<void>((resolve: () => void) => setTimeout(resolve, ms));
    }

    /**
     * HTML转义函数
     * 防止XSS攻击，转义HTML特殊字符
     * @param unsafe - 需要转义的字符串
     * @returns 转义后的安全字符串
     */
    private escapeHtml(unsafe: string): string {
        return unsafe
            .replace(/&/g, "&amp;")     // 转义 &
            .replace(/</g, "&lt;")      // 转义 <
            .replace(/>/g, "&gt;")      // 转义 >
            .replace(/"/g, "&quot;")    // 转义 "
            .replace(/'/g, "&#039;");   // 转义 '
    }
}

// 全局应用实例变量 - 声明类型
export {};

declare global {
    interface Window {
        app: CatFactsApp;
    }
}

/**
 * DOM加载完成后初始化应用
 * 确保所有HTML元素都已加载再启动TypeScript应用
 */
document.addEventListener('DOMContentLoaded', (): void => {
    // 创建全局应用实例
    window.app = new CatFactsApp();
});