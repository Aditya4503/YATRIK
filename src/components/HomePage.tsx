import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Heart, Clock, Users, Navigation } from "lucide-react";
import kalaramHero from "@/assets/kalaram-hero.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

interface HomePageProps {
  onNavigateToMap: () => void;
  onNavigateToLocation: () => void;
}

const HomePage = ({ onNavigateToMap, onNavigateToLocation }: HomePageProps) => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden">
        <img
          src={kalaramHero}
          alt="Kalaram Mandir"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="text-center text-white max-w-md space-y-6">
            <div className="space-y-2">
              <h1 className="font-playfair text-4xl font-bold animate-float">
                {t('templeName')}
              </h1>
              <p className="text-lg opacity-90">{t('cityName')}</p>
              <div className="text-sm opacity-80">
                {t('mainMantra')}
              </div>
            </div>
            
            <p className="text-base leading-relaxed opacity-90">
              {t('welcomeText')}
            </p>
            
            <Button
              onClick={onNavigateToMap}
              variant="devotional"
              size="lg"
              className="animate-glow font-playfair text-lg px-8 py-4"
            >
              <MapPin className="h-5 w-5 mr-2" />
              {t('startJourney')}
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="p-6 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="font-playfair text-2xl font-bold text-foreground">
            {t('spiritualJourney')}
          </h2>
          <p className="text-muted-foreground">
            {t('experienceStories')}
          </p>
        </div>

        <div className="grid gap-4">
          <Card className="p-6 shadow-temple hover:shadow-sacred transition-shadow duration-300">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">{t('interactiveMap')}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t('mapDescription')}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-temple hover:shadow-sacred transition-shadow duration-300">
            <div className="flex items-start gap-4">
              <div className="bg-secondary/10 p-3 rounded-full">
                <Heart className="h-6 w-6 text-secondary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">{t('sacredStories')}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t('storiesDescription')}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-temple hover:shadow-sacred transition-shadow duration-300">
            <div className="flex items-start gap-4">
              <div className="bg-accent/50 p-3 rounded-full">
                <Clock className="h-6 w-6 text-accent-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">{t('learnAtPace')}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t('paceDescription')}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-temple hover:shadow-sacred transition-shadow duration-300 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <div className="flex items-start gap-4">
              <div className="bg-primary/20 p-3 rounded-full">
                <Navigation className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">🎮 Temple Quest Mode</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Experience real-time location tracking and conquer temple checkpoints as you visit them physically. Gamified temple exploration!
                </p>
                <Button
                  onClick={onNavigateToLocation}
                  variant="outline" 
                  size="sm"
                  className="mt-3"
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  Start Quest Mode
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <div className="text-center space-y-4 pt-6">
          <div className="bg-accent/20 p-4 rounded-lg border border-accent/30">
            <p className="text-sm text-accent-foreground leading-relaxed">
              "{t('experienceQuote')}"
            </p>
          </div>
          
          <Button
            onClick={onNavigateToMap}
            variant="temple"
            size="lg"
            className="w-full font-medium"
          >
            <Users className="h-5 w-5 mr-2" />
            {t('startTempleVisit')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;