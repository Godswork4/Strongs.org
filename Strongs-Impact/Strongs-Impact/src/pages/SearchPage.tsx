import { useState } from 'react';
import { Search, X, Book, SquarePen, Video, Headphones } from 'lucide-react';

interface SearchResult {
  id: number;
  title: string;
  excerpt: string;
  type: string;
  icon: React.ReactNode;
}

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    // Simulate search results after a delay
    setTimeout(() => {
      setSearchResults([
        {
          id: 1,
          title: "Understanding God's Grace in Everyday Life",
          excerpt: "Discover how God's grace manifests in our daily experiences and challenges.",
          type: "Article",
          icon: <Book className="h-5 w-5" />
        },
        {
          id: 2,
          title: "The Biblical Framework of Faith and Works",
          excerpt: "Examining the relationship between faith and works in Christian theology.",
          type: "Study",
          icon: <SquarePen className="h-5 w-5" />
        },
        {
          id: 3,
          title: "Grace: The Foundation of Salvation",
          excerpt: "A sermon exploring how grace forms the foundation of our salvation.",
          type: "Sermon",
          icon: <Video className="h-5 w-5" />
        },
        {
          id: 4,
          title: "Living in God's Grace",
          excerpt: "A podcast discussion on how to live fully in the reality of God's grace.",
          type: "Podcast",
          icon: <Headphones className="h-5 w-5" />
        },
        {
          id: 5,
          title: "Grace in the Old Testament",
          excerpt: "Tracing the theme of grace throughout the Old Testament narrative.",
          type: "Article",
          icon: <Book className="h-5 w-5" />
        }
      ]);
      setIsSearching(false);
    }, 1000);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Search Header */}
      <section className="bg-blue-800 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Search Resources</h1>
            <p className="text-xl text-blue-100 mb-8">
              Find articles, studies, sermons, and more to help you grow in your faith.
            </p>
            
            <form onSubmit={handleSearch} className="relative">
              <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
                <input
                  type="text"
                  placeholder="Search by keyword, topic, or scripture..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 text-gray-900 dark:text-white bg-transparent focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 px-2"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
                <button
                  type="submit"
                  className="bg-blue-800 text-white px-6 py-4 hover:bg-blue-900 transition-colors"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Search Results */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {isSearching ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-4 border-blue-800 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Searching resources...</p>
            </div>
          ) : searchResults.length > 0 ? (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Search Results for "{searchQuery}"
              </h2>
              <div className="space-y-6">
                {searchResults.map((result) => (
                  <SearchResultItem key={result.id} result={result} />
                ))}
              </div>
            </div>
          ) : searchQuery ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">No results found for "{searchQuery}"</p>
              <p className="mt-2 text-gray-500 dark:text-gray-500">Try using different keywords or browse our resources below.</p>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Popular Search Categories
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <SearchCategory name="Grace" count={34} />
                <SearchCategory name="Faith" count={28} />
                <SearchCategory name="Prayer" count={22} />
                <SearchCategory name="Salvation" count={19} />
                <SearchCategory name="Holy Spirit" count={17} />
                <SearchCategory name="Gospel" count={15} />
                <SearchCategory name="Love" count={13} />
                <SearchCategory name="Jesus" count={45} />
              </div>
              
              <h2 className="text-2xl font-bold my-8 text-gray-900 dark:text-white">
                Popular Bible Books
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <BibleBook name="Romans" />
                <BibleBook name="John" />
                <BibleBook name="Psalms" />
                <BibleBook name="Ephesians" />
                <BibleBook name="Genesis" />
                <BibleBook name="Matthew" />
                <BibleBook name="Hebrews" />
                <BibleBook name="Revelation" />
                <BibleBook name="Isaiah" />
                <BibleBook name="Acts" />
                <BibleBook name="1 Corinthians" />
                <BibleBook name="James" />
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

interface SearchResultItemProps {
  result: SearchResult;
}

const SearchResultItem = ({ result }: SearchResultItemProps) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
    <div className="flex items-center mb-2">
      <div className="text-blue-800 dark:text-blue-400 mr-2">
        {result.icon}
      </div>
      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
        {result.type}
      </span>
    </div>
    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
      {result.title}
    </h3>
    <p className="text-gray-600 dark:text-gray-400">
      {result.excerpt}
    </p>
  </div>
);

interface SearchCategoryProps {
  name: string;
  count: number;
}

const SearchCategory = ({ name, count }: SearchCategoryProps) => (
  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
    <div className="flex justify-between items-center">
      <span className="font-medium text-gray-900 dark:text-white">{name}</span>
      <span className="text-sm text-gray-500 dark:text-gray-400">{count}</span>
    </div>
  </div>
);

interface BibleBookProps {
  name: string;
}

const BibleBook = ({ name }: BibleBookProps) => (
  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
    <span className="font-medium text-gray-900 dark:text-white">{name}</span>
  </div>
);

export default SearchPage;