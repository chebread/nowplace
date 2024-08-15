export default function copyToClipboard(
  text: string,
  callback?: () => void,
  error?: (err?: any) => void
) {
  if (navigator.clipboard && window.isSecureContext) {
    // Clipboard API 사용 (HTTPS 환경)
    navigator.clipboard
      .writeText(text)
      .then(() => callback?.())
      .catch((err: any) => {
        error?.(err);
      });
  } else {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      callback?.();
    } catch (err: any) {
      error?.(err);
    }
    document.body.removeChild(textArea);
  }
}
