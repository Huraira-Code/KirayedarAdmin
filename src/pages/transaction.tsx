import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { TransactionView } from 'src/sections/transactions/view';


// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Transactions - ${CONFIG.appName}`}</title>
      </Helmet>

      <TransactionView />
    </>
  );
}
