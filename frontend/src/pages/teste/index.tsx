import * as React from 'react';
import { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { canSSRAuth } from '../../utils/canSSRAuth';
import { Header } from '../../components/Header';
import { setupAPIClient } from '../../services/api';
import styles from './styles.module.scss';
import { borderRadius } from '@mui/system';

/*
    renderizar as categorias
*/

type CategoriesProps = {
    id: string;
    name: string | null;
}

interface HomeProps{
    categories: CategoriesProps[];
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90, editable: false },
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    editable: false,
  },
];

// const rows = [
//     {id: "1", name: "doces"},
//     {id: "2", name: "bebidas"},
//     {id: "3", name: "salgados"},
// ]


export default function Teste({ categories }: HomeProps) {
  const[categoryList, setCategoryList] = useState(categories || []);  
  const[categoryItem, setCategoryItem] = useState(null);

    const handleOnCellClick = (params) => {
        setCategoryItem(params)
        console.log('Categoria selecionada: ', categoryItem)
        
    }

//   const handleOnRowClick = (params) => {
//     setCategoryItem(params);
//     console.log('Objeto selecionado: ', categoryItem)
//   }  

  return (
    <>
    <Header/>

    <div style={{ height: 400, width: '90%', background: '#fff' , backgroundColor: '#fff', margin: '3rem auto' }}>
      <DataGrid
        rows={categories}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        onCellClick={handleOnCellClick}
        //onRowClick={handleOnRowClick}
      />
    </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get('/category');
    return {
        props: {
            categories: response.data
        }
    }
})