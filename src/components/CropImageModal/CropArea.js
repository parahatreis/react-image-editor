// Components
import {useState, useRef, useCallback, useEffect} from 'react'
import ReactCrop from 'react-image-crop';
import {useSelector} from 'react-redux';
// Styles
import styles from '../../styles/components/CropImageModal/CropArea.module.scss';
import 'react-image-crop/dist/ReactCrop.css';
// utils
import convertBase64ToFile from '../../utils/convertBase64ToFile';

const CropArea = ({handleSetNewImageFile, previewCanvasRef, handleSetCrop, crop, handleSetCompletedCrop, completedCrop}) => {
  // External Hooks
  const imageFile = useSelector((state) => state.images.imageFile);
  // Inner Hooks
  const imgRef = useRef(null);
  const [innerImage, setInnerImage] = useState(null);

  // Get image file
  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      setInnerImage(url);
    }
  }, [imageFile])

  // Give reference for imgRef
  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  // Show preview image and get new image info
  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );

    // convert Base64 to File
    const base64Image = canvas.toDataURL("image/jpeg");
    convertBase64ToFile(base64Image)
      .then((file) => handleSetNewImageFile(file));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completedCrop]);

  return (
    <div className={styles.cropArea}>
      {innerImage &&
        <>
          <ReactCrop
            src={innerImage}
            onImageLoaded={onLoad}
            crop={crop}
            style={{ maxWidth: '500px', maxHeight: '500px' }}
            imageStyle={{height: '100%'}}
            onChange={(c) => handleSetCrop(c)}
            onComplete={(c) => handleSetCompletedCrop(c)}
          />
          <div>
            <canvas
              ref={previewCanvasRef}
              style={{
                width: Math.round(completedCrop?.width ?? 0),
                height: Math.round(completedCrop?.height ?? 0)
              }}
            />
          </div>
        </>
      }
    </div>
  )
}

export default CropArea
