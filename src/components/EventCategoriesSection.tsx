import { useState } from 'react';
import { ChevronLeft, ChevronRight, Code, Gamepad2, Laptop, Trophy } from 'lucide-react';
import GlareHover from '@/components/ui/GlareHover';
import MagicCard from '@/components/ui/MagicCard';
import EventsSection from './EventsSection';
import { Link } from "react-router-dom";

interface PrizePool {
    first: number;
    second: number;
    third: number;
}

interface EventItem {
    id: string;
    name: string;
    description: string;
    teamSize: string;
    prizes: PrizePool;
}

// Tech Events
const techEvents: EventItem[] = [
    {
        id: 'debugging',
        name: 'Debugging',
        description: 'Identify and correct errors in the given program within a limited time.',
        teamSize: 'Individual',
        prizes: { first: 1500, second: 1000, third: 500 },
    },
    {
        id: 'blindfold-coding',
        name: 'Blind Fold Coding',
        description: 'One participant codes while blindfolded based on teammate instructions.',
        teamSize: 'Team of 2',
        prizes: { first: 1500, second: 1000, third: 500 },
    },
    {
        id: 'ai-dev',
        name: 'AI Web Craft',
        description: 'Develop a solution using AI tools within one hour.',
        teamSize: 'Individual',
        prizes: { first: 1500, second: 1000, third: 500 },
    },
    {
        id: 'project-presentation',
        name: 'Paper Presentation',
        description: 'Present academic or real-time projects to judges.',
        teamSize: 'Maximum 3 members',
        prizes: { first: 1500, second: 1000, third: 500 },
    },
];

// Non-Tech Events
const nonTechEvents: EventItem[] = [
    {
        id: 'meme-mania',
        name: 'Meme Mania',
        description: 'Create or present memes based on given themes.',
        teamSize: 'Individual',
        prizes: { first: 1000, second: 700, third: 500 },
    },
    {
        id: 'free-fire',
        name: 'Free Fire Tournament',
        description: 'Competitive gaming tournament in Free Fire.',
        teamSize: 'Individual',
        prizes: { first: 1000, second: 700, third: 500 },
    },
    {
        id: 'treasure-hunt',
        name: 'Treasure Hunt + Quiz',
        description: 'Clue-based hunt combined with technical quiz rounds.',
        teamSize: 'Team of 2 to 4',
        prizes: { first: 1000, second: 700, third: 500 },
    },
    {
        id: 'sight-on-site',
        name: 'Sight on Site',
        description: 'On-the-spot problem solving and implementation challenge.',
        teamSize: 'Individual / Team',
        prizes: { first: 1000, second: 700, third: 500 },
    },
];

// Workshop
const workshopEvents: EventItem[] = [
    {
        id: 'workshop',
        name: 'Workshop',
        description: 'Hands-on workshop on trending technologies by industry experts.',
        teamSize: 'Individual',
        prizes: { first: 0, second: 0, third: 0 }, // No prizes for workshop
    },
];

interface CategoryConfig {
    title: string;
    badge: string;
    events: EventItem[];
    accentColor: string;
    bgColor: string;
    borderColor: string;
    icon: React.ReactNode;
}

const categoriesConfig: CategoryConfig[] = [
    {
        title: 'Tech',
        badge: 'Tech',
        events: techEvents,
        accentColor: 'text-blue-600',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        icon: <Code className="w-6 h-6 text-blue-600" />,
    },
    {
        title: 'Non-Tech',
        badge: 'Non-Tech',
        events: nonTechEvents,
        accentColor: 'text-pink-600',
        bgColor: 'bg-pink-50',
        borderColor: 'border-pink-200',
        icon: <Gamepad2 className="w-6 h-6 text-pink-600" />,
    },
    {
        title: 'Workshop',
        badge: 'Workshop',
        events: workshopEvents,
        accentColor: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        icon: <Laptop className="w-6 h-6 text-green-600" />,
    },
];

