import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
  Chat,
  ChannelList,
  Channel,
  MessageList,
  MessageInput,
  ChannelListMessengerProps,
} from 'stream-chat-react';
import { StreamChat } from 'stream-chat';
import { DashboardContent } from 'src/layouts/dashboard';
import '~stream-chat-react/dist/css/v2/index.css';

// ----------------------------------------------------------------------

export function ChatView() {
  const [selectedChannel, setSelectedChannel] = useState(null); // Track selected channel
  const chatClient = StreamChat.getInstance('f4jd4sm2swcv'); // Replace with your API Key

  useEffect(() => {
    const connectUser = async () => {
      try {
        await chatClient.connectUser(
          {
            id: '67b317d16f8a513c231b77d7', // Replace with actual user ID
            name: 'Admin', // Replace with actual username
          },
          chatClient.devToken('67b317d16f8a513c231b77d7') // Development token for testing
        );
      } catch (error) {
        console.error('Error connecting user:', error);
      }
    };

    connectUser();
  }, []);

  const handleChannelSelect = (channel) => {
    setSelectedChannel(channel);
  };

  const handleBack = () => {
    setSelectedChannel(null); // Go back to Channel List
  };

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Chat View
        </Typography>
      </Box>

      <Chat client={chatClient} theme="messaging light">
        <ChannelList
          filters={{ members: { $in: ['67b317d16f8a513c231b77d7'] } }}
          onSelect={handleChannelSelect}
        />
        <div style={{ border: '1px dashed blue' }}>
          <Channel>
            <MessageList />
            <MessageInput />
          </Channel>
        </div>
      </Chat>
    </DashboardContent>
  );
}

// function ChannelsList({loadedChannels} : ChannelListMessengerProps){
//  return {
//   <>
//   </>
//  }
// }
