import { useState } from 'react';
import { Clock, Users, MapPin } from 'lucide-react';

interface ScheduleEvent {
    id: string;
    name: string;
    description: string;
    teamSize: string;
    price: number;
    time: string;
    endTime: string;
    category: 'technical' | 'non-technical';
    venue?: string;
}

const scheduleEvents: ScheduleEvent[] = [
    // Technical Events - Morning
    {
        id: 'debugging',
        name: 'Debugging',
        description: 'Identify and correct errors in the given program within a limited time.',
        teamSize: 'Individual',
        price: 150,
        time: '10:30',
        endTime: '11:30',
        category: 'technical',
        venue: 'Lab 1',
    },
    {
        id: 'innaguration',
        name: 'Inauguration',
        description: 'Official opening ceremony with keynote speeches and event overview.',
        teamSize: 'N/A',
        price: 0,
        time: '9:00',
        endTime: '10:00',
        category: 'technical',
        venue: 'Kalam Auditorium',
    },
    {
        id: 'blindfold-coding',
        name: 'Blind Fold Coding',
        description: 'One participant codes while blindfolded based on teammate instructions.',
        teamSize: 'Team of 2',
        price: 150,
        time: '10:30',
        endTime: '11:30',
        category: 'technical',
        venue: 'Lab 2',
    },
    {
        id: 'ai-dev',
        name: 'AI Driven Development',
        description: 'Develop a solution using AI tools within one hour.',
        teamSize: 'Individual',
        price: 150,
        time: '11:30',
        endTime: '12:30',
        category: 'technical',
        venue: 'Lab 3',
    },
    {
        id: 'project-presentation',
        name: 'Project Presentation',
        description: 'Present academic or real-time projects to judges.',
        teamSize: 'Maximum 3 members',
        price: 499,
        time: '10:30',
        endTime: '12:30',
        category: 'technical',
        venue: 'Seminar Hall',
    },
    {
        id: 'workshop',
        name: 'Workshop',
        description: 'Hands-on workshop on trending technologies by industry experts.',
        teamSize: 'Individual',
        price: 250,
        time: '14:00',
        endTime: '16:00',
        category: 'technical',
        venue: 'Main Auditorium',
    },
    // Non-Technical Events - Afternoon
    {
        id: 'meme-mania',
        name: 'Meme Mania',
        description: 'Create or present memes based on given themes.',
        teamSize: 'Individual',
        price: 150,
        time: '14:30',
        endTime: '15:30',
        category: 'non-technical',
        venue: 'Room 101',
    },
    {
        id: 'free-fire',
        name: 'Free Fire Tournament',
        description: 'Competitive gaming tournament in Free Fire.',
        teamSize: 'Individual',
        price: 150,
        time: '13:30',
        endTime: '15:30',
        category: 'non-technical',
        venue: 'Room 102',
    },
    {
        id: 'treasure-hunt',
        name: 'Treasure Hunt + Technical Quiz',
        description: 'Clue-based hunt combined with technical quiz rounds.',
        teamSize: 'Team of 2 to 4',
        price: 150,
        time: '13:30',
        endTime: '14:00',
        category: 'non-technical',
        venue: 'Campus',
    },
    {
        id: 'sight-on-site',
        name: 'Sight on Site',
        description: 'On-the-spot problem solving and implementation challenge.',
        teamSize: 'Individual / Team',
        price: 150,
        time: '14:30',
        endTime: '15:30',
        category: 'non-technical',
        venue: 'Lab 4',
    },
];

// Time slots for the clock
const timeSlots = [
    { hour: 9, label: '9:00 AM', period: 'morning' },
    { hour: 10.5, label: '10:30 AM', period: 'morning' },
    { hour: 11, label: '11:00 AM', period: 'morning' },
    { hour: 11.5, label: '11:30 AM', period: 'morning' },
    { hour: 12, label: '12:00 PM', period: 'afternoon' },
    { hour: 13.5, label: '1:30 PM', period: 'afternoon' },
    { hour: 14, label: '2:00 PM', period: 'afternoon' },
    { hour: 14.5, label: '2:30 PM', period: 'afternoon' },
    { hour: 15, label: '3:00 PM', period: 'afternoon' },
];

