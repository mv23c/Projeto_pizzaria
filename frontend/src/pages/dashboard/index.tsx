import { useState } from 'react';
import { canSSRAuth } from "../../utils/canSSRAuth";
import Head from "next/head";
import styles from './styles.module.scss';

import { Header } from "../../components/Header";
import { FiRefreshCcw } from 'react-icons/fi';
import { setupAPIClient } from "../../services/api";

type OrdersProps = {
    id: string;
    table: string | number;
    status: boolean;
    draft: boolean;
    name: string | null;
}

interface HomeProps{
    orders: OrdersProps[];
}

export default function Dashboard({ orders }: HomeProps) {

    const [orderList, setOrderList] = useState(orders || []);

    function handleOpenModalView(id: string){
        alert("Teste id clicado: " + id);
    }

    return (
        <>
            <Head>
                <title>Painel - Sujeito Pizzaria</title>
            </Head>

            <div>
                <Header/>
                <main className={styles.container}>
                    <div className={styles.containerHeader} >
                        <h1>Últimos pedidos</h1>
                        <button>
                            <FiRefreshCcw size={25} color="#3fffa3" />
                        </button>
                    </div>

                    <article className={styles.listOrders}>
                        {orderList.map( item => (
                            <section key={item.id} className={styles.orderItem}>
                                <button onClick={ () => handleOpenModalView(item.id) }>
                                    <div  className={styles.tag}></div>
                                    <span>Mesa {item.table}</span>
                                </button>
                            </section>
                        ))}
                    </article>   
                </main>
            </div>
        </>
    )   
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get('/orders');

    return {
        props: {
            orders: response.data
        }
    }
})

// export const getServerSideProps = canSSRAuth(async (ctx) => {
//     return {
//         props: {}
//     }
// })