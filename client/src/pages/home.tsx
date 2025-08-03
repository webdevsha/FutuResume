import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { 
  Upload, 
  Map, 
  Target, 
  TrendingUp, 
  Users, 
  Star, 
  CheckCircle, 
  AlertCircle,
  Brain,
  Puzzle,
  Rocket,
  PlayCircle,
  Menu,
  Lightbulb
} from "lucide-react";
import Dropzone from "@/components/ui/dropzone";
import PathwayCard from "@/components/pathway-card";
import SkillProgress from "@/components/skill-progress";
import MarketInsightCard from "@/components/market-insight-card";
import type { CareerAnalysis, CareerGoalType } from "@shared/schema";

export default function Home() {
  const [selectedGoal, setSelectedGoal] = useState<CareerGoalType | null>(null);
  const [selectedTimeline, setSelectedTimeline] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [analysisId, setAnalysisId] = useState<string | null>(null);
  const [showProactiveMessage, setShowProactiveMessage] = useState(false);
  const { toast } = useToast();

  // File upload mutation
  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('resume', file);
      const response = await fetch('/api/upload-resume', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Upload failed');
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Resume uploaded successfully",
        description: "Your resume has been processed and is ready for analysis.",
      });
      setUploadedFile(data.file);
    },
    onError: () => {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your resume. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Career analysis mutation
  const analysisMutation = useMutation({
    mutationFn: async ({ resumeId, goal }: { resumeId: string; goal: CareerGoalType }) => {
      const response = await apiRequest('POST', '/api/analyze-career', { resumeId, goal });
      return response.json();
    },
    onSuccess: (data) => {
      setAnalysisId(data.id);
      queryClient.invalidateQueries({ queryKey: ['/api/career-analysis', data.id] });
      toast({
        title: "Analysis complete",
        description: "Your personalized career pathways are ready!",
      });
    },
    onError: () => {
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing your career paths. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Fetch analysis results
  const { data: analysis, isLoading: analysisLoading } = useQuery<CareerAnalysis>({
    queryKey: ['/api/career-analysis', analysisId],
    enabled: !!analysisId,
  });

  const handleFileUpload = (file: File) => {
    uploadMutation.mutate(file);
  };

  const handleTimelineChange = (timeline: string) => {
    setSelectedTimeline(timeline);
    setShowProactiveMessage(false);
    
    // Show encouraging message for proactive timelines
    const timelineMonths = {
      '1 month': 1,
      '3 months': 3,
      '6 months': 6,
      '9 months': 9,
      '1 year': 12,
      '2 years': 24
    };
    
    const months = timelineMonths[timeline as keyof typeof timelineMonths];
    if (months <= 6) {
      setShowProactiveMessage(true);
      setTimeout(() => setShowProactiveMessage(false), 3000);
    }
  };

  const handleAnalysis = () => {
    if (!uploadedFile || !selectedGoal || !selectedTimeline) {
      toast({
        title: "Missing information",
        description: "Please complete all steps: upload resume, select goal, and choose timeline.",
        variant: "destructive",
      });
      return;
    }
    
    analysisMutation.mutate({ 
      resumeId: (uploadedFile as any).id, 
      goal: selectedGoal,
      timeline: selectedTimeline
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-dark-purple to-vibrant-orange rounded-lg flex items-center justify-center">
                <Map className="text-white" size={16} />
              </div>
              <span className="text-xl font-bold text-dark-purple">FutureSu.me</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-gray-600 hover:text-dark-purple transition-colors">How it Works</a>
              <a href="#" className="text-gray-600 hover:text-dark-purple transition-colors">Skill-Authoring Bootcamp</a>
              <a href="#" className="text-gray-600 hover:text-dark-purple transition-colors">Success Stories</a>
              <Button className="bg-dark-purple text-white hover:bg-dark-purple/90">
                Sign In
              </Button>
            </div>
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="text-gray-600" size={20} />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-cream via-light-purple to-sage-green/20 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="bg-white/80 backdrop-blur-sm border-light-purple text-dark-purple mb-6">
              🎯 Limited Beta Access
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-dark-purple mb-6 leading-tight">
              Build Your Future Resume
            </h1>
            <p className="text-xl text-gray-700 mb-4">
              Be Ready When You're Applying
            </p>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Stop following predetermined career paths. Start <strong>skill-authoring</strong> your unique future. 
              Our AI maps your current skills to emerging opportunities, creating personalized pathways that match your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                className="bg-vibrant-orange text-white hover:bg-vibrant-orange/90 flex items-center space-x-2"
                onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Upload size={16} />
                <span>Upload Your Resume</span>
              </Button>
              <Button variant="ghost" className="text-dark-purple font-semibold hover:text-dark-purple/80 flex items-center space-x-2">
                <PlayCircle size={16} />
                <span>Watch Demo</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark-purple mb-4">
              Why Skill-Authoring {'>'} Upskilling
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Traditional career advice treats you like a follower. We help you become the author of your unique professional story.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Traditional Approach */}
            <Card className="bg-gray-50 border-2 border-gray-200">
              <CardContent className="p-8">
                <div className="text-red-500 mb-4">
                  <AlertCircle size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Traditional "Upskilling"</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-3">
                    <div className="text-red-500 mt-1">→</div>
                    <span>Follow predetermined career ladders</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="text-red-500 mt-1">→</div>
                    <span>Compete in oversaturated job markets</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="text-red-500 mt-1">→</div>
                    <span>Generic skill recommendations</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="text-red-500 mt-1">→</div>
                    <span>One-size-fits-all career advice</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Skill-Authoring Approach */}
            <Card className="bg-gradient-to-br from-sage-green/10 to-light-orange/10 border-2 border-sage-green">
              <CardContent className="p-8">
                <div className="text-sage-green mb-4">
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-xl font-bold text-dark-purple mb-4">Our "Skill-Authoring"</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start space-x-3">
                    <div className="text-sage-green mt-1">→</div>
                    <span><strong>Map-skilling:</strong> Strategic skill combinations</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="text-sage-green mt-1">→</div>
                    <span><strong>Parallel-skilling:</strong> Multi-passionate approach</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="text-sage-green mt-1">→</div>
                    <span><strong>Deep-skilling:</strong> Expertise that matters</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="text-sage-green mt-1">→</div>
                    <span>Create your own role in emerging markets</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Upload Interface */}
      <section id="upload-section" className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark-purple mb-4">
              Start Your Skill-Authoring Journey
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Upload your resume or transcript, select your goal, and discover 3 personalized pathways to your future.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Upload Section */}
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-dark-purple mb-6">Step 1: Upload Your Materials</h3>
                
                <Dropzone
                  onFileUpload={handleFileUpload}
                  isUploading={uploadMutation.isPending}
                  uploadedFile={uploadedFile}
                  className="mb-6"
                />

                {/* Goal Selection */}
                <div className="mb-6">
                  <Label className="text-lg font-medium text-dark-purple mb-3 block">Step 2: What's Your Goal?</Label>
                  <Select value={selectedGoal || ''} onValueChange={(value) => setSelectedGoal(value as CareerGoalType)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your career goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pivot">🔄 Career Pivot - Change industries or roles</SelectItem>
                      <SelectItem value="step-up">📈 Step Up - Advance in current field</SelectItem>
                      <SelectItem value="new-phase">🚀 New Phase - Explore emerging opportunities</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Timeline Selection */}
                <div className="mb-6">
                  <Label className="text-lg font-medium text-dark-purple mb-3 block">Step 3: What's Your Timeline?</Label>
                  <Select value={selectedTimeline || ''} onValueChange={handleTimelineChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1 month">⏰ 1 month</SelectItem>
                      <SelectItem value="3 months">⏰ 3 months</SelectItem>
                      <SelectItem value="6 months">⏰ 6 months</SelectItem>
                      <SelectItem value="9 months">⏰ 9 months</SelectItem>
                      <SelectItem value="1 year">⏰ 1 year</SelectItem>
                      <SelectItem value="2 years">⏰ 2 years</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  {/* Proactive Message */}
                  {showProactiveMessage && (
                    <div className="mt-4 p-4 bg-gradient-to-r from-sage-green/10 to-vibrant-orange/10 border border-sage-green/30 rounded-lg animate-in slide-in-from-bottom-2 duration-300">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">🚀</div>
                        <div>
                          <p className="font-medium text-dark-purple">Wow, you're very proactive!</p>
                          <p className="text-sm text-gray-600">
                            Your ambitious timeline puts you ahead of 85% of career changers. We'll prioritize fast-track pathways for you.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <Button 
                  onClick={handleAnalysis}
                  disabled={!uploadedFile || !selectedGoal || !selectedTimeline || analysisMutation.isPending}
                  className="w-full bg-vibrant-orange text-white hover:bg-vibrant-orange/90"
                >
                  {analysisMutation.isPending ? "Analyzing..." : "Analyze My Future Pathways"}
                </Button>
              </CardContent>
            </Card>

            {/* Dynamic Right Column */}
            {!uploadedFile ? (
              /* Market Insights Before Upload */
              <Card className="shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-dark-purple mb-6">Live Market Intelligence</h3>
                  
                  <div className="space-y-6">
                    <MarketInsightCard
                      title="AI & Automation Skills"
                      growth={47}
                      progress={78}
                      description="High demand, multiple career paths"
                      color="sage-green"
                    />
                    
                    <MarketInsightCard
                      title="Creative Tech Roles"
                      growth={31}
                      progress={65}
                      description="Perfect for portfolio careers"
                      color="vibrant-orange"
                    />
                    
                    <MarketInsightCard
                      title="Hybrid Skill Roles"
                      growth={89}
                      progress={92}
                      description="Custom roles you can create"
                      color="dark-purple"
                    />
                  </div>

                  {/* Pro Tip */}
                  <Card className="mt-6 bg-gradient-to-r from-vibrant-orange/10 to-sage-green/10 border border-sage-green/20">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <Lightbulb className="text-vibrant-orange mt-1" size={20} />
                        <div>
                          <p className="font-medium text-dark-purple">Market Insight</p>
                          <p className="text-sm text-gray-600 mt-1">
                            85% of high-paying opportunities exist in skill combinations that don't have official job titles yet.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            ) : !analysis ? (
              /* Instant Delight After Upload */
              <Card className="shadow-lg border-2 border-sage-green bg-gradient-to-br from-sage-green/5 to-cream/50">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-sage-green text-white rounded-full mb-4">
                      <CheckCircle size={32} />
                    </div>
                    <h3 className="text-xl font-semibold text-dark-purple mb-2">Resume Successfully Analyzed!</h3>
                    <p className="text-gray-600">We've identified your key skills and potential opportunities</p>
                  </div>

                  {/* Quick Skill Preview */}
                  <div className="mb-6">
                    <h4 className="font-medium text-dark-purple mb-3">Skills We Detected:</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Digital Marketing', 'Data Analysis', 'Project Management', 'Communication', 'Creative Strategy'].map((skill) => (
                        <Badge key={skill} className="bg-sage-green/10 text-sage-green border-sage-green/20">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Market Opportunity Preview */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-dark-purple">Market Opportunities Found:</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">🎯</span>
                          <div>
                            <p className="font-medium text-gray-900">Niche Opportunities</p>
                            <p className="text-sm text-sage-green">Low competition, high value</p>
                          </div>
                        </div>
                        <Badge className="bg-sage-green text-white">2 Found</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">🚀</span>
                          <div>
                            <p className="font-medium text-gray-900">Custom Role Creation</p>
                            <p className="text-sm text-vibrant-orange">Create your own position</p>
                          </div>
                        </div>
                        <Badge className="bg-vibrant-orange text-white">1 Ready</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-gradient-to-r from-light-purple/20 to-vibrant-orange/10 rounded-lg">
                    <p className="text-sm text-dark-purple font-medium text-center">
                      💡 Ready to see your full personalized pathway analysis? Select your goal and click analyze!
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              /* Analysis Results Summary */
              <Card className="shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-dark-purple mb-6">Your Pathway Analysis</h3>
                  
                  <div className="space-y-6">
                    {analysis.pathways?.map((pathway, index) => (
                      <div key={pathway.id} className="p-4 border rounded-lg hover:border-dark-purple transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{pathway.icon}</span>
                            <div>
                              <h4 className="font-medium text-gray-900">{pathway.title}</h4>
                              <p className="text-sm text-gray-600">{pathway.type === 'traditional' ? 'Traditional Path' : pathway.type === 'niche' ? 'Smart Niche' : 'Create Your Role'}</p>
                            </div>
                          </div>
                          <Badge className={
                            pathway.competition === 'low' ? 'bg-sage-green text-white' :
                            pathway.competition === 'medium' ? 'bg-light-orange text-gray-800' :
                            'bg-gray-500 text-white'
                          }>
                            {pathway.competition === 'low' ? 'Low Competition' : pathway.competition === 'medium' ? 'Medium' : 'High Competition'}
                          </Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Salary Range:</span>
                          <span className="font-medium text-dark-purple">
                            ${pathway.salary.min.toLocaleString()} - ${pathway.salary.max.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm mt-1">
                          <span className="text-gray-600">Timeline:</span>
                          <span className="font-medium">{pathway.timeline}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button 
                    className="w-full mt-6 bg-dark-purple text-white hover:bg-dark-purple/90"
                    onClick={() => document.getElementById('pathways-section')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    View Detailed Analysis
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Pathway Results */}
      {analysis && (
        <section id="pathways-section" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-dark-purple mb-4">
                Your Personalized Skill-Authoring Pathways
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Based on your current skills and {selectedGoal === 'pivot' ? 'pivot goals' : selectedGoal === 'step-up' ? 'advancement goals' : 'exploration goals'}, here are 3 strategic pathways optimized for low competition and high value.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {analysis.pathways?.map((pathway) => (
                <PathwayCard key={pathway.id} pathway={pathway} />
              ))}
            </div>

            {/* Competition Analysis */}
            <div className="mt-12 bg-gradient-to-r from-cream to-light-purple/10 rounded-2xl p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-dark-purple mb-4">Market Competition Analysis</h3>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  We prioritize pathways with low competition to maximize your chances of success and higher compensation.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-white border-2 border-gray-300">
                  <CardContent className="p-6 text-center">
                    <div className="text-red-500 mb-3">
                      <Users size={32} className="mx-auto" />
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">Traditional Paths</h4>
                    <p className="text-3xl font-bold text-red-500 mb-2">{analysis.marketData?.competitionLevels?.traditional || 85}%</p>
                    <p className="text-sm text-gray-600">High competition</p>
                    <p className="text-xs text-gray-500 mt-2">Average salary growth: 3-5% annually</p>
                  </CardContent>
                </Card>

                <Card className="bg-white border-2 border-sage-green relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-sage-green text-white">RECOMMENDED</Badge>
                  </div>
                  <CardContent className="p-6 text-center mt-2">
                    <div className="text-sage-green mb-3">
                      <Target size={32} className="mx-auto" />
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">Smart Niches</h4>
                    <p className="text-3xl font-bold text-sage-green mb-2">{analysis.marketData?.competitionLevels?.niche || 35}%</p>
                    <p className="text-sm text-gray-600">Low competition</p>
                    <p className="text-xs text-gray-500 mt-2">Average salary growth: 15-25% annually</p>
                  </CardContent>
                </Card>

                <Card className="bg-white border-2 border-vibrant-orange">
                  <CardContent className="p-6 text-center">
                    <div className="text-vibrant-orange mb-3">
                      <Rocket size={32} className="mx-auto" />
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">Custom Roles</h4>
                    <p className="text-3xl font-bold text-vibrant-orange mb-2">{analysis.marketData?.competitionLevels?.custom || 15}%</p>
                    <p className="text-sm text-gray-600">Virtually no competition</p>
                    <p className="text-xs text-gray-500 mt-2">Average salary growth: 25-40% annually</p>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8 text-center">
                <Card className="bg-gradient-to-r from-vibrant-orange/10 to-sage-green/10 border border-sage-green/20 inline-block">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Star className="text-vibrant-orange" size={20} />
                      <div className="text-left">
                        <p className="font-medium text-dark-purple">Your Competitive Advantage</p>
                        <p className="text-sm text-gray-600">
                          By focusing on skill-authoring instead of traditional upskilling, you're positioning yourself in markets with 70% less competition.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Action Section */}
            <div className="mt-12 text-center">
              <Card className="bg-gradient-to-r from-dark-purple to-vibrant-orange text-white">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Ready to Author Your Future?</h3>
                  <p className="text-lg mb-6 opacity-90">
                    Join our Skill-Authoring Bootcamp and learn to create opportunities instead of chasing them.
                  </p>
                  <Button className="bg-white text-dark-purple hover:bg-gray-100">
                    Join Bootcamp (Limited Access)
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Skill Mapping */}
      {analysis && (
        <section className="py-16 bg-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-dark-purple mb-4">
                How We Map Your Skills to Future Opportunities
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our AI analyzes your current skills and identifies emerging market opportunities that traditional career advice misses.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Skills Analysis */}
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-dark-purple mb-4">Your Current Skills</h4>
                    <div className="space-y-3">
                      {analysis.currentSkills?.slice(0, 5).map((skill, index) => (
                        <SkillProgress
                          key={skill}
                          skill={skill}
                          level={85 - index * 5} // Demo progression
                          color="sage-green"
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-dark-purple text-white rounded-full mb-2">
                    <Brain size={20} />
                  </div>
                  <p className="text-sm font-medium text-dark-purple">AI Analysis & Market Mapping</p>
                </div>

                <Card>
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-dark-purple mb-4">Future Market Opportunities</h4>
                    <div className="space-y-3">
                      {analysis.pathways?.slice(0, 3).map((pathway, index) => (
                        <div key={pathway.id} className="flex items-center justify-between">
                          <span className="text-gray-700">{pathway.title}</span>
                          <Badge variant="secondary" className={`text-${index === 0 ? 'sage-green' : index === 1 ? 'vibrant-orange' : 'light-orange'}`}>
                            {92 - index * 5}% Match
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Market Intelligence */}
              <Card className="shadow-lg">
                <CardContent className="p-8">
                  <h4 className="font-semibold text-dark-purple mb-6">Real-Time Market Intelligence</h4>
                  
                  {/* Market Demand Chart */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-700">Job Market Demand</span>
                      <span className="text-sm text-gray-600">Last 30 days</span>
                    </div>
                    <div className="space-y-3">
                      {analysis.marketData?.trends?.slice(0, 3).map((trend, index) => (
                        <div key={trend.skill} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">{trend.skill}</span>
                          <div className="flex items-center space-x-2">
                            <Progress value={trend.growth} className="w-24" />
                            <span className={`text-xs ${trend.growth > 0 ? 'text-sage-green' : 'text-red-500'}`}>
                              {trend.growth > 0 ? '+' : ''}{trend.growth}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Salary Projections */}
                  <Separator className="my-6" />
                  <div>
                    <h5 className="font-medium text-gray-900 mb-4">Salary Projections (2024-2026)</h5>
                    <div className="space-y-3">
                      {analysis.marketData?.salaryProjections?.slice(0, 3).map((projection, index) => (
                        <div key={projection.role} className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">{projection.role}</span>
                          <span className={`text-sm font-medium ${index === 0 ? 'text-sage-green' : index === 1 ? 'text-vibrant-orange' : 'text-dark-purple'}`}>
                            ${projection.projected.min}K - ${projection.projected.max}K
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Bootcamp Promo */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-dark-purple via-vibrant-orange to-sage-green p-1 rounded-3xl">
            <Card className="rounded-3xl border-0">
              <CardContent className="p-8 lg:p-12">
                <div className="text-center mb-8">
                  <Badge className="bg-light-purple text-dark-purple mb-4">
                    🎓 Limited Beta Program
                  </Badge>
                  <h2 className="text-3xl lg:text-4xl font-bold text-dark-purple mb-4">
                    Skill-Authoring Bootcamp
                  </h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Master the art of creating opportunities instead of chasing them. 
                    Learn to identify market gaps and position yourself as the solution.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-sage-green to-vibrant-orange rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <Brain className="text-white" size={20} />
                    </div>
                    <h3 className="font-semibold text-dark-purple mb-2">Market Intelligence</h3>
                    <p className="text-gray-600 text-sm">Learn to read market signals and identify emerging opportunities before they become competitive.</p>
                  </div>
                  
                  <div className="text-center p-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-vibrant-orange to-light-purple rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <Puzzle className="text-white" size={20} />
                    </div>
                    <h3 className="font-semibold text-dark-purple mb-2">Skill Combination</h3>
                    <p className="text-gray-600 text-sm">Master the art of creating valuable skill combinations that companies didn't know they needed.</p>
                  </div>
                  
                  <div className="text-center p-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-light-purple to-sage-green rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <Rocket className="text-white" size={20} />
                    </div>
                    <h3 className="font-semibold text-dark-purple mb-2">Role Creation</h3>
                    <p className="text-gray-600 text-sm">Build the confidence and strategy to pitch custom roles that companies create just for you.</p>
                  </div>
                </div>

                <Card className="bg-cream border-0 mb-8">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-dark-purple mb-3">What You'll Learn</h4>
                        <ul className="space-y-2 text-gray-600">
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="text-sage-green" size={16} />
                            <span className="text-sm">AI-powered market opportunity scanning</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="text-sage-green" size={16} />
                            <span className="text-sm">Strategic skill stacking methodologies</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="text-sage-green" size={16} />
                            <span className="text-sm">Personal brand positioning for unique roles</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="text-sage-green" size={16} />
                            <span className="text-sm">Pitch frameworks for custom role creation</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-dark-purple mb-3">Program Details</h4>
                        <div className="space-y-2 text-gray-600">
                          <div className="flex justify-between">
                            <span className="text-sm">Duration:</span>
                            <span className="text-sm font-medium">6 weeks</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Format:</span>
                            <span className="text-sm font-medium">Live + Self-paced</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Cohort Size:</span>
                            <span className="text-sm font-medium">Limited to 50</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Next Cohort:</span>
                            <span className="text-sm font-medium">January 2024</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="text-center">
                  <Button className="bg-gradient-to-r from-vibrant-orange to-dark-purple text-white text-lg px-8 py-4 rounded-xl hover:shadow-lg transition-all">
                    Join Waitlist - Beta Access
                  </Button>
                  <p className="text-gray-600 text-sm mt-4">
                    Limited spots available. Priority access for FutureSu.me users.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-purple text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-vibrant-orange to-sage-green rounded-lg flex items-center justify-center">
                  <Map className="text-white" size={16} />
                </div>
                <span className="text-xl font-bold">FutureSu.me</span>
              </div>
              <p className="text-gray-300 mb-4 max-w-md">
                Empowering Gen Z and Millennials to author their unique career futures through strategic skill-mapping and opportunity creation.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">How it Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Skill Analysis</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Market Intelligence</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Learn</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Skill-Authoring Bootcamp</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Resources</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
          </div>
          
          <Separator className="my-8 border-gray-600" />
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © 2024 FutureSu.me. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
