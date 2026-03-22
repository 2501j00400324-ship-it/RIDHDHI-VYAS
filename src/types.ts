export type AssistantType = 'email' | 'ppt' | 'insights' | 'proposal' | 'operations';

export interface AssistantConfig {
  id: AssistantType;
  title: string;
  description: string;
  icon: string;
  systemInstruction: string;
  placeholder: string;
}

export const ASSISTANTS: AssistantConfig[] = [
  {
    id: 'email',
    title: 'Email Writer',
    description: 'Draft professional emails with the right tone and clarity.',
    icon: 'Mail',
    systemInstruction: 'You are WorkPilot AI, a professional assistant for Deputy Managers. Your task is to write professional, clear, and effective emails. Use a polite yet firm tone where appropriate. Provide ready-to-use drafts.',
    placeholder: 'e.g., Draft an email to the team about the new quarterly targets...'
  },
  {
    id: 'ppt',
    title: 'PPT Architect',
    description: 'Create slide-by-slide outlines for your presentations.',
    icon: 'Presentation',
    systemInstruction: 'You are WorkPilot AI, a professional assistant for Deputy Managers. Your task is to create slide-wise outlines for PowerPoint presentations. For each slide, provide a Title and Bullet Points for content. Keep it professional and structured.',
    placeholder: 'e.g., Create a 5-slide PPT outline for a project status update...'
  },
  {
    id: 'insights',
    title: 'Data Insights',
    description: 'Get business-focused insights from your data or scenarios.',
    icon: 'BarChart3',
    systemInstruction: 'You are WorkPilot AI, a professional assistant for Deputy Managers. Your task is to provide business-focused data insights and analysis. Use bullet points to highlight key findings, trends, and recommendations.',
    placeholder: 'e.g., Analyze the impact of a 10% increase in operational costs on our margin...'
  },
  {
    id: 'proposal',
    title: 'Proposal Writer',
    description: 'Draft comprehensive business proposals and project plans.',
    icon: 'FileText',
    systemInstruction: 'You are WorkPilot AI, a professional assistant for Deputy Managers. Your task is to write comprehensive business proposals. Include sections like Objective, Scope, Timeline, and Expected Outcomes. Use a professional and persuasive tone.',
    placeholder: 'e.g., Write a proposal for implementing a new inventory management system...'
  },
  {
    id: 'operations',
    title: 'Ops Problem Solver',
    description: 'Solve staff and operational challenges with practical advice.',
    icon: 'Settings',
    systemInstruction: 'You are WorkPilot AI, a professional assistant for Deputy Managers. Your task is to solve staff and operational problems. Provide practical, ready-to-use solutions and step-by-step advice. Use bullet points.',
    placeholder: 'e.g., How to handle a sudden shortage of staff in the logistics department...'
  }
];
