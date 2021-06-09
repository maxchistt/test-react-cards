import React from 'react';

import './App.css';

import Loader from './Shared/Loader'

import { BrowserRouter as Router } from 'react-router-dom'
import { useRoutes } from './routes'
import { useAuth } from './Hooks/auth.hook'
import { AuthContext } from './Context/AuthContext'
import { PageContext } from './Context/PageContext'
import Header from './Pages/SharedComponents/Header'

function App() {
  /**подключение хука авторизации */
  const { token, login, logout, userId, email, ready } = useAuth()
  const isAuthenticated = !!token

  /**подключение хука роутов */
  const routes = useRoutes(isAuthenticated)

  /**хук обновления навбара */
  const [nav, setNav] = React.useState()

  if (!ready) {
    return (
      <div className="container display-4 text-center p-3" >
        <Loader />
      </div>
    )
  }

  /**рендер */
  return (
    /**
     * обертка в контексты авторизации и обноления хедера
     * внутри роутер со статичным хедером и динамическим содержимым
     * */
    <AuthContext.Provider value={{
      token, login, logout, userId, email, isAuthenticated
    }}>
      <PageContext.Provider value={{ setNav }}>
        <Router>
          <Header>{nav}</Header>
          <div className="App pb-3 mb-3">
            {routes}
          </div>
        </Router>
      </PageContext.Provider>
    </AuthContext.Provider>
  )
}

export default App;
