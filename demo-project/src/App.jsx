import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import UserProvider from "./context/provider";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import HomePage from "./pages/home";
import TodosPage from "./pages/todo";
import PostsPage from "./pages/post";
import AlbumsPage from "./pages/album";
import AlbumIndividualPage from "./pages/albumIndividual";
import InfoPage from "./pages/info";

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Home with nested routes */}
          <Route path="/home/*" element={<HomePage />}>
            <Route path="todos" element={<TodosPage />} />
            <Route path="posts" element={<PostsPage />} />
            <Route path="albums" element={<AlbumsPage />} />
            <Route path="albums/:albumId" element={<AlbumIndividualPage />} />
            <Route path="info" element={<InfoPage />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}
