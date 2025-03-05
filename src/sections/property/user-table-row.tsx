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
      .post(`${BASE_URL}/api/admin/allProperties`)
      .then((response) => {
        setUsers(response.data);
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
          console.log('this is', e);
        }
        return (
          <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
            <TableCell component="th" scope="row">
              <Box gap={2} display="flex" alignItems="center">
                {e._id}
              </Box>
            </TableCell>

            <TableCell>{e.title}</TableCell>

            <TableCell>
              {' '}
              {`The property features a ${e.type} with an area of ${
                e.areaofhouse
              } Square feet, accommodating ${
                e.peoplesharing
              } residents who share ${e.bedroom} bedrooms and ${
                e.bathroom
              } bathroom. The monthly rent is Rs ${e.rent}, with a one-time advance payment of Rs ${
                e.rent
              }. This space is for ${
                e.bachelor ? 'Non Bachelor' : 'Bachelor'
              }, offering a comfortable and well-managed living experience.`}
            </TableCell>

            <TableCell align="center">
              {e.propertySelling.agreement ? (
                <Iconify width={22} icon="solar:check-circle-bold" sx={{ color: 'success.main' }} />
              ) : (
                '-'
              )}
            </TableCell>

            <TableCell>{e.propertyowner._id}</TableCell>
          </TableRow>
        );
      })}
    </>
  );
}
