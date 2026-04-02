import { useState } from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';
import { StarRating } from './components/StarRating';
import { Textarea } from './components/ui/textarea';
import { Button } from './components/ui/button';
import { Label } from './components/ui/label';

export default function App() {
  const [rating, setRating] = useState<number>(0);
  const [comments, setComments] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Feedback submitted:', { rating, comments });
    // Handle form submission here
    alert(`Thank you for your feedback! Rating: ${rating} stars`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left Side - Contact Details */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-8 lg:p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full space-y-8">
            <div>
              <h1 className="mb-2">Contact Us</h1>
              <p className="text-blue-100">
                We'd love to hear from you. Get in touch with us through any of the channels below.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="mb-1">Address</h3>
                  <p className="text-blue-100">
                    123 Business Street<br />
                    Suite 100<br />
                    San Francisco, CA 94102
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="mb-1">Phone</h3>
                  <p className="text-blue-100">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="mb-1">Email</h3>
                  <p className="text-blue-100">contact@company.com</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <h3 className="mb-3">Our Location</h3>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1759347171940-d79bc7024948?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwbWFwJTIwbG9jYXRpb258ZW58MXx8fHwxNzY2MTYyOTEzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Map Location"
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Feedback Form */}
        <div className="bg-white p-8 lg:p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-8">
              <h2 className="mb-2">Share Your Feedback</h2>
              <p className="text-gray-600">
                Your opinion matters to us. Please rate your experience and share your thoughts.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="rating">Rate Your Experience</Label>
                <div className="flex items-center gap-3">
                  <StarRating value={rating} onChange={setRating} />
                  {rating > 0 && (
                    <span className="text-sm text-gray-600">
                      {rating} {rating === 1 ? 'star' : 'stars'}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="comments">Comments</Label>
                <Textarea
                  id="comments"
                  placeholder="Tell us about your experience..."
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  className="min-h-[200px]"
                  required
                />
              </div>

              <Button 
                type="submit" 
                size="lg"
                className="w-full"
                disabled={rating === 0}
              >
                Submit Feedback
              </Button>

              {rating === 0 && (
                <p className="text-sm text-gray-500 text-center">
                  Please select a rating before submitting
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
