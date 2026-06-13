import { Zap, AlertTriangle } from "lucide-react";

const RateLimitedUI = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
      {/* Container: Glass effect border, soft gradient background, and explicit border pairing */}
      <div className="relative overflow-hidden bg-gradient-to-br from-error/5 to-warning/5 border border-error/20 rounded-xl shadow-lg shadow-error/5">
        
        {/* Subtle decorative background accent blur */}
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-error/10 rounded-full blur-xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center gap-6 p-6 sm:p-8">
          
          {/* Animated Icon Ring */}
          <div className="flex-shrink-0 relative">
            <div className="absolute inset-0 bg-error/20 rounded-full animate-ping opacity-25 duration-1000" />
            <div className="relative bg-error/10 text-error p-4 rounded-full border border-error/20 flex items-center justify-center">
              <Zap className="w-8 h-8 fill-current" />
            </div>
          </div>

          {/* Typography block with standard semantic text-base scaling */}
          <div className="flex-1 text-center md:text-left space-y-1.5">
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-2">
              <h3 className="text-xl font-extrabold tracking-tight text-base-content">
                Rate Limit Exceeded
              </h3>
              <span className="badge badge-error badge-sm gap-1 font-semibold text-white">
                <AlertTriangle size={10} /> 429 Error
              </span>
            </div>
            
            <p className="text-base-content/80 text-base max-w-2xl leading-relaxed">
              You are executing actions faster than our firewall rules allow. Your current activity stream has been briefly queued to prevent service disruption.
            </p>
            
            <p className="text-xs font-semibold tracking-wide uppercase text-base-content/40 pt-1">
              Connection will automatically clear in a few seconds.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RateLimitedUI;
