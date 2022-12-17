import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import { CategoriesProps } from '../../pages/api/category';
import Loading from '../Loading';

export default function CategoryTable() {
  const [rows, setRows] = useState<CategoriesProps[]>([]);
  const [loading, setLoading] = useState(true);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
      editable: true,
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ];

  useEffect(() => {
    setLoading(true);
    fetch('/api/category')
      .then((res) => res.json())
      .then((data) => setRows(data));
    setLoading(false);
  }, []);

  return (
    <Box className="h-auto w-full">
      {loading ? (<Loading />) : (
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          autoHeight
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      )}
    </Box>
  );
}