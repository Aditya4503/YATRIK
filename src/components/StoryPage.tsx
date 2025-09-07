import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin } from "lucide-react";
import ramaCarving from "@/assets/rama-carving.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

// Story data for each checkpoint
const stories = {
  "main-entrance": {
    title: "मुख्य प्रवेश द्वार",
    subtitle: "पवित्रता का प्रवेश बिंदु",
    content: "कालाराम मंदिर का मुख्य प्रवेश द्वार 1794 में निर्मित हुआ था। यह द्वार भक्तों का स्वागत करता है और उन्हें पवित्र भूमि में प्रवेश की अनुमति देता है। यहाँ से शुरू होती है आपकी आध्यात्मिक यात्रा।",
    image: ramaCarving,
    significance: "यह द्वार दिव्यता और मानवता के बीच का सेतु है।"
  },
  "sanctum": {
    title: "गर्भगृह",
    subtitle: "भगवान राम का पवित्र निवास",
    content: "मंदिर का हृदय, जहाँ भगवान राम की काले पत्थर की मूर्ति विराजमान है। यह मूर्ति अपनी दिव्यता और शांति के लिए प्रसिद्ध है। भक्त यहाँ आकर अपनी मनोकामनाओं की पूर्ति के लिए प्रार्थना करते हैं।",
    image: ramaCarving,
    significance: "यहाँ की शांति और पवित्रता आपके मन को शुद्ध करती है।"
  },
  "assembly-hall": {
    title: "सभा मंडप",
    subtitle: "भक्तों का सम्मेलन स्थल",
    content: "इस विशाल सभा मंडप में हजारों भक्त एक साथ बैठकर भजन-कीर्तन और धार्मिक प्रवचन सुन सकते हैं। यहाँ की ध्वनिक व्यवस्था इतनी उत्कृष्ट है कि सबसे पीछे बैठा व्यक्ति भी स्पष्ट रूप से सुन सकता है।",
    image: ramaCarving,
    significance: "यहाँ सामुदायिक भक्ति की भावना का अनुभव होता है।"
  },
  "ancient-inscription": {
    title: "प्राचीन शिलालेख",
    subtitle: "इतिहास के साक्षी",
    content: "ये प्राचीन शिलालेख मंदिर के निर्माण और इसके इतिहास की कहानी कहते हैं। इन पर संस्कृत और मराठी में मंदिर के दाताओं और निर्माताओं के नाम उत्कीर्ण हैं।",
    image: ramaCarving,
    significance: "ये शिलालेख हमारी सांस्कृतिक विरासत के संरक्षक हैं।"
  },
  "east-gate": {
    title: "पूर्व द्वार",
    subtitle: "सूर्योदय का स्वागत",
    content: "पूर्व दिशा में स्थित यह द्वार सूर्योदय के समय सबसे पहले सूर्य की किरणों का स्वागत करता है। भक्त यहाँ प्रातःकाल आकर सूर्य देव की आराधना करते हैं।",
    image: ramaCarving,
    significance: "यहाँ नई शुरुआत और आशा का संदेश मिलता है।"
  },
  "dharamshala": {
    title: "धर्मशाला",
    subtitle: "तीर्थयात्रियों का आश्रय",
    content: "दूर से आने वाले तीर्थयात्रियों के लिए निर्मित यह धर्मशाला निःशुल्क आवास प्रदान करती है। यहाँ 'अतिथि देवो भव:' की परंपरा का पालन होता है।",
    image: ramaCarving,
    significance: "यहाँ सेवा और दान की भावना साकार होती है।"
  },
  "yagnashala": {
    title: "यज्ञशाला",
    subtitle: "पवित्र अग्नि का स्थान",
    content: "यहाँ नियमित रूप से यज्ञ और हवन किए जाते हैं। पवित्र अग्नि की लपटें भक्तों की मनोकामनाओं को स्वर्ग तक पहुँचाती हैं।",
    image: ramaCarving,
    significance: "अग्नि देव यहाँ सभी की प्रार्थनाओं को स्वीकार करते हैं।"
  },
  "west-courtyard": {
    title: "पश्चिम प्रांगण",
    subtitle: "शांति का आंगन",
    content: "यह शांत प्रांगण ध्यान और मनन के लिए उपयुक्त है। यहाँ बैठकर भक्त अपने मन को शांत करते हैं और आध्यात्मिक चिंतन करते हैं।",
    image: ramaCarving,
    significance: "यहाँ मन की शांति और आंतरिक स्थिरता प्राप्त होती है।"
  },
  "tulsi-garden": {
    title: "तुलसी वृंदावन",
    subtitle: "पवित्र तुलसी का उद्यान",
    content: "तुलसी के पवित्र पौधों से भरा यह उद्यान विशेष पूजा स्थल है। तुलसी को भगवान विष्णु की प्रिय माना जाता है और इसकी पत्तियाँ प्रसाद में शामिल की जाती हैं।",
    image: ramaCarving,
    significance: "तुलसी की सुगंध और पवित्रता यहाँ का वातावरण दिव्य बनाती है।"
  },
  "sacred-pond": {
    title: "पवित्र कुंड",
    subtitle: "स्वच्छता और शुद्धता",
    content: "यह प्राचीन जल कुंड भक्तों के मानसिक और आध्यात्मिक शुद्धीकरण के लिए है। पवित्र जल से स्नान करने के बाद भक्त मंदिर में प्रवेश करते हैं।",
    image: ramaCarving,
    significance: "पवित्र जल आपके पापों को धोकर मन को निर्मल बनाता है।"
  }
};

interface StoryPageProps {
  storyId: string;
  onBackToMap: () => void;
}

const StoryPage = ({ storyId, onBackToMap }: StoryPageProps) => {
  const { t } = useLanguage();
  const story = stories[storyId as keyof typeof stories];

  if (!story) {
    return (
      <div className="p-4">
        <Card className="p-6 text-center">
          <h2 className="font-playfair text-xl mb-4">{t('storyNotFound')}</h2>
          <Button onClick={onBackToMap} variant="default">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('backToMap')}
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <Card className="overflow-hidden shadow-temple">
        <div className="relative h-48 overflow-hidden">
          <img
            src={story.image}
            alt={story.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 gradient-saffron opacity-20"></div>
          <div className="absolute bottom-4 left-4 text-white">
            <h1 className="font-playfair text-2xl font-bold mb-1">{story.title}</h1>
            <p className="text-sm opacity-90">{story.subtitle}</p>
          </div>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="prose prose-sm max-w-none">
            <p className="text-foreground leading-relaxed text-base">
              {story.content}
            </p>
          </div>
          
          <div className="bg-accent/50 p-4 rounded-lg border-l-4 border-primary">
            <h3 className="font-semibold text-accent-foreground mb-2 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {t('significance')}
            </h3>
            <p className="text-accent-foreground text-sm">
              {story.significance}
            </p>
          </div>
          
          <Button 
            onClick={onBackToMap} 
            variant="default"
            className="w-full shadow-sacred"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('backToMap')}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default StoryPage;