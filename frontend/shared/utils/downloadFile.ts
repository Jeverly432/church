export const downloadFile = async (url: string, filename: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Не удалось скачать файл');
  }

  const blob = await response.blob();
  const extension = url.split('.').pop()?.split('?')[0] || '';
  const name =
    extension && !filename.toLowerCase().endsWith(`.${extension.toLowerCase()}`)
      ? `${filename}.${extension}`
      : filename;
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = objectUrl;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(objectUrl);
};
