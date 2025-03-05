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
    PaymentIntentId: String;
    TransactionType: string;
    TransactionAmount: string;
    InAccordance: string;
    InAccordancePropertyId: {
      title: string;
      description: string;
    };
    SendedId: {
      _id: string;
      username: string;
      BankAountStripeId: string;
      Verified: boolean;
      cnic: number;
      email: string;
      phonenumber: number;
    };
    RecieverId: {
      _id: string;
      username: string;
      BankAountStripeId: string;
      Verified: boolean;
      cnic: number;
      email: string;
      phonenumber: number;
    };
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
      .post(`${BASE_URL}/api/admin/creditData`)
      .then((response) => {
        console.log(response.data);
        setUsers(response.data.data);
      })
      .catch((err) => {
        console.error('Error fetching users:', err);
      });
  }, [dialogParam]);

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
                {e.PaymentIntentId}
              </Box>
            </TableCell>

            <TableCell>{e.TransactionType}</TableCell>

            <TableCell>{e.TransactionAmount}</TableCell>
            <TableCell>{e.InAccordance}</TableCell>

            <TableCell>{e.SendedId?._id}</TableCell>
            <TableCell>{e.RecieverId?._id}</TableCell>

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
          <MenuItem
            onClick={() => {
              setOpenImageModal(true);
            }}
          >
            <Iconify icon="tabler:app-window-filled" />
            Show More Information
          </MenuItem>
        </MenuList>
      </Popover>
      <Dialog open={openImageModal} onClose={handleCloseImageModal}>
        <DialogTitle>Transactions Detail Information</DialogTitle>
        <DialogContent>
          <div>
            <div style={{ fontWeight: 800, marginBottom: '10px' }}> Sender Informations</div>
            <div style={{ fontSize: 14 }}>ID : {popoverData?.SendedId?._id}</div>

            <div style={{ fontSize: 14 }}>Name : {popoverData?.SendedId?.username}</div>
            <div style={{ fontSize: 14 }}>
              Bank Acoount Connected To Stripe : {popoverData?.SendedId?.BankAountStripeId}
            </div>
            <div style={{ fontSize: 14 }}>
              Account Verified : {popoverData?.SendedId?.Verified ? 'Yes' : 'No'}
            </div>
            <div style={{ fontSize: 14 }}>CNIC : {popoverData?.SendedId?.cnic}</div>
            <div style={{ fontSize: 14 }}>Email : {popoverData?.SendedId?.email}</div>
            <div style={{ fontSize: 14 }}>Phone Number : 0{popoverData?.SendedId?.phonenumber}</div>
          </div>

          <div>
            <div style={{ fontWeight: 800, marginBottom: '10px', marginTop: '20px' }}>
              {' '}
              Reciever Informations
            </div>
            <div style={{ fontSize: 14 }}>ID : {popoverData?.RecieverId?._id}</div>

            <div style={{ fontSize: 14 }}>Name : {popoverData?.RecieverId?.username}</div>
            <div style={{ fontSize: 14 }}>
              Bank Acoount Connected To Stripe : {popoverData?.RecieverId?.BankAountStripeId}
            </div>
            <div style={{ fontSize: 14 }}>
              Account Verified : {popoverData?.RecieverId?.Verified ? 'Yes' : 'No'}
            </div>
            <div style={{ fontSize: 14 }}>CNIC : {popoverData?.RecieverId?.cnic}</div>
            <div style={{ fontSize: 14 }}>Email : {popoverData?.RecieverId?.email}</div>
            <div style={{ fontSize: 14 }}>
              Phone Number : 0{popoverData?.RecieverId?.phonenumber}
            </div>
          </div>

          <div>
            <div style={{ fontWeight: 800, marginBottom: '10px', marginTop: '20px' }}>
              {' '}
              Property Informations
            </div>
            <div style={{ fontSize: 14 }}>
              Property : {popoverData?.InAccordancePropertyId?.title}
            </div>

            <div style={{ fontSize: 14 }}>
              Descriptiion : {popoverData?.InAccordancePropertyId?.description}
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseImageModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
