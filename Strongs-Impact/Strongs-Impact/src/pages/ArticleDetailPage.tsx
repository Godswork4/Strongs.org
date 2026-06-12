import { useParams } from "react-router-dom";
import { ArrowLeft, Clock, User, Tag } from "lucide-react";
import { navigate } from "../hooks/useLocation";
import { getArticleBySlug } from "../data/articles";

const ArticleDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Article Not Found
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The article you're looking for doesn't exist.
        </p>
        <button
          onClick={() => navigate("/article")}
          className="px-6 py-3 bg-blue-800 text-white rounded-md font-medium hover:bg-blue-900 transition-colors"
        >
          Browse All Articles
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Image */}
      <div className="relative h-72 md:h-96 w-full overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <button
            onClick={() => navigate("/article")}
            className="flex items-center text-white/80 hover:text-white mb-4 transition-colors text-sm"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Articles
          </button>
          <span className="inline-block px-3 py-1 text-xs font-semibold bg-blue-600 text-white rounded-full mb-3">
            {article.category}
          </span>
          <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight max-w-3xl">
            {article.title}
          </h1>
        </div>
      </div>

      {/* Article Body */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl py-10">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>{article.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{article.readTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <Tag className="h-4 w-4" />
            <span>{article.date}</span>
          </div>
        </div>

        {/* Excerpt */}
        <p className="text-lg text-gray-600 dark:text-gray-300 italic mb-8 leading-relaxed">
          {article.excerpt}
        </p>

        {/* Content Paragraphs */}
        <div className="space-y-6">
          {article.content.map((paragraph, index) => (
            <p
              key={index}
              className="text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Footer Nav */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <button
            onClick={() => navigate("/article")}
            className="flex items-center text-blue-800 dark:text-blue-400 hover:underline font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            All Articles
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-5 py-2 bg-blue-800 text-white rounded-md font-medium hover:bg-blue-900 transition-colors text-sm"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailPage;
