import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Target, Star } from 'lucide-react';
import type { CareerPathway } from '@shared/schema';

interface PathwayCardProps {
  pathway: CareerPathway;
}

export default function PathwayCard({ pathway }: PathwayCardProps) {
  const getCompetitionColor = (competition: string) => {
    switch (competition) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-sage-green';
      default: return 'text-gray-500';
    }
  };

  const getCompetitionIcon = (competition: string) => {
    switch (competition) {
      case 'high': return <Users size={16} />;
      case 'low': return <Target size={16} />;
      default: return <Star size={16} />;
    }
  };

  const getCardStyle = (type: string) => {
    switch (type) {
      case 'traditional':
        return 'bg-gray-50 border-2 border-gray-200';
      case 'niche':
        return 'bg-gradient-to-br from-sage-green/10 to-light-orange/10 border-2 border-sage-green relative';
      case 'custom':
        return 'bg-gradient-to-br from-vibrant-orange/10 to-light-purple/10 border-2 border-vibrant-orange';
      default:
        return 'bg-white border-2 border-gray-200';
    }
  };

  const getButtonStyle = (type: string) => {
    switch (type) {
      case 'traditional':
        return 'bg-gray-600 text-white hover:bg-gray-700';
      case 'niche':
        return 'bg-sage-green text-white hover:bg-sage-green/90';
      case 'custom':
        return 'bg-vibrant-orange text-white hover:bg-vibrant-orange/90';
      default:
        return 'bg-gray-600 text-white hover:bg-gray-700';
    }
  };

  return (
    <Card className={getCardStyle(pathway.type)}>
      {pathway.type === 'niche' && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-sage-green text-white">
            RECOMMENDED
          </Badge>
        </div>
      )}
      
      <CardContent className={`p-6 ${pathway.type === 'niche' ? 'mt-2' : ''}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-dark-purple">
            {pathway.type === 'traditional' && 'Traditional Path'}
            {pathway.type === 'niche' && 'Smart Niche'}
            {pathway.type === 'custom' && 'Create Your Role'}
          </h3>
          <div className={`flex items-center space-x-1 ${getCompetitionColor(pathway.competition)}`}>
            {getCompetitionIcon(pathway.competition)}
            <span className="text-sm font-medium capitalize">
              {pathway.competition === 'high' && 'High Competition'}
              {pathway.competition === 'low' && 'Low Competition'}
              {pathway.competition === 'medium' && 'Unique Opportunity'}
            </span>
          </div>
        </div>
        
        <div className="mb-4">
          <span className="text-2xl">{pathway.icon}</span>
          <h4 className="font-semibold text-dark-purple mt-2">{pathway.title}</h4>
          <p className="text-gray-600 text-sm mt-1">{pathway.description}</p>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">
              {pathway.type === 'custom' ? 'Potential Salary' : 'Avg. Salary'}
            </span>
            <span className={`font-medium ${
              pathway.type === 'niche' ? 'text-sage-green' : 
              pathway.type === 'custom' ? 'text-vibrant-orange' : 
              'text-gray-900'
            }`}>
              ${pathway.salary.min.toLocaleString()} - ${pathway.salary.max.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">
              {pathway.type === 'custom' ? 'Market Demand' : 'Job Openings'}
            </span>
            <span className={`font-medium ${getCompetitionColor(pathway.competition)}`}>
              {pathway.demand}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Time to Goal</span>
            <span className="font-medium">{pathway.timeline}</span>
          </div>
        </div>

        <Button className={`w-full ${getButtonStyle(pathway.type)}`}>
          {pathway.type === 'custom' ? 'Start Creating' : 'View Details'}
        </Button>
      </CardContent>
    </Card>
  );
}
