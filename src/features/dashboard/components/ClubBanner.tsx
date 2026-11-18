import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

interface ClubBannerProps {
  onLearnMore?: () => void;
}

export const ClubBanner: React.FC<ClubBannerProps> = ({ onLearnMore }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 sm:p-7 text-white shadow-md border border-slate-800">
      {/* Decorative background circles */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 right-24 w-60 h-60 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-xl space-y-2.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-400/30">
            <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
            <span>Campus Life &amp; Communities</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Get Involved – Join a Club Today!
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Explore your interests and meet like-minded students by joining one of our many campus clubs.
            Whether you&apos;re into sports, arts, tech, or design, find your community.
          </p>
          <div className="pt-1">
            <Button
              onClick={onLearnMore}
              variant="primary"
              size="sm"
              className="bg-white text-slate-900 hover:bg-slate-100 font-semibold shadow-xs"
            >
              <span>Learn More</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
        </div>

        {/* Club preview graphic / avatar cluster */}
        <div className="hidden sm:flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-4 rounded-xl border border-white/10 shrink-0">
          <div className="flex -space-x-3 overflow-hidden">
            <img
              className="inline-block h-10 w-10 rounded-full ring-2 ring-indigo-900 object-cover"
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              alt="Club Student"
            />
            <img
              className="inline-block h-10 w-10 rounded-full ring-2 ring-indigo-900 object-cover"
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
              alt="Club Student"
            />
            <img
              className="inline-block h-10 w-10 rounded-full ring-2 ring-indigo-900 object-cover"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
              alt="Club Student"
            />
            <div className="h-10 w-10 rounded-full ring-2 ring-indigo-900 bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">
              +18
            </div>
          </div>
          <div className="text-left">
            <p className="text-xs font-bold text-white">24 Active Clubs</p>
            <p className="text-[10px] text-indigo-200">Registration open for Spring 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
};
