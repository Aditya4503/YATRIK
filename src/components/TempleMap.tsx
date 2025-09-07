import { MapPin, QrCode } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import templeMapImage from "@/assets/temple-map.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

// Temple checkpoints data - using translation keys
const getCheckpoints = (t: (key: string) => string) => [
  { id: 1, name: t('mainEntrance'), x: 50, y: 85, story: "main-entrance" },
  { id: 2, name: t('sanctum'), x: 50, y: 45, story: "sanctum" },
  { id: 3, name: t('assemblyHall'), x: 40, y: 60, story: "assembly-hall" },
  { id: 4, name: t('ancientInscription'), x: 70, y: 30, story: "ancient-inscription" },
  { id: 5, name: t('eastGate'), x: 85, y: 50, story: "east-gate" },
  { id: 6, name: t('dharamshala'), x: 20, y: 70, story: "dharamshala" },
  { id: 7, name: t('yagnashala'), x: 30, y: 25, story: "yagnashala" },
  { id: 8, name: t('westCourtyard'), x: 15, y: 45, story: "west-courtyard" },
  { id: 9, name: t('tulsiGarden'), x: 75, y: 70, story: "tulsi-garden" },
  { id: 10, name: t('sacredPond'), x: 60, y: 15, story: "sacred-pond" },
];

interface TempleMapProps {
  onCheckpointClick: (storyId: string) => void;
}

const TempleMap = ({ onCheckpointClick }: TempleMapProps) => {
  const { t } = useLanguage();
  const checkpoints = getCheckpoints(t);
  return (
    <div className="p-4">
      <Card className="relative overflow-hidden shadow-temple animate-float">
        <div className="relative">
          <img
            src={templeMapImage}
            alt="Kalaram Mandir Temple Map"
            className="w-full h-auto rounded-lg"
          />
          
          {/* Checkpoints overlay */}
          {checkpoints.map((checkpoint) => (
            <button
              key={checkpoint.id}
              onClick={() => onCheckpointClick(checkpoint.story)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-glow"
              style={{
                left: `${checkpoint.x}%`,
                top: `${checkpoint.y}%`,
              }}
            >
              <div className="bg-primary text-primary-foreground rounded-full p-2 shadow-lg hover:scale-110 transition-transform duration-200">
                <MapPin className="h-4 w-4" />
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-card text-card-foreground px-2 py-1 rounded text-xs font-medium shadow-md whitespace-nowrap">
                {checkpoint.name}
              </div>
            </button>
          ))}
        </div>
        
        <div className="p-4 bg-gradient-to-r from-background to-muted">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <QrCode className="h-4 w-4" />
            <span className="text-sm">{t('scanQR')}</span>
          </div>
          <p className="text-sm text-foreground">
            {t('mapInstructions')}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default TempleMap;