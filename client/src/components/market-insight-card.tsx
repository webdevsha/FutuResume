import { Progress } from '@/components/ui/progress';

interface MarketInsightCardProps {
  title: string;
  growth: number;
  progress: number;
  description: string;
  color: 'sage-green' | 'vibrant-orange' | 'dark-purple';
}

export default function MarketInsightCard({
  title,
  growth,
  progress,
  description,
  color
}: MarketInsightCardProps) {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'sage-green':
        return {
          bg: 'bg-sage-green/10',
          text: 'text-sage-green',
          progress: 'bg-sage-green'
        };
      case 'vibrant-orange':
        return {
          bg: 'bg-light-orange/20',
          text: 'text-vibrant-orange',
          progress: 'bg-vibrant-orange'
        };
      case 'dark-purple':
        return {
          bg: 'bg-light-purple/30',
          text: 'text-dark-purple',
          progress: 'bg-dark-purple'
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-600',
          progress: 'bg-gray-400'
        };
    }
  };

  const colorClasses = getColorClasses(color);

  return (
    <div className={`p-4 rounded-lg ${colorClasses.bg}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="font-medium text-gray-900">{title}</span>
        <span className={`font-bold ${colorClasses.text}`}>+{growth}%</span>
      </div>
      <Progress value={progress} className="mb-2" />
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}
