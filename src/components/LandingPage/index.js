import { useSelector } from 'react-redux';
// Components
import UploadImage from './UploadImage';
import ImageEditorSection from '../ImageEditorSection';

const LandingPage = () => {
  const imageFile = useSelector((state) => state.images.imageFile);

  if (imageFile) return <ImageEditorSection />;
  return <UploadImage />;
}

export default LandingPage;
