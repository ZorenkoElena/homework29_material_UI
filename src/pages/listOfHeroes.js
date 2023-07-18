import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import TablePagination from '@mui/material/TablePagination';
import Container from '@mui/material/Container';
// import Sheet from '@mui/joy/Sheet';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListOfHeroesAsync, getHeroByIdAsync } from '../store/slices/heroes.js';

import Hero from '../components/hero.js';

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
  // const page = useSelector((state) => state.heroes.page);
  const info = useSelector((state) => state.heroes.info);
  const heroes = useSelector((state) => state.heroes.listOfHeroes);
  const selectedHero = useSelector((state) => state.heroes.selectedHero);

  const dispatch = useDispatch();
  const showCardInfo = (id) => dispatch(getHeroByIdAsync(id));

  useEffect(() => {
    dispatch(getListOfHeroesAsync(pageInTable + 1));
  }, [dispatch, pageInTable]);

  const handleChangePage = (event, newPage) => {
    console.log('newPage', newPage);
    setPageInTable(newPage);
    // dispatch(setPage(newPage + 1));
    // console.log('page', page);
    console.log('pageInTable', pageInTable);
  };

  return (
    <>
      {/* <Grid container direction="row" justifyContent="center" alignItems="center"> */}
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
          {selectedHero && <Hero />}
          <TableContainer>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell align="left">Name</StyledTableCell>
                  <StyledTableCell align="left">Status</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {heroes.map((hero, index) => (
                  <StyledTableRow key={`hero-card-${index}`} onClick={() => showCardInfo(hero.id)} component="th" scope="row">
                    <StyledTableCell>{hero.id}</StyledTableCell>
                    <StyledTableCell align="left">{hero.name}</StyledTableCell>
                    <StyledTableCell align="left">{hero.status}</StyledTableCell>
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
                // labelDisplayedRows={({ page }) => {
                //   return `Page: ${page} of ${info.pages}`;
                // }}
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
