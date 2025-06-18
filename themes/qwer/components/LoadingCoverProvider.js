import { useState, useEffect } from 'react';
import LoadingCover from '@/themes/qwer/components/LoadingCover';

export default function LoadingCoverProvider({ children }) {
  // 只在客户端渲染 LoadingCover，避免 SSR/CSR 不同步
  const [showCover, setShowCover] = useState(true);
  useEffect(() => {
    setShowCover(true); // 确保首次挂载时显示
  }, []);
  return (
    <>
      {showCover && (
        <LoadingCover onFinishLoading={() => setShowCover(false)} />
      )}
      {children}
    </>
  );
}
