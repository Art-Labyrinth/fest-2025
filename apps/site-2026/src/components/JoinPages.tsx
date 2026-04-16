import React, { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { API_URL } from '../config';

const ASSET_BASE = 'https://files.art-labyrinth.org/fest2026/assets';

type VolunteerFormData = {
  name: string;
  age: string;
  social: string;
  tg: string;
  prof: string;
  conditions: string;
  experience: string;
  camping: string;
  negative: string;
  help_now: boolean;
  inspiration: string;
};

type MasterFormData = {
  name: string;
  country: string;
  tg: string;
  email: string;
  fb: string;
  previously_participated: boolean;
  program_name: string;
  description: string;
  programUrl: string;
  socialUrl: string;
  quantity: string;
  time: string;
  duration: string;
  raider: string;
  additional_info: string;
  file: File[];
};

type SubmitErrorState = {
  csrf: boolean;
  tooLarge: boolean;
  unknown: boolean;
  message: string;
};

type DepartmentId = 'admin' | 'promo' | 'art' | 'tech' | 'food';
type DirectionId = 'concert' | 'workshop' | 'lecture' | 'practice' | 'performance' | 'theatre' | 'lesson' | 'game' | 'other';
type DateId = 'd18' | 'd19' | 'd20' | 'd21';
type LangId = 'ru' | 'en' | 'md';

function getOrCreateSessionId(): string {
  let sessionId = localStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem('sessionId', sessionId);
  }
  return sessionId;
}

async function fetchCsrfToken() {
  const sessionId = getOrCreateSessionId();

  try {
    const response = await fetch(`${API_URL}/form/csrf-token`, {
      method: 'GET',
      headers: {
        'X-Session-ID': sessionId,
      },
    });

    if (!response.ok) {
      return;
    }

    const data = (await response.json()) as { csrf_token?: string };
    if (data.csrf_token) {
      localStorage.setItem('csrfToken', data.csrf_token);
    }
  } catch (error) {
    console.error('Failed to fetch CSRF token', error);
  }
}

function TextField({
  label,
  required,
  value,
  onChange,
  type = 'text',
  min,
  max,
}: {
  label: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  min?: number;
  max?: number;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-semibold text-brown">
        {label} {required ? '*' : ''}
      </span>
      <input
        type={type}
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full rounded-2xl border border-brown/20 bg-white/90 px-4 py-3 text-brown outline-none transition focus:border-customOrange"
      />
    </label>
  );
}

function TextAreaField({
  label,
  required,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-semibold text-brown">
        {label} {required ? '*' : ''}
      </span>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full rounded-2xl border border-brown/20 bg-white/90 px-4 py-3 text-brown outline-none transition focus:border-customOrange"
      />
    </label>
  );
}

function ToggleItem({
  id,
  checked,
  label,
  onChange,
}: {
  id: string;
  checked: boolean;
  label: string;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-start gap-3 rounded-xl border border-brown/15 bg-white/80 px-3 py-3">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 h-4 w-4 accent-[#F07B17]"
      />
      <span className="text-sm text-brown">{label}</span>
    </label>
  );
}

function ErrorNotice({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-2xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
      <div className="font-semibold">{title}</div>
      <div>{description}</div>
    </div>
  );
}

function JoinHeader({ title, intro, back }: { title: string; intro: string; back?: boolean }) {
  const { t } = useTranslation();

  return (
    <div className="mb-8">
      {back && (
        <Link to="/join/" className="mb-4 inline-flex text-sm text-brown/70 hover:opacity-70">
          {String(t('join.common.back'))}
        </Link>
      )}
      <h1 className="text-3xl font-roca text-brown sm:text-4xl">{title}</h1>
      <p className="mt-3 max-w-3xl text-brown/75">{intro}</p>
    </div>
  );
}

