export const copyClipboard = () => {
  const node = document.getElementById('textLaporan') as HTMLElement;
  if (window.getSelection) {
    const selection = window.getSelection() as Selection;
    const range = document.createRange();
    range.selectNodeContents(node);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand("copy");
  } else {
    console.warn("Browser ini tidak support untuk salin laporan");
  }
}