// Convert URL to File object
const urltoFile = (url: string) => {
  // Generate random id
  const id: number = Math.floor(Math.random() * 100000);
  // Declare new filename
  const filename: string = `converted-${id}.png`;
  // File mimeType
  const mimeType: string = 'image/png';
  // return file object
  return (fetch(url)
    .then((res) => res.arrayBuffer())
    .then((buf) => new File([buf], filename, { type: mimeType }))
  );
}

export default urltoFile;