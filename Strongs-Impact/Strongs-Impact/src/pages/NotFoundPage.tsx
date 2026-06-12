import { ArrowLeft } from 'lucide-react';
import { navigate } from '../hooks/useLocation';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl md:text-8xl font-bold text-blue-800 dark:text-blue-400 mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          We couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
        </p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center px-6 py-3 bg-blue-800 text-white rounded-md hover:bg-blue-900 transition-colors"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;