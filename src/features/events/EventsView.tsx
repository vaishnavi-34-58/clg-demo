import React, { useState } from 'react';
import { Calendar, MapPin, Ticket } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../context/ToastContext';

interface EventItem {
  id: string;
  title: string;
  club: string;
  category: 'Design & Tech' | 'Cultural' | 'Workshop' | 'Sports';
  date: string;
  time: string;
  venue: string;
  seatsLeft: number;
  registered: boolean;
  description: string;
}

export const EventsView: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'all' | 'registered' | 'clubs'>('all');

  const initialEvents: EventItem[] = [
    {
      id: 'EVT-01',
      title: 'Annual Utopia Design Jam & 24hr Prototype Sprint',
      club: 'Interactive Design Guild',
      category: 'Design & Tech',
      date: 'Jan 28, 2024',
      time: '09:00 AM – Next Day',
      venue: 'Innovation Hub & Design Studio A',
      seatsLeft: 14,
      registered: true,
      description: 'Collaborate with multidisciplinary engineering & art teams to design assistive UI systems.',
    },
    {
      id: 'EVT-02',
      title: 'Masterclass: Modern 3D Shading & Motion with Blender',
      club: 'Animation & Visual Arts Collective',
      category: 'Workshop',
      date: 'Feb 03, 2024',
      time: '02:00 PM – 05:00 PM',
      venue: 'Computer Lab 3 (Auditorium Wing)',
      seatsLeft: 22,
      registered: false,
      description: 'Hands-on live session led by Pixar alum Dr. Martinez focusing on procedural materials.',
    },
    {
      id: 'EVT-03',
      title: 'Inter-College Basketball Championship Quarter-Finals',
      club: 'Utopia Athletics League',
      category: 'Sports',
      date: 'Feb 09, 2024',
      time: '04:30 PM – 07:00 PM',
      venue: 'Campus Indoor Sports Arena',
      seatsLeft: 120,
      registered: false,
      description: 'Cheer for the Utopia Titans as they host the state regional division knockouts.',
    },
    {
      id: 'EVT-04',
      title: 'Spring Acoustic Music & Open Mic Night',
      club: 'Campus Music & Cultural Society',
      category: 'Cultural',
      date: 'Feb 14, 2024',
      time: '06:00 PM – 09:30 PM',
      venue: 'Central Quad Amphitheater',
      seatsLeft: 80,
      registered: true,
      description: 'Live student performances, coffee stands, poetry readings and acoustic indie sets.',
    },
  ];

  const [events, setEvents] = useState<EventItem[]>(initialEvents);

  const handleToggleRegistration = (id: string) => {
    setEvents((prev) =>
      prev.map((ev) => {
        if (ev.id === id) {
          const newStatus = !ev.registered;
          toast(
            newStatus
              ? `Successfully registered for "${ev.title}"! Entry pass sent to email.`
              : `Registration cancelled for "${ev.title}".`,
            newStatus ? 'success' : 'info'
          );
          return {
            ...ev,
            registered: newStatus,
            seatsLeft: newStatus ? ev.seatsLeft - 1 : ev.seatsLeft + 1,
          };
        }
        return ev;
      })
    );
  };

  const filteredEvents = events.filter((e) => {
    if (activeTab === 'registered') return e.registered;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            Events, Workshops &amp; Student Clubs
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Register for guest lectures, hackathons, sports events and campus community clubs
          </p>
        </div>

        <span className="text-xs px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 font-bold border border-indigo-100 flex items-center gap-1.5">
          <Ticket className="w-4 h-4" />
          <span>{events.filter((e) => e.registered).length} Event Passes Active</span>
        </span>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'all'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Upcoming Campus Events ({events.length})
        </button>
        <button
          onClick={() => setActiveTab('registered')}
          className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'registered'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          My Registered Events ({events.filter((e) => e.registered).length})
        </button>
        <button
          onClick={() => setActiveTab('clubs')}
          className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'clubs'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Campus Clubs Directory (24 Clubs)
        </button>
      </div>

      {/* Event Cards */}
      {activeTab !== 'clubs' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                    {evt.category}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    Club: <strong className="text-slate-700">{evt.club}</strong>
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900">{evt.title}</h3>

                <p className="text-xs text-slate-500 leading-relaxed">
                  {evt.description}
                </p>

                <div className="space-y-1.5 pt-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{evt.date} • {evt.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{evt.venue}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-500 font-medium">
                  {evt.seatsLeft} seats remaining
                </span>
                <Button
                  variant={evt.registered ? 'outline' : 'primary'}
                  size="sm"
                  onClick={() => handleToggleRegistration(evt.id)}
                  className={evt.registered ? 'text-rose-600 border-rose-200 hover:bg-rose-50' : ''}
                >
                  {evt.registered ? 'Cancel Registration' : 'Register Now (Free)'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Clubs Directory */
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { name: 'Interactive Design Guild', members: 142, lead: 'Prof. Smith', desc: 'UI/UX hackathons, usability testing, and design systems.' },
            { name: 'Robotics & AI Lab', members: 198, lead: 'Dr. Johnson', desc: 'Autonomous rovers, computer vision, and machine learning.' },
            { name: 'Animation & VFX Society', members: 110, lead: 'Dr. Martinez', desc: '3D character animation, rigging, and film festivals.' },
            { name: 'Utopia Titan Athletics', members: 240, lead: 'Coach Davis', desc: 'Inter-collegiate basketball, soccer, and fitness.' },
            { name: 'Campus Music & Drama', members: 165, lead: 'Elena Rostova', desc: 'Acoustic jams, annual musical production, and theatrical arts.' },
            { name: 'Student Code Foundry', members: 320, lead: 'Julian Rivera', desc: 'Open-source web engineering and developer conferences.' },
          ].map((c, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{c.name}</h4>
                <p className="text-[11px] text-slate-400">Faculty Advisor: {c.lead}</p>
                <p className="text-xs text-slate-600 mt-2">{c.desc}</p>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">{c.members} Members</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toast(`Joined ${c.name} community channel!`, 'success')}
                >
                  Join Club
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
