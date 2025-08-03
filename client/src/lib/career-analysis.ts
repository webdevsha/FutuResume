export interface SkillMatch {
  skill: string;
  currentLevel: number;
  marketDemand: 'high' | 'medium' | 'low';
  growthProjection: number;
}

export interface CareerOpportunity {
  title: string;
  description: string;
  salaryRange: { min: number; max: number };
  requiredSkills: string[];
  competitionLevel: 'high' | 'medium' | 'low';
  marketTrend: 'growing' | 'stable' | 'declining';
  timeToAchieve: string;
}

export const analyzeSkillGaps = (
  currentSkills: string[],
  targetRole: string
): string[] => {
  // This would be enhanced with AI analysis in the real implementation
  const skillGaps: { [key: string]: string[] } = {
    'marketing': ['digital analytics', 'marketing automation', 'growth hacking'],
    'development': ['cloud architecture', 'ai/ml integration', 'devops'],
    'design': ['ux research', 'design systems', 'prototyping tools'],
    'sales': ['crm automation', 'data analysis', 'customer success'],
  };

  const roleKey = targetRole.toLowerCase();
  for (const [key, gaps] of Object.entries(skillGaps)) {
    if (roleKey.includes(key)) {
      return gaps.filter(gap => 
        !currentSkills.some(skill => 
          skill.toLowerCase().includes(gap.toLowerCase())
        )
      );
    }
  }

  return [];
};

export const calculateMarketScore = (
  skills: string[],
  competition: 'high' | 'medium' | 'low',
  demand: 'high' | 'medium' | 'low'
): number => {
  let score = 50; // Base score

  // Adjust for competition
  switch (competition) {
    case 'low': score += 30; break;
    case 'medium': score += 10; break;
    case 'high': score -= 20; break;
  }

  // Adjust for demand
  switch (demand) {
    case 'high': score += 25; break;
    case 'medium': score += 10; break;
    case 'low': score -= 15; break;
  }

  // Adjust for skill uniqueness (simplified)
  const uniqueSkills = skills.filter(skill => 
    skill.toLowerCase().includes('ai') || 
    skill.toLowerCase().includes('automation') ||
    skill.toLowerCase().includes('data')
  );
  score += uniqueSkills.length * 5;

  return Math.min(Math.max(score, 0), 100);
};

export const generatePathwayRecommendations = (
  currentSkills: string[],
  goal: string
): CareerOpportunity[] => {
  // This would use AI analysis in production
  const baseOpportunities: CareerOpportunity[] = [
    {
      title: 'Senior Marketing Manager',
      description: 'Follow the traditional corporate ladder',
      salaryRange: { min: 75000, max: 95000 },
      requiredSkills: ['marketing strategy', 'team management', 'budget planning'],
      competitionLevel: 'high',
      marketTrend: 'stable',
      timeToAchieve: '3-5 years'
    },
    {
      title: 'Growth Marketing Specialist',
      description: 'Combine marketing skills with data analytics',
      salaryRange: { min: 85000, max: 120000 },
      requiredSkills: ['growth hacking', 'data analysis', 'a/b testing'],
      competitionLevel: 'low',
      marketTrend: 'growing',
      timeToAchieve: '1-2 years'
    },
    {
      title: 'Marketing Automation Strategist',
      description: 'Create a new role combining marketing, psychology, and AI',
      salaryRange: { min: 95000, max: 150000 },
      requiredSkills: ['marketing automation', 'ai tools', 'customer psychology'],
      competitionLevel: 'low',
      marketTrend: 'growing',
      timeToAchieve: '6-18 months'
    }
  ];

  return baseOpportunities;
};
