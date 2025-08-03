import { Progress } from '@/components/ui/progress';

interface SkillProgressProps {
  skill: string;
  level: number;
  color?: 'sage-green' | 'light-orange' | 'vibrant-orange' | 'dark-purple';
}

export default function SkillProgress({ 
  skill, 
  level, 
  color = 'sage-green' 
}: SkillProgressProps) {
  const getColorClass = (color: string) => {
    switch (color) {
      case 'sage-green': return 'text-sage-green';
      case 'light-orange': return 'text-yellow-600';
      case 'vibrant-orange': return 'text-vibrant-orange';
      case 'dark-purple': return 'text-dark-purple';
      default: return 'text-sage-green';
    }
  };

  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-700">{skill}</span>
      <div className="flex items-center space-x-2">
        <Progress 
          value={level} 
          className="w-20" 
        />
        <span className={`text-sm font-medium ${getColorClass(color)}`}>
          {level}%
        </span>
      </div>
    </div>
  );
}
