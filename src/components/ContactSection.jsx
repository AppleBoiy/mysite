import { motion, AnimatePresence } from "framer-motion";
import { Mail, Linkedin, Github, Send, Loader2, CheckCircle2, XCircle, User, AtSign, MessageSquare, Copy, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useHaptic } from "@/hooks/useHaptic";

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

export default function ContactSection({ isCVRequest = false }) {
  const { t } = useTranslation();
  const { haptic } = useHaptic();
  const nameInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: isCVRequest ? t('contact.cvRequestTemplate') : "",
  });
  const [sending, setSending] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [errors, setErrors] = useState({});
  const [copiedEmail, setCopiedEmail] = useState(false);
  
  const MAX_MESSAGE_LENGTH = 500;

  // Autofocus name field when CV request
  useEffect(() => {
    if (isCVRequest && nameInputRef.current) {
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 500);
    }
  }, [isCVRequest]);

  // Copy email handler
  const handleCopyEmail = async (email) => {
    haptic.light();
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(true);
      toast.success(t('contact.emailCopied'));
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      toast.error(t('contact.emailCopyFailed'));
    }
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case 'name':
        if (value.length < 2) {
          newErrors.name = 'Name must be at least 2 characters';
        } else {
          delete newErrors.name;
        }
        break;
      case 'email':
        if (!validateEmail(value)) {
          newErrors.email = 'Please enter a valid email address';
        } else {
          delete newErrors.email;
        }
        break;
      case 'message':
        if (value.length < 10) {
          newErrors.message = 'Message must be at least 10 characters';
        } else if (value.length > MAX_MESSAGE_LENGTH) {
          newErrors.message = `Message must be less than ${MAX_MESSAGE_LENGTH} characters`;
        } else {
          delete newErrors.message;
        }
        break;
    }
    
    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Validate on change if field has been touched
    if (value.length > 0) {
      validateField(name, value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    haptic.medium();
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
          subject: isCVRequest 
            ? `CV Request from ${formData.name}` 
            : `New Contact Form Submission from ${formData.name}`,
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
              <div key={s.label} className="relative group">
                <a
                  href={s.href}
                  target={s.label === "Email" ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 bg-card border border-border rounded-2xl hover:border-accent/40 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <s.icon size={20} className="text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">{s.label}</p>
                    <p className="text-foreground font-medium">{s.value}</p>
                  </div>
                  {s.label === "Email" && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleCopyEmail(s.value);
                      }}
                      className="p-2 rounded-lg hover:bg-accent/10 transition-colors"
                      title={t('contact.copyEmail')}
                    >
                      {copiedEmail ? (
                        <Check size={18} className="text-green-500" />
                      ) : (
                        <Copy size={18} className="text-muted-foreground" />
                      )}
                    </button>
                  )}
                </a>
              </div>
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
              {isCVRequest ? t('contact.cvRequestForm') : t('contact.sendMessage')}
            </h3>
            {isCVRequest && (
              <div className="mb-4 p-4 bg-accent/10 border border-accent/20 rounded-xl">
                <p className="text-sm text-muted-foreground">
                  {t('contact.cvRequestNote')}
                </p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4" aria-label="Contact form" onKeyDown={(e) => {
              // Keyboard shortcut: Cmd/Ctrl + Enter to submit
              if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                e.preventDefault();
                if (!sending && submitStatus !== 'success' && Object.keys(errors).length === 0) {
                  handleSubmit(e);
                }
              }
            }}>
              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                <Input
                  ref={nameInputRef}
                  name="name"
                  placeholder={t('contact.yourName')}
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`bg-card border-border rounded-xl h-12 pl-11 ${errors.name ? 'border-red-500' : ''}`}
                  aria-label="Your name"
                  aria-required="true"
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1 ml-1">{errors.name}</p>
                )}
              </div>
              
              <div className="relative">
                <AtSign size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                <Input
                  name="email"
                  type="email"
                  placeholder={t('contact.yourEmail')}
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`bg-card border-border rounded-xl h-12 pl-11 ${errors.email ? 'border-red-500' : ''}`}
                  aria-label="Your email address"
                  aria-required="true"
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1 ml-1">{errors.email}</p>
                )}
              </div>
              
              <div className="relative">
                <MessageSquare size={18} className="absolute left-4 top-4 text-muted-foreground pointer-events-none" />
                <Textarea
                  name="message"
                  placeholder={t('contact.yourMessage')}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  maxLength={MAX_MESSAGE_LENGTH}
                  className={`bg-card border-border rounded-xl resize-none pl-11 ${errors.message ? 'border-red-500' : ''}`}
                  aria-label="Your message"
                  aria-required="true"
                  aria-invalid={!!errors.message}
                />
                <div className="flex items-center justify-between mt-1 px-1">
                  {errors.message ? (
                    <p className="text-xs text-red-500">{errors.message}</p>
                  ) : (
                    <p className="text-xs text-muted-foreground">{t('contact.keyboardHint')}</p>
                  )}
                  <p className={`text-xs ${
                    formData.message.length > MAX_MESSAGE_LENGTH * 0.9 
                      ? 'text-orange-500' 
                      : 'text-muted-foreground'
                  }`}>
                    {formData.message.length}/{MAX_MESSAGE_LENGTH}
                  </p>
                </div>
              </div>
              <Button
                type="submit"
                disabled={sending || submitStatus === 'success' || Object.keys(errors).length > 0}
                className={`w-full h-12 rounded-xl transition-all duration-300 ${
                  submitStatus === 'success' 
                    ? 'bg-green-500 hover:bg-green-500' 
                    : submitStatus === 'error'
                    ? 'bg-red-500 hover:bg-red-500'
                    : 'bg-primary hover:opacity-90'
                } text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed`}
                aria-live="polite"
                aria-busy={sending}
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