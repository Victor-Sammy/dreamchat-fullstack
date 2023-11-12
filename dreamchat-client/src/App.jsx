import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import ChatRoom from './pages/ChatRoom'
import Login from './pages/Login'
import { PrivateRoute } from './routes/PrivateRoute'
import AllChats from './pages/AllChats'
// import ChatRoom2 from './pages/ChatRoom2'
// import ChatRoom3 from './pages/ChatRoom3'
import ChatPage from './pages/ChatPage'
import { useState } from 'react'
import { UserAuth } from './context/AuthContext'

function App() {
  const [isButtonVisible, setIsButtonVisible] = useState(true)
  const [isSent, setIsSent] = useState(false)
  const { currentUser } = UserAuth()
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Login />} />

        <Route
          path='/allChats'
          element={
            <PrivateRoute>
              <AllChats
                isButtonVisible={isButtonVisible}
                setIsButtonVisible={setIsButtonVisible}
                isSent={isSent}
                setIsSent={setIsSent}
              />
            </PrivateRoute>
          }
        >
          <Route
            path=':id'
            element={
              <ChatRoom
                user={currentUser}
                isButtonVisible={isButtonVisible}
                setIsButtonVisible={setIsButtonVisible}
                isSent={isSent}
                setIsSent={setIsSent}
              />
            }
          />
          {/* <Route
          //   path='chat2'
          //   element={
          //     <ChatRoom2
          //       isButtonVisible={isButtonVisible}
          //       setIsButtonVisible={setIsButtonVisible}
          //     />
          //   }
          // />
          // <Route
          //   path='chat3'
          //   element={
          //     <ChatRoom3
          //       isButtonVisible={isButtonVisible}
          //       setIsButtonVisible={setIsButtonVisible}
          //     />
          //   }
          // />
          */}
          <Route path='chatpage' element={<ChatPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
