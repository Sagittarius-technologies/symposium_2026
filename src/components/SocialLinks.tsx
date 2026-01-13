import { Instagram, Twitter, Linkedin, Mail } from 'lucide-react';

interface SocialLinksProps {
  variant?: 'default' | 'hero' | 'footer';
}

const SocialLinks = ({ variant = 'default' }: SocialLinksProps) => {
  const links = [
    { icon: Instagram, href: 'https://instagram.com/csesymposium', label: 'Instagram' },
    { icon: Twitter, href: 'https://twitter.com/csesymposium', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com/company/csesymposium', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:brajinbrajin10@gmail.com', label: 'Email' },
  ];

  const getStyles = () => {
    switch (variant) {
      case 'hero':
        return 'text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10';
      case 'footer':
        return 'text-muted-foreground hover:text-foreground hover:bg-muted';
      default:
        return 'text-muted-foreground hover:text-primary hover:bg-accent';
    }
  };

  return (
    <div className="flex items-center justify-center gap-2">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-2.5 rounded-lg transition-all duration-200 focus-ring tap-target ${getStyles()}`}
          aria-label={link.label}
        >
          <link.icon className="w-5 h-5" aria-hidden="true" />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
