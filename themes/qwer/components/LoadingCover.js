import { siteConfig } from '@/lib/config'; // 导入站点配置方法
import { useEffect, useState } from 'react'; // 导入 React 的 Hook

// LoadingCover 组件：页面加载时的全屏欢迎遮罩动画
const LoadingCover = ({ onFinishLoading }) => {
    const [isVisible, setIsVisible] = useState(true); // 控制遮罩是否显示
    const welcomeText = siteConfig('PROXIO_WELCOME_TEXT', '欢迎来到我们的网站！'); // 获取欢迎文本，支持自定义
    const [typedText, setTypedText] = useState(''); // 用于打字机动画的当前已显示文本

    // 打字机动画效果，每隔一段时间显示下一个字符
    useEffect(() => {
        let current = 0;
        setTypedText('');
        const timer = setInterval(() => {
            setTypedText(welcomeText.slice(0, current + 1));
            current++;
            if (current === welcomeText.length) {
                clearInterval(timer);
            }
        }, 120);
        return () => clearInterval(timer);
    }, [welcomeText]);

    // 处理点击事件，触发扩散动画和淡出
    useEffect(() => {
        const pageContainer = document.getElementById('pageContainer');
        const handleClick = (e) => {
            const ripple = document.createElement('div');
            ripple.classList.add('ripple');
            ripple.style.left = `${e.clientX - 10}px`;
            ripple.style.top = `${e.clientY - 10}px`;
            document.body.appendChild(ripple);
            pageContainer?.classList?.add('page-clicked');
            setTimeout(() => {
                setIsVisible(false);
                setTimeout(() => {
                    if (onFinishLoading) {
                        onFinishLoading();
                    }
                }, 600);
            }, 1200);
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        };
        document.body.addEventListener('click', handleClick);
        return () => {
            document.body.removeEventListener('click', handleClick);
        };
    }, [onFinishLoading]);

    // LoadingCover 消失时恢复 body 样式，允许页面滚动
    useEffect(() => {
        if (!isVisible) {
            document.body.style.overflow = '';
            document.body.style.height = '';
        } else {
            document.body.style.overflow = 'hidden';
            document.body.style.height = '100vh';
        }
    }, [isVisible]);

    if (!isVisible) return null; // 不可见时不渲染任何内容

    return (
    <div className="welcome" id="pageContainer"> {/* 遮罩主容器 */}
        {/* 全屏背景图片 */}
        <img
            className="welcome-bg-image"
            src="/images/ark-image-generate.jpeg"
            alt="welcome background"
            draggable={false}
        />
        <div className="welcome-text px-2" id="welcomeText"> {/* 欢迎文字容器 */}
            {typedText} {/* 打字机动画文字 */}
            <span className="type-cursor">|</span> {/* 闪烁光标 */}
        </div>
        <style jsx>{`
            .welcome {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                width: 100vw;
                position: fixed;
                top: 0;
                left: 0;
                z-index: 9999;
                pointer-events: auto;
                overflow: hidden;
                transition: opacity 0.6s ease;
            }
            .welcome.page-clicked {
                opacity: 0;
                pointer-events: none;
            }
            .welcome-bg-image {
                position: absolute;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                object-fit: cover;
                z-index: 1;
                filter: brightness(1.15);
                user-select: none;
            }
            .welcome-text {
                font-size: 2.5rem;
                font-weight: bold;
                color: #fff;
                text-shadow: 0 0 20px rgba(0,0,0,0.5);
                user-select: none;
                text-align: center;
                z-index: 2;
                position: relative;
                letter-spacing: 4px;
                background: none;
                animation: fadeInUp 1.5s ease-out forwards;
            }
            .type-cursor {
                display: inline-block;
                width: 1ch;
                color: #fff;
                animation: blink 1s steps(1) infinite;
            }
            @keyframes blink {
                0%, 50% { opacity: 1; }
                51%, 100% { opacity: 0; }
            }
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: radial-gradient(rgba(255,255,255,0.6) 0%, transparent 70%);
                pointer-events: none;
                width: 20px;
                height: 20px;
                transform: scale(0);
                opacity: 0.8;
                z-index: 10;
                animation: rippleExpand 1s ease-out forwards;
            }
            @keyframes fadeInUp {
                0% {
                    opacity: 0;
                    transform: translateY(50px);
                }
                100% {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            @keyframes rippleExpand {
                to {
                    transform: scale(40);
                    opacity: 0;
                }
            }

            /* 针对移动端适配，可根据需要调整 */
            @media (max-width: 600px) {
                .welcome-text {
                    font-size: 1.3rem;
                    letter-spacing: 2px;
                }
            }
        `}</style>
    </div>
);


export default LoadingCover; // 导出组件
