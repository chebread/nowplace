'use client';

import { useEffect } from 'react';
import { useToasterStore, toast, Toaster } from 'react-hot-toast';

export default function ToastLimiter({ limit = 3, ...otherProps }) {
  const { toasts } = useToasterStore();

  useEffect(() => {
    toasts
      .filter(t => t.visible)
      .filter((_, i) => i >= limit)
      .forEach(t => toast.dismiss(t.id));
  }, [toasts, limit]);

  // otherProps를 사용하여 Toaster 컴포넌트에 전달
  return <Toaster {...otherProps} />;
}
