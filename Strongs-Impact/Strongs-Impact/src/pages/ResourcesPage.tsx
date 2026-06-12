import { useState } from "react";
import {
  Download,
  Book,
  Video,
  Headphones,
  File,
  SquarePen,
  Filter,
} from "lucide-react";

const categories = [
  "All",
  "Bible Studies",
  "Devotionals",
  "Sermons",
  "Podcasts",
  "Books",
  "Courses",
];

const ResourcesPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-blue-800 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Resources</h1>
            <p className="text-xl text-blue-100">
              Explore our collection of Bible studies, devotionals, sermons, and
              more to deepen your faith.
            </p>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Navigation */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Browse Resources
              </h2>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-800 dark:hover:text-blue-400 md:hidden"
              >
                <Filter className="h-5 w-5 mr-1" />
                Filters
              </button>
            </div>
            <div
              className={`md:flex overflow-x-auto whitespace-nowrap pb-2 ${
                showFilters ? "block" : "hidden md:block"
              }`}
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 mr-2 rounded-md text-sm font-medium ${
                    activeCategory === category
                      ? "bg-blue-800 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  } transition-colors`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Resources */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
              Featured Resources
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ResourceCard
                title="Understanding the Beatitudes"
                description="A comprehensive study of Jesus' teachings in Matthew 5:1-12."
                type="study"
                icon={<Book className="h-6 w-6" />}
                image="https://images.pexels.com/photos/2752461/pexels-photo-2752461.jpeg?auto=compress&cs=tinysrgb&w=600"
              />
              <ResourceCard
                title="Living Faith in Daily Life"
                description="A 30-day devotional to help you cultivate faith in everyday moments."
                type="devotional"
                icon={<SquarePen className="h-6 w-6" />}
                image="https://images.pexels.com/photos/1261731/pexels-photo-1261731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              />
              <ResourceCard
                title="The Gospel According to Grace"
                description="A sermon series exploring the theme of grace throughout Scripture."
                type="sermon"
                icon={<Video className="h-6 w-6" />}
                image="https://images.pexels.com/photos/1471895/pexels-photo-1471895.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              />
            </div>
          </div>

          {/* All Resources */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
              All Resources
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ResourceCard
                title="The Parables of Jesus"
                description="A study guide for understanding Jesus' parables and their applications."
                type="study"
                icon={<Book className="h-6 w-6" />}
                image="https://media.istockphoto.com/id/1469145905/photo/light-filtering-through-a-keyhole.jpg?b=1&s=612x612&w=0&k=20&c=KTStAcAUwdx43k3vxs0PvqRXiNz6_4wHng4m8R6zJME="
              />
              <ResourceCard
                title="Finding Rest in God"
                description="A sermon about finding true rest in God amidst life's busyness."
                type="sermon"
                icon={<Video className="h-6 w-6" />}
                image="https://images.pexels.com/photos/1471895/pexels-photo-1471895.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              />
              <ResourceCard
                title="The Book of Romans: A Commentary"
                description="A verse-by-verse commentary on Paul's letter to the Romans."
                type="book"
                icon={<Book className="h-6 w-6" />}
                image="https://images.pexels.com/photos/185764/pexels-photo-185764.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              />
              <ResourceCard
                title="Faith and Doubt"
                description="A podcast series exploring the relationship between faith and doubt."
                type="podcast"
                icon={<Headphones className="h-6 w-6" />}
                image="https://images.pexels.com/photos/3756770/pexels-photo-3756770.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              />
              <ResourceCard
                title="Spiritual Disciplines for Today"
                description="A practical guide to cultivating spiritual disciplines in modern life."
                type="guide"
                icon={<File className="h-6 w-6" />}
                image="https://images.pexels.com/photos/1261731/pexels-photo-1261731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              />
              <ResourceCard
                title="The Gospel and Mental Health"
                description="A resource on how the gospel intersects with mental health challenges."
                type="study"
                icon={<Book className="h-6 w-6" />}
                image="https://images.pexels.com/photos/1471895/pexels-photo-1471895.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              />
              <ResourceCard
                title="Bible Reading Plan: Psalms"
                description="A 30-day reading plan through the Psalms with devotional thoughts."
                type="devotional"
                icon={<SquarePen className="h-6 w-6" />}
                image="https://images.pexels.com/photos/1261731/pexels-photo-1261731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              />
              <ResourceCard
                title="Understanding the Old Testament"
                description="A comprehensive course on the themes and theology of the Old Testament."
                type="course"
                icon={<Book className="h-6 w-6" />}
                image="https://images.pexels.com/photos/185764/pexels-photo-185764.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              />
              <ResourceCard
                title="Prayer: Communing with God"
                description="A sermon series on developing a meaningful prayer life."
                type="sermon"
                icon={<Video className="h-6 w-6" />}
                image="https://images.pexels.com/photos/1471895/pexels-photo-1471895.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              />
            </div>

            {/* Load More Button */}
            <div className="text-center mt-12">
              <button className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-md font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                Load More Resources
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

interface ResourceCardProps {
  title: string;
  description: string;
  type: string;
  icon: React.ReactNode;
  image: string;
}

const ResourceCard = ({
  title,
  description,
  type,
  icon,
  image,
}: ResourceCardProps) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg">
    <div className="h-48 overflow-hidden">
      <img src={image} alt={title} className="w-full h-full object-cover" />
    </div>
    <div className="p-6">
      <div className="flex items-center mb-2">
        <div className="text-blue-800 dark:text-blue-400 mr-2">{icon}</div>
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize">
          {type}
        </span>
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>
      <button className="flex items-center text-blue-800 dark:text-blue-400 font-medium hover:underline">
        <Download className="h-4 w-4 mr-1" />
        Download
      </button>
    </div>
  </div>
);

export default ResourcesPage;
