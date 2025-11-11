import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router";
import UserProvider from "./context/provider";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import HomePage from "./pages/home";
import TodosPage from "./pages/todo";
import PostsPage from "./pages/post";
import AlbumsPage from "./pages/album";
import InfoPage from "./pages/info";

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/home/*" element={<HomePage />}>
            <Route path="todos" element={<TodosPage />} />
            <Route path="posts" element={<PostsPage />} />
            <Route path="albums" element={<AlbumsPage />} />
            <Route path="info" element={<InfoPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}
