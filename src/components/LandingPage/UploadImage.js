import { useEffect, useState } from 'react';
import {useDispatch} from 'react-redux';
// Components
import {useDropzone} from 'react-dropzone'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
// Styles
import styles from '../../styles/components/LandingPage/UploadImage.module.scss';

const UploadImage = () => {
  // External Hooks
  const dispatch = useDispatch();
  // Internal Hooks
  const [isDragging, setIsDragging] = useState(false);
  const { getRootProps, getInputProps, open , isDragActive, isDragReject, isDragAccept } = useDropzone({
    onDrop: files => selectFile(files[0]),
    noClick: true,
    noKeyboard: true,
    multiple: false,
    accept: 'image/jpeg, image/png, image/svg'
  })

  useEffect(() => {
    setIsDragging(isDragActive);
  }, [
    isDragActive,
    isDragReject,
    isDragAccept
  ])

  const selectFile = (file) => {
    dispatch({ type: 'SET_IMAGE_FILE', payload: file });
  }

  return (
    <div className={styles.wrapper} {...getRootProps()}>
      {isDragging &&
        <div className={styles.overlay}>
          <div className={styles.overlayBlock}>
            <Typography variant="h3" component="h3">
              Drop it
            </Typography>
          </div>
        </div>
      }
      <input {...getInputProps()} />
      <div className={styles.innerContainer}>
        <Typography variant="h3" component="h3">
          Crop IMAGE
        </Typography>
        <Typography variant = "h5" component="h5" >
          Crop JPG, PNG or GIF by defining a rectangle in pixels.
          Cut your image online.
        </Typography>
        {/* Upload button */}
        <Button onClick={open} className={styles.selectButton} variant="contained" component="span" startIcon={<AddPhotoAlternateOutlinedIcon />}>
          Select Image
        </Button>
        <div>
          <Typography variant="subtitle2" gutterBottom component="div">
            Drag 'n' drop some files here, or click to select files
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default UploadImage;
