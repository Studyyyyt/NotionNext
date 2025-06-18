// eslint-disable-next-line @next/next/no-document-import-in-page
import BLOG from '@/blog.config'
import Document, { Head, Html, Main, NextScript } from 'next/document'

// 预先设置深色模式的脚本内容
const darkModeScript = `
(function() {
  const darkMode = localStorage.getItem('darkMode')

  const prefersDark =
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

  const defaultAppearance = '${BLOG.APPEARANCE || 'auto'}'

  let shouldBeDark = darkMode === 'true' || darkMode === 'dark'

  if (darkMode === null) {
    if (defaultAppearance === 'dark') {
      shouldBeDark = true
    } else if (defaultAppearance === 'auto') {
      // 检查是否在深色模式时间范围内
      const date = new Date()
      const hours = date.getHours()
      const darkTimeStart = ${BLOG.APPEARANCE_DARK_TIME ? BLOG.APPEARANCE_DARK_TIME[0] : 18}
      const darkTimeEnd = ${BLOG.APPEARANCE_DARK_TIME ? BLOG.APPEARANCE_DARK_TIME[1] : 6}
      
      shouldBeDark = prefersDark || (hours >= darkTimeStart || hours < darkTimeEnd)
    }
  }
  
  // 立即设置 html 元素的类
  document.documentElement.classList.add(shouldBeDark ? 'dark' : 'light')
})()
`

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang={BLOG.LANG}>
        <Head>
          {/* 预加载字体 */}
          {BLOG.FONT_AWESOME && (
            <>
              <link
                rel='preload'
                href={BLOG.FONT_AWESOME}
                as='style'
                crossOrigin='anonymous'
              />
              <link
                rel='stylesheet'
                href={BLOG.FONT_AWESOME}
                crossOrigin='anonymous'
                referrerPolicy='no-referrer'
              />
            </>
          )}

          {/* 预先设置深色模式，避免闪烁 */}
          <script dangerouslySetInnerHTML={{ __html: darkModeScript }} />
        </Head>

        <body style={{overflow:'hidden',height:'100vh'}}>
          {/* 
            欢迎页背景更换说明：
            1. 本地图片：
               - 将图片放入 public 目录（如 public/bg.jpg）。
               - 修改 LoadingCover.js 中 <video> 标签为 <img src="/bg.jpg" ... />，并调整样式 className="welcome-bg-image"。
            2. 本地视频：
               - 将视频放入 public/videos 目录（如 public/videos/bg.mp4）。
               - 修改 LoadingCover.js 中 <video src="/videos/bg.mp4" ... />。
            3. 动态壁纸（如 Lottie、Canvas、WebGL）：
               - 可在 LoadingCover.js 的 <div className="welcome"> 内插入对应组件或 Canvas。
               - 并设置样式 className="welcome-bg-canvas"，确保 position: absolute; z-index: 1; 覆盖全屏。
            4. 所有背景都应设置 position: absolute; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 1; object-fit: cover;，以保证全屏自适应。
            5. 文字内容请保持 z-index: 2;，确保显示在背景之上。
            6. 修改完毕后建议清理浏览器缓存并刷新页面。
          */}
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
