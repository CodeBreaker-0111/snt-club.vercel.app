import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import EventRegistration from '@/models/EventRegistration';
import EmailJob from '@/models/Emailjob';
import { sendCodeWithSnTMail } from '@/lib/mailer';

export const dynamic = 'force-dynamic';

const BROADCAST_TAG = 'code_with_snt_5';

function isAuthorized(req: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;

  const header = req.headers.get('authorization');
  if (header === `Bearer ${secret}`) return true;

  const url = new URL(req.url);
  if (url.searchParams.get('secret') === secret) return true;

  return false;
}

/**
 * POST - /api/z9x4p7/send-contest
 * 
 * @param req - body
 * {
 *   "event": "a1sk5sn7",
 *   "accessLink": "https://hackerrank.com/contest-id"
 * }
 */
export async function POST(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  await connectDB();

  const url = new URL(req.url);
  const body = await req.json().catch(() => ({}));

  const eventSlug = (body.event || url.searchParams.get('event'))
    .trim()
    .toLowerCase();

  const accessLink = body.accessLink;

  const attendees = await EventRegistration.find({
    event: eventSlug,
    remindersSent: { $ne: BROADCAST_TAG },
  }).limit(8);

  if (attendees.length === 0) {
    return NextResponse.json({
      success: true,
      message: 'All registered participants have received the contest mail.',
      dispatchedCount: 0,
      remainingUnsent: 0,
    });
  }

  let dispatchedCount = 0;
  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  const CONCURRENCY = 2;

  for (let i = 0; i < attendees.length; i += CONCURRENCY) {
    const chunk = attendees.slice(i, i + CONCURRENCY);

    await Promise.all(
      chunk.map(async (user: any) => {
        let dispatched = false;
        try {
          await sendCodeWithSnTMail(user.email, user.name, accessLink);
          dispatched = true;
        } catch (err) {
          try {
            await EmailJob.create({
              type: 'CONTEST_BROADCAST',
              payload: {
                email: user.email,
                name: user.name,
                accessLink,
                broadcastTag: BROADCAST_TAG,
              },
            });
            dispatched = true;
          } catch {
            // Failed to write queue job; will retry next batch
          }
        }

        if (dispatched) {
          await EventRegistration.updateOne(
            { _id: user._id },
            { $addToSet: { remindersSent: BROADCAST_TAG } }
          );
          dispatchedCount++;
        }
      })
    );

    if (i + CONCURRENCY < attendees.length) {
      await sleep(250);
    }
  }

  const remaining = await EventRegistration.countDocuments({
    event: eventSlug,
    remindersSent: { $ne: BROADCAST_TAG },
  });

  return NextResponse.json({
    success: true,
    event: eventSlug,
    dispatchedThisRun: dispatchedCount,
    remainingUnsent: remaining,
    completed: remaining === 0,
  });
}