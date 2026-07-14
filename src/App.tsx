import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BookmarkProvider } from './context/BookmarkContext';
import { ToastProvider } from './context/ToastContext';
import PageShell from './components/layout/PageShell';
import Footer from './components/layout/Footer';
import AIAssistant from './components/ai/AIAssistant';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import TimelinePage from './pages/TimelinePage';
import EventPage from './pages/EventPage';
import DynastiesPage from './pages/DynastiesPage';
import PersonalitiesPage from './pages/PersonalitiesPage';
import MapsPage from './pages/MapsPage';
import CollectionsPage from './pages/CollectionsPage';
import BookmarksPage from './pages/BookmarksPage';
import DashboardPage from './pages/DashboardPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <BookmarkProvider>
      <ToastProvider>
        <BrowserRouter>
          <PageShell>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/timeline" element={<TimelinePage />} />
              <Route path="/event/:id" element={<EventPage />} />
              <Route path="/dynasties" element={<DynastiesPage />} />
              <Route path="/personalities" element={<PersonalitiesPage />} />
              <Route path="/maps" element={<MapsPage />} />
              <Route path="/collections" element={<CollectionsPage />} />
              <Route path="/bookmarks" element={<BookmarksPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
            <AIAssistant />
          </PageShell>
        </BrowserRouter>
      </ToastProvider>
    </BookmarkProvider>
  );
}

export default App;
