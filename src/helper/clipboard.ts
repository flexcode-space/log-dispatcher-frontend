export const copyClipboard = (value: string) => {
  const regex = /(<([^>]+)>)/gi;

  navigator.clipboard.writeText(value.replace(regex, "")).then(() => {
    alert(`Berhasil salin`);
  });
}