function EventCarouselCard({ config }: { config: CategoryConfig }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { events, title, badge, accentColor, bgColor, borderColor, icon } = config;

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % events.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
    };

    const currentEvent = events[currentIndex];
    const hasPrizes = currentEvent.prizes.first > 0;

    return (
        <GlareHover
            glareColor="#ffffff"
            glareOpacity={0.25}
            glareAngle={-30}
            glareSize={350}
            transitionDuration={600}
            className="h-full"
        >
            <MagicCard
                enableSpotlight
                enableBorderGlow
                enableStars
                spotlightRadius={400}
                glowColor={title === 'Tech' ? '59, 130, 246' : title === 'Non-Tech' ? '236, 72, 153' : '34, 197, 94'}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 h-full flex flex-col"
            >
            {/* Header with Icon and Badge */}
            <div className="flex items-start justify-between mb-5">
                <div className={`p-3 rounded-xl ${bgColor}`}>
                    {icon}
                </div>
                <span className={`px-4 py-1.5 rounded-full border-2 text-sm font-semibold ${accentColor} ${borderColor}`}>
                    {badge}
                </span>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {title}
            </h3>

            {/* Current Event Display */}
            <div className="flex-grow min-h-[180px]">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    {currentEvent.name}
                </h4>
                <p className="text-gray-500 text-sm mb-3">
                    {currentEvent.description}
                </p>
                <p className="text-gray-400 text-xs mb-3">
                    {currentEvent.teamSize}
                </p>

                {/* Prize Pool Display */}
                {hasPrizes && (
                    <div className="mt-3 p-3 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg border border-amber-100">
                        <div className="flex items-center gap-1.5 mb-2">
                            <Trophy className="w-4 h-4 text-amber-500" />
                            <span className="text-xs font-semibold text-amber-700">Prize Pool</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <div className="text-center">
                                <div className="text-amber-600 font-bold">🥇 ₹{currentEvent.prizes.first}</div>
                            </div>
                            <div className="text-center">
                                <div className="text-gray-500 font-semibold">🥈 ₹{currentEvent.prizes.second}</div>
                            </div>
                            <div className="text-center">
                                <div className="text-orange-400 font-semibold">🥉 ₹{currentEvent.prizes.third}</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Workshop - No Prizes Message */}
                {!hasPrizes && title === 'Workshop' && (
                    <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-100">
                        <p className="text-xs text-green-700 font-medium">
                            Certificate of Participation will be provided
                        </p>
                    </div>
                )}
            </div>

            {/* Navigation - Only show if more than 1 event */}
            {events.length > 1 && (
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <button
                        onClick={prevSlide}
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4 text-gray-600" />
                    </button>
                    <div className="flex gap-1.5">
                        {events.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`w-2 h-2 rounded-full transition-all ${
                                    idx === currentIndex ? `${bgColor.replace('-50', '-500')}` : 'bg-gray-300'
                                }`}
                            />
                        ))}
                    </div>
                    <button
                        onClick={nextSlide}
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                        <ChevronRight className="w-4 h-4 text-gray-600" />
                    </button>
                </div>
            )}
            </MagicCard>
        </GlareHover>
    );
}

const EventCategoriesSection = () => {
    return (
        <section id="event-categories" className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-4">
                        Our <span className="text-[#F59E0B]">Events</span>
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Explore our exciting lineup of technical and non-technical events. Swipe to discover more!
                    </p>
                </div>

                {/* Three Column Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categoriesConfig.map((config) => (
                        <EventCarouselCard key={config.title} config={config} />
                    ))}
                </div>

                {/* View All Events Button */}
                <div className="text-center mt-10">
                    <Link
                        to="/events"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#F59E0B] hover:bg-[#D97706] text-black font-semibold rounded-lg transition-colors"
                    >
                        View All Events & Register
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default EventCategoriesSection;
