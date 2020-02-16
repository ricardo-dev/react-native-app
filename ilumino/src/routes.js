import {createStackNavigator} from 'react-navigation';

import LoadingPage from './pages/loadingPage';

import Tabs from './pages/main';
import Principal from './pages/principal';
import Mapas from './pages/mapas';
import Moedas from './pages/moedas';
import MoedaContent from './pages/moedaContent';
import Cadastrar from './pages/cadastrar';
import Comercio from './pages/comercio';
import PreLogin from './pages/preLogin';
import Login from './pages/login';
import DetalheComercio from './pages/DetalheComercio';
import MainContent from './pages/mainContent';

import Pagina1 from './pages/pagina1';
import Pagina2 from './pages/pagina2';

import TabsColaborador from './pages/mainCol';
import PrincipalCol from './pages/principalCol';
import Escritorio from './pages/escritorio';
import NovoComercio from './pages/novoComercio';
import NovoColaborador from './pages/novoColaborador';

import TabsUsuario from './pages/mainUser';
import PrincipalUser from './pages/principalUser';

import PreCadastro from './pages/cadastro/preCadastro';
import CadastroColaborador from './pages/cadastro/cadastroColaborador';
import CadastroUsuario from './pages/cadastro/cadastroUsuario';

import InicioCadastroUsuario from './pages/cadastro/passoCadastroUsuario/inicioCadastroUsuario';
import Passo1 from './pages/cadastro/passoCadastroUsuario/passo1';
import Passo2 from './pages/cadastro/passoCadastroUsuario/passo2';
import Passo3 from './pages/cadastro/passoCadastroUsuario/passo3';
import Passo4 from './pages/cadastro/passoCadastroUsuario/passo4';
import Passo5 from './pages/cadastro/passoCadastroUsuario/passo5';
import InicioCadastroColaborador from './pages/cadastro/passoCadastroColaborador/inicioCadastroColaborador';
import Passo11 from './pages/cadastro/passoCadastroColaborador/passo11';
import Passo12 from './pages/cadastro/passoCadastroColaborador/passo12';
import Passo13 from './pages/cadastro/passoCadastroColaborador/passo13';
import Passo14 from './pages/cadastro/passoCadastroColaborador/passo14';
import Passo15 from './pages/cadastro/passoCadastroColaborador/passo15';
import Passo16 from './pages/cadastro/passoCadastroColaborador/passo16';
import Passo21 from './pages/cadastro/passoCadastroColaborador/passo21';
import Passo22 from './pages/cadastro/passoCadastroColaborador/passo22';
import Passo23 from './pages/cadastro/passoCadastroColaborador/passo23';

import CadastroUsuarioColaborador from './pages/cadastro/cadastroUsuarioColaborador';

import EditarColaboradorP1 from './pages/editar/editarColaboradorP1';
import EditarColaboradorP2 from './pages/editar/editarColaboradorP2';

import MeusDadosUser from './pages/atividadeUsuario/meusDados';
import MeusDadosContentUser from './pages/atividadeUsuario/meusDadosContent';

import EditarDadosUsuario from './pages/atividadeUsuario/editarDadosUsuario';
import EditarUsuario from './pages/atividadeUsuario/editar/editarUsuario';
import EditarColaborador from './pages/atividadeColaborador/editar/editarColaborador';

import SejaColaborador from './pages/sejaColaborador';
import CadastreSeuNegocio from './pages/cadastreSeuNegocio';
import SobreAIlumino from './pages/sobreAIlumino';
import FaleConosco from './pages/faleConosco';
import Ajuda from './pages/ajuda';
import ListaCategorias from './pages/listaCategorias';
import ListaCategoriaContent from './pages/listaCategoriaContent';
import ListaCategoriaContentMainUser from './pages/listaCategoriaContentMainUser';

import MoedaPag from './pages/moedaPag';

import MeusDadosColaborador from './pages/atividadeColaborador/meusDadosColaborador';
import NovoColaboradorPag from './pages/atividadeColaborador/novoColaboradorPag';
import NovoColaboradorContent from './pages/atividadeColaborador/novoColaboradorContent';
import NovoComercioPag from './pages/atividadeColaborador/novoComercioPag';
import NovoComercioContent from './pages/atividadeColaborador/novoComercioContent';

import EditarDadosColaborador from './pages/atividadeColaborador/editarDadosColaborador';

import FinanceiroCompra from './pages/financeiro/compra';
import FinanceiroMovimentacao from './pages/financeiro/movimentacao';
import FinanceiroReceber from './pages/financeiro/receber';
import FinanceiroResgate from './pages/financeiro/resgate';
import FinanceiroTransferir from './pages/financeiro/transferir';

import SaibaMais from './pages/saibaMais';

//import MoedaPag from './pages/moedaPag';

//import MoedaPag from './pages/moedaPag';

//import CadastroColaboradorP1 from './pages/cadastro/cadastroColaboradorP1';
//import CadastroColaboradorP2 from './pages/cadastro/cadastroColaboradorP2';

//import SiderBarPublico from './menu/siderBarPublico';

export default createStackNavigator(
    {
        LoadingPage,
        Tabs,
        Principal,
        MainContent,
        Mapas,
        Moedas,
        MoedaContent,
        MoedaPag,
        Cadastrar,
        Comercio,
        PreLogin,
        Login,
        DetalheComercio,
        TabsColaborador,
        PrincipalCol,
        Escritorio,
        NovoComercio,
        NovoColaborador,
        Pagina1,
        Pagina2,
        TabsUsuario,
        PrincipalUser,
        PreCadastro,
        CadastroColaborador,
        CadastroUsuario,
        InicioCadastroUsuario,
        Passo1,
        Passo2,
        Passo3,
        Passo4,
        Passo5,
        InicioCadastroColaborador,
        Passo11,
        Passo12,
        Passo13,
        Passo14,
        Passo15,
        Passo16,
        Passo21,
        Passo22,
        Passo23,
        CadastroUsuarioColaborador,
        EditarColaboradorP1,
        EditarColaboradorP2,
        MeusDadosUser,
        MeusDadosContentUser,
        EditarDadosUsuario,
        EditarUsuario,
        EditarColaborador,

        SejaColaborador,
        CadastreSeuNegocio,
        SobreAIlumino,
        FaleConosco,
        Ajuda,
        ListaCategorias,
        ListaCategoriaContent,
        ListaCategoriaContentMainUser,
        MeusDadosColaborador,
        NovoColaboradorPag,
        NovoColaboradorContent,
        NovoComercioPag,
        NovoComercioContent,
        EditarDadosColaborador,
        FinanceiroCompra,
        FinanceiroMovimentacao,
        FinanceiroReceber,
        FinanceiroResgate,
        FinanceiroTransferir,
        SaibaMais,
        //CadastroColaboradorP1,
        //CadastroColaboradorP2,
        //SiderBarPublico,
    },
  /*  {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }, 
    /*{
        navigationOptions: {
            headerVisible: false, 
            headerStyle: {
                backgroundColor: '#DA552F',
            },
            headerTintColor: '#fff',
            title: 'iLumino',
            headerTitleStyle: {
                textAlign: 'center',
                flex: 1,
            },
        },
    },*/
);