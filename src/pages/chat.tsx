import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { ChatView } from 'src/sections/chat/view';
import { TransactionView } from 'src/sections/transactions/view';

// ----------------------------------------------------------------------

export default function Page() {
  
  return (
    <>
      <Helmet>
        <title> {`Chat - ${CONFIG.appName}`}</title>
      </Helmet>

      <ChatView />
    </>
  );
}
