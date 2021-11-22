// Convert URL to File object
export default function urltoFile(url) {
  const filename = `converted-${(Math.floor(Math.random() * 100000))}.png`;
  const mimeType = 'image/png';
  return (fetch(url)
    .then((res) => res.arrayBuffer())
    .then((buf) => new File([buf], filename, { type: mimeType }))
  );
}