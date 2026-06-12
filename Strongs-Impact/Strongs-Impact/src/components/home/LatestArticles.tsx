import { Clock, User, ArrowRight } from 'lucide-react';
import { navigate } from '../../hooks/useLocation';
import { articles as allArticles, Article } from '../../data/articles';

const articles = allArticles.slice(0, 4);

const LatestArticles = () => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
      <div className="text-center mt-12">
        <button
          onClick={() => navigate('/article')}
          className="inline-flex items-center gap-2 px-7 py-3 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-sm font-medium hover:border-blue-600 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-colors"
        >
          View All Articles <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

const ArticleCard = ({ article }: { article: Article }) => (
  <div
    className="flex flex-col bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 cursor-pointer group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
    onClick={() => navigate(`/article/${article.slug}`)}
  >
    <div className="overflow-hidden h-44">
      <img
        src={article.image}
        alt={article.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
    <div className="flex flex-col flex-grow p-5">
      <span className="text-xs font-semibold tracking-wider uppercase text-blue-600 dark:text-blue-400 mb-2">
        {article.category || 'Article'}
      </span>
      <h3 className="text-sm font-bold mb-2 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
        {article.title}
      </h3>
      <p className="text-slate-500 dark:text-slate-400 text-xs mb-4 flex-grow leading-relaxed">
        {article.excerpt}
      </p>
      <div className="flex items-center text-xs text-slate-400 dark:text-slate-500 gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
        <span className="flex items-center gap-1">
          <User className="h-3 w-3" /> {article.author}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" /> {article.readTime}
        </span>
      </div>
    </div>
  </div>
);

export default LatestArticles;
