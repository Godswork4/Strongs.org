import { Book, Heart, Globe, Users, Mic2, BookOpen, Megaphone } from "lucide-react";

interface ActivityCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ActivityCard = ({ icon, title, description }: ActivityCardProps) => (
  <div className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
    <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-5 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-600 dark:group-hover:text-white transition-colors duration-300">
      {icon}
    </div>
    <h3 className="text-base font-semibold mb-2 text-slate-900 dark:text-white">
      {title}
    </h3>
    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
      {description}
    </p>
  </div>
);

const AboutPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-blue-800 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Strongs
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Turning sinners to saints, equipping them, and saints to soul winners.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
              Our Mission
            </h2>
            <div className="space-y-5 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                STRONGS exists to proclaim the Gospel of Jesus Christ, disciple believers through sound biblical teaching, and equip a generation of spiritually mature, intellectually grounded, and mission-minded Christians for effective service in God's kingdom.
              </p>
              <p>
                We are committed to making biblical truth accessible, understandable, and applicable to everyday life through evangelism, discipleship, teaching, leadership development, and strategic missions. We seek to bridge the gap between knowledge and practice, helping believers not only understand God's Word but also live it faithfully and share it boldly with others.
              </p>
              <p>
                Our mission is to raise believers who are firmly rooted in Scripture, equipped for ministry, committed to personal and professional excellence, and passionate about advancing the Gospel in their communities, workplaces, campuses, and nations. We believe that every Christian is called not only to follow Christ but also to participate in His mission of making disciples of all nations.
              </p>
              <p>
                As The Spiritual Intellectuals, we are dedicated to cultivating both spiritual depth and intellectual growth, raising men and women who can think biblically, live purposefully, lead responsibly, and influence society for the glory of God.
              </p>
              <p>
                Founded by Joshua Mofiyinfoluwa, ABOKEDE, STRONGS continues to serve as a platform for evangelism, discipleship, missions, leadership development, and biblical education, with the goal of seeing lives transformed, believers equipped, and communities impacted by the truth of God's Word.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Our Core Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ValueCard
              icon={<Book className="h-10 w-10" />}
              title="Biblical Truth"
              description="We are committed to the accuracy and authority of Scripture as God's inspired Word."
            />
            <ValueCard
              icon={<Heart className="h-10 w-10" />}
              title="Spiritual Growth"
              description="We believe in fostering continuous spiritual development through biblical understanding."
            />
            <ValueCard
              icon={<Globe className="h-10 w-10" />}
              title="Global Impact"
              description="We aim to make biblical resources accessible to believers worldwide regardless of location."
            />
            <ValueCard
              icon={<Users className="h-10 w-10" />}
              title="Community"
              description="We foster a community of believers who learn, grow, and support one another."
            />
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
              Our Story
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
              <p>
                STRONGS began with two distinct simple vision of raising
                spiritual intellectuals and turning sinners to saints and saints
                to soul-winners.
              </p>
              <p>
                It started years back with a group of Bible students and young
                believers who shared a common burden for clarity in God's Word.
                We noticed that many people wanted to understand Scripture more
                deeply, but often struggled to find resources that were both
                sound, practical, and easy to understand.
              </p>
              <p>
                From that burden, STRONGS was formed.
              </p>
              <p>
                We began by holding symposiums for writers, musicians, and
                teenagers. Also, writing in-depth articles that explained
                biblical truths in clear and simple language. The goal was not
                just to share information, but to help believers truly understand
                Scripture and apply it in daily life and professions.
              </p>
              <p>
                As time went on, more people began to engage with the content,
                and the vision expanded. We keep on evangelising students and all
                age groups, holding bible studies, conferences, crusades and
                outreaches. Using every means possible to engage people with the
                truth of God's word.
              </p>
              <p>
                Today, STRONGS serves many believers across different places,
                providing trusted biblical resources, teachings that support
                spiritual growth, sound understanding, and practical Christian
                living.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-600 dark:text-blue-400 mb-3">
              Why We Exist
            </p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Our Vision &amp; Mission
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Vision */}
            <div className="relative bg-slate-900 dark:bg-slate-800 rounded-2xl p-8 text-white overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full -translate-y-8 translate-x-8" />
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-blue-600/10 rounded-full translate-y-6 -translate-x-6" />
              <div className="relative z-10">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-600/30 text-blue-300 mb-6">
                  Vision Statement
                </span>
                <p className="text-lg leading-relaxed text-slate-200">
                  To raise a generation of believers who are deeply grounded in God's Word, intellectually sound in the truth of Scripture, and actively engaged in fulfilling the Great Commission.
                </p>
              </div>
            </div>

            {/* Mission */}
            <div className="relative bg-blue-600 rounded-2xl p-8 text-white overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full translate-y-6 -translate-x-6" />
              <div className="relative z-10">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white mb-6">
                  Mission Statement
                </span>
                <p className="text-lg leading-relaxed text-blue-50">
                  To make biblical truth accessible, clear, and practical through sound teaching, discipleship resources, and evangelistic content that helps believers grow in faith, understand Scripture accurately, and become effective witnesses of Christ.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-16 bg-slate-50 dark:bg-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-600 dark:text-blue-400 mb-3">
              Our Activities
            </p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              What We Do
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
              We use every means possible to engage people with the truth of God's Word — from campuses to communities.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <ActivityCard
              icon={<BookOpen className="h-6 w-6" />}
              title="Bible Studies"
              description="We hold regular, in-depth Bible study sessions that help believers understand Scripture accurately and apply it to everyday life."
            />
            <ActivityCard
              icon={<Megaphone className="h-6 w-6" />}
              title="Crusades & Outreaches"
              description="We take the gospel to the streets, campuses, and communities — reaching the lost and calling sinners to repentance."
            />
            <ActivityCard
              icon={<Mic2 className="h-6 w-6" />}
              title="Conferences"
              description="We organise conferences that bring together believers for sound teaching, spiritual growth, and fellowship around God's Word."
            />
            <ActivityCard
              icon={<Users className="h-6 w-6" />}
              title="Symposiums"
              description="We host symposiums for writers, musicians, and teenagers — equipping young people to serve God faithfully in their callings."
            />
            <ActivityCard
              icon={<Globe className="h-6 w-6" />}
              title="Evangelism"
              description="We train and deploy believers as effective witnesses of Christ, reaching all age groups with the message of salvation."
            />
            <ActivityCard
              icon={<Heart className="h-6 w-6" />}
              title="Discipleship"
              description="We walk alongside new and growing believers, providing resources and mentorship to help them mature in their faith."
            />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Our Team
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <TeamMember
              name="Joshua Mofiyinfoluwa, ABOKEDE."
              role="General Coordinator"
              bio="Joshua Mofiyinfoluwa, ABOKEDE, is a bible expositor. He leads different bible study groups and is committed to preaching and leading secondary school students."
              image="https://scontent.fiba2-3.fna.fbcdn.net/v/t39.30808-6/688846743_1264738009163315_2596862463136307081_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEi9yfZ0NmT_tkkUMf4G1DugC1_O8qTITiALX87ypMhOPWpuF00LR3C6O7tkqvyOgaUWWhic4E_PkNgUARo7CrQ&_nc_ohc=-L2YyUKvS4wQ7kNvwFpCiFK&_nc_oc=Adon8agMbpFuPaqnNtjSjtFrRrnnI8ChPIC0k1Lps3zwLV0dobWMgivFzhCbuQTEN6Q&_nc_zt=23&_nc_ht=scontent.fiba2-3.fna&_nc_gid=7Zgkw8e-n03t4Tl_XStXhg&_nc_ss=7a2a8&oh=00_Af_tYBQOzgccnfhJi9GqPfr3FNchmJidHafeN4attagYzw&oe=6A28A52D"
            />
            <TeamMember
              name="Ev. Godwin Ayorinde, OLAEWE."
              role="Vice President"
              bio="Dn. Godwin Ayorinde is a bible teacher, an evangelist, a chanter and a drama evangelist."
              image="https://scontent.fiba2-1.fna.fbcdn.net/v/t39.30808-6/462586845_2926905340797400_4991963037056552060_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFDhv4RETdVAIU7jCZB9bu_JDL9OAvNLFwkMv04C80sXERa3X_RHXyf2Sd2aIZh7y06WaEPgmfjJ2h5tM0A9xX5&_nc_ohc=qYOARhTvgJkQ7kNvwHEMY5B&_nc_oc=Adpa3btU6N-8pUqpZ2MMBCN3FiPN-jqD03VyZeIwofcm6z26eR7KLOgvHJBJA5LS4Eo&_nc_zt=23&_nc_ht=scontent.fiba2-1.fna&_nc_gid=54LhVf485ib4OFFRRWP4bA&_nc_ss=7b2a8&oh=00_Af89l28q0djWQmB5n5787zI2cYlXcbA4vsgz3x0L09cfgg&oe=6A2815CC"
            />
            <TeamMember
              name="Ev. Enoch Oluwatobi, OLADOSU"
              role="Administrative Secretary"
              bio="Ev. Enoch is an evangelist. He is committed to preaching and raising young ones."
              image="https://scontent.fiba2-1.fna.fbcdn.net/v/t39.30808-6/717404558_1289521233351659_4676154145444072485_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeG8b8M7S7L8FzEp0nj64YyO6xoDYFOeOLPrGgNgU544s38V4dnWpsznWrpuYFQ8bag7Wmt73twDzBZnht0Zqkv9&_nc_ohc=nKpLGXZNenQQ7kNvwFS6O8a&_nc_oc=AdrsW2EXbk_FgxtwIB6KUg28-zG_SAzy3rVK4btEAMsbqDDUCRRhUx7s-32shyGtPMA&_nc_zt=23&_nc_ht=scontent.fiba2-1.fna&_nc_gid=SLozD3Ug7o5mmEDNNVUcTg&_nc_ss=7b2a8&oh=00_Af_OQQ1WV6zG2R-dcQb5-kWv-snGG9TA58JywKzaIXD8aQ&oe=6A287E89"
            />
            <TeamMember
              name="Ev. Fulfilment Omorinsola, FOLAHAN."
              role="General Secretary"
              bio="Ev. Fulfilment Omorinsola is committed to the work of the ministry and serves faithfully in coordinating the affairs of the Strongs team."
              image="https://scontent.fiba2-1.fna.fbcdn.net/v/t39.30808-6/717219367_1289521703351612_2673363760020927868_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGrPuJX_QP3yJi4o8RJcRxUnWtOL0NQ4dqda04vQ1Dh2kLhoBSxE-3pcCzz_A7bP6kcyWFbmuc7j76uBzzIRc9q&_nc_ohc=8AEskeWTdgsQ7kNvwGCf0R_&_nc_oc=AdrJmjJ9mkWzax-bDX3GGgYLQlxANl36XOzM72HyOr0GnwNREjOEDHbx6mNuKSWTP_Y&_nc_zt=23&_nc_ht=scontent.fiba2-1.fna&_nc_gid=LdA5a9hkXe8_OkO6seCwdA&_nc_ss=7b2a8&oh=00_Af-YDG1N12c9_fWCV986LPUTFx4CqTGo6cpODtUAwq2Meg&oe=6A28A397"
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
              Get In Touch
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
              Have questions or feedback? We'd love to hear from you. Reach out
              to us through any of the channels below.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  Email Us
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  strongsimpact@gmail.com
                </p>
              </div>
              <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  Call Us
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  +234 813 789 0055
                </p>
              </div>
              <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  Follow Us
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  @Strongs on facebook
                </p>
              </div>
            </div>

            <a
              href="#"
              className="inline-block bg-blue-800 hover:bg-blue-900 text-white px-6 py-3 rounded-md font-medium transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ValueCard = ({ icon, title, description }: ValueCardProps) => (
  <div className="bg-white dark:bg-gray-900 rounded-lg p-6 text-center shadow-md">
    <div className="text-blue-800 dark:text-blue-400 flex justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
      {title}
    </h3>
    <p className="text-gray-600 dark:text-gray-400">{description}</p>
  </div>
);

interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
  image?: string;
}

const TeamMember = ({ name, role, bio, image }: TeamMemberProps) => (
  <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md">
    {image ? (
      <img src={image} alt={name} className="w-full h-64 object-cover object-top scale-110 origin-top" />
    ) : (
      <div className="w-full h-64 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
        <div className="w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
          <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {name.charAt(0)}
          </span>
        </div>
      </div>
    )}
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-1 text-gray-900 dark:text-white">
        {name}
      </h3>
      <p className="text-blue-800 dark:text-blue-400 font-medium mb-3">
        {role}
      </p>
      <p className="text-gray-600 dark:text-gray-400">{bio}</p>
    </div>
  </div>
);

export default AboutPage;
