import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import TaskCard from '../components/TaskCard';
import ScrollableSection from '../components/ScrollableSection';
import ProjectCard from '../components/ProjectCard';
import { tasks, researchFocusCards, projects } from '../data';
import { motion } from 'framer-motion'; // Import motion

const Home = () => {
  // Filter for completed projects to feature
  const featuredProjects = projects
    .filter(project => project.status === 'completed')
    .slice(0, 3);

  // Define animation variants for common effects
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delay between each child animation
        delayChildren: 0.3,   // Delay before first child animation starts
      },
    },
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const scaleUp = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  };


  return (
    <div className="pt-16">
      {/* Hero Section with Video Background - Content unchanged */}
      <HeroSection
        videoSrc="/videos/grass.mp4"
        title="Empowering the Underprivileged Through Innovation"
        subtitle="Since 2008, AgriDynamic has been demonstrating sustainable solutions to underprivileged persons, founded by community members with firsthand rural experience."
      />
      
      {/* Mission Statement */}
      <motion.section
        className="py-5 bg-white text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }} // Animate once when 20% visible
        variants={fadeInUp}
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
        <div className='flex flex-col sm:flex-row'>
          <motion.div
            className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
            variants={slideInLeft} // Apply animation to this div
          >
            <p className="text-xl text-gray-700 leading-relaxed">
              AgriDynamic exists to provide innovative research-informed sustainable solutions and support to underprivileged persons. Whether it's a young farmer needing access to better tools, a young woman seeking to start a business, or a person with a disability looking for dignified work, we provide the solutions and support to make that happen.
            </p>
          </motion.div>
          <motion.div
            className='mr-5'
            variants={slideInRight} // Apply animation to this div
          >
            <img src="/pictures/globe.jpg" alt="Globe" width={180} height={170}/>
          </motion.div>
        </div>
      </motion.section>
      
      {/* What We Do Section - Vertical Stacked Cards */}
      <motion.section
        className="py-16 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer} // Stagger container for child TaskCards
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">What We Do</h2>
            <p className="mt-4 text-xl text-gray-600">Our core programs and initiatives</p>
          </motion.div>
          
          <div className="space-y-8">
            {tasks.map((task) => (
              <motion.div key={task.id} variants={fadeInUp}> {/* Each TaskCard animates */}
                <TaskCard
                  title={task.title}
                  description={task.description}
                  image={task.image}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      
      {/* Research Focus Section - Horizontal Scrollbar */}
      {/* The ScrollableSection component itself might need internal animation if it's not already handled */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp} // Animate the entire section
      >
        <ScrollableSection
          title="Our Research & Innovation Institute"
          subtitle="FairEducation: Research that drives impact"
          cards={researchFocusCards}
        />
      </motion.div>
      
      {/* Featured Projects Section */}
      <motion.section
        className="py-16 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer} // Stagger container for child ProjectCards
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Featured Projects</h2>
            <p className="mt-4 text-xl text-gray-600">Highlights from our completed research</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <motion.div key={project.id} variants={scaleUp}> {/* Each ProjectCard animates */}
                <ProjectCard
                  id={project.id}
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  contributors={project.contributors}
                  status={project.status}
                />
              </motion.div>
            ))}
          </div>
          
          <motion.div variants={fadeInUp} className="mt-12 text-center">
            <Link
              to="/projects"
              className="inline-block px-6 py-3 bg-green-700 hover:bg-green-800 text-white font-medium rounded-3xl transition-colors duration-200"
            >
              View All Projects
            </Link>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Call to Action */}
      <motion.section
        className="py-16 bg-gradient-to-r from-green-700 to-green-900 text-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-6">Join Us in Creating Change</motion.h2>
          <motion.p variants={fadeInUp} className="text-xl mb-8">
            Together, we can transform lives through smart, inclusive agriculture and sustainable solutions.
          </motion.p>
          <motion.div variants={staggerContainer} className="flex flex-wrap justify-center gap-4">
            <motion.div variants={scaleUp}>
              <Link
                to="/about"
                className="px-6 py-3 bg-white text-green-700 hover:bg-gray-100 font-medium rounded-3xl transition-colors duration-200"
              >
                Learn More
              </Link>
            </motion.div>
            <motion.div variants={scaleUp}>
              <Link
                to="/contact"
                className="px-6 py-3 bg-green-950 hover:bg-green-700 text-white font-medium rounded-3xl transition-colors duration-200 "
              >
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;