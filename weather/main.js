/**
 * UEIK 官方插件模板 - 天气插件 (示例)
 */
export default function ({ workspace, i18n, ui, notice }) {
    console.log("⛅ [Plugin Weather] 天气插件已加载！");

    let unregCommand = workspace.commands?.register({
        id: 'ueik-weather-check',
        title: '查看今日天气',
        execute: () => {
            notice?.success('今天天气晴朗，适合敲代码！');
        }
    });

    return () => {
        console.log("🛑 [Plugin Weather] 天气插件已卸载！");
        if (unregCommand) unregCommand();
    }
}
