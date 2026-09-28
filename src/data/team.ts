/* ==========================================================================
   Team roster.

   NAME FORMATTING. Each name is written the way its owner writes it, which is
   why "HuaSheng" is one word while "Jie Hong" is two. That is deliberate, not
   an inconsistency to tidy up — the monogram avatar handles both spellings.

   TO CONFIRM: "Xinning Shen" was supplied as "XinnignShen" and corrected here
   because "nign" is not a possible pinyin syllable. Worth checking with them.
   "Jie Hong" was supplied unspaced ("JieHong") and may want the same
   treatment as HuaSheng.

   Still to add: `expertise` is empty for everyone, so the skill-chip row is
   hidden on every card. Two or three entries each will fill it in.

   Cards fall back to a monogram avatar until `photo` is set — add headshots
   to /public/team/ and reference them as '/team/name.jpg'.
   ========================================================================== */

export interface TeamMember {
  name: string
  role: string
  expertise: string[]
  location: string
  /** Optional headshot, e.g. '/team/polaris.jpg' (files live in /public/team). */
  photo?: string
  accent: 'green' | 'blue'
}

export const team: TeamMember[] = [
  {
    name: 'Sebastian Gonzalez',
    role: 'Founder & Manager',
    /* TODO(content): add 2–3 areas of expertise. */
    expertise: [],
    location: 'United States',
    accent: 'green',
  },
  {
    name: 'Jie Hong',
    role: 'Senior Technical Lead',
    expertise: [],
    location: 'China',
    accent: 'blue',
  },
  {
    name: 'HuaSheng',
    role: 'Senior Developer',
    expertise: [],
    location: 'China',
    accent: 'green',
  },
  {
    name: 'Dayu Jiang',
    role: 'Senior Developer',
    expertise: [],
    location: 'China',
    accent: 'blue',
  },
  {
    name: 'Xinning Shen',
    role: 'Senior Developer',
    expertise: [],
    location: 'China',
    accent: 'green',
  },
  {
    name: 'Muhib Siddiqi',
    role: 'Senior Developer',
    expertise: [],
    location: 'United States',
    accent: 'blue',
  },
  {
    name: 'Raliel Dias',
    role: 'HR Manager',
    expertise: [],
    location: 'Brazil',
    accent: 'green',
  },
  {
    name: 'Jose Souza',
    role: 'HR Assistant',
    expertise: [],
    location: 'Brazil',
    accent: 'blue',
  },
]

/* Node positions for the globe visualisation, as percentages of its bounding
   box. These are hand-placed for legibility rather than projected from real
   coordinates — the globe is a diagram, and the location list beside it
   carries the actual information. Keep these in step with the roster above;
   keep each point inside the circle (centre 50,50 · radius 44). */
export interface MapNode {
  label: string
  x: number
  y: number
  hub?: boolean
}

export const mapNodes: MapNode[] = [
  { label: 'China', x: 72, y: 42, hub: true },
  { label: 'United States', x: 24, y: 40 },
  { label: 'Brazil', x: 33, y: 63 },
]
