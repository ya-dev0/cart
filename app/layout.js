import Navbar from '../components/Navbar';
import { BasketProvider } from '../components/BasketContext';
import '../app/globals.css'; // Tailwind CSS imports

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <BasketProvider>
          <Navbar />
          {children}
        </BasketProvider>
      </body>
    </html>
  );
}
