import { Outlet } from 'react-router-dom';

const BasePaginaTemplate = () => {
    return (
        <div id="base-pagina-template"
        style={{
            minHeight: '95vh',
            width: '100vw',
            display: 'flex',
            flexDirection: 'column',
            position: 'fixed',
            top: 0,
            left: 0,
            placeItems: 'center'
        }}>
            <Outlet />
        </div>
    );
};

export default BasePaginaTemplate;
