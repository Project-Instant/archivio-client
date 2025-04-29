export function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height,
      });

      URL.revokeObjectURL(objectUrl);
    };

    img.onerror = (err) => {
      reject(new Error("Ошибка при загрузке изображения"));
      URL.revokeObjectURL(objectUrl);
    };

    img.src = objectUrl;
  });
}

export function bytesToMB(bytes: number): string {
  return (bytes / (1024 * 1024)).toFixed(2)
}