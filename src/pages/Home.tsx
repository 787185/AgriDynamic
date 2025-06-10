import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import TaskCard from '../components/TaskCard';
import ScrollableSection from '../components/ScrollableSection';
import ProjectCard from '../components/ProjectCard';
import { tasks, researchFocusCards, projects } from '../data';

const Home = () => {
  // Filter for completed projects to feature
  const featuredProjects = projects
    .filter(project => project.status === 'completed')
    .slice(0, 3);

  return (
    <div className="pt-16">
      {/* Hero Section with Video Background */}
      <HeroSection
        videoSrc="/videos/grass.mp4"
        title="Empowering the Underprivileged Through Innovation"
        subtitle="Since 2008, AgriDynamic has been demonstrating sustainable solutions to underprivileged persons, founded by community members with firsthand rural experience."
      />
      
      {/* Mission Statement */}
      <section className=" py-5 bg-white text-center  ">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
        <div className='flex flex-col sm:flex-row'>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            
            <p className="text-xl text-gray-700 leading-relaxed">
              AgriDynamic exists to provide innovative research-informed sustainable solutions and support to underprivileged persons. Whether it's a young farmer needing access to better tools, a young woman seeking to start a business, or a person with a disability looking for dignified work, we provide the solutions and support to make that happen.
            </p>
          </div>
          <div className='mr-5'>
            <img src="/pictures/globe.jpg" alt="" width={180} height={170}/>
          </div>
        </div>
        
      </section>
      
      {/* What We Do Section - Vertical Stacked Cards */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">What We Do</h2>
            <p className="mt-4 text-xl text-gray-600">Our core programs and initiatives</p>
          </div>
          
          <div className="space-y-8">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                title={task.title}
                description={task.description}
                image={task.image}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Research Focus Section - Horizontal Scrollbar */}
      <ScrollableSection
        title="Our Research & Innovation Institute"
        subtitle="FairEducation: Research that drives impact"
        cards={researchFocusCards}
      />
      
      {/* Featured Projects Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Featured Projects</h2>
            <p className="mt-4 text-xl text-gray-600">Highlights from our completed research</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                description={project.description}
                image={project.image}
                contributors={project.contributors}
                status={project.status}
              />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link
              to="/projects"
              className="inline-block px-6 py-3 bg-green-700 hover:bg-green-800 text-white font-medium rounded-3xl transition-colors duration-200"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-green-700 to-green-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Us in Creating Change</h2>
          <p className="text-xl mb-8">
            Together, we can transform lives through smart, inclusive agriculture and sustainable solutions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/about"
              className="px-6 py-3 bg-white text-green-700 hover:bg-gray-100 font-medium rounded-3xl transition-colors duration-200"
            >
              Learn More
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 bg-green-950 hover:bg-green-700 text-white font-medium rounded-3xl transition-colors duration-200 "
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
