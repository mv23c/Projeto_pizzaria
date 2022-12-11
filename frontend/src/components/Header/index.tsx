import { useContext } from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { FiLogOut } from 'react-icons/fi';
import { AuthContext } from '../../contexts/AuthContext';

export function Header(){

    const { signOut } = useContext(AuthContext);

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/dashboard">
                    <Image src="/logo.svg" width={190} height={60} alt="Logo - Sujeito Pizza" />
                </Link>
                <nav className={styles.menuNav}>
                    <Link href="/category" className={styles.Link}>
                        Categoria
                    </Link>
                    <Link href="/product" className={styles.Link}>
                        Cardápio
                    </Link>

                    <button onClick={signOut}>
                        <FiLogOut color='#FFF' size={24} />
                    </button>
                </nav>
            </div>
        </header>
    )
}

/*
    <img src="/logo.svg" width={190} height={60}/>

    <Link href="/" className={styles.text}>
        Já possui uma conta? Faça login!
    </Link>

    - Não usamos mais o Link com <a>.

    - O react-icons deve ser instalado e importado o icone de interesse. Usamos ele dentro de um button html.  
*/