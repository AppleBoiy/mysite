'use client';

import { motion, AnimatePresence } from "framer-motion";
import { Mail, Linkedin, Github, Send, Loader2, CheckCircle2, XCircle, User, AtSign, MessageSquare, Copy, Check } from "lucide-react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { sanitizeInput } from "@/lib/security/sanitize";
import { env } from "@/lib/env";

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
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copiedEmail, setCopiedEmail] = useState(false);
  
  const MAX_MESSAGE_LENGTH = 500;

  const handleCopyEmail = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(true);
      toast.success(t('contact.emailCopied'));
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      toast.error(t('contact.emailCopyFailed'));
    }
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateField = (name: string, value: string) => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (value.length > 0) {
      validateField(name, value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSubmitStatus(null);

    // Sanitize all inputs before sending
    const sanitizedData = {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      message: sanitizeInput(formData.message),
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
          name: sanitizedData.name,
          email: sanitizedData.email,
          message: sanitizedData.message,
          subject: `Contact Form: ${sanitizedData.name}`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        toast.success(t('contact.messageSent'), {
          icon: <CheckCircle2 className="text-green-500" />,
        });
        setFormData({ name: "", email: "", message: "" });
        
        setTimeout(() => setSubmitStatus(null), 8000);
      } else {
        throw new Error(result.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setSubmitStatus('error');
      toast.error(t('contact.messageFailed'), {
        icon: <XCircle className="text-red-500" />,
      });
      
      setTimeout(() => setSubmitStatus(null), 3000);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="flex-1 flex items-center py-12 lg:py-16">
      <div className="max-w-6xl mx-auto px-6 w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t('contactPage.hero.title')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('contactPage.hero.description')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Social links - Larger, more prominent */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h2 className="font-serif text-xl font-semibold text-foreground mb-6">
              {t('contact.findMeOnline')}
            </h2>
            {socials.map((s, idx) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <a
                  href={s.href}
                  target={s.label === "Email" ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-6 bg-card border-2 border-border rounded-2xl hover:border-accent hover:bg-accent/5 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 group-hover:scale-110 transition-all">
                    <s.icon size={28} className="text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-muted-foreground mb-0.5">{s.label}</p>
                    <p className="text-foreground font-medium truncate">{s.value}</p>
                  </div>
                  {s.label === "Email" && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleCopyEmail(s.value);
                      }}
                      className="p-2.5 rounded-lg hover:bg-accent/10 transition-colors shrink-0"
                      title={t('contact.copyEmail')}
                    >
                      {copiedEmail ? (
                        <Check size={20} className="text-green-500" />
                      ) : (
                        <Copy size={20} className="text-muted-foreground" />
                      )}
                    </button>
                  )}
                </a>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact form - Streamlined */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="font-serif text-xl font-semibold text-foreground mb-6">
              {t('contact.sendMessage')}
            </h2>
            
            {/* Success state */}
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-6 bg-green-50 dark:bg-green-950/20 border-2 border-green-200 dark:border-green-800 rounded-2xl"
              >
                <div className="flex items-start gap-3 mb-4">
                  <CheckCircle2 size={24} className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-green-900 dark:text-green-100 mb-1">
                      {t('contact.successState.title')}
                    </h3>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      {t('contact.successState.description')}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4" onKeyDown={(e) => {
              if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                e.preventDefault();
                if (!sending && submitStatus !== 'success' && Object.keys(errors).length === 0) {
                  handleSubmit(e);
                }
              }
            }}>
              <div className="relative">
                <User size={18} className="absolute left-4 top-3.5 text-muted-foreground pointer-events-none" />
                <Input
                  ref={nameInputRef}
                  name="name"
                  placeholder={t('contact.yourName')}
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`bg-card border-border rounded-xl h-12 pl-11 ${errors.name ? 'border-red-500' : ''}`}
                />
                <div className="h-5 mt-1">
                  {errors.name && (
                    <p className="text-xs text-red-500 ml-1">{errors.name}</p>
                  )}
                </div>
              </div>
              
              <div className="relative">
                <AtSign size={18} className="absolute left-4 top-3.5 text-muted-foreground pointer-events-none" />
                <Input
                  name="email"
                  type="email"
                  placeholder={t('contact.yourEmail')}
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`bg-card border-border rounded-xl h-12 pl-11 ${errors.email ? 'border-red-500' : ''}`}
                />
                <div className="h-5 mt-1">
                  {errors.email && (
                    <p className="text-xs text-red-500 ml-1">{errors.email}</p>
                  )}
                </div>
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
