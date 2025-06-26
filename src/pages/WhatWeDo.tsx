import { useEffect, useState } from 'react';
import { Users, BookOpen, DollarSign, Lightbulb, Target, Award } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import TaskCard from '../components/TaskCard';
import { tasks } from '../data';

const WhatWeDo = () => {
  const [isVisible, setIsVisible] = useState({
    overview: false,
    programs: false,
    approach: false,
    impact: false,
    outcomes: false
  });

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionName = entry.target.getAttribute('data-section');
          if (sectionName) {
            setIsVisible(prev => ({ ...prev, [sectionName]: true }));
          }
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('[data-section]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const approaches = [
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Community-Centered',
      description: 'We work with communities, not for them. Our programs are designed based on community needs assessments and implemented through participatory approaches that ensure local ownership.'
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: 'Evidence-Based',
      description: 'All our interventions are grounded in rigorous research and evidence. We continuously monitor and evaluate our programs to ensure they achieve intended outcomes.'
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: 'Inclusive by Design',
      description: 'We specifically target and design programs for underprivileged groups including women, youth, persons with disabilities, and low-income households.'
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: 'Innovation-Driven',
      description: 'We promote and support the adoption of appropriate technologies and innovative approaches that can transform agricultural productivity and livelihoods.'
    }
  ];

  const outcomes = [
    {
      category: 'Capacity Building',
      achievements: [
        '400+ farmers trained in climate-smart agriculture practices',
        '200+ women equipped with agribusiness management skills',
        '150+ youth trained in agricultural entrepreneurship',
        '50+ persons with disabilities supported in agricultural value chains'
      ]
    },
    {
      category: 'Financial Inclusion',
      achievements: [
        '15 community revolving funds established',
        '$50,000+ in microloans disbursed to smallholder farmers',
        '80% loan repayment rate across all programs',
        '5 partnerships with local microfinance institutions'
      ]
    },
    {
      category: 'Infrastructure & Technology',
      achievements: [
        '10 rural communities provided with clean water access',
        '3 community processing centers established',
        '1 pro-poor incubation hub launched in Bamessing Ndop',
        '2,500+ children benefited from community library program'
      ]
    },
    {
      category: 'Research & Policy',
      achievements: [
        '20+ research studies completed and published',
        '15+ policy briefs disseminated to stakeholders',
        '50+ stakeholder roundtables organized',
        '10+ academic partnerships established'
      ]
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <HeroSection
        mediaSrc="/pictures/seminar.jpg"
        title="What We Do"
        subtitle="Comprehensive programs that address the root causes of rural poverty and exclusion"
        height="h-[70vh]"
      />

      {/* Program Overview */}
      <section data-section="overview" className="py-16 bg-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={`text-3xl font-bold text-gray-900 mb-6 transition-all duration-1000 ${
            isVisible.overview ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-8'
          }`}>
            Our Comprehensive Approach
          </h2>
          <p className={`text-xl text-gray-700 leading-relaxed mb-8 transition-all duration-1000 delay-300 ${
            isVisible.overview ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-8'
          }`}>
            AgriDynamic implements integrated programs that address multiple dimensions of rural development. Our work spans capacity building, financial inclusion, technology transfer, infrastructure development, and policy advocacy—all designed to create sustainable pathways out of poverty for underprivileged communities.
          </p>
          
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 transition-all duration-1000 delay-500 ${
            isVisible.overview ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-8'
          }`}>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-700 mb-2">3</div>
              <p className="text-gray-600">Core Program Areas</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-700 mb-2">15+</div>
              <p className="text-gray-600">Years of Experience</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-700 mb-2">1000+</div>
              <p className="text-gray-600">Lives Impacted</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Programs */}
      <section data-section="programs" className="py-16 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-1000 ${
            isVisible.programs ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-3xl font-bold text-gray-900">Our Core Programs</h2>
            <p className="mt-4 text-xl text-gray-600">
              Integrated interventions that create lasting change
            </p>
          </div>
          
          <div className="space-y-8">
            {tasks.map((task, index) => (
              <div 
                key={task.id}
                className={`transition-all duration-1000 ${
                  isVisible.programs 
                    ? `animate-fade-in-up opacity-100 animate-delay-${(index + 3) * 100}` 
                    : 'opacity-0 translate-y-8'
                }`}
              >
                <TaskCard
                  title={task.title}
                  description={task.description}
                  image={task.image}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section data-section="approach" className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-gray-900 mb-12 text-center transition-all duration-1000 ${
            isVisible.approach ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-8'
          }`}>
            Our Approach
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {approaches.map((approach, index) => (
              <div 
                key={index}
                className={`text-center p-6 bg-gray-50 rounded-lg hover:bg-green-50 transition-all duration-500 hover:-translate-y-1 group ${
                  isVisible.approach 
                    ? `animate-fade-in-up opacity-100 animate-delay-${(index + 2) * 100}` 
                    : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-700 mb-4 group-hover:bg-green-200 transition-colors duration-300">
                  {approach.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-green-800 transition-colors duration-300">
                  {approach.title}
                </h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  {approach.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Outcomes */}
      <section data-section="outcomes" className="py-16 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-gray-900 mb-12 text-center transition-all duration-1000 ${
            isVisible.outcomes ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-8'
          }`}>
            Program Outcomes & Achievements
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {outcomes.map((outcome, index) => (
              <div 
                key={index}
                className={`bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-500 hover:-translate-y-1 ${
                  isVisible.outcomes 
                    ? `animate-fade-in-up opacity-100 animate-delay-${(index + 2) * 100}` 
                    : 'opacity-0 translate-y-8'
                }`}
              >
                <h3 className="text-xl font-bold text-green-700 mb-4 flex items-center">
                  <Award className="h-6 w-6 mr-2" />
                  {outcome.category}
                </h3>
                <ul className="space-y-2">
                  {outcome.achievements.map((achievement, achievementIndex) => (
                    <li key={achievementIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Statement */}
      <section data-section="impact" className="py-16 bg-gradient-to-r from-green-700 to-green-900 text-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={`text-3xl font-bold mb-6 transition-all duration-1000 ${
            isVisible.impact ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-8'
          }`}>
            Creating Lasting Change
          </h2>
          <p className={`text-xl mb-4 transition-all duration-1000 delay-200 ${
            isVisible.impact ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-8'
          }`}>
            Beyond numbers and statistics, our work creates lasting change in communities
          </p>
          <p className={`text-lg mb-8 transition-all duration-1000 delay-400 ${
            isVisible.impact ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-8'
          }`}>
            Every program we implement is designed not just to provide immediate relief, but to build the capacity, systems, and relationships that enable communities to continue thriving long after our direct involvement ends. We measure success not just by outputs, but by the sustainable improvements in livelihoods, dignity, and opportunity that our programs create.
          </p>
          <div className={`flex flex-wrap justify-center gap-4 transition-all duration-1000 delay-600 ${
            isVisible.impact ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-8'
          }`}>
            <a
              href="/projects"
              className="px-6 py-3 bg-white text-green-700 hover:bg-gray-100 font-medium rounded-md transition-all duration-300 btn-animate hover-lift focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
            >
              View Our Research
            </a>
            <a
              href="/contact"
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-all duration-300 border border-white btn-animate hover-lift focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
            >
              Get Involved
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhatWeDo;