export default function ({ workspace, i18n, settings }) {
    console.log("🚀 [Clock Widget Plugin] 第三方状态栏时钟插件启动！");

    // 1. 动态注册第三方多语言
    const unregLocale = i18n.registerLocale({
        'en-us': {
            tooltip: 'Current Time',
            settings_title: 'Clock Settings'
        },
        'zh-cn': {
            tooltip: '当前时间',
            settings_title: '时钟设置'
        }
    });

    // 状态
    let showSeconds = true;
    
    // 2. 注册设置面板 (测试用)
    const unregTab = settings.registerTab({
        id: 'clock-widget',
        get title() { return i18n.t('settings_title') || '时钟设置'; },
        mount: (container) => {
            const builder = settings.createBuilder(container);
            const section = builder.addSection('时间显示');
            
            section.addItem('显示秒数', '是否在状态栏展示精确到秒的时间')
                   .addToggle(
                       () => showSeconds, 
                       (val) => {
                           showSeconds = val;
                           tick(); // 立即刷新
                       }
                   );

            return () => builder.destroy();
        }
    });

    // 完全放弃自定义 DOM 与任何内联样式，回归最原生干净的 type: 'label'
    let unreg = null;

    const tick = () => {
        const timeStr = showSeconds 
            ? new Date().toLocaleTimeString() 
            : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // 利用引擎在遇到同名 id 时自动覆盖并更新响应式的特性，实现无编译的响应式刷新
        unreg = workspace.registerStatusBar({
            id: 'clock-widget',
            type: 'label',
            order: 100,
            align: 'right',
            title: timeStr,
            // 2. 动态取词翻译（通过 proxy 自动注入 pluginId，无需手动拼接前缀）
            tooltip: i18n.t('tooltip')
        });
    };

    // 首次绘制
    tick();
    // 启动原生定时器
    const timer = setInterval(tick, 1000);

    // 返回全局卸载函数，供引擎在插件被禁用或更新时自动彻底清理
    return () => {
        console.log("🛑 [Clock Widget Plugin] 第三方时钟插件正在安全卸载...");
        clearInterval(timer);
        if (unregTab) unregTab();
        if (unreg) unreg();
        if (unregLocale) unregLocale();
    };
}

