import { InstagramIcon, LinkedInIcon, TikTokIcon } from "@/components/icons/BrandIcons";
import { SOCIAL_PROFILES } from "@/lib/site";

const NETWORKS = [
  { key: "instagram", label: "Instagram", Icon: InstagramIcon },
  { key: "tiktok", label: "TikTok", Icon: TikTokIcon },
  { key: "linkedin", label: "LinkedIn", Icon: LinkedInIcon },
] as const;

/** Solo las redes con URL real: un ícono sin destino no se publica. */
export function SocialLinks({ className = "" }: { className?: string }) {
  const networks = NETWORKS.filter((n) => SOCIAL_PROFILES[n.key]);
  if (networks.length === 0) return null;

  return (
    <ul className={`flex items-center gap-1 ${className}`}>
      {networks.map(({ key, label, Icon }) => (
        <li key={key}>
          <a
            href={SOCIAL_PROFILES[key]}
            target="_blank"
            rel="noopener"
            aria-label={`SDI Tecnología en ${label}`}
            className="inline-flex size-10 items-center justify-center rounded-[3px] text-ink-soft transition-colors hover:bg-sdi-wash hover:text-sdi-strong"
          >
            <Icon size={19} />
          </a>
        </li>
      ))}
    </ul>
  );
}
