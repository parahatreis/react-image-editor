// Packages
// Components
import Navbar from './components/layouts/Navbar';
import LandingPage from './components/LandingPage';
import Footer from './components/layouts/Footer';
import CropImageModal from './components/CropImageModal';
// Styles
import './styles/base.css'
// State
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <Navbar />
      <LandingPage />
      <CropImageModal />
      <Footer />
    </Provider>
  );
}

export default App;
