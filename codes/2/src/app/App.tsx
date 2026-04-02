import { useState } from 'react';

export default function App() {
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    email: '',
    licenseType: 'Learner',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registration submitted:', formData);
    // Handle form submission logic here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="size-full flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-md bg-card rounded-lg border border-border p-8 shadow-sm">
        <h1 className="text-center mb-8">Student Registration</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="fullName" className="block">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-input-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Enter your full name"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="age" className="block">
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              min="1"
              max="120"
              className="w-full px-4 py-2 bg-input-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Enter your age"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-input-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Enter your email"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="licenseType" className="block">
              License Type
            </label>
            <select
              id="licenseType"
              name="licenseType"
              value={formData.licenseType}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-input-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="Learner">Learner</option>
              <option value="Permanent">Permanent</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-[#155DFC] text-white py-3 px-6 rounded-md hover:opacity-90 transition-opacity mt-8"
          >
            Start Learning
          </button>
        </form>
      </div>
    </div>
  );
}