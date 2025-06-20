import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import TeamMember from '../components/TeamMember';
import { teamMembers } from '../data';
import { useInView } from 'react-intersection-observer'; // Import useInView

const About = () => {
  return (
    <div className="pt-16">
      {/* Hero Section with Map - typically full-page, so no scroll animation needed */}
      <HeroSection
        videoSrc="https://images.pexels.com/photos/1483880/pexels-photo-1483880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        title="About AgriDynamic"
        subtitle="Empowering communities through sustainable agricultural solutions since 2008"
        height="h-[60vh]"
      />

      {/* Our Story */}
      <AnimatedSection> {/* Wrap section with AnimatedSection */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Story</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                AgriDynamic was founded in 2008 in response to the persistent challenges faced by rural communities in Cameroon, especially women, youth, and persons with disabilities. Our founders, who had firsthand experience of rural life and its challenges, came together with a shared vision: to demonstrate sustainable entrepreneurial livelihood strategies that promote inclusive development.
              </p>
              <p>
                What began as a small community initiative has grown into a respected organization that bridges the gap between research and practical solutions. We believe that sustainable change comes from within communities, and our approach is centered on empowering individuals with the knowledge, skills, and resources they need to transform their own lives.
              </p>
              <p>
                Today, AgriDynamic operates throughout the North West Region of Cameroon, with our head office located in Ndop. Our team of dedicated professionals works closely with communities to develop and implement innovative solutions to the challenges of poverty, food insecurity, and economic exclusion.
              </p>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Google Maps Embed */}
      <AnimatedSection> {/* Wrap section with AnimatedSection */}
        <section className="py-8 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Find Us</h3>
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127120.87624372654!2d10.3121611!3d6.0018302!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x105f8f2e2d8e3a15%3A0x4c4f9a3c1f1c43e0!2sNdop%2C%20Cameroon!5e0!3m2!1sen!2sus!4v1651234567890!5m2!1sen!2sus"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="AgriDynamic Location"
                className="rounded-lg"
              ></iframe>
            </div>
            <p className="text-center mt-4 text-gray-600">
              North West Region Cameroon BP 02 Ndop
            </p>
          </div>
        </section>
      </AnimatedSection>

      {/* Our Impact */}
      <AnimatedSection> {/* Wrap section with AnimatedSection */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Impact So Far</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-green-50 rounded-lg p-6 shadow-md">
                <div className="text-4xl font-bold text-green-700 mb-2">400+</div>
                <p className="text-gray-700">Farm families trained in sustainable crop and livestock practices and enhanced their participation in value chains</p>
              </div>

              <div className="bg-green-50 rounded-lg p-6 shadow-md">
                <div className="text-4xl font-bold text-green-700 mb-2">1st</div>
                <p className="text-gray-700">Launched Cameroon's first pro-poor incubation hub in Bamessing Ndop</p>
              </div>

              <div className="bg-green-50 rounded-lg p-6 shadow-md">
                <div className="text-4xl font-bold text-green-700 mb-2">2,500+</div>
                <p className="text-gray-700">Children enabled to access textbooks through a community revolving library</p>
              </div>

              <div className="bg-green-50 rounded-lg p-6 shadow-md">
                <div className="text-4xl font-bold text-green-700 mb-2">10+</div>
                <p className="text-gray-700">Rural villages provided with clean water through sustainable water projects</p>
              </div>

              <div className="bg-green-50 rounded-lg p-6 shadow-md">
                <div className="text-4xl font-bold text-green-700 mb-2">5+</div>
                <p className="text-gray-700">Microfinance programs piloted specifically for persons with disabilities</p>
              </div>

              <div className="bg-green-50 rounded-lg p-6 shadow-md">
                <div className="text-4xl font-bold text-green-700 mb-2">20+</div>
                <p className="text-gray-700">Research studies conducted to inform evidence-based interventions and policy recommendations</p>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Our Team */}
      <AnimatedSection> {/* Wrap section with AnimatedSection */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Team</h2>
            <p className="text-xl text-gray-600 text-center mb-12">
              Meet the dedicated professionals behind AgriDynamic
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 justify-items-center">
              {teamMembers.map((member) => (
                <TeamMember
                  key={member.id}
                  name={member.name}
                  role={member.role}
                  image={member.image}
                />
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Join Us / Partnerships */}
      <AnimatedSection> {/* Wrap section with AnimatedSection */}
        <section className="py-16 bg-gradient-to-r from-green-700 to-green-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Partner With Us</h2>
            <p className="text-xl mb-4">
              We believe in the power of global partnerships to create local impact.
            </p>
            <p className="text-lg mb-8">
              We collaborate with innovators, donors, institutions, and changemakers to deliver lasting solutions to poverty, food insecurity, and economic exclusion. If you believe in transforming lives through smart, inclusive agriculture, we invite you to join us.
            </p>
            <Link to="/contact" className="inline-block px-6 py-3 bg-white text-green-700 hover:bg-gray-100 font-medium rounded-3xl transition-colors duration-200">
              Partner With Us
            </Link>

          </div>
        </section>
      </AnimatedSection>
    </div>
  );
};

export default About;

// New component for animating sections
const AnimatedSection: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Animation only happens once
    threshold: 0.1,    // Trigger when 10% of the component is visible
  });

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out
        ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
      `}
    >
      {children}
    </div>
  );
};