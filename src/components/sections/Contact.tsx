import { useState } from 'react';
import { Section, SectionHeader, Button, Docket, AnimatedSection } from '../common';
import { submitToSolar } from '../../lib/solar-webhook';
import home from '../../data/home.json';
import styles from './Contact.module.css';

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function Contact() {
  const { contact: copy } = home;
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Add your name so we know who we are talking to';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'We need an email to reply to';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'That email address is missing something';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Tell us what you are trying to fix';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await submitToSolar({
        name: formData.name,
        email: formData.email,
        company: formData.company || undefined,
        phone: formData.phone || undefined,
        message: formData.message,
        formType: 'contact',
      });
      setSubmitStatus('success');
      setFormData({ name: '', email: '', company: '', phone: '', message: '' });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section id="contact" ruled>
      <SectionHeader
        eyebrow={copy.eyebrow}
        title={copy.title}
        subtitle={copy.subtitle}
      />

      <AnimatedSection>
        <div className={styles.content}>
          <Docket serial="New enquiry" stamp="Unfiled" stampTone="note">
            <form onSubmit={handleSubmit} className={styles.form} noValidate>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="name" className={styles.label}>
                    Name <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                    placeholder="Your name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && (
                    <span className={styles.error} id="name-error">
                      {errors.name}
                    </span>
                  )}
                </div>

                <div className={styles.field}>
                  <label htmlFor="email" className={styles.label}>
                    Email <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                    placeholder="you@company.ie"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <span className={styles.error} id="email-error">
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="company" className={styles.label}>
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="Optional"
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="phone" className={styles.label}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="Optional"
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="message" className={styles.label}>
                  What&rsquo;s the process? <span className={styles.required}>*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                  placeholder="What happens today, who does it, and where it falls over."
                  rows={5}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && (
                  <span className={styles.error} id="message-error">
                    {errors.message}
                  </span>
                )}
              </div>

              <div className={styles.submitRow}>
                <Button size="lg" type="submit">
                  {isSubmitting ? 'Sending…' : 'Send it over'}
                </Button>
                <span className={styles.submitNote}>We reply within one working day.</span>
              </div>

              {submitStatus === 'success' && (
                <p className={styles.success} role="status">
                  Filed. We&rsquo;ll be in touch within one working day.
                </p>
              )}
              {submitStatus === 'error' && (
                <p className={styles.errorMessage} role="alert">
                  That didn&rsquo;t send. Try again, or email info@obhsoftware.ie directly.
                </p>
              )}
            </form>
          </Docket>

          <div className={styles.side}>
            <Docket serial="Direct" stamp="Galway" stampTone="accent">
              <p className={styles.infoText}>
                Prefer to skip the form? Mail us or ring. If one of our platforms
                already does what you need, we&rsquo;ll tell you that instead of
                quoting you for a build.
              </p>
              <div className={styles.contactDetails}>
                <div className={styles.contactItem}>
                  <span className={styles.contactLabel}>Email</span>
                  <a href="mailto:info@obhsoftware.ie" className={styles.contactValue}>
                    info@obhsoftware.ie
                  </a>
                </div>
                <div className={styles.contactItem}>
                  <span className={styles.contactLabel}>Phone</span>
                  <a href="tel:+353872959063" className={styles.contactValue}>
                    +353 87 295 9063
                  </a>
                </div>
                <div className={styles.contactItem}>
                  <span className={styles.contactLabel}>Where</span>
                  <span className={styles.contactValue}>
                    University of Galway, Ireland
                  </span>
                </div>
              </div>
            </Docket>
          </div>
        </div>
      </AnimatedSection>
    </Section>
  );
}
