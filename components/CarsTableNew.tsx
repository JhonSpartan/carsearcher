"use client"
import { useThemeContext } from '@/libs/contexts/context'
import { carProps, filterItemsFull } from '@/types'
import { Table, TableCell, TableHead, TablePagination, TableRow, TableSortLabel } from '@mui/material'
import React, { useState } from 'react'

const CarsTableNew = (headCells: { id: string, label: string }[], filterFn: any) => {

  const pages = [5, 10, 20]
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(pages[page]);
  const [order, setOrder] = useState<'asc' | 'desc'>();
  const [orderBy, setOrderBy] = useState<string | number | undefined>();

  const { dark } = useThemeContext();

  const TblContainer = (props: {children?: React.ReactNode}) => (
    <Table>
      { props.children }
    </Table>
    
  )

  const TblHead = (props: any) => {

    const handleSortRequest = (cellId: string)  => {
      const isAsc = orderBy === cellId && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc')
      setOrderBy(cellId)

    }

    return (
      <TableHead>
        <TableRow>
          {
            headCells.map(headCell => 
              (<TableCell 
                key={headCell.id}
                sx={{
                  fontWeight: '600',
                  color: `${dark ? '#a1a1a1' : '#1976d2'}`,
                  backgroundColor: `${dark ? '#1e293b' : '#e1e4f3'}`,
                }}
              >
                <TableSortLabel
                  active={ orderBy === headCell.id }
                  direction={ orderBy === headCell.id ? order : 'asc' }
                  onClick={ () => {handleSortRequest(headCell.id)} }
                >
                  {headCell.label}
                </TableSortLabel>
              </TableCell>)
            )
          }
        </TableRow >
      </TableHead>)
  }

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  const TblPagination = (props: filterItemsFull) => (
    <TablePagination
      component='div'
      page={page}
      rowsPerPageOptions={pages}
      rowsPerPage={rowsPerPage}
      count={props.cars.length}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  )

  function stableSort(array: [], comparator: any) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function getComparator(order: string | undefined, orderBy: any) {
      return order === 'desc'
          ? (a:number[], b:number[]) => descendingComparator(a, b, orderBy)
          : (a:number[], b:number[]) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator(a:number[], b:number[], orderBy: number) {
      if (b[orderBy] < a[orderBy]) {
          return -1;
      }
      if (b[orderBy] > a[orderBy]) {
          return 1;
      }
      return 0;
  }

  const carsAfterPagingAndSorting = (cars: carProps[]) => {
    return stableSort(filterFn.fn(cars), getComparator(order, orderBy))
        .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
  }
  
  return {
    TblContainer,
    TblHead,
    TblPagination,
    carsAfterPagingAndSorting,
  }
}

export default CarsTableNew