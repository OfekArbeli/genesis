import React, { useState } from 'react';
import logoImage from 'figma:asset/bbc63ba9099d3eaa21e28ebbb8075af0f85078e6.png';
import { WegobyButton } from './wegoby-button';
import { motion } from 'motion/react';

interface SignUpProps {
  onContinue: (data: { email: string; name: string }) => void;
}

export function SignUp({ onContinue }: SignUpProps) {
  const [formData, setFormData] = useState({ email: '', name: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email && formData.name) {
      onContinue({ email: formData.email, name: formData.name });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <motion.img
            src={logoImage}
            alt="Wegoby"
            className="w-20 h-20 mx-auto mb-4"
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 15,
              duration: 0.8
            }}
          />
          <h1 className="text-3xl mb-2">Welcome to Wegoby</h1>
          <p className="text-muted-foreground">Experience the web your way</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-2xl shadow-lg border border-border">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm">
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ofek"
              className="w-full px-4 py-3 bg-input-background rounded-lg border-2 border-border focus:outline-none focus:ring-2 focus:ring-light-purple focus:border-light-purple transition-all autofill:bg-light-purple/10 autofill:text-foreground"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="you@example.com"
              className="w-full px-4 py-3 bg-input-background rounded-lg border-2 border-border focus:outline-none focus:ring-2 focus:ring-light-purple focus:border-light-purple transition-all autofill:bg-light-purple/10 autofill:text-foreground"
              required
            />
          </div>

          <WegobyButton type="submit" className="w-full" size="lg">
            Continue
          </WegobyButton>
        </form>
      </div>
    </div>
  );
}