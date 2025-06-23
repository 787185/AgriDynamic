import { useEffect, useState } from 'react';
import { BookOpen, Users, Target, Award, Lightbulb, Globe } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import ScrollableSection from '../components/ScrollableSection';
import { researchFocusCards } from '../data';

const Institute = () => {
  const [isVisible, setIsVisible] = useState({
    about: false,
    mission: false,
    approach: false,
    impact: false,
    partnerships: false
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

  const researchAreas = [
    {
      icon: <Target className="h-8 w-8" />,
      title: 'Agricultural Value Chains',
      description: 'Analyzing and optimizing agricultural value chains to ensure inclusive participation and equitable benefit distribution for smallholder farmers.'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Social Inclusion',
      description: 'Researching barriers to participation faced by women, youth, and persons with disabilities in agricultural development initiatives.'
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: 'Innovation Systems',
      description: 'Studying how agricultural innovations are developed, adapted, and scaled to meet the needs of underprivileged communities.'
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: 'Policy Analysis',
      description: 'Examining policy frameworks and their effectiveness in promoting sustainable and inclusive agricultural development.'
    }
  ];

  const achievements = [
    { number: '20+', text: 'Research studies completed since 2008' },
    { number: '15+', text: 'Policy briefs published and disseminated' },
    { number: '50+', text: 'Stakeholder roundtables organized' },
    { number: '10+', text: 'Academic partnerships established' },
    { number: '5+', text: 'International conferences presentations' },
    { number: '100+', text: 'Community researchers trained' }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <HeroSection
        videoSrc="https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        title="AgriDynamic Research & Innovation Institute"
        subtitle="FairEducation: Generating evidence that drives inclusive agricultural development"
        height="h-[70vh]"
      />

      {/* About the Institute */}
      <section data-section="about" className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-1000 ${
              isVisible.about ? 'animate-fade-in-left opacity-100' : 'opacity-0 translate-x-8'
            }`}>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About FairEducation Institute</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  The AgriDynamic Research and Innovation Institute, known as FairEducation, is our dedicated research arm that generates evidence-based insights to inform agricultural development policies and programs.
                </p>
                <p>
                  Founded on the principle that "evidence is powerful—and it's even more powerful when it comes from those who live the reality," we conduct inclusive, action-oriented research that amplifies the voices of underprivileged populations.
                </p>
                <p>
                  Our research directly informs not only our own programming but also supports broader systems change by shaping policies, funding strategies, and institutional mindsets across the agricultural development sector.
                </p>
              </div>
            </div>
            
            <div className={`transition-all duration-1000 delay-300 ${
              isVisible.about ? 'animate-fade-in-right opacity-100' : 'opacity-0 translate-x-8'
            }`}>
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Research Team" 
                  className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-600/20 to-transparent rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section data-section="mission" className="py-16 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold text-gray-900 mb-6 transition-all duration-1000 ${
              isVisible.mission ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-8'
            }`}>
              Our Mission & Vision
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className={`bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-500 hover:-translate-y-1 ${
              isVisible.mission ? 'animate-fade-in-up opacity-100 animate-delay-200' : 'opacity-0 translate-y-8'
            }`}>
              <div className="flex items-center mb-4">
                <BookOpen className="h-8 w-8 text-green-700 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-gray-700">
                To generate rigorous, inclusive research that informs evidence-based policies and programs for sustainable agricultural development, ensuring that the voices and experiences of underprivileged communities are central to development planning and implementation.
              </p>
            </div>
            
            <div className={`bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-500 hover:-translate-y-1 ${
              isVisible.mission ? 'animate-fade-in-up opacity-100 animate-delay-400' : 'opacity-0 translate-y-8'
            }`}>
              <div className="flex items-center mb-4">
                <Award className="h-8 w-8 text-green-700 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-gray-700">
                A world where agricultural development policies and programs are grounded in evidence generated with and by the communities they aim to serve, leading to more effective, equitable, and sustainable outcomes for all stakeholders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <section data-section="approach" className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-gray-900 mb-12 text-center transition-all duration-1000 ${
            isVisible.approach ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-8'
          }`}>
            Key Research Areas
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {researchAreas.map((area, index) => (
              <div 
                key={index}
                className={`text-center p-6 bg-gray-50 rounded-lg hover:bg-green-50 transition-all duration-500 hover:-translate-y-1 group ${
                  isVisible.approach 
                    ? `animate-fade-in-up opacity-100 animate-delay-${(index + 2) * 100}` 
                    : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-700 mb-4 group-hover:bg-green-200 transition-colors duration-300">
                  {area.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-green-800 transition-colors duration-300">
                  {area.title}
                </h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Focus Cards */}
      <ScrollableSection
        title="Our Research Approach"
        subtitle="How we generate evidence that drives impact"
        cards={researchFocusCards}
      />

      {/* Impact & Achievements */}
      <section data-section="impact" className="py-16 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-gray-900 mb-12 text-center transition-all duration-1000 ${
            isVisible.impact ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-8'
          }`}>
            Research Impact & Achievements
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <div 
                key={index}
                className={`bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-500 hover:-translate-y-1 text-center group ${
                  isVisible.impact 
                    ? `animate-fade-in-up opacity-100 animate-delay-${(index + 2) * 100}` 
                    : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="text-4xl font-bold text-green-700 mb-2 group-hover:text-green-800 transition-colors duration-300">
                  {achievement.number}
                </div>
                <p className="text-gray-700 group-hover:text-gray-800 transition-colors duration-300">
                  {achievement.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnerships */}
      <section data-section="partnerships" className="py-16 bg-gradient-to-r from-green-700 to-green-900 text-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={`text-3xl font-bold mb-6 transition-all duration-1000 ${
            isVisible.partnerships ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-8'
          }`}>
            Research Partnerships
          </h2>
          <p className={`text-xl mb-4 transition-all duration-1000 delay-200 ${
            isVisible.partnerships ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-8'
          }`}>
            Strengthening research through strategic collaborations
          </p>
          <p className={`text-lg mb-8 transition-all duration-1000 delay-400 ${
            isVisible.partnerships ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-8'
          }`}>
            We actively collaborate with leading universities, influential think tanks, experienced development practitioners, and crucial grassroots actors to maximize our research reach and impact. Our partnerships enable us to conduct more rigorous research while ensuring our findings reach the right audiences for maximum policy and programmatic influence.
          </p>
          <a
            href="/contact"
            className={`inline-block px-6 py-3 bg-white text-green-700 hover:bg-gray-100 font-medium rounded-md transition-all duration-300 btn-animate hover-lift focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 ${
              isVisible.partnerships ? 'animate-fade-in-up opacity-100 animate-delay-600' : 'opacity-0 translate-y-8'
            }`}
          >
            Collaborate With Us
          </a>
        </div>
      </section>
    </div>
  );
};

export default Institute;