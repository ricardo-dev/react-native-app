import {AsyncStorage, ToastAndroid} from 'react-native';

const initialState = {

    idColaborador:-1,
    // login view
    nome:'',
    token:'',
    fotoPath:'',
    tipo:'',
    id:0,

    //user view
    sobreNome:'',
    cpf:'',
    nickname:'',
    celular:'',
    whatsapp:false,
    email:'',

    //colaborador view
    dataNascimento:'',
    nacionalidade:'',
    sexo:'',
    pais:'',
    estado:'',
    cidade:'',
    bairro:'',
    endereco:'',
    complemento:'',
    numero:'',
    cep:'',

    saldoiLumino:3.00,
}

const reducer = (state = initialState, action) => {
    
    switch(action.type){
        case 'SAVE_COL':
            return{
                ...state,
                idColaborador: action.payload.idColaborador,
            }
        case 'LOGIN':
            AsyncStorage.multiSet([
                ['@iLuminoApi:token', action.payload.token],
                ['@iLuminoApi:nomeUsuario', action.payload.nome],
                ['@iLuminoApi:tipo', action.payload.tipo],
                ['@iLuminoApi:fotoPath', action.payload.fotoPath],
                ['@iLuminoApi:id', '' + action.payload.id]
            ]);
            return{
                ...state,
                token: action.payload.token,
                nome: action.payload.nome,
                fotoPath:action.payload.fotoPath,
                tipo: action.payload.tipo,
                id:action.payload.id,
            }
        case 'GET_USER':
            AsyncStorage.multiSet([
                ['@iLuminoApi:sobreNome', action.payload.sobreNome],
                ['@iLuminoApi:cpf', action.payload.cpf],
                ['@iLuminoApi:nickname', action.payload.nickname],
                ['@iLuminoApi:celular', action.payload.celular],
                ['@iLuminoApi:whatsapp', JSON.stringify(action.payload.whatsapp)],
                ['@iLuminoApi:email', action.payload.email],
            ]);
            return{
                ...state,
                sobreNome:action.payload.sobreNome,
                cpf: action.payload.cpf,
                nickname :action.payload.nickname,
                celular:action.payload.celular,
                whatsapp:action.payload.whatsapp,
                email:action.payload.email,
            }
        case 'GET_COL':
            AsyncStorage.multiSet([
                ['@iLuminoApi:sobreNome', action.payload.sobreNome],
                ['@iLuminoApi:cpf', action.payload.cpf],
                ['@iLuminoApi:nickname', action.payload.nickname],
                ['@iLuminoApi:celular', action.payload.celular],
                ['@iLuminoApi:whatsapp', JSON.stringify(action.payload.whatsapp)],
                ['@iLuminoApi:email', action.payload.email],
                ['@iLuminoApi:dataNascimento', action.payload.dataNascimento],
                ['@iLuminoApi:nacionalidade', action.payload.nacionalidade],
                ['@iLuminoApi:sexo', action.payload.sexo],
                ['@iLuminoApi:pais', action.payload.pais],
                ['@iLuminoApi:estado', action.payload.estado],
                ['@iLuminoApi:cidade', action.payload.cidade],
                ['@iLuminoApi:bairro', action.payload.bairro],
                ['@iLuminoApi:endereco', action.payload.endereco],
                ['@iLuminoApi:complemento', action.payload.complemento],
                ['@iLuminoApi:numero', action.payload.numero],
                ['@iLuminoApi:cep', action.payload.cep],
            ]);
            return{
                ...state,
                sobreNome:action.payload.sobreNome,
                cpf: action.payload.cpf,
                nickname :action.payload.nickname,
                celular:action.payload.celular,
                whatsapp:action.payload.whatsapp,
                email:action.payload.email,
                dataNascimento:action.payload.dataNascimento,
                nacionalidade:action.payload.nacionalidade,
                sexo:action.payload.sexo,
                pais:action.payload.pais,
                estado:action.payload.estado,
                cidade:action.payload.cidade,
                bairro:action.payload.bairro,
                endereco:action.payload.endereco,
                complemento:action.payload.complemento,
                numero:action.payload.numero,
                cep:action.payload.cep,
            }
        case 'LOGOUT':
            AsyncStorage.removeItem('@iLuminoApi:token')
            AsyncStorage.removeItem('@iLuminoApi:nomeUsuario')
            AsyncStorage.removeItem('@iLuminoApi:tipo')
            AsyncStorage.removeItem('@iLuminoApi:fotoPath')
            AsyncStorage.removeItem('@iLuminoApi:id')
            AsyncStorage.removeItem('@iLuminoApi:sobreNome')
            AsyncStorage.removeItem('@iLuminoApi:cpf')
            AsyncStorage.removeItem('@iLuminoApi:nickname')
            AsyncStorage.removeItem('@iLuminoApi:celular')
            AsyncStorage.removeItem('@iLuminoApi:whatsapp')
            AsyncStorage.removeItem('@iLuminoApi:email')
            AsyncStorage.removeItem('@iLuminoApi:dataNascimento')
            AsyncStorage.removeItem('@iLuminoApi:nacionalidade')
            AsyncStorage.removeItem('@iLuminoApi:sexo')
            AsyncStorage.removeItem('@iLuminoApi:pais')
            AsyncStorage.removeItem('@iLuminoApi:estado')
            AsyncStorage.removeItem('@iLuminoApi:cidade')
            AsyncStorage.removeItem('@iLuminoApi:bairro')
            AsyncStorage.removeItem('@iLuminoApi:endereco')
            AsyncStorage.removeItem('@iLuminoApi:complemento')
            AsyncStorage.removeItem('@iLuminoApi:numero')
            AsyncStorage.removeItem('@iLuminoApi:cep')

            return{
                // login view
                nome:'',
                token:'',
                fotoPath:'',
                tipo:'',
                id:0,

                //user view
                sobreNome:'',
                cpf:'',
                nickname:'',
                celular:'',
                whatsapp:false,
                email:'',

                dataNascimento:'',
                nacionalidade:'',
                sexo:'',
                pais:'',
                estado:'',
                cidade:'',
                bairro:'',
                endereco:'',
                complemento:'',
                numero:'',
                cep:''
            }
        case 'ALTERAR_NOME':
        return{
            ...state,
            nome: action.payload.nome,
        }
    }
    
    return state;
}

export default reducer;