import {
  Map,
  Loading,
  Menu,
  Stories,
  SatelliteUsage,
  SatelliteOrbits,
  SatelliteOwners,
  Debris,
  Search,
  Satellite,
  About,
  Title
} from './components';
import { parseHash } from './utils/urlUtils';
import appStore from './stores/AppStore';
import dataStore from './stores/DataStore';
import satelliteStore from './stores/SatelliteStore';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const App = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    const userLang = navigator.language || navigator.userLanguage;

    if (userLang === 'es') {
      navigate('/es');
    } else if (userLang === 'fr') {
      navigate('/fr');
    } else if (userLang === 'de') {
      navigate('/de');
    } else {
      navigate('/es');
    }
  }, [navigate]);

  useEffect(() => {
    if (!appStore.isLoading) {
      const hashParams = parseHash();
      if (hashParams.hasOwnProperty('norad')) {
        appStore.setActiveState('satellite');
        const satellite = dataStore.getSatelliteById(hashParams.norad);
        satelliteStore.setSelectedSatellite(satellite);
      } else {
        appStore.setActiveState('general');
      }
    }
  }, [appStore.isLoading]);

  return (
    <>
      <Map></Map>
      <Menu></Menu>
      <Title isLoading={appStore.isLoading}></Title>
      {appStore.activeState === 'general' && <Stories />}
      {appStore.activeState === 'usage' && <SatelliteUsage />}
      {appStore.activeState === 'orbits' && <SatelliteOrbits />}
      {appStore.activeState === 'debris' && <Debris />}
      {appStore.activeState === 'search' && <Search />}
      {appStore.activeState === 'satellite' && <Satellite />}
      {appStore.activeState === 'owners' && <SatelliteOwners />}
      {appStore.isLoading && <Loading></Loading>}
      {appStore.displayAbout && <About />}
    </>
  );
});

export default App;
