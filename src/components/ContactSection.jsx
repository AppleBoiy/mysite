import { motion, AnimatePresence } from "framer-motion";
import { Mail, Linkedin, Github, Send, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const socials = [
  {
    icon: Mail,
    label: "Email",
    value: "contact@chaipat.cc",
    href: "mailto:contact@chaipat.cc",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/chaipat-jainan",
    href: "https://www.linkedin.com/in/chaipat-jainan",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/AppleBoiy",
    href: "https://github.com/AppleBoiy",
  },
];

export default function ContactSection() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setSubmitStatus(null);

    try {
      // Using Web3Forms API (free service)
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `New Contact Form Submission from ${formData.name}`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        toast.success(t('contact.messageSent'), {
          icon: <CheckCircle2 className="text-green-500" />,
        });
        setFormData({ name: "", email: "", message: "" });
        
        // Reset success state after 3 seconds
        setTimeout(() => setSubmitStatus(null), 3000);
      } else {
        throw new Error(result.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setSubmitStatus('error');
      toast.error(t('contact.messageFailed'), {
        icon: <XCircle className="text-red-500" />,
      });
      
      // Reset error state after 3 seconds
      setTimeout(() => setSubmitStatus(null), 3000);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-10 bg-accent" />
            <span className="text-sm tracking-[0.2em] uppercase text-accent font-medium">
              {t('contact.title')}
            </span>
            <div className="h-px w-10 bg-accent" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground">
            {t('contact.heading')} <span className="italic">{t('contact.headingItalic')}</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-md mx-auto">
            {t('contact.description')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h3 className="font-serif text-xl font-semibold text-foreground mb-6">
              {t('contact.findMeOnline')}
            </h3>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 bg-card border border-border rounded-2xl hover:border-accent/40 hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <s.icon size={20} className="text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                  <p className="text-foreground font-medium">{s.value}</p>
                </div>
              </a>
            ))}
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="font-serif text-xl font-semibold text-foreground mb-6">
              {t('contact.sendMessage')}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder={t('contact.yourName')}
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="bg-card border-border rounded-xl h-12"
              />
              <Input
                type="email"
                placeholder={t('contact.yourEmail')}
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="bg-card border-border rounded-xl h-12"
              />
              <Textarea
                placeholder={t('contact.yourMessage')}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
                rows={5}
                className="bg-card border-border rounded-xl resize-none"
              />
              <Button
                type="submit"
                disabled={sending || submitStatus === 'success'}
                className={`w-full h-12 rounded-xl transition-all duration-300 ${
                  submitStatus === 'success' 
                    ? 'bg-green-500 hover:bg-green-500' 
                    : submitStatus === 'error'
                    ? 'bg-red-500 hover:bg-red-500'
                    : 'bg-primary hover:opacity-90'
                } text-primary-foreground`}
              >
                <AnimatePresence mode="wait">
                  {sending ? (
                    <motion.span
                      key="sending"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2"
                    >
                      <Loader2 size={16} className="animate-spin" />
                      {t('contact.sending')}
                    </motion.span>
                  ) : submitStatus === 'success' ? (
                    <motion.span
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle2 size={16} />
                      {t('contact.messageSent')}
                    </motion.span>
                  ) : submitStatus === 'error' ? (
                    <motion.span
                      key="error"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-2"
                    >
                      <XCircle size={16} />
                      {t('contact.messageFailed')}
                    </motion.span>
                  ) : (
                    <motion.span
                      key="default"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2"
                    >
                      <Send size={16} />
                      {t('contact.sendMessageBtn')}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}