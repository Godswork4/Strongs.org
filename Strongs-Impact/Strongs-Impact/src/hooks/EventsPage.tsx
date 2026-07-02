import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { MapPin, Calendar, Clock } from "lucide-react";

interface Event {
  id: number;
  title: string;
  date: string;
  countdownTarget: string;
  location: string;
  description: string;
  registrationLink?: string;
}

const UPCOMING_EVENTS: Event[] = [
  {
    id: 1,
    title: "Student Mission Conference",
    date: "July 8–11, 2026",
    countdownTarget: "2026-07-08T00:00:00",
    location: "Lautech Inter-dominational Chapel",
    description: "Join us for Student Mission Conference 2026.",
    registrationLink: "/SmcRegistrationPage",
  },
];

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const useCountdown = (target: string): TimeLeft => {
  const calc = (): TimeLeft => {
    const diff = new Date(target).getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calc);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calc()), 1000);
    return () => clearInterval(timer);
  }, [target]);

  return timeLeft;
};

const CountdownUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <div className="w-16 h-16 bg-white/15 rounded-xl flex items-center justify-center mb-1">
      <span className="text-2xl font-bold text-white tabular-nums">
        {String(value).padStart(2, "0")}
      </span>
    </div>
    <span className="text-xs font-medium text-white/60 uppercase tracking-wider">
      {label}
    </span>
  </div>
);

const EventCard = ({ event }: { event: Event }) => {
  const timeLeft = useCountdown(event.countdownTarget);
  const isOver = Object.values(timeLeft).every((v) => v === 0);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
      {/* Countdown banner */}
      <div className="bg-slate-900 dark:bg-slate-800 px-6 py-5">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-400 mb-4 text-center">
          {isOver ? "Event has started!" : "Starts in"}
        </p>
        {!isOver && (
          <div className="flex justify-center gap-4">
            <CountdownUnit value={timeLeft.days} label="Days" />
            <div className="text-white/40 text-2xl font-bold mt-3">:</div>
            <CountdownUnit value={timeLeft.hours} label="Hours" />
            <div className="text-white/40 text-2xl font-bold mt-3">:</div>
            <CountdownUnit value={timeLeft.minutes} label="Min" />
            <div className="text-white/40 text-2xl font-bold mt-3">:</div>
            <CountdownUnit value={timeLeft.seconds} label="Sec" />
          </div>
        )}
      </div>

      {/* Event details */}
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
          {event.title}
        </h2>
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm">
            <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm">
            <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
            <span>{event.location}</span>
          </div>
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 leading-relaxed">
          {event.description}
        </p>
        {event.registrationLink && (
          <Link
            to={event.registrationLink}
            className="inline-block w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
          >
            Register for SMC
          </Link>
        )}
      </div>
    </div>
  );
};

const EventsPage: React.FC = () => (
  <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-16">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-600 dark:text-blue-400 mb-3">
          What's Coming
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
          Upcoming Events
        </h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Join us at our upcoming gatherings for worship, teaching, and fellowship.
        </p>
      </div>

      {UPCOMING_EVENTS.length === 0 ? (
        <div className="text-center py-20">
          <Clock className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 dark:text-slate-400">
            No events available at the moment. Check back soon.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {UPCOMING_EVENTS.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  </div>
);

export default EventsPage;
