import React, { useState, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
// Components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CropArea from './CropArea';
// Types
import { Rootstate } from '../../types/Rootstate';

const style: object = {
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

const CropImageModal: React.FC = () => {
  // External State
  const modalVisible = useSelector((state: Rootstate) => state.images.modalVisible);
  const dispatch = useDispatch();
  // Internal State
  const [completedCrop, setCompletedCrop] = useState<any>(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState<object>({
    unit: '%',
    width: 50,
    height: 50,
  });

  // Functions for components state changes
  const handleSetCrop = (c: object) => setCrop(c);
  const handleSetCompletedCrop = (c: object) => setCompletedCrop(c);
  const handleCloseModal = () => dispatch({ type: 'SET_MODAL_VISIBLE', payload: false })

  // Download image
  const handleDownlodaImage = (canvas: any, crop: (object | null)) => {
    if (!crop || !canvas) {
      return;
    }
    canvas.toBlob(
      (blob: any) => {
        // Createds Url for image
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
            handleSetCrop={handleSetCrop}
            handleSetCompletedCrop={handleSetCompletedCrop}
            completedCrop={completedCrop}
            crop={crop}
            previewCanvasRef={previewCanvasRef}
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
