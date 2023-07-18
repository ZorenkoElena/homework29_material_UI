import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Container from '@mui/material/Container';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListOfEpisodesAsync } from '../store/slices/episodes.js';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#e8d5b2',
    fontSize: 16,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

export default function BasicTable() {
  const rowsPerPage = 20;
  const [pageInTable, setPageInTable] = useState(0);

  const info = useSelector((state) => state.episodes.info);
  const heroes = useSelector((state) => state.episodes.listOfEpisodes);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListOfEpisodesAsync(pageInTable + 1));
  }, [dispatch, pageInTable]);

  const handleChangePage = (event, newPage) => {
    console.log('newPage', newPage);
    setPageInTable(newPage);
    console.log('pageInTable', pageInTable);
  };

  return (
    <>
      <Container maxWidth="sm">
        <Box
          sx={{
            width: 650,
            bgcolor: '#fdf5e6',
            boxShadow: 3,
            borderRadius: 2,
            p: 2,
            mt: 4,
          }}
        >
          <TableContainer>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell align="left">Episode</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {heroes.map((episode, index) => (
                  <StyledTableRow key={`hero-card-${index}`}>
                    <StyledTableCell component="th" scope="row">
                      {episode.id}
                    </StyledTableCell>
                    <StyledTableCell align="left">{episode.name}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>

              <TablePagination
                rowsPerPageOptions={[20]}
                component="div"
                count={info.count}
                page={pageInTable}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                showFirstButton={true}
                showLastButton={true}
              />
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </>
  );
}
