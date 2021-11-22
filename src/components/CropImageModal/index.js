import { useState, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
// Components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CropArea from './CropArea';
// styles

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)', 
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '5px',
  padding: '20px',
  maxHeight: '550px',
  overflowY: 'auto'
};

const CropImageModal = () => {
  // External State
  const modalVisible = useSelector((state) => state.images.modalVisible);
  const dispatch = useDispatch();
  // Internal State
  const [newImageFile, setNewImageFile] = useState(null);
  const [crop, setCrop] = useState({
    unit: '%',
    width: 50,
    height: 50,
  });
  const previewCanvasRef = useRef(null);
  const [completedCrop, setCompletedCrop] = useState(null);

  // Functions for components state changes
  const handleSetNewImageFile = (file) => setNewImageFile(file);
  const handleSetCrop = (c) => setCrop(c);
  const handleSetCompletedCrop = (c) => setCompletedCrop(c);
  const handleCloseModal = () => dispatch({ type: 'SET_MODAL_VISIBLE', payload: false })

  const handleDownlodaImage = (canvas, crop) => {
    if (!crop || !canvas) {
      return;
    }
    canvas.toBlob(
      (blob) => {
        const previewUrl = window.URL.createObjectURL(blob);

        const anchor = document.createElement('a');
        anchor.download = `cropped-${(Math.floor(Math.random() * 100000))}.png`;
        anchor.href = URL.createObjectURL(blob);
        anchor.click();

        window.URL.revokeObjectURL(previewUrl);
      },
      'image/png',
      1
    );
  }

  return (
    <div className="modalWrapper">
      <Modal
        open={modalVisible}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          {/* Header */}
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Crop the image
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1, mb: 2 }}>
            Select place to crop the image
          </Typography>

          {/* Crop Area */}
          <CropArea
            newImageFile={newImageFile}
            handleSetNewImageFile={handleSetNewImageFile}
            handleDownlodaImage={handleDownlodaImage}
            crop={crop}
            handleSetCrop={handleSetCrop}
            previewCanvasRef={previewCanvasRef}
            handleSetCompletedCrop={handleSetCompletedCrop}
            completedCrop={completedCrop}
          />

          {/* Buttons */}
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              color="error"
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              // onClick={saveImageFile}
              onClick={() => handleDownlodaImage(previewCanvasRef.current, completedCrop)}
            >
              Download
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  )
}

export default CropImageModal;
