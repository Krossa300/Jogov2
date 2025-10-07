import { Outlet } from 'react-router-dom';

const BasePaginaMenu = () => {
    return (    
            <div
                id="base-pagina-menu"
                style={{
                    backgroundColor: '#ffadb1ff',
                    margin: '10px',
                    fontFamily: 'Arial, sans-serif',
                    width: '1800px',
                    height: '95vh',
                    padding: '10px',
                    borderRadius: '15px',
                }}
            >
                <Outlet />
            </div>
            
    );
};

export default BasePaginaMenu;
