import { GlassCard } from '@/components/ui/GlassCard'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { team } from '@/data/team'
import { cn } from '@/lib/cn'

/**
 * Initials fallback used until real headshots are supplied.
 *
 * Splits on whitespace and then on internal capitals, so a name written as
 * one word — "HuaSheng" — yields the same two-letter monogram as one written
 * with a space. People write their names the way they write them; the avatar
 * should not depend on that choice.
 */
function initials(name: string) {
  const parts = name
    .trim()
    .split(/\s+/)
    .flatMap((word) => word.match(/\p{Lu}\p{Ll}*|\p{Ll}+/gu) ?? [word])

  return parts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

interface TeamGridProps {
  limit?: number
}

export function TeamGrid({ limit }: TeamGridProps) {
  const shown = limit ? team.slice(0, limit) : team

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {shown.map((member, index) => (
        <Reveal key={`${member.role}-${index}`} delay={index * 0.06} className="h-full">
          <GlassCard accent={member.accent} className="h-full p-6" as="article">
            <div className="flex items-center gap-4">
              {/* Avatar — photo when available, monogram otherwise */}
              <div className="relative shrink-0">
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute -inset-0.5 rounded-2xl opacity-60 blur-[3px] transition-opacity duration-400 group-hover/card:opacity-100',
                    member.accent === 'green'
                      ? 'bg-[linear-gradient(135deg,var(--color-brand-green),transparent_70%)]'
                      : 'bg-[linear-gradient(135deg,var(--color-brand-blue),transparent_70%)]',
                  )}
                />
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.name}
                    width={56}
                    height={56}
                    loading="lazy"
                    className="relative h-14 w-14 rounded-2xl object-cover"
                  />
                ) : (
                  <span
                    className={cn(
                      'relative flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-2 font-display text-lg font-bold',
                      member.accent === 'green' ? 'text-brand-green' : 'text-brand-blue',
                    )}
                  >
                    {initials(member.name)}
                  </span>
                )}
              </div>

              <div className="min-w-0">
                <h3 className="truncate font-display text-[1.0625rem] font-semibold text-white">
                  {member.name}
                </h3>
                <p
                  className={cn(
                    'mt-0.5 text-[0.8125rem] font-medium',
                    member.accent === 'green' ? 'text-brand-green' : 'text-brand-blue',
                  )}
                >
                  {member.role}
                </p>
              </div>
            </div>

            {/* Omitted entirely when no expertise is listed, so a card with
                none does not carry the margin of an empty list. */}
            {member.expertise.length > 0 ? (
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {member.expertise.map((skill) => (
                  <li key={skill} className="chip">
                    {skill}
                  </li>
                ))}
              </ul>
            ) : null}

            <p className="mt-5 flex items-center gap-2 border-t border-white/[0.06] pt-4 text-[0.8125rem] text-mist-dim">
              <Icon name="mapPin" size={14} className="text-mist-dim" />
              {member.location}
            </p>
          </GlassCard>
        </Reveal>
      ))}
    </div>
  )
}
