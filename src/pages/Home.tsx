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
        mediaSrc="/videos/grass.mp4"
        title="Empowering the Underprivileged Through Innovation"
        subtitle="Since 2008, AgriDynamic has been demonstrating sustainable solutions to underprivileged persons, founded by community members with firsthand rural experience."
      />

      
      
      {/* Mission Statement */}
      
      
      {/* Call to Action */}
      <motion.section
        className="py-16 text-green-900"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 variants={fadeInUp} className="text-4xl font-bold mb-6">Join Us in Creating Change</motion.h2>
          <motion.p variants={fadeInUp} className="text-xl mb-8">
            Together, we can transform lives through smart, inclusive agriculture and sustainable solutions.
          </motion.p>
          <motion.div variants={staggerContainer} className="flex flex-wrap justify-center gap-4">
            <motion.div variants={scaleUp}>
              <Link
                to="/about"
                className="px-6 py-3 bg-white text-green-700 hover:bg-gray-300 font-medium rounded-3xl transition-colors duration-200"
              >
                Learn More
              </Link>
            </motion.div>
            <motion.div variants={scaleUp}>
              <Link
                to="/contact"
                className="px-6 py-3 bg-green-800 hover:bg-green-700 text-white font-medium rounded-3xl transition-colors duration-200 "
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