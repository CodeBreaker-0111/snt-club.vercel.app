// lib/eventRegistrations.ts
import { eventDetails } from '@/eventConstants';

export type EventConfig = {
  slug: string;
  title: string;

  registrationDeadline?: string;
  startDateTime?: string;
  endDateTime?: string;
  attendanceDeadline?: string;

  formattedDate?: string;
  formattedTime?: string;
  venue?: string;

  registrationOpen: boolean;
  started: boolean;
  ended: boolean;
  attendanceOpen: boolean;
};

// Converts "/events/Aarambh2026" -> "aarambh2026"
function slugFromLink(link: string): string {
  return link.replace(/\/+$/, '').split('/').filter(Boolean).pop() ?? '';
}

function buildEventConfig(e: any): EventConfig {
  const now = new Date();

  const registrationDeadline = e.registrationDeadline ? new Date(e.registrationDeadline) : null;
  const startDateTime = e.startDateTime ? new Date(e.startDateTime) : null;
  const endDateTime = e.endDateTime ? new Date(e.endDateTime) : null;
  const attendanceDeadline = e.attendanceDeadline ? new Date(e.attendanceDeadline) : null;

  /**
   * EVENT STATUS
   *
   * Past:
   *   endDateTime has passed.
   *
   * Ongoing:
   *   registrationDeadline exists
   *   AND event has not ended.
   *
   * Upcoming:
   *   no registrationDeadline
   *   AND event has not ended.
   */
  const started = !!startDateTime && now >= startDateTime;
  const ended = !!endDateTime && now >= endDateTime;

  const registrationOpen = !!registrationDeadline && now < registrationDeadline;
  const attendanceOpen = !!startDateTime && !!attendanceDeadline && now >= startDateTime && now < attendanceDeadline;

  return {
    slug: slugFromLink(e.eventRegLink),
    title: e.eventName,
    registrationDeadline: e.registrationDeadline,
    startDateTime: e.startDateTime,
    endDateTime: e.endDateTime,
    attendanceDeadline: e.attendanceDeadline,
    formattedDate: e.eventDate || "Date announced soon",
    formattedTime: e.eventTime || "Time announced soon",
    venue: e.eventVenue || "SKIT Campus, Jaipur",
    registrationOpen,
    started,
    ended,
    attendanceOpen,
  }
}

export function getEventConfig(event: string): EventConfig | null {
  const target = event;
  const match = eventDetails.find((e: any) => slugFromLink(e.eventRegLink) === target);

  if (!match) return null;

  return buildEventConfig(match);
}

export function getAllEvents(): EventConfig[] {
  return eventDetails.map(buildEventConfig);
}

export type EventDisplayCard = EventConfig & {
  img: any;
  description: string;
  link: string;
  status: "upcoming" | "past" | "ongoing";
};

export function getAllDisplayEvents(): EventDisplayCard[] {
  return eventDetails.map((e: any) => {
    const config = buildEventConfig(e)

    return {
      ...config,
      img: e.eventImg,
      description: e.eventDesc,
      link: e.eventRegLink,
      status: config.ended ? "past" : config.registrationDeadline ? "ongoing" : "upcoming",
    }
  });
}
