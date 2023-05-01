import { Layout } from './components/Layout.jsx'
import { Routes, Route } from 'react-router-dom'

import { MainPage } from './pages/MainPage.jsx'
import { AllPostPage } from './pages/AllPostPage.jsx'
import { PostPage } from './pages/PostPage.jsx'
import { EditPostPage } from './pages/EditPostPage.jsx'
import { AddPostPage } from './pages/AddPostPage.jsx'
import { RegisterPage } from './pages/RegisterPage.jsx'
import { LoginPage } from './pages/LoginPage.jsx'

function App() {
    return (
       <Layout>
            <Routes>
                <Route path='/' element={<MainPage />} />
                <Route path='posts' element={<AllPostPage />} />
                <Route path=':id' element={<PostPage />} />
                <Route path=':id/edit' element={<EditPostPage />} />
                <Route path='new' element={<AddPostPage />} />
                <Route path='register' element={<RegisterPage />} />
                <Route path='login' element={<LoginPage />} />
            </Routes>
       </Layout>
    )
}
export default App