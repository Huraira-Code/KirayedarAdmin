import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { PropertyView } from 'src/sections/property/view';
// ----------------------------------------------------------------------

export default function Property() {
  
  return (
    <>
      <Helmet>
        <title> {`Properties - ${CONFIG.appName}`}</title>
      </Helmet>

      <PropertyView />
    </>
  );
}
