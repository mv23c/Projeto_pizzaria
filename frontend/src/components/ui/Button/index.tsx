import { ReactNode, ButtonHTMLAttributes } from 'react';
import styles from './styles.module.scss';
import { FaSpinner } from 'react-icons/fa';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean,
    children: ReactNode,
}

export function Button({ loading, children, ...rest }: ButtonProps) {
    return (
        <button 
        className={styles.button}
        disabled={loading} // Quando loading for true, o button será desativdado para não ter mais efeito de click
        {...rest}
        >
            { loading ? (
                <FaSpinner color="#FFF" size={16} />
            ) : (
                <a className={styles.buttonText}>
                    {children}
                </a>
            )}

            
        </button>
    )
}