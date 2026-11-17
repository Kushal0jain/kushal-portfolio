import {
  FaBriefcase, FaCode, FaBuilding, FaGraduationCap, FaAward, FaUsers, FaStar, FaRocket,
  FaHeart, FaGlobe, FaLinkedin, FaGithub, FaEnvelope, FaInstagram, FaWhatsapp, FaYoutube,
  FaFacebook, FaLink,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

// Icons for the About stats. Content stores only the key.
export const STAT_ICONS = {
  briefcase:  { label: 'Briefcase',       Icon: FaBriefcase },
  code:       { label: 'Code',            Icon: FaCode },
  building:   { label: 'Building',        Icon: FaBuilding },
  graduation: { label: 'Graduation cap',  Icon: FaGraduationCap },
  award:      { label: 'Award',           Icon: FaAward },
  users:      { label: 'People',          Icon: FaUsers },
  star:       { label: 'Star',            Icon: FaStar },
  rocket:     { label: 'Rocket',          Icon: FaRocket },
  heart:      { label: 'Heart',           Icon: FaHeart },
  globe:      { label: 'Globe',           Icon: FaGlobe },
};

// Platforms for the footer social links.
export const SOCIAL_PLATFORMS = {
  linkedin:  { label: 'LinkedIn',  Icon: FaLinkedin },
  github:    { label: 'GitHub',    Icon: FaGithub },
  email:     { label: 'Email',     Icon: FaEnvelope },
  instagram: { label: 'Instagram', Icon: FaInstagram },
  whatsapp:  { label: 'WhatsApp',  Icon: FaWhatsapp },
  x:         { label: 'X (Twitter)', Icon: FaXTwitter },
  youtube:   { label: 'YouTube',   Icon: FaYoutube },
  facebook:  { label: 'Facebook',  Icon: FaFacebook },
  website:   { label: 'Website',   Icon: FaGlobe },
  other:     { label: 'Other link', Icon: FaLink },
};

export const statIcon = (key) => (STAT_ICONS[key] || STAT_ICONS.star).Icon;
export const socialPlatform = (key) => SOCIAL_PLATFORMS[key] || SOCIAL_PLATFORMS.other;
