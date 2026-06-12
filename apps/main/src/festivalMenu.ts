/**
 * Festival navigation for the main site.
 *
 * While this returns at least one item, the main-site Header replaces its
 * default menu with the items below. When it returns an empty array, the
 * Header falls back to the default menu.
 *
 * Display rule: the festival menu is shown up to and including June 21, 2026.
 * From June 22, 2026 onward `getFestivalMenu` returns an empty array.
 *
 * The `items` list is meant to be edited by hand. Links point to the 2026
 * site, which nginx serves under /2026/ — so they are absolute paths and the
 * Header renders them as plain <a> (full navigation across the separate bundle),
 * not react-router <Link>.
 */

type Lang = "ru" | "en" | "md";

export interface FestivalMenuItem {
  href: string;
  label: Record<Lang, string>;
}

const items: FestivalMenuItem[] = [
  { href: "/2026/", label: { ru: "О фестивале", en: "About the festival", md: "Despre festival" } },
  { href: "/2026/participants", label: { ru: "Участникам", en: "Participants", md: "Participanți" } },
  { href: "/2026/gallery", label: { ru: "Галерея", en: "Gallery", md: "Galerie" } },
  { href: "/2026/program", label: { ru: "Программа", en: "Programme", md: "Program" } },
  { href: "/2026/getting-there", label: { ru: "Как добраться", en: "Getting There", md: "Cum să ajungi" } },
  { href: "/2026/contribute", label: { ru: "Сделать взнос", en: "Contribute", md: "Contribuie" } },
  { href: "/2026/contacts", label: { ru: "Контакты", en: "Contacts", md: "Contacte" } },
];

export function getFestivalMenu(now: Date = new Date()): FestivalMenuItem[] {
  // Months are 0-indexed: 5 = June. From June 22, 2026 onward the festival is
  // over, so no custom menu is shown.
  const cutoff = new Date(2026, 5, 22, 0, 0, 0);
  if (now >= cutoff) return [];
  return items;
}
