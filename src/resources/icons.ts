import { IconType } from 'react-icons';

import {
  HiArrowUpRight,
  HiArrowRight,
  HiEnvelope,
  HiCalendarDays,
  HiOutlineLink,
  HiArrowTopRightOnSquare,
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineChatBubbleLeftRight,
  HiOutlineClock,
  HiOutlineMapPin,
  HiOutlineCheck,
} from 'react-icons/hi2';

import {
  PiHouseDuotone,
  PiGridFourDuotone,
  PiBookBookmarkDuotone,
  PiImageDuotone,
} from 'react-icons/pi';

import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6';

export const iconLibrary: Record<string, IconType> = {
  arrowUpRight: HiArrowUpRight,
  arrowRight: HiArrowRight,
  email: HiEnvelope,
  calendar: HiCalendarDays,
  openLink: HiOutlineLink,
  openInNew: HiArrowTopRightOnSquare,
  eye: HiOutlineEye,
  eyeOff: HiOutlineEyeSlash,
  chat: HiOutlineChatBubbleLeftRight,
  clock: HiOutlineClock,
  location: HiOutlineMapPin,
  check: HiOutlineCheck,
  home: PiHouseDuotone,
  grid: PiGridFourDuotone,
  book: PiBookBookmarkDuotone,
  gallery: PiImageDuotone,
  github: FaGithub,
  linkedin: FaLinkedin,
  x: FaXTwitter,
};

export type IconLibraryType = typeof iconLibrary;
export type IconName = keyof typeof iconLibrary;
