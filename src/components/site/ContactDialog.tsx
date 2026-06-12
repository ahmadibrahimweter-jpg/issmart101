import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Send, Loader2, CheckCircle2, ArrowRight } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  subject: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

type FormState = z.infer<typeof schema>;

const empty: FormState = { name: "", email: "", phone: "", subject: "", message: "" };

export function ContactDialog() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(empty);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  // Open on any link to #contact, or on a custom `open-contact` event
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest("a");
      if (!target) return;
      const href = target.getAttribute("href") || "";
      if (href === "#contact" || href.endsWith("/#contact")) {
        e.preventDefault();
        setOpen(true);
      }
    };
    const onCustom = () => setOpen(true);
    document.addEventListener("click", onClick);
    window.addEventListener("open-contact", onCustom);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("open-contact", onCustom);
    };
  }, []);

  // Lock scroll when open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  const close = () => {
    setOpen(false);
    setTimeout(() => {
      setDone(false);
      setForm(empty);
    }, 400);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("contact_submissions").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      subject: parsed.data.subject || null,
      message: parsed.data.message,
    });
    setSubmitting(false);
    if (error) {
      toast.error("Something went wrong. Please try again.");
      return;
    }
    setDone(true);
    toast.success("Message received. We'll be in touch soon.");
  };

  const field = (k: keyof FormState) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--navy-deep)]/80 px-4 py-8 backdrop-blur-xl"
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[oklch(0.18_0.04_260)] to-[oklch(0.10_0.03_260)] shadow-luxury"
          >
            {/* gold glow */}
            <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[120%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,oklch(0.82_0.14_82/0.25),transparent_70%)]" />

            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-5 top-5 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              <X className="size-4" />
            </button>

            <div className="relative px-7 pt-10 pb-8 sm:px-12 sm:pt-12">
              {done ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col items-center py-10 text-center text-white"
                >
                  <div className="mb-6 grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-[var(--gold)] to-[oklch(0.7_0.13_75)] shadow-gold">
                    <CheckCircle2 className="size-8 text-[var(--navy-deep)]" />
                  </div>
                  <h3 className="font-display text-3xl italic text-gradient-gold">Message received</h3>
                  <p className="mt-3 max-w-sm text-sm text-white/60">
                    Thank you for reaching out. Our team will contact you within 24 hours.
                  </p>
                  <button
                    onClick={close}
                    className="mt-8 rounded-full border border-white/15 px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-white/80 transition hover:bg-white/5"
                  >
                    Close
                  </button>
                </motion.div>
              ) : (
                <>
                  <div className="mb-1 text-[10px] uppercase tracking-[0.3em] text-[var(--gold)]">
                    Get in touch
                  </div>
                  <h2 className="font-display text-[clamp(1.9rem,4vw,2.75rem)] leading-[1.05] tracking-tight text-white">
                    Let's build the <span className="italic text-gradient-gold">future</span> together
                  </h2>
                  <p className="mt-3 text-sm text-white/55">
                    Share a few details and our team will reach out within 24 hours.
                  </p>

                  <form onSubmit={onSubmit} className="mt-7 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Name" value={form.name} onChange={field("name")} required />
                      <Field label="Email" type="email" value={form.email} onChange={field("email")} required />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Phone" type="tel" value={form.phone ?? ""} onChange={field("phone")} />
                      <Field label="Subject" value={form.subject ?? ""} onChange={field("subject")} />
                    </div>
                    <Field
                      label="Message"
                      value={form.message}
                      onChange={field("message")}
                      textarea
                      required
                    />

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <p className="text-[11px] text-white/40">
                        By submitting you agree to be contacted regarding your enquiry.
                      </p>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-[var(--gold)] to-[oklch(0.7_0.13_75)] px-7 py-3 text-sm font-semibold text-[var(--navy-deep)] shadow-gold transition-transform duration-500 ease-luxury hover:-translate-y-0.5 disabled:opacity-60"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="size-4 animate-spin" />
                            Sending…
                          </>
                        ) : (
                          <>
                            Send Message
                            <ArrowRight className="size-4 transition-transform duration-500 ease-luxury group-hover:translate-x-1" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  const base =
    "peer w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 pt-5 pb-2 text-sm text-white placeholder-transparent transition focus:border-[var(--gold)]/60 focus:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/20";
  return (
    <label className="relative block">
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          placeholder={label}
          rows={4}
          className={`${base} resize-none`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          placeholder={label}
          className={base}
        />
      )}
      <span className="pointer-events-none absolute left-4 top-2 text-[10px] uppercase tracking-[0.2em] text-white/50">
        {label}
        {required ? " *" : ""}
      </span>
    </label>
  );
}
