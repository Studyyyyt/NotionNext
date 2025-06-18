import { siteConfig } from '@/lib/config'; // 导入站点配置方法
import { useEffect, useState } from 'react'; // 导入 React 的 Hook

// LoadingCover 组件：页面加载时的全屏欢迎遮罩动画
const LoadingCover = ({ onFinishLoading }) => {
    const [isVisible, setIsVisible] = useState(true); // 控制遮罩是否显示
    const welcomeText = siteConfig('PROXIO_WELCOME_TEXT', '欢迎来到我们的网站！'); // 获取欢迎文本，支持自定义
    const [typedText, setTypedText] = useState(''); // 用于打字机动画的当前已显示文本

    // 打字机动画效果，每隔一段时间显示下一个字符
    useEffect(() => {
        let current = 0; // 当前显示到第几个字符
        setTypedText(''); // 初始化已显示文本为空
        const timer = setInterval(() => { // 定时器，每隔180ms执行一次
            setTypedText(welcomeText.slice(0, current + 1)); // 截取 welcomeText 的前 current+1 个字符
            current++; // 递增字符索引
            if (current === welcomeText.length) { // 如果全部字符已显示
                clearInterval(timer); // 停止定时器
            }
        }, 120); // 打字速度调慢（180ms/字符）
        return () => clearInterval(timer); // 组件卸载时清理定时器
    }, [welcomeText]);

    // 处理点击事件，触发扩散动画和淡出
    useEffect(() => {
        const pageContainer = document.getElementById('pageContainer'); // 获取页面容器元素
        const handleClick = (e) => { // 点击事件处理函数
            const ripple = document.createElement('div'); // 创建扩散光圈元素
            ripple.classList.add('ripple'); // 添加样式类
            ripple.style.left = `${e.clientX - 10}px`; // 设置光圈横坐标
            ripple.style.top = `${e.clientY - 10}px`; // 设置光圈纵坐标
            document.body.appendChild(ripple); // 添加到页面
            pageContainer?.classList?.add('page-clicked'); // 添加淡出动画类
            setTimeout(() => { // 延迟1.2秒后
                setIsVisible(false); // 隐藏遮罩
                setTimeout(() => { // 再延迟0.6秒
                    if (onFinishLoading) {
                        onFinishLoading(); // 调用加载完成回调
                    }
                }, 600);
            }, 1200);
            setTimeout(() => { // 1秒后移除光圈元素
                ripple.remove();
            }, 1000);
        };
        document.body.addEventListener('click', handleClick); // 绑定点击事件
        return () => {
            document.body.removeEventListener('click', handleClick); // 组件卸载时移除事件
        };
    }, [onFinishLoading]);

    if (!isVisible) return null; // 不可见时不渲染任何内容

    return (
        <div className="welcome" id="pageContainer"> {/* 遮罩主容器 */}
            {/* 全屏背景视频 */}
            <video
                className="welcome-bg-video" // 视频样式类
                src="/videos/2_15488489003905.mp4" // 视频路径
                autoPlay // 自动播放
                loop // 循环播放
                muted // 静音
                playsInline // 移动端内联播放
            />
            <div className="welcome-text px-2" id="welcomeText"> {/* 欢迎文字容器 */}
                {typedText} {/* 打字机动画文字 */}
                <span className="type-cursor">|</span> {/* 闪烁光标 */}
            </div>
            <style jsx>{`
                .welcome {
                    display: flex; // 弹性布局
                    justify-content: center; // 水平居中
                    align-items: center; // 垂直居中
                    height: 100vh; // 全屏高度
                    width: 100vw; // 全屏宽度
                    position: fixed; // 固定定位
                    top: 0;
                    left: 0;
                    z-index: 9999; // 最高层级
                    pointer-events: auto; // 可交互
                    overflow: hidden; // 隐藏溢出
                    transition: opacity 0.6s ease; // 淡出动画
                }
                .welcome.page-clicked {
                    opacity: 0; // 淡出
                    pointer-events: none; // 禁止交互
                }
                .welcome-bg-video {
                    position: absolute; // 绝对定位
                    top: 0;
                    left: 0;
                    width: 100vw; // 全屏宽
                    height: 100vh; // 全屏高
                    object-fit: cover; // 保持比例填充
                    z-index: 1; // 在文字下方
                    filter: brightness(1.15); // 提高亮度
                }
                .welcome-text {
                    font-size: 2.5rem; // 字体大小
                    font-weight: bold; // 加粗
                    color: #fff; // 白色
                    text-shadow: 0 0 20px rgba(0,0,0,0.5); // 黑色阴影
                    user-select: none; // 禁止选中
                    text-align: center; // 居中
                    z-index: 2; // 在视频上方
                    position: relative;
                    letter-spacing: 4px; /* 字符间距更宽 */
                    background: none;
                    animation: fadeInUp 1.5s ease-out forwards; // 淡入动画
                }
                .type-cursor {
                    display: inline-block; // 行内块
                    width: 1ch; // 宽度为1字符
                    color: #fff; // 白色
                    animation: blink 1s steps(1) infinite; // 闪烁动画
                }
                @keyframes blink {
                    0%, 50% { opacity: 1; } // 显示
                    51%, 100% { opacity: 0; } // 隐藏
                }
                .ripple {
                    position: absolute; // 绝对定位
                    border-radius: 50%; // 圆形
                    background: radial-gradient(rgba(255,255,255,0.6) 0%, transparent 70%); // 渐变
                    pointer-events: none; // 不可交互
                    width: 20px;
                    height: 20px;
                    transform: scale(0); // 初始缩放
                    opacity: 0.8;
                    z-index: 10;
                    animation: rippleExpand 1s ease-out forwards; // 扩散动画
                }
                @keyframes fadeInUp {
                    0% {
                        opacity: 0;
                        transform: translateY(50px); // 向下偏移
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0); // 回到原位
                    }
                }
                @keyframes rippleExpand {
                    to {
                        transform: scale(40); // 扩大
                        opacity: 0; // 消失
                    }
                }
            `}</style>
        </div>
    );
};

export default LoadingCover; // 导出组件