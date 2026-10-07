import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, Loader2 } from "lucide-react";
import { siteData } from "@/data/siteData";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

interface Fields {
  name: string;
  contact: string;
  message: string;
}

type FieldName = keyof Fields;

const LABELS: Record<FieldName, string> = {
  name: "Имя",
  contact: "Контакт для связи",
  message: "Сообщение",
};

const PLACEHOLDERS: Record<FieldName, string> = {
  name: "Как к вам обращаться",
  contact: "Телефон, e-mail или мессенджер",
  message: "Расскажите о задаче: длина волос, желаемый результат…",
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function validate(values: Fields): Partial<Record<FieldName, string>> {
  const errors: Partial<Record<FieldName, string>> = {};

  if (values.name.trim().length < 2) {
    errors.name = "Пожалуйста, укажите имя (минимум 2 символа).";
  }

  const contact = values.contact.trim();
  if (contact.length < 5) {
    errors.contact = "Оставьте контакт, чтобы я могла вам ответить.";
  } else {
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(contact);
    const isPhone = /^[+()\d\s\-]{6,}$/.test(contact);
    const isMessenger = /^@?[a-zA-Z0-9_]{4,}$/.test(contact);
    if (!isEmail && !isPhone && !isMessenger) {
      errors.contact = "Похоже, это не похоже на телефон, e-mail или ник.";
    }
  }

  if (values.message.trim().length < 5) {
    errors.message = "Напишите хотя бы пару слов о вашем запросе.";
  }

  return errors;
}

/**
 * Contact form with client-side validation.
 *
 * Sends JSON to /api/contact (serverless function, see `api/contact.ts`).
 * In development the request is simulated so the UI can be tested without
 * an API key. Configure CONTACT_EMAIL + RESEND_API_KEY in `.env`.
 */
export default function ContactForm() {
  const [values, setValues] = useState<Fields>({ name: "", contact: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [status, setStatus] = useState<Status>("idle");

  const update = (field: FieldName, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    const found = validate(values);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      const firstField = Object.keys(found)[0] as FieldName;
      document.getElementById(`contact-${firstField}`)?.focus();
      return;
    }

    setStatus("submitting");

    try {
      if (import.meta.env.DEV) {
        // Simulated request while developing — no API key required.
        await new Promise((resolve) => setTimeout(resolve, 900));
      } else {
        const base = import.meta.env.BASE_URL.replace(/\/$/, "");
        const response = await fetch(`${base}/api/contact`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      }
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const reset = () => {
    setValues({ name: "", contact: "", message: "" });
    setErrors({});
    setStatus("idle");
  };

  const fields: Array<{ id: FieldName; type: "input" | "textarea" }> = [
    { id: "name", type: "input" },
    { id: "contact", type: "input" },
    { id: "message", type: "textarea" },
  ];

  return (
    <div className="relative">
      {status === "success" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          role="status"
          aria-live="polite"
          className="flex min-h-[420px] flex-col items-start justify-center border border-line bg-surface p-8 md:p-12"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-dark text-white">
            <Check className="h-6 w-6" aria-hidden="true" />
          </span>
          <h3 className="display-md mt-8 max-w-md text-primary">
            {siteData.contact.successMessage}
          </h3>
          <button
            type="button"
            onClick={reset}
            className="mt-8 border-b border-primary/30 pb-1 text-[13px] font-medium tracking-[0.04em] text-primary transition-colors duration-300 hover:border-accent hover:text-accent"
          >
            Отправить ещё одно сообщение
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          noValidate
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="border border-line bg-surface p-6 md:p-10"
        >
            <div className="space-y-6">
              {fields.map(({ id, type }) => {
                const error = errors[id];
                const describedBy = error ? `contact-${id}-error` : undefined;

                return (
                  <div key={id}>
                    <label
                      htmlFor={`contact-${id}`}
                      className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-secondary"
                    >
                      {LABELS[id]} <span className="text-accent">*</span>
                    </label>

                    {type === "textarea" ? (
                      <textarea
                        id={`contact-${id}`}
                        name={id}
                        rows={5}
                        required
                        value={values[id]}
                        onChange={(event) => update(id, event.target.value)}
                        placeholder={PLACEHOLDERS[id]}
                        aria-invalid={error ? "true" : "false"}
                        aria-describedby={describedBy}
                        className="field resize-none"
                      />
                    ) : (
                      <input
                        id={`contact-${id}`}
                        name={id}
                        type={id === "contact" ? "text" : "text"}
                        autoComplete={
                          id === "name" ? "name" : id === "contact" ? "email" : "off"
                        }
                        required
                        value={values[id]}
                        onChange={(event) => update(id, event.target.value)}
                        placeholder={PLACEHOLDERS[id]}
                        aria-invalid={error ? "true" : "false"}
                        aria-describedby={describedBy}
                        className="field"
                      />
                    )}

                    {error && (
                      <p
                        id={`contact-${id}-error`}
                        role="alert"
                        className="mt-2 text-[12.5px] text-danger"
                      >
                        {error}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {status === "error" && (
              <p role="alert" className="mt-5 border-l-2 border-danger bg-danger/5 px-4 py-3 text-[13px] text-danger">
                {siteData.contact.errorMessage}
              </p>
            )}

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={status === "submitting"}
                className={cn(
                  "group inline-flex items-center justify-center gap-3 rounded-full bg-dark px-8 py-4 text-[13px] font-medium tracking-[0.06em] text-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-accent disabled:cursor-not-allowed disabled:opacity-70",
                )}
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Отправляю…
                  </>
                ) : (
                  <>
                    Отправить
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1.5"
                    />
                  </>
                )}
              </button>

              <p className="text-[12px] leading-relaxed text-secondary">
                Все поля обязательны. Отправляя форму, вы соглашаетесь
                <br className="hidden sm:block" /> на обработку данных для связи.
              </p>
            </div>
          </motion.form>
        )}
    </div>
  );
}
