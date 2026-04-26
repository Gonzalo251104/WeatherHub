/**
 * Main App component
 * Root component that wraps the application with necessary providers
 */

import { ThemeProvider, FavoritesProvider, TemperatureUnitProvider } from './context';
import { Header, Footer } from './components/layout';
import { HomePage } from './pages';

function App() {
  return (
    <ThemeProvider>
      <TemperatureUnitProvider>
        <FavoritesProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              <HomePage />
            </main>
            <Footer />
          </div>
        </FavoritesProvider>
      </TemperatureUnitProvider>
    </ThemeProvider>
  );
}

export default App;