// Fallback CSS clock component with CORRECT rotation
function CSSClock({ selectedHour, onHourSelect }: { selectedHour: number; onHourSelect: (hour: number) => void }) {
    // Calculate clock hand rotation (12-hour format)
    // For 10:00 AM, hour hand should point to 10 (300 degrees from 12)
    // CSS rotation: 0° = pointing right, we need to adjust so 0° = pointing up (12 o'clock)
    const getHourRotation = (hour: number): number => {
        const h = hour > 12 ? hour - 12 : hour;
        // Each hour = 30 degrees, starting from 12 o'clock position
        // 12 = 0°, 3 = 90°, 6 = 180°, 9 = 270°, 10 = 300°
        return (h * 30);
    };

    const getMinuteRotation = (hour: number): number => {
        const minutes = (hour % 1) * 60;
        return (minutes / 60) * 360;
    };

    const selectedTimeLabel = timeSlots.find(t => t.hour === selectedHour)?.label || '10:00 AM';

    // Map clock face numbers to time slots
    const hourMap: Record<number, number> = {
        10: 10, 11: 11, 12: 12, 1: 13.5, 2: 14, 3: 15
    };

    return (
        <div className="relative">
            {/* Clock Face */}
            <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-gray-900 via-gray-800 to-black border-4 border-[#F59E0B]/30 shadow-2xl shadow-orange-500/20">
                {/* Outer glow ring */}
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-orange-500/20 via-transparent to-orange-500/20 blur-sm" />
                
                {/* Inner decorative ring */}
                <div className="absolute inset-3 rounded-full border border-gray-600/50" />
                <div className="absolute inset-6 rounded-full border border-gray-700/30" />

                {/* Clock numbers */}
                {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num, i) => {
                    const angle = ((i * 30) - 90) * (Math.PI / 180);
                    const radius = 105;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;

                    const mappedHour = hourMap[num];
                    const isClickable = mappedHour !== undefined;
                    const isActive = mappedHour === selectedHour;

                    return (
                        <button
                            key={num}
                            onClick={() => isClickable && onHourSelect(mappedHour)}
                            disabled={!isClickable}
                            className={`absolute w-9 h-9 flex items-center justify-center text-sm font-bold rounded-full transition-all duration-300 ${
                                isActive
                                    ? 'bg-gradient-to-br from-[#F59E0B] to-orange-600 text-black scale-125 shadow-lg shadow-orange-500/50'
                                    : isClickable
                                    ? 'text-[#F59E0B] hover:bg-[#F59E0B]/20 hover:scale-110 cursor-pointer border border-orange-500/30'
                                    : 'text-gray-600 cursor-default'
                            }`}
                            style={{
                                left: `calc(50% + ${x}px - 18px)`,
                                top: `calc(50% + ${y}px - 18px)`,
                            }}
                        >
                            {num}
                        </button>
                    );
                })}

                {/* Minute tick marks */}
                {Array.from({ length: 60 }).map((_, i) => {
                    if (i % 5 === 0) return null;
                    const angle = ((i * 6) - 90) * (Math.PI / 180);
                    const innerRadius = 120;
                    const outerRadius = 125;
                    return (
                        <div
                            key={i}
                            className="absolute w-0.5 h-1.5 bg-gray-600/50 rounded-full"
                            style={{
                                left: `calc(50% + ${Math.cos(angle) * innerRadius}px - 1px)`,
                                top: `calc(50% + ${Math.sin(angle) * innerRadius}px - 3px)`,
                                transform: `rotate(${i * 6}deg)`,
                            }}
                        />
                    );
                })}

                {/* Center hub with glow */}
                <div className="absolute top-1/2 left-1/2 w-6 h-6 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-[#F59E0B] to-orange-600 rounded-full z-30 shadow-lg shadow-orange-500/50" />

                {/* Hour hand */}
                <div
                    className="absolute top-1/2 left-1/2 w-3 h-16 bg-gradient-to-t from-[#F59E0B] via-orange-400 to-orange-300 rounded-full z-20 transition-transform duration-700 ease-out shadow-lg"
                    style={{
                        transformOrigin: 'center bottom',
                        transform: `translate(-50%, -100%) rotate(${getHourRotation(selectedHour)}deg)`,
                    }}
                />

                {/* Minute hand */}
                <div
                    className="absolute top-1/2 left-1/2 w-2 h-24 bg-gradient-to-t from-red-600 via-red-500 to-red-400 rounded-full z-10 transition-transform duration-700 ease-out shadow-lg"
                    style={{
                        transformOrigin: 'center bottom',
                        transform: `translate(-50%, -100%) rotate(${getMinuteRotation(selectedHour)}deg)`,
                    }}
                />

                {/* Decorative gears */}
                <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full border-4 border-red-900/60 animate-spin-slow">
                    <div className="absolute inset-2 rounded-full border-2 border-red-800/40" />
                </div>
                <div className="absolute -right-5 top-1/4 w-12 h-12 rounded-full border-4 border-amber-800/60 animate-spin-slow-reverse">
                    <div className="absolute inset-2 rounded-full border-2 border-amber-700/40" />
                </div>
                <div className="absolute -right-3 bottom-1/4 w-10 h-10 rounded-full border-4 border-red-800/50 animate-spin-slow" />
            </div>

            {/* Time indicator pill */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border border-[#F59E0B]/50 px-5 py-2 rounded-full shadow-lg">
                <span className="text-[#F59E0B] font-bold text-sm tracking-wide">{selectedTimeLabel}</span>
            </div>
        </div>
    );
}

const ScheduleSection = () => {
    const [selectedHour, setSelectedHour] = useState(10.5);

    // Convert 24h time string to hour number
    const timeToHour = (time: string): number => {
        const [hours, minutes] = time.split(':').map(Number);
        return hours + (minutes === 30 ? 0.5 : 0);
    };

    // Format 24h time to 12h display format (e.g., "10:30" -> "10:30 AM")
    const formatTime = (time: string): string => {
        const [hours, minutes] = time.split(':').map(Number);
        const period = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
        return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
    };

    // Filter events for selected time
    const getEventsForTime = (hour: number): ScheduleEvent[] => {
        return scheduleEvents.filter((event) => {
            const startHour = timeToHour(event.time);
            const endHour = timeToHour(event.endTime);
            return hour >= startHour && hour < endHour;
        });
    };

    const currentEvents = getEventsForTime(selectedHour);
    const selectedTimeLabel = timeSlots.find(t => t.hour === selectedHour)?.label || '10:30 AM';

    return (
        <section id="schedule" className="py-16 md:py-24 bg-gradient-to-b from-[#06112b] via-[#071133] to-[#071a45]">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Event <span className="text-[#F59E0B]">Schedule</span>
                    </h2>
                    <p className="text-white/70 text-lg max-w-2xl mx-auto">
                        Click on the clock numbers to explore events at each time slot
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
                    {/* Interactive Clock */}
                    <div className="relative">
                        <CSSClock selectedHour={selectedHour} onHourSelect={setSelectedHour} />
                    </div>

                    {/* Events List */}
                    <div className="w-full max-w-md">
                        <div className="bg-gray-900/80 border border-gray-700 rounded-2xl p-6 backdrop-blur-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                                    <Clock className="w-6 h-6 text-[#F59E0B]" />
                                    {selectedTimeLabel}
                                </h3>
                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-800 text-gray-300 border border-gray-600">
                                    Day 1
                                </span>
                            </div>

                            {currentEvents.length > 0 ? (
                                <div className="space-y-4 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                                    {currentEvents.map((event) => (
                                        <div
                                            key={event.id}
                                            className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 hover:border-[#F59E0B]/50 transition-colors"
                                        >
                                            <div className="flex items-start justify-between mb-2">
                                                <span
                                                    className={`px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wider ${
                                                        event.category === 'technical'
                                                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                                            : 'bg-pink-500/20 text-pink-400 border border-pink-500/30'
                                                    }`}
                                                >
                                                    {event.category}
                                                </span>
                                                {/* <span className="text-[#F59E0B] font-bold text-sm">
                                                    ₹{event.price}
                                                </span> */}
                                            </div>
                                            <h4 className="text-white font-semibold text-lg mb-1">
                                                {event.name}
                                                <span className="text-gray-400 font-normal text-sm ml-2">
                                                    ({formatTime(event.time)} - {formatTime(event.endTime)})
                                                </span>
                                            </h4>
                                            <p className="text-gray-400 text-sm mb-3">
                                                {event.description}
                                            </p>
                                            <div className="flex items-center gap-4 text-xs text-gray-500">
                                                <span className="flex items-center gap-1">
                                                    <Users className="w-3 h-3" />
                                                    {event.teamSize}
                                                </span>
                                                {event.venue && (
                                                    <span className="flex items-center gap-1">
                                                        <MapPin className="w-3 h-3 text-red-400" />
                                                        <span className="text-red-400">{event.venue}</span>
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-gray-500">No events at this time</p>
                                    <p className="text-gray-600 text-sm mt-1">Select another time slot</p>
                                </div>
                            )}
                        </div>

                        {/* Quick time selector */}
                        <div className="flex flex-wrap justify-center gap-2 mt-4">
                            {timeSlots.map((slot) => (
                                <button
                                    key={slot.hour}
                                    onClick={() => setSelectedHour(slot.hour)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                        selectedHour === slot.hour
                                            ? 'bg-[#F59E0B] text-black'
                                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700 border border-gray-700'
                                    }`}
                                >
                                    {slot.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes spin-slow {
                    from { transform: translateY(-50%) rotate(0deg); }
                    to { transform: translateY(-50%) rotate(360deg); }
                }
                @keyframes spin-slow-reverse {
                    from { transform: rotate(360deg); }
                    to { transform: rotate(0deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 10s linear infinite;
                }
                .animate-spin-slow-reverse {
                    animation: spin-slow-reverse 8s linear infinite;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255,255,255,0.05);
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(245,158,11,0.5);
                    border-radius: 4px;
                }
            `}</style>
        </section>
    );
};

export default ScheduleSection;


