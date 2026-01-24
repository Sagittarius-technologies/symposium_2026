export interface Event {
  id: string;
  name: string;
  description: string;
  fullDescription: string;
  price: number;
  category: 'Tech' | 'Non-Tech' | 'Both';
  icon: string;
  teamSize?: string;
  rules: string[];
  paymentLink: string;
  subEvents?: string[];
}

export const events: Event[] = [
  {
    id: 'workshop',
    name: 'Workshop',
    description: 'Hands-on technical workshop with industry experts',
    fullDescription: 'Join our intensive hands-on workshop led by industry professionals. Learn cutting-edge technologies, best practices, and gain practical experience that you can apply immediately in your projects.',
    price: 250,
    category: 'Tech',
    icon: 'Laptop',
    teamSize: 'Individual',
    rules: [
      'Bring your own laptop with required software installed',
      'Pre-registration is mandatory',
      'Workshop materials will be provided',
      'Certificate of participation will be issued'
    ],
    paymentLink: 'https://docs.google.com/forms/d/e/1FAIpQLSfrNLgUTZumDPrj6PB7KupCw_-tSBmkax8WVefIBGRTqD5nhw/viewform?embedded=true',
    subEvents: ['AI/ML Workshop', 'Web Development', 'Cloud Computing']
  },
  {
    id: 'tech-nontech',
    name: 'Tech + Non Tech',
    description: 'Access to one tech and one non-tech events',
    fullDescription: 'Get the complete symposium experience! This combo pass gives you access to all technical and non-technical events. Participate in coding challenges, creative competitions, and everything in between.',
    price: 250,
    category: 'Both',
    icon: 'Sparkles',
    teamSize: 'Individual or Team',
    rules: [
      'Valid for one participant only',
      'Access to all listed tech and non-tech events',
      'Team formation for specific events as per event rules',
      'ID card is mandatory for entry'
    ],
    paymentLink: 'https://docs.google.com/forms/d/e/1FAIpQLSdnHXpPIdIN6Kof6u-pRr5pKczWXoSVUx1t5f39bmQiNFpwlw/viewform?usp=publish-editor',
    subEvents: ['Debugging', 'Blind fold coding', 'UI/UX Design', 'AI Development', 'Paper Presentation', 'Meme Mania', 'Treasure Hunt']
  },
  {
    id: 'free-fire',
    name: 'Free Fire Tournament',
    description: 'Battle Royale gaming tournament - Solo only!',
    fullDescription: 'Get ready for an intense Free Fire battle! Join and  compete against other players in this thrilling mobile gaming tournament. Strategy, teamwork, and quick reflexes will determine the ultimate champions.',
    price: 150,
    category: 'Tech',
    icon: 'Gamepad2',
    teamSize: 'Only individuals',
    rules: [
      'No team entries allowed',
      'Only individual entries allowed',
      'Players must use their own devices',
      'Fair play policy strictly enforced',
      'Tournament format: Battle Royale elimination'
    ],
    paymentLink: 'https://docs.google.com/forms/d/e/1FAIpQLSc7-w1UtKp_KYFY3mgrHwQlrjvX28vveFrb3bAIl1KJjU75GA/viewform?usp=publish-editor'
  },
  {
    id: 'paper',
    name: 'Paper Presentation',
    description: 'Present your research and innovative ideas',
    fullDescription: 'Present your research papers and innovative project ideas to a panel of expert judges. Topics can range from emerging technologies to social impact projects.',
    price: 499,
    category: 'Tech',
    icon: 'FileText',
    teamSize: 'Individual or Team (2-3)',
    rules: [
      'Abstract submission deadline: 1 week before event',
      'Presentation time: 8-10 minutes + Q&A',
      'PPT format with max 15 slides',
      'Plagiarism will lead to disqualification',
      'IEEE format preferred for papers'
    ],
    paymentLink: 'https://docs.google.com/forms/d/e/1FAIpQLSc6nk-8lgnrX_VkQo0qb8KM98CHBUnxQxXC6HZfYqEfj9ru3g/viewform?usp=publish-editor'
  }
];
