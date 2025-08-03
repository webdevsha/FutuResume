import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Users, Target, Star, MapPin, Layers, Zap } from 'lucide-react';
import type { CareerPathway } from '@shared/schema';

interface PathwayCardProps {
  pathway: CareerPathway;
  selectedGoal?: string;
  selectedTimeline?: string;
}

export default function PathwayCard({ pathway, selectedGoal, selectedTimeline }: PathwayCardProps) {
  const getSkillMappingIcon = (type: string) => {
    switch (type) {
      case 'Map-skilling': return <MapPin size={16} className="text-sage-green" />;
      case 'Parallel-skilling': return <Layers size={16} className="text-vibrant-orange" />;
      case 'Deep-skilling': return <Zap size={16} className="text-dark-purple" />;
      default: return <Target size={16} />;
    }
  };
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
          
          {/* Skill Mapping Badge */}
          {pathway.skillMapping && (
            <div className="mt-3 flex items-center space-x-2">
              {getSkillMappingIcon(pathway.skillMapping.type)}
              <div className="text-sm">
                <span className="font-medium text-dark-purple">{pathway.skillMapping.type}</span>
                <span className="text-gray-600 ml-1">→ {pathway.skillMapping.description}</span>
              </div>
            </div>
          )}
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
              {pathway.salary ? `$${pathway.salary.min.toLocaleString()} - $${pathway.salary.max.toLocaleString()}` : 'To be determined'}
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

        <Dialog>
          <DialogTrigger asChild>
            <Button className={`w-full ${getButtonStyle(pathway.type)}`}>
              {pathway.type === 'custom' ? 'Start Creating' : 'View Details'}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-3">
                <span className="text-2xl">{pathway.icon}</span>
                <div>
                  <h3 className="text-xl font-bold text-dark-purple">{pathway.title}</h3>
                  <p className="text-sm text-gray-600">{pathway.skillMapping?.approach}</p>
                </div>
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6 mt-6">
              {/* Skill Mapping Strategy */}
              {pathway.skillMapping && (
                <div className="border rounded-lg p-4 bg-gradient-to-r from-light-purple/10 to-sage-green/10">
                  <div className="flex items-center space-x-3 mb-3">
                    {getSkillMappingIcon(pathway.skillMapping.type)}
                    <h4 className="font-semibold text-dark-purple">{pathway.skillMapping.type}</h4>
                  </div>
                  <p className="text-gray-700">{pathway.skillMapping.approach}</p>
                  <p className="text-sm text-gray-600 mt-2">
                    Based on your {selectedGoal} goal with a {selectedTimeline} timeline
                  </p>
                </div>
              )}

              {/* Evidence from Resume */}
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold text-dark-purple mb-3">Evidence from Your Resume</h4>
                <div className="space-y-2">
                  <div className="flex items-start space-x-3">
                    <Badge variant="secondary" className="mt-1">Experience</Badge>
                    <p className="text-sm text-gray-700">Your background shows strong analytical and problem-solving skills that directly transfer to this pathway.</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Badge variant="secondary" className="mt-1">Skills</Badge>
                    <p className="text-sm text-gray-700">Existing competencies in {pathway.skills?.required?.slice(0, 2).map(skill => typeof skill === 'string' ? skill : (skill as any)?.name || skill).join(', ') || 'your current skills'} provide a solid foundation.</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Badge variant="secondary" className="mt-1">Timeline</Badge>
                    <p className="text-sm text-gray-700">With {selectedTimeline}, this pathway aligns well with your accelerated learning goals.</p>
                  </div>
                </div>
              </div>

              {/* Skill Development Plan */}
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold text-dark-purple mb-3">Your Skill Development Plan</h4>
                <div className="space-y-3">
                  <div>
                    <Badge className="bg-sage-green text-white mb-2">Already Have</Badge>
                    <div className="flex flex-wrap gap-2">
                      {pathway.skills?.required?.map((skill, index) => (
                        <Badge key={`required-${index}`} variant="outline">
                          {typeof skill === 'string' ? skill : (skill as any)?.name || skill}
                        </Badge>
                      )) || <span className="text-gray-500">No specific skills listed</span>}
                    </div>
                  </div>
                  <div>
                    <Badge className="bg-vibrant-orange text-white mb-2">To Develop</Badge>
                    <div className="flex flex-wrap gap-2">
                      {pathway.skills?.toLearn?.map((skill, index) => (
                        <Badge key={`tolearn-${index}`} variant="outline">
                          {typeof skill === 'string' ? skill : (skill as any)?.name || skill}
                        </Badge>
                      )) || <span className="text-gray-500">Skills to be determined</span>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Organizations & Opportunities */}
              {pathway.organizations && pathway.organizations.length > 0 && (
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-dark-purple mb-3">
                    {pathway.type === 'custom' ? 'Organizations Creating These Roles' : 'Currently Hiring'}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {pathway.organizations.map(org => (
                      <Badge key={org} variant="outline" className="bg-light-orange/10">{org}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Market Insights */}
              <div className="border rounded-lg p-4 bg-gradient-to-r from-gray-50 to-light-purple/5">
                <h4 className="font-semibold text-dark-purple mb-3">Market Insights</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Market Score</span>
                    <div className="font-semibold text-lg">{pathway.marketScore}/100</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Competition Level</span>
                    <div className={`font-semibold ${getCompetitionColor(pathway.competition)}`}>
                      {pathway.competition.charAt(0).toUpperCase() + pathway.competition.slice(1)}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">Salary Range</span>
                    <div className="font-semibold">${pathway.salary.min.toLocaleString()} - ${pathway.salary.max.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Time to Goal</span>
                    <div className="font-semibold">{pathway.timeline}</div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
