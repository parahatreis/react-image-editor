import {useDispatch} from 'react-redux';
// Components
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CanvasArea from './CanvasArea';

const ImageEditorSection = () => {
  const dispatch = useDispatch();
  // Remove button
  const handleClickRemove = () => {
    // Remove file
    dispatch({ type: 'SET_IMAGE_FILE', payload: null});
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6} md={8}>
          <CanvasArea />
        </Grid>
        <Grid item xs={6} md={4}>
          <div>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              Usage
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="1) You can drag and drop the image"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="2) You can resize the image by clicking"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="3) To crop double click the image"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="4) Click cancel button to upload new image"
                />
              </ListItem>
            </List>
          </div>
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              color="error"
              onClick={handleClickRemove}
            >
              Remove
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ImageEditorSection;
