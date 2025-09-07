import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import HomePage from "@/components/HomePage";
import TempleMap from "@/components/TempleMap";
import StoryPage from "@/components/StoryPage";
import TempleHeader from "@/components/TempleHeader";
import LocationTracker from "@/components/LocationTracker";
import { useLanguage } from "@/contexts/LanguageContext";

type ViewMode = "home" | "map" | "story" | "location";

const Index = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("home");
  const [currentStory, setCurrentStory] = useState<string>("");
  const [searchParams] = useSearchParams();
  const { t } = useLanguage();

  // Handle QR code scanning - check for story parameter in URL
  useEffect(() => {
    const storyParam = searchParams.get("story");
    if (storyParam) {
      setCurrentStory(storyParam);
      setViewMode("story");
    }
  }, [searchParams]);

  const handleNavigateToMap = () => {
    setViewMode("map");
  };

  const handleCheckpointClick = (storyId: string) => {
    setCurrentStory(storyId);
    setViewMode("story");
  };

  const handleBackToMap = () => {
    setViewMode("map");
  };

  const handleBackToHome = () => {
    setViewMode("home");
  };

  const handleNavigateToLocation = () => {
    setViewMode("location");
  };

  const getHeaderTitle = () => {
    switch (viewMode) {
      case "home":
        return t('templeTitle');
      case "map":
        return t('templeVisit');
      case "story":
        return t('sacredStory');
      case "location":
        return "Temple Quest";
      default:
        return t('templeTitle');
    }
  };

  const getShowBackButton = () => {
    return viewMode !== "home";
  };

  const getBackHandler = () => {
    if (viewMode === "map") return handleBackToHome;
    if (viewMode === "story") return handleBackToMap;
    if (viewMode === "location") return handleBackToHome;
    return undefined;
  };

  return (
    <div className="min-h-screen bg-background">
      <TempleHeader
        title={getHeaderTitle()}
        showBackButton={getShowBackButton()}
        onBack={getBackHandler()}
      />
      
      {viewMode === "home" && (
        <HomePage 
          onNavigateToMap={handleNavigateToMap}
          onNavigateToLocation={handleNavigateToLocation}
        />
      )}
      
      {viewMode === "map" && (
        <TempleMap onCheckpointClick={handleCheckpointClick} />
      )}
      
      {viewMode === "location" && (
        <LocationTracker onCheckpointConquered={handleCheckpointClick} />
      )}
      
      {viewMode === "story" && (
        <StoryPage storyId={currentStory} onBackToMap={handleBackToMap} />
      )}
    </div>
  );
};

export default Index;
