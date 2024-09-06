import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { Store } from './redux/store.ts'
import './css/main.css'
import './css/repo.css'

createRoot(document.getElementById('root')!).render(
    <Provider store={Store}>
        <App />
    </Provider>
)
