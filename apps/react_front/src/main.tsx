import { StrictMode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import BasePaginaTemplate from './componentes/templates/BasePaginaTemplate';
import BasePaginaMenu from './componentes/templates/BasePaginaMenu';
import BasePaginaJogo from './componentes/templates/BasePaginaJogo';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<BasePaginaTemplate />}>
            <Route element={<BasePaginaMenu />}>
              <Route element={<BasePaginaJogo />}>
                <Route index element={<App />} />
              </Route>
            </Route>
          </Route>
        </Routes>
    </BrowserRouter>
  </StrictMode>
);
