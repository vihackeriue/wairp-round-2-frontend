import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import AuthorsList from "./pages/AuthorsList";
import AuthorsCreate from "./pages/AuthorsCreate";
import BooksList from "./pages/BooksList";
import BooksCreate from "./pages/BooksCreate";
import ReviewsCreate from "./pages/ReviewsCreate";
import ReviewsList from "./pages/ReviewsList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<AuthorsList />} />

        <Route path="/authors" element={<AuthorsList />} />
        <Route path="/authors/create" element={<AuthorsCreate />} />

        <Route path="/books" element={<BooksList />} />
        <Route path="/books/create" element={<BooksCreate />} />

        <Route path="/reviews" element={<ReviewsList />} />
        <Route path="/reviews/create" element={<ReviewsCreate />} />
      </Route>
    </Routes>
  );
}

export default App;
