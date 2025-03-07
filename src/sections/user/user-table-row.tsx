import { useState, useCallback, useEffect } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';
import { Iconify } from 'src/components/iconify';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CardMedia,
  Typography,
} from '@mui/material';
import { Label } from 'src/components/label';
import axios from 'axios';
import { BASE_URL } from 'src/api';
// ----------------------------------------------------------------------

export type UserProps = {
  id: string;
  name: string;
  role: string;
  status: string;
  company: string;
  avatarUrl: string;
  isVerified: boolean;
};

type UserTableRowProps = {
  row: UserProps;
  selected: boolean;
  onSelectRow: () => void;
};

export function UserTableRow({ row, selected, onSelectRow }: UserTableRowProps) {
  interface UserData {
    _id: String;
    username: string;
    email: string;
    cnic: number;
    Verified: boolean;
    phonenumber: number;
    CNICImageArray: Array<string>;

    // Add any other properties you expect
  }
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);
  const [popoverData, setPopoverData] = useState<UserData | null>(null);

  const handleOpenPopover = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>, user: UserData) => {
      console.log('data coming from handleOpenPopover', user);
      setOpenPopover(event.currentTarget);
      setPopoverData(user);
    },
    []
  );

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
    setPopoverData(null);
  }, []);

  const [user, setUsers] = useState<UserData[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [dialogParam, setDialogParam] = useState<UserData | null>(null);
  const [openImageModal, setOpenImageModal] = useState(false);
  const handleCloseModal = () => {
    setOpenModal(false);
    setDialogParam(null);
  };
  const handleCloseImageModal = () => {
    setOpenImageModal(false);
  };
  useEffect(() => {
    axios
      .post(`${BASE_URL}/api/admin/adminalluser`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => {
        console.error('Error fetching users:', err);
      });
  }, [dialogParam]);

  const handleVerifyUser = (data: UserData) => {
    // Make the API call to verify the user.
    axios
      .post(`${BASE_URL}/api/admin/verifyUser`, { id: data._id })
      .then((response) => {
        console.log(response.status);
        if (response.status == 200) {
          setDialogParam(data);
          // Then open the modal.

          setOpenModal(true);
          handleClosePopover();
        }
        // // If verification is successful, store a parameter (for example, the user's name)
        // setDialogParam(data);
        // // Then open the modal.
        // setOpenModal(true);
        // handleClosePopover();
      })
      .catch((err) => {
        console.error('Error verifying user:', err);
      });
  };

  console.log(user.length);
  return (
    <>
      {user.map((e) => {
        {
          console.log(e);
        }
        return (
          <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
            <TableCell component="th" scope="row">
              <Box gap={2} display="flex" alignItems="center">
                {e.username}
              </Box>
            </TableCell>

            <TableCell>{e.email}</TableCell>

            <TableCell>{e.cnic}</TableCell>

            <TableCell align="center">
              {e.Verified ? (
                <Iconify width={22} icon="solar:check-circle-bold" sx={{ color: 'success.main' }} />
              ) : (
                '-'
              )}
            </TableCell>

            <TableCell>{e.phonenumber}</TableCell>

            <TableCell align="right">
              <IconButton onClick={(event) => handleOpenPopover(event, e)}>
                <Iconify icon="eva:more-vertical-fill" />
              </IconButton>
            </TableCell>
          </TableRow>
        );
      })}

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: { bgcolor: 'action.selected' },
            },
          }}
        >
          <MenuItem onClick={() => handleVerifyUser(popoverData!)}>
            <Iconify icon="hugeicons:tick-01" />
            Make User Verify
          </MenuItem>

          <MenuItem
            onClick={() => {
              setOpenImageModal(true);
            }}
          >
            <Iconify icon="tabler:app-window-filled" />
            Show CNIC Images
          </MenuItem>
        </MenuList>
      </Popover>
      <Dialog open={openImageModal} onClose={handleCloseImageModal}>
        <DialogTitle>User CNIC Images</DialogTitle>
        <DialogContent>
          {popoverData?.CNICImageArray?.length ? (
            popoverData.CNICImageArray.map((e: string, index: number) => (
              <CardMedia
                key={index} // Always add a key when mapping elements in React
                component="img"
                image={e}
                alt="User CNIC"
                sx={{ maxWidth: '100%', height: 'auto', borderRadius: 2, marginBottom: 10 }}
              />
            ))
          ) : (
            <Typography>No CNIC image available</Typography>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseImageModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
