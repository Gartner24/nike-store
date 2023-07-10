import { useState } from 'react';
import { Header } from './components/Header';
import { ProductList } from './components/ProductList';

function App(){
    return(
        <>
        <Header />
        <ProductList />
        </>
    )
}

export default App;