function ThanksCard() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto max-w-2xl rounded-[28px] border border-brown/15 bg-orange-150/90 px-6 py-10 text-center shadow-lg backdrop-blur-sm sm:px-10">
      <h2 className="text-3xl font-roca text-brown">{t('join.thanks.title')}</h2>
      <p className="mt-3 text-brown/75">{t('join.thanks.description')}</p>
      <Link
        to="/"
        className="mt-6 inline-flex rounded-full bg-brown px-6 py-3 text-sm font-bold text-orange-150 transition hover:opacity-85"
      >
        {String(t('join.thanks.action'))}
      </Link>
    </div>
  );
}

function SubmissionErrors({ state }: { state: SubmitErrorState }) {
  const { t } = useTranslation();

  return (
    <div className="space-y-3">
      {state.csrf && (
        <ErrorNotice
          title={String(t('join.forms.error.csrf.title'))}
          description={String(t('join.forms.error.csrf.description'))}
        />
      )}
      {state.tooLarge && (
        <ErrorNotice
          title={String(t('join.forms.error.contentTooLarge.title'))}
          description={String(t('join.forms.error.contentTooLarge.description'))}
        />
      )}
      {state.unknown && (
        <ErrorNotice
          title={String(t('join.forms.error.unknown.title'))}
          description={state.message || String(t('join.forms.error.unknown.description'))}
        />
      )}
    </div>
  );
}

function DepartmentDetails() {
  const { t } = useTranslation();

  const departmentIds: DepartmentId[] = ['admin', 'promo', 'art', 'tech', 'food'];

  const getList = (key: string): string[] => {
    const value = t(key, { returnObjects: true }) as unknown;
    return Array.isArray(value) ? value.map(String) : [];
  };

  return (
    <details className="rounded-2xl border border-brown/15 bg-white/70 px-4 py-3">
      <summary className="cursor-pointer text-sm font-semibold text-brown underline underline-offset-2">
        {String(t('join.volunteer.dept.info'))}
      </summary>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {departmentIds.map((id) => {
          const prep = getList(`join.department.${id}.preparation.items`);
          const festival = getList(`join.department.${id}.festival.items`);

          return (
            <div key={id} className="rounded-2xl border border-brown/10 bg-orange-150/60 p-4 text-sm text-brown">
              <h3 className="font-roca text-lg">{String(t(`join.department.${id}.title`))}</h3>
              <div className="mt-3">
                <div className="font-semibold">{String(t(`join.department.${id}.preparation.title`))}</div>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  {prep.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-3">
                <div className="font-semibold">{String(t(`join.department.${id}.festival.title`))}</div>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  {festival.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </details>
  );
}

export function JoinLanding() {
  const { t } = useTranslation();

  const cards = [
    {
      title: String(t('join.buttons.volunteer.text')),
      description: String(t('join.buttons.volunteer.description')),
      to: '/join/volunteer',
      image: `${ASSET_BASE}/volunteer-form-l.jpg`,
    },
    {
      title: String(t('join.buttons.master.text')),
      description: String(t('join.buttons.master.description')),
      to: '/join/master',
      image: `${ASSET_BASE}/master-form-l.jpg`,
    },
  ];

  return (
    <main className="min-h-[calc(100vh-130px)] px-5 py-8 md:px-12 md:py-12">
      <div className="mx-auto max-w-6xl space-y-8">
        <section
          className="overflow-hidden rounded-[32px] border border-brown/15 bg-cover bg-center shadow-xl"
          style={{
            backgroundImage: `linear-gradient(rgba(15, 8, 9, 0.55), rgba(15, 8, 9, 0.55)), url(${ASSET_BASE}/back-main-page-l.jpg)`,
          }}
        >
          <div className="px-6 py-12 text-orange-150 sm:px-10 md:px-12 md:py-16">
            <div className="mb-3 text-xs uppercase tracking-[0.35em] text-orange-150/80">
              {t('join.landing.badge')}
            </div>
            <h1 className="max-w-3xl text-3xl font-roca sm:text-5xl">{t('join.landing.title')}</h1>
            <p className="mt-4 max-w-2xl text-base sm:text-lg text-orange-150/90">
              {t('join.landing.description')}
            </p>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          {cards.map((card) => (
            <Link
              key={card.to}
              to={card.to}
              className="group overflow-hidden rounded-[28px] border border-brown/15 bg-orange-150/80 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              <div
                className="h-44 bg-cover bg-center"
                style={{ backgroundImage: `linear-gradient(rgba(53, 25, 4, 0.2), rgba(53, 25, 4, 0.2)), url(${card.image})` }}
              />
              <div className="p-6 text-brown">
                <h2 className="text-2xl font-roca">{card.title}</h2>
                <p className="mt-2 text-brown/75">{card.description}</p>
                <div className="mt-4 text-sm font-semibold underline underline-offset-4">
                  Open form
                </div>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}

export function JoinVolunteerForm() {
  const { t } = useTranslation();
  const [selectedDepartments, setSelectedDepartments] = useState<DepartmentId[]>([]);
  const [formData, setFormData] = useState<VolunteerFormData>({
    name: '',
    age: '',
    social: '',
    tg: '',
    prof: '',
    conditions: '',
    experience: '',
    camping: '',
    negative: '',
    help_now: false,
    inspiration: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deptError, setDeptError] = useState(false);
  const [errors, setErrors] = useState<SubmitErrorState>({ csrf: false, tooLarge: false, unknown: false, message: '' });

  const departments = useMemo(
    () => [
      { id: 'admin' as const, label: String(t('join.volunteer.dept.admin')) },
      { id: 'promo' as const, label: String(t('join.volunteer.dept.promo')) },
      { id: 'art' as const, label: String(t('join.volunteer.dept.art')) },
      { id: 'tech' as const, label: String(t('join.volunteer.dept.tech')) },
      { id: 'food' as const, label: String(t('join.volunteer.dept.food')) },
    ],
    [t]
  );

  useEffect(() => {
    if (!isSubmitted) {
      void fetchCsrfToken();
    }
  }, [isSubmitted]);

  const handleDepartment = (id: DepartmentId, checked: boolean) => {
    setDeptError(false);
    setSelectedDepartments((prev) =>
      checked ? [...prev, id] : prev.filter((item) => item !== id)
    );
  };

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setErrors({ csrf: false, tooLarge: false, unknown: false, message: '' });

    if (selectedDepartments.length === 0) {
      setDeptError(true);
      return;
    }

    setIsSubmitting(true);

    const payload = new FormData();
    payload.append('form_type', 'volunteer');
    payload.append('csrf_token', localStorage.getItem('csrfToken') || '');
    payload.append(
      'data',
      JSON.stringify({
        ...formData,
        department: selectedDepartments,
      })
    );

    try {
      const response = await fetch(`${API_URL}/form/save`, {
        method: 'POST',
        headers: {
          'X-Session-ID': getOrCreateSessionId(),
        },
        body: payload,
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else if (response.status === 403) {
        setErrors((prev) => ({ ...prev, csrf: true }));
      } else if (response.status === 413) {
        setErrors((prev) => ({ ...prev, tooLarge: true }));
      } else {
        setErrors({ csrf: false, tooLarge: false, unknown: true, message: await response.text() });
      }
    } catch (error) {
      console.error('Volunteer form submit failed', error);
      setErrors({ csrf: false, tooLarge: false, unknown: true, message: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <main className="min-h-[calc(100vh-130px)] px-5 py-10 md:px-12">
        <ThanksCard />
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-130px)] px-5 py-8 md:px-12">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-[32px] border border-brown/15 bg-orange-150/90 shadow-xl backdrop-blur-sm">
        <div
          className="h-40 bg-cover bg-center"
          style={{ backgroundImage: `linear-gradient(rgba(15, 8, 9, 0.35), rgba(15, 8, 9, 0.35)), url(${ASSET_BASE}/volunteer-form-l.jpg)` }}
        />
        <div className="p-6 sm:p-8">
          <JoinHeader title={String(t('join.volunteer.title'))} intro={String(t('join.volunteer.intro'))} back />

          <form onSubmit={submitForm} className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField label={String(t('join.volunteer.name'))} value={formData.name} onChange={(value) => setFormData((prev) => ({ ...prev, name: value }))} required />
              <TextField label={String(t('join.volunteer.age'))} value={formData.age} onChange={(value) => setFormData((prev) => ({ ...prev, age: value }))} type="number" min={1} max={120} required />
            </div>

            <TextField label={String(t('join.volunteer.social'))} value={formData.social} onChange={(value) => setFormData((prev) => ({ ...prev, social: value }))} required />
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField label={String(t('join.volunteer.tg'))} value={formData.tg} onChange={(value) => setFormData((prev) => ({ ...prev, tg: value }))} />
              <TextField label={String(t('join.volunteer.prof'))} value={formData.prof} onChange={(value) => setFormData((prev) => ({ ...prev, prof: value }))} />
            </div>

            <TextAreaField label={String(t('join.volunteer.conditions'))} value={formData.conditions} onChange={(value) => setFormData((prev) => ({ ...prev, conditions: value }))} />
            <TextAreaField label={String(t('join.volunteer.experience'))} value={formData.experience} onChange={(value) => setFormData((prev) => ({ ...prev, experience: value }))} />
            <TextAreaField label={String(t('join.volunteer.camping'))} value={formData.camping} onChange={(value) => setFormData((prev) => ({ ...prev, camping: value }))} />

            <section className="space-y-3 rounded-[24px] border border-brown/15 bg-white/45 p-4">
              <div className="text-sm font-semibold text-brown">
                {t('join.volunteer.dept.title')} *
              </div>
              <div className="text-sm text-brown/70">{t('join.volunteer.dept.change')}</div>
              {deptError && (
                <ErrorNotice
                  title={String(t('join.volunteer.dept.error'))}
                  description={String(t('join.volunteer.dept.info'))}
                />
              )}
              <div className="grid gap-3 sm:grid-cols-2">
                {departments.map((dept) => (
                  <ToggleItem
                    key={dept.id}
                    id={dept.id}
                    checked={selectedDepartments.includes(dept.id)}
                    label={dept.label}
                    onChange={(checked) => handleDepartment(dept.id, checked)}
                  />
                ))}
              </div>
              <DepartmentDetails />
            </section>

            <TextAreaField label={String(t('join.volunteer.negative'))} value={formData.negative} onChange={(value) => setFormData((prev) => ({ ...prev, negative: value }))} />

            <ToggleItem
              id="help-now"
              checked={formData.help_now}
              label={String(t('join.volunteer.help_now'))}
              onChange={(checked) => setFormData((prev) => ({ ...prev, help_now: checked }))}
            />

            <TextAreaField label={String(t('join.volunteer.inspiration'))} value={formData.inspiration} onChange={(value) => setFormData((prev) => ({ ...prev, inspiration: value }))} rows={5} />

            <SubmissionErrors state={errors} />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-brown px-6 py-3 text-sm font-bold text-orange-150 transition hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? t('join.forms.submitting') : t('join.volunteer.submit')}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export function JoinMasterForm() {
  const { t } = useTranslation();
  const [selectedDirections, setSelectedDirections] = useState<DirectionId[]>([]);
  const [selectedDates, setSelectedDates] = useState<DateId[]>([]);
  const [selectedLangs, setSelectedLangs] = useState<LangId[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [directionError, setDirectionError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [langError, setLangError] = useState(false);
  const [errors, setErrors] = useState<SubmitErrorState>({ csrf: false, tooLarge: false, unknown: false, message: '' });

  const [formData, setFormData] = useState<MasterFormData>({
    name: '',
    country: '',
    tg: '',
    email: '',
    fb: '',
    previously_participated: false,
    program_name: '',
    description: '',
    programUrl: '',
    socialUrl: '',
    quantity: '',
    time: '',
    duration: '',
    raider: '',
    additional_info: '',
    file: [],
  });

  const directions: DirectionId[] = ['concert', 'workshop', 'lecture', 'practice', 'performance', 'theatre', 'lesson', 'game', 'other'];
  const dates: DateId[] = ['d18', 'd19', 'd20', 'd21'];
  const langs: LangId[] = ['ru', 'en', 'md'];

  useEffect(() => {
    if (!isSubmitted) {
      void fetchCsrfToken();
    }
  }, [isSubmitted]);

  const toggleValue = <T extends string,>(value: T, checked: boolean, setter: React.Dispatch<React.SetStateAction<T[]>>) => {
    setter((prev) => (checked ? [...prev, value] : prev.filter((item) => item !== value)));
  };

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setErrors({ csrf: false, tooLarge: false, unknown: false, message: '' });

    if (selectedDirections.length === 0) {
      setDirectionError(true);
      return;
    }

    if (selectedDates.length === 0) {
      setDateError(true);
      return;
    }

    if (selectedLangs.length === 0) {
      setLangError(true);
      return;
    }

    setIsSubmitting(true);

    const payload = new FormData();
    payload.append('form_type', 'master');
    payload.append('csrf_token', localStorage.getItem('csrfToken') || '');
    payload.append(
      'data',
      JSON.stringify({
        ...formData,
        file: undefined,
        direction: selectedDirections,
        date: selectedDates,
        lang: selectedLangs,
      })
    );

    formData.file.forEach((file) => payload.append('file', file));

    try {
      const response = await fetch(`${API_URL}/form/save`, {
        method: 'POST',
        headers: {
          'X-Session-ID': getOrCreateSessionId(),
        },
        body: payload,
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else if (response.status === 403) {
        setErrors((prev) => ({ ...prev, csrf: true }));
      } else if (response.status === 413) {
        setErrors((prev) => ({ ...prev, tooLarge: true }));
      } else {
        setErrors({ csrf: false, tooLarge: false, unknown: true, message: await response.text() });
      }
    } catch (error) {
      console.error('Master form submit failed', error);
      setErrors({ csrf: false, tooLarge: false, unknown: true, message: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFiles = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      file: Array.from(e.target.files ?? []),
    }));
  };

  if (isSubmitted) {
    return (
      <main className="min-h-[calc(100vh-130px)] px-5 py-10 md:px-12">
        <ThanksCard />
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-130px)] px-5 py-8 md:px-12">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-[32px] border border-brown/15 bg-orange-150/90 shadow-xl backdrop-blur-sm">
        <div
          className="h-44 bg-cover bg-center"
          style={{ backgroundImage: `linear-gradient(rgba(15, 8, 9, 0.35), rgba(15, 8, 9, 0.35)), url(${ASSET_BASE}/master-form-l.jpg)` }}
        />
        <div className="p-6 sm:p-8">
          <JoinHeader title={String(t('join.master.title'))} intro={String(t('join.master.intro'))} back />

          <form onSubmit={submitForm} className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField label={String(t('join.master.name'))} value={formData.name} onChange={(value) => setFormData((prev) => ({ ...prev, name: value }))} required />
              <TextField label={String(t('join.master.country'))} value={formData.country} onChange={(value) => setFormData((prev) => ({ ...prev, country: value }))} required />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <TextField label={String(t('join.master.tg'))} value={formData.tg} onChange={(value) => setFormData((prev) => ({ ...prev, tg: value }))} required />
              <TextField label={String(t('join.master.email'))} value={formData.email} onChange={(value) => setFormData((prev) => ({ ...prev, email: value }))} type="email" required />
            </div>

            <TextField label={String(t('join.master.fb'))} value={formData.fb} onChange={(value) => setFormData((prev) => ({ ...prev, fb: value }))} />

            <ToggleItem
              id="previously-participated"
              checked={formData.previously_participated}
              label={String(t('join.master.previouslyParticipated'))}
              onChange={(checked) => setFormData((prev) => ({ ...prev, previously_participated: checked }))}
            />

            <section className="space-y-3 rounded-[24px] border border-brown/15 bg-white/45 p-4">
              <div className="text-sm font-semibold text-brown">{t('join.master.direction.title')} *</div>
              {directionError && (
                <ErrorNotice title={String(t('join.master.direction.error'))} description={String(t('join.master.direction.title'))} />
              )}
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {directions.map((item) => (
                  <ToggleItem
                    key={item}
                    id={`direction-${item}`}
                    checked={selectedDirections.includes(item)}
                    label={String(t(`join.master.direction.${item}`))}
                    onChange={(checked) => {
                      setDirectionError(false);
                      toggleValue(item, checked, setSelectedDirections);
                    }}
                  />
                ))}
              </div>
            </section>

            <TextField label={String(t('join.master.programName'))} value={formData.program_name} onChange={(value) => setFormData((prev) => ({ ...prev, program_name: value }))} required />
            <TextAreaField label={String(t('join.master.description'))} value={formData.description} onChange={(value) => setFormData((prev) => ({ ...prev, description: value }))} required rows={6} />

            <section className="space-y-3 rounded-[24px] border border-brown/15 bg-white/45 p-4">
              <div className="text-sm font-semibold text-brown">{t('join.master.dates.title')} *</div>
              {dateError && (
                <ErrorNotice title={String(t('join.master.dates.error'))} description={String(t('join.master.dates.title'))} />
              )}
              <div className="grid gap-3 sm:grid-cols-2">
                {dates.map((item) => (
                  <ToggleItem
                    key={item}
                    id={`date-${item}`}
                    checked={selectedDates.includes(item)}
                    label={String(t(`join.master.dates.${item}`))}
                    onChange={(checked) => {
                      setDateError(false);
                      toggleValue(item, checked, setSelectedDates);
                    }}
                  />
                ))}
              </div>
            </section>

            <div className="grid gap-4 sm:grid-cols-2">
              <TextField label={String(t('join.master.programUrl'))} value={formData.programUrl} onChange={(value) => setFormData((prev) => ({ ...prev, programUrl: value }))} />
              <TextField label={String(t('join.master.socialUrl'))} value={formData.socialUrl} onChange={(value) => setFormData((prev) => ({ ...prev, socialUrl: value }))} required />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <TextField label={String(t('join.master.quantity'))} value={formData.quantity} onChange={(value) => setFormData((prev) => ({ ...prev, quantity: value }))} required />
              <TextField label={String(t('join.master.time'))} value={formData.time} onChange={(value) => setFormData((prev) => ({ ...prev, time: value }))} required />
              <TextField label={String(t('join.master.duration'))} value={formData.duration} onChange={(value) => setFormData((prev) => ({ ...prev, duration: value }))} required />
            </div>

            <section className="space-y-3 rounded-[24px] border border-brown/15 bg-white/45 p-4">
              <div className="text-sm font-semibold text-brown">{t('join.master.langs.title')} *</div>
              {langError && (
                <ErrorNotice title={String(t('join.master.langs.error'))} description={String(t('join.master.langs.title'))} />
              )}
              <div className="grid gap-3 sm:grid-cols-3">
                {langs.map((item) => (
                  <ToggleItem
                    key={item}
                    id={`lang-${item}`}
                    checked={selectedLangs.includes(item)}
                    label={String(t(`join.master.langs.${item}`))}
                    onChange={(checked) => {
                      setLangError(false);
                      toggleValue(item, checked, setSelectedLangs);
                    }}
                  />
                ))}
              </div>
            </section>

            <section className="space-y-3 rounded-[24px] border border-dashed border-brown/25 bg-white/45 p-4">
              <div className="text-sm font-semibold text-brown">{t('join.master.image.title')}</div>
              <p className="text-sm text-brown/70">{t('join.master.image.description')}</p>
              <input
                type="file"
                multiple
                onChange={handleFiles}
                className="block w-full text-sm text-brown file:mr-4 file:rounded-full file:border-0 file:bg-brown file:px-4 file:py-2 file:text-orange-150"
              />
              <p className="text-xs text-brown/60">{t('join.master.image.hint')}</p>
            </section>

            <TextAreaField label={String(t('join.master.raider'))} value={formData.raider} onChange={(value) => setFormData((prev) => ({ ...prev, raider: value }))} />
            <TextAreaField label={String(t('join.master.additionalInfo'))} value={formData.additional_info} onChange={(value) => setFormData((prev) => ({ ...prev, additional_info: value }))} rows={5} />

            <SubmissionErrors state={errors} />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-brown px-6 py-3 text-sm font-bold text-orange-150 transition hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? t('join.forms.submitting') : t('join.master.submit')}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
