import { useSelector } from 'react-redux';
// Components
import UploadImage from './UploadImage';
import ImageEditorSection from '../ImageEditorSection';
// Types
import { Rootstate } from '../../types/Rootstate';

const LandingPage = () => {
  const imageFile = useSelector((state: Rootstate) => state.images.imageFile);

  if (imageFile) return <ImageEditorSection />;
  return <UploadImage />;
}

export default LandingPage;
