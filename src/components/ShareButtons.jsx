import { useState } from "react";
import { Share2, Twitter, Linkedin, Link as LinkIcon, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { toast } from "@/components/ui/use-toast";

export default function ShareButtons({ title, description, url }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { t } = useTranslation();

  const shareUrl = url || window.location.href;
  const shareTitle = title || document.title;
  const shareText = description || "";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast({
        title: t('share.linkCopied'),
        description: t('share.linkCopiedDesc'),
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: t('share.error'),
        description: t('share.errorDesc'),
        variant: "destructive",
      });
    }
  };

  const hashtags = "tech,coding,javascript";
  const shareLinks = [
    {
      name: "X",
      icon: Twitter,
      url: `https://x.com/intent/post?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}&hashtags=${encodeURIComponent(hashtags)}`,
      color: "hover:bg-black/10 hover:text-black dark:hover:bg-white/10 dark:hover:text-white",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      color: "hover:bg-[#0A66C2]/10 hover:text-[#0A66C2]",
    },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 text-sm bg-muted hover:bg-muted/80 text-foreground rounded-lg transition-colors"
        aria-label={t('share.share')}
      >
        <Share2 size={16} />
        <span>{t('share.share')}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 right-0 bg-card border border-border rounded-xl shadow-lg p-2 z-50 min-w-[200px]"
          >
            <div className="space-y-1">
              {shareLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${link.color}`}
                >
                  <link.icon size={18} />
                  <span className="text-sm">{link.name}</span>
                </a>
              ))}
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
              >
                {copied ? (
                  <Check size={18} className="text-green-500" />
                ) : (
                  <LinkIcon size={18} />
                )}
                <span className="text-sm">
                  {copied ? t('share.copied') : t('share.copyLink')}
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
