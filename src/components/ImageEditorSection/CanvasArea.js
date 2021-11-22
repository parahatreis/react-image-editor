import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { fabric } from 'fabric';
// Components
// utils
import convertBase64ToFile from '../../utils/convertBase64ToFile';

const CanvasArea = () => {
  // External Hooks
  const dispatch = useDispatch();
  const imageFile = useSelector((state) => state.images.imageFile);

  useEffect(() => {
    if (imageFile) {
      initCanvas(imageFile);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageFile])

  const initCanvas = (imageValue) => {
    // Canvas settings
    const canvas = new fabric.Canvas('c', {
      height: 800,
      width: 900,
      backgroundColor: '#eaeaf4'
    });

    // Canvas Image settings
    const url = URL.createObjectURL(imageValue);
    fabric.Image.fromURL(url, function (img) {
      img.scale(0.5).set({
        left: 100,
        top: 100,
      });

      // Canvas Image resize settings
      img.setControlsVisibility({
        mt: false, // middle top
        mb: false, // midle bottom
        ml: false, // middle left
        mr: false, // middle right
      });

      // Double click
      canvas.on("mouse:dblclick", function (e) {
        if (e.target) {
          doubleClickImage(e.target._element);
        }
      });
      // Render into canvas
      canvas.add(img);
    });
  }

  // Double click get image file and open modal
  const doubleClickImage = (val) => {
    convertBase64ToFile(val.src)
      .then((file) => {
        dispatch({ type: 'SET_IMAGE_FILE', payload: file});
        dispatch({type: 'SET_MODAL_VISIBLE', payload: true});
      });
  };

  return (
    <div>
      <canvas id="c"></canvas>
    </div>
  )
}

export default CanvasArea
