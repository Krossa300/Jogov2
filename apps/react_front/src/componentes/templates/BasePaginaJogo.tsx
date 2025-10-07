import { Outlet } from 'react-router-dom';
//import BotaoDeInicio from '../BotaoDeInicio';

const BasePaginaJogo = () => {
    return (    
            <div id="base-pagina-jogo"
            style={{
                backgroundColor: '#899afdff',
                margin: '10px',
                width: '1000px',
                height: '95vh',
                padding: '10px',
                border: '2px solid black',
                borderRadius: '8px',
            }}>
                {/* <BotaoDeInicio /> */}
                <Outlet />
            </div>
            
    );
};

export default BasePaginaJogo;
