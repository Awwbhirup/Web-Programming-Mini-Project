import { BookOpen, Shield, Award } from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-blue-600" />
              <span className="font-bold text-xl text-gray-900">Traffic Rules Academy</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#courses" className="text-gray-700 hover:text-blue-600 transition-colors">Courses</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">Pricing</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Get Started
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Rule of the Day - Scrolling Notification Bar */}
      <div className="bg-yellow-400 text-gray-900 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap py-2">
          <span className="inline-block px-4">
            <strong>Rule of the Day:</strong> Always use turn signals at least 100 feet before making a turn or changing lanes. Signal early to give other drivers time to react.
          </span>
          <span className="inline-block px-4">
            <strong>Rule of the Day:</strong> Always use turn signals at least 100 feet before making a turn or changing lanes. Signal early to give other drivers time to react.
          </span>
          <span className="inline-block px-4">
            <strong>Rule of the Day:</strong> Always use turn signals at least 100 feet before making a turn or changing lanes. Signal early to give other drivers time to react.
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1671198514584-5aaa823bae4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWdod2F5JTIwcm9hZCUyMGRyaXZpbmd8ZW58MXx8fHwxNzY2MjQ1OTI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Highway road"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6">
              Master the Road
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              Learn traffic rules, road safety, and defensive driving techniques from expert instructors. Get certified and drive with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Start Learning
              </button>
              <button className="px-8 py-4 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors">
                View Courses
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-4">Why Choose Our Course</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive traffic education designed to make you a safer, more confident driver
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl mb-4">Comprehensive Curriculum</h3>
              <p className="text-gray-600">
                Access a complete library of traffic rules, road signs, and driving regulations. Our courses cover everything from basic traffic laws to advanced defensive driving techniques.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-2xl mb-4">Safety First Approach</h3>
              <p className="text-gray-600">
                Learn proven safety strategies and accident prevention methods. Our instructors emphasize real-world scenarios to prepare you for any situation on the road.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-2xl mb-4">Get Certified</h3>
              <p className="text-gray-600">
                Earn official certification upon course completion. Our certificates are recognized by driving authorities and insurance companies for potential discounts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-6 h-6 text-blue-500" />
                <span className="font-bold text-white">Traffic Rules Academy</span>
              </div>
              <p className="text-gray-400">
                Empowering drivers with knowledge for safer roads.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">Courses</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Beginner's Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Advanced Driving</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Defensive Driving</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Road Signs</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Instructors</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Testimonials</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Traffic Rules Academy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
