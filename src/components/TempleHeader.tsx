import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";

interface TempleHeaderProps {
  title: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

const TempleHeader = ({ title, showBackButton = false, onBack }: TempleHeaderProps) => {
  const { t } = useLanguage();

  return (
    <header className="gradient-saffron text-white p-4 shadow-sacred">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBackButton && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-white hover:bg-white/20 p-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <div>
            <h1 className="font-playfair text-xl font-bold">{title}</h1>
            <p className="text-sm opacity-90">{t('sacredMantra')}</p>
          </div>
        </div>
        
        <LanguageSelector />
      </div>
    </header>
  );
};

export default TempleHeader;