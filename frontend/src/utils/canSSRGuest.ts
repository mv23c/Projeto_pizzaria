import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies } from "nookies";

// Função para páginas que só podem ser acessadas por visitantes (pessoas não logadas) 
export function canSSRGuest<P>(fn: GetServerSideProps<P>) {
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {

        const cookies = parseCookies(ctx);

        // Se o cara tentar acessar a página porém tendo já um login salvo redirecionamos
        if (cookies['@nextauth.token']){
            return {
                redirect:{
                    destination: '/dashboard',
                    permanent: false,
                }
            }
        } 

        return await fn(ctx);
    }
}

/*
    - Para usuários não logados (sem está autenticado) (para login e cadastro)
    - Podemos usar esse conceito de server side client para verificar se existe um cookie salvo para verificação de login ou se temos uma rota privada.
    - O parseCookies busca o cookie salvo (que é o nosso token).
*/