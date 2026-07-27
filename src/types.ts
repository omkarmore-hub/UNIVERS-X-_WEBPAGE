export type ActiveTab = 'home' | 'library' | 'team' | 'project' | 'support' | 'help';

export type PillarType = 'INNOVATION' | 'RESEARCH' | 'FUTURE' | 'COMMUNITY' | null;

export interface LibraryResource {
  id: string;
  title: string;
  department: 'Computer Science' | 'Information Tech' | 'Electronics' | 'Mechanical' | 'Civil' | 'General Science';
  semester: number;
  type: 'Syllabus' | 'Notes' | 'Lab Manual' | 'Exam Paper' | 'Research Reference' | 'Textbook';
  author: string;
  fileSize: string;
  downloadCount: number;
  rating: number;
  tags: string[];
  description: string;
  updatedDate: string;
  contentPreview?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  year: string;
  avatar: string;
  bio: string;
  skills: string[];
  projects: string[];
  email: string;
  github?: string;
  linkedin?: string;
  featuredPaper?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'AI & ML' | 'Robotics' | 'Web3' | 'IoT' | 'Full Stack' | 'Cybersecurity';
  author: string;
  teamMembers: string[];
  stars: number;
  status: 'Completed' | 'In Progress' | 'Prototype';
  summary: string;
  techStack: string[];
  image: string;
  githubUrl: string;
  demoUrl?: string;
  highlights: string[];
}

export interface FAQItem {
  id: string;
  category: 'General' | 'Admissions' | 'Library' | 'Projects' | 'Exams';
  question: string;
  answer: string;
}

export interface FeedbackData {
  rating: number;
  category: 'General' | 'Bug Report' | 'Feature Suggestion' | 'College Query';
  name: string;
  email: string;
  message: string;
}
