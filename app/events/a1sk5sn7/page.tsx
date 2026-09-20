'use client';
import React, { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import EventFormSwitcher from '@/components/EventFormSwitcher';
import { getEventConfig } from '@/lib/eventRegistrations';
import { codeWithSnt_img } from '@/assets';

function CodeWithSntPage() {
  const eventDetails = getEventConfig('a1sk5sn7');

  // Status flags from event config
  const registrationOpen = Boolean(eventDetails?.registrationOpen);
  const attendanceOpen = Boolean(eventDetails?.attendanceOpen);
  const started = Boolean(eventDetails?.started);
  const ended = Boolean(eventDetails?.ended);

  // Form should only display if the event hasn't ended and an action is active
  const showForm = !ended && (attendanceOpen || registrationOpen);

  return (
    <>
      {/* HEADER / NOTICE BAR: Stacks vertically on mobile, row on tablet/desktop */}
      <header className="w-full bg-[#0A146E] py-4 text-white shadow-md">
        <div className="mx-auto flex w-full max-w-[94%] flex-col items-center justify-center gap-3 px-2 sm:flex-row sm:justify-between sm:px-6 xl:max-w-7xl">
          <div>
            <Link href="#" target="_blank">
              <span className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1 text-sm font-medium text-white/90 transition hover:bg-white/10 hover:text-white md:text-base">
                📌 Notice
              </span>
            </Link>
          </div>
          <div>
            {ended ? (
              <span className="inline-flex items-center rounded-full border border-white/40 bg-white/10 px-5 py-1.5 text-sm font-bold text-white">
                Contest Concluded
              </span>
            ) : attendanceOpen ? (
              <a href="#register">
                <button className="rounded-full border border-[#4bee6e] bg-[#4bee6e] px-5 py-1.5 text-sm font-bold text-[#0A146E] shadow-sm transition duration-300 ease-in-out hover:bg-transparent hover:text-white md:text-base">
                  Mark Attendance / Feedback
                </button>
              </a>
            ) : registrationOpen ? (
              <a href="#register">
                <button className="rounded-full border border-white bg-white px-5 py-1.5 text-sm font-bold text-[#0A146E] shadow-sm transition duration-300 ease-in-out hover:bg-transparent hover:text-white md:text-base">
                  Register Now
                </button>
              </a>
            ) : (
              <span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-5 py-1.5 text-sm font-bold text-white/70">
                Registrations Closed
              </span>
            )}
          </div>
        </div>
      </header>

      {/* FULL-CANVAS WRAPPER */}
      <div className="mx-auto my-8 w-full max-w-[94%] px-2 sm:px-6 xl:max-w-7xl">
        
        {/* REFINED, PROPORTIONAL TITLE BANNER */}
        <div className="mb-8 w-full text-center md:mb-10">
          <div className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#0A146E] via-[#12209e] to-[#0A146E] px-6 py-3.5 shadow-md shadow-[#0A146E]/10 md:py-4">
            <h1 className="text-2xl font-extrabold tracking-normal text-amber-300 md:text-3xl lg:text-4xl">
              {eventDetails?.title || 'Code with S&T 5.0'}
            </h1>
          </div>
        </div>

        {/* 12-COL FULL-WIDTH CONTENT GRID */}
        <div className="grid w-full grid-cols-12 items-start gap-8 lg:gap-12">
          
          {/* POSTER / IMAGE PLACEHOLDER */}
          <div className="col-span-12 flex justify-center lg:col-span-4 lg:justify-start">
            <div className="relative w-full max-w-[340px] overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50 shadow-md transition duration-300 hover:shadow-lg lg:max-w-none">
              <Image
                src={codeWithSnt_img}
                alt="Code with S&T 5.0 Poster"
                width={600}
                height={600}
                className="h-auto w-full object-contain"
                priority
              />
            </div>
          </div>

          {/* EVENT DESCRIPTION & DETAILS */}
          <div className="col-span-12 space-y-6 text-[#0A146E] lg:col-span-8">
            {/* Live / Status Pill */}
            <div className="flex items-center gap-2">
              {ended ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-200 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-700">
                  <span className="h-2 w-2 rounded-full bg-slate-500" /> Contest Ended
                </span>
              ) : attendanceOpen ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" /> Attendance Live
                </span>
              ) : started ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-700">
                  <span className="h-2 w-2 animate-ping rounded-full bg-red-600" /> Contest In Progress
                </span>
              ) : registrationOpen ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" /> Registrations Open
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-800">
                  <span className="h-2 w-2 rounded-full bg-amber-500" /> Registrations Closed
                </span>
              )}
            </div>

            {/* Main Lead Paragraph */}
            <p className="text-base font-normal leading-relaxed text-slate-700 md:text-lg">
              <strong className="font-semibold text-[#0A146E]">CODE WITH S&amp;T 5.0</strong> is back — brought to you by the Science &amp; Technology Club! <br />
              Got what it takes? No lectures 👩🏼‍🏫, no boring theory — just you, your keyboard, and some genuinely fun problems waiting to be cracked.
            </p>

            {/* Structured Bullet Section */}
            <div className="w-full rounded-2xl border border-slate-200/90 bg-slate-50/70 p-5 md:p-6">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#EE4B76]">
                Join us for:
              </p>
              <ul className="space-y-3 text-sm font-normal leading-relaxed text-slate-700 md:text-base">
                <li className="flex items-start gap-3">
                  <span className="text-lg">⚡</span>
                  <span>Open the problem ➔ Crack the code ➔ Claim the glory!</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg">🧩</span>
                  <span>Mix of tricky puzzles and real coding problems</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg">🕕</span>
                  <span>Clock ticking away while you figure it out.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg">👨🏼‍💻</span>
                  <span>Beat the other coders on the live leaderboard.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg">🏆</span>
                  <span>Snag your prizes and participation certificates.</span>
                </li>
              </ul>
            </div>

            {/* METADATA PILLS */}
            <div className="grid grid-cols-1 gap-3 pt-1 text-center sm:grid-cols-3 md:gap-4">
              <div className="rounded-xl border border-[#0A146E]/15 bg-white p-3.5 shadow-sm">
                <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Date</span>
                <p className="mt-0.5 text-sm font-semibold text-[#0A146E] md:text-base">
                  {eventDetails?.formattedDate || 'September 20, 2026'}
                </p>
              </div>
              
              <div className="rounded-xl border border-[#0A146E]/15 bg-white p-3.5 shadow-sm">
                <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Time</span>
                <p className="mt-0.5 text-sm font-semibold text-[#0A146E] md:text-base">
                  {eventDetails?.formattedTime || '4:00 PM - 5:00 PM'}
                </p>
              </div>

              <div className="rounded-xl border border-[#0A146E]/15 bg-white p-3.5 shadow-sm">
                <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Venue</span>
                <p className="mt-0.5 text-sm font-semibold text-[#0A146E] md:text-base">
                  {eventDetails?.venue || 'Online Mode'}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* REGISTRATION / ATTENDANCE / STATUS SECTION */}
        <div id="register" className="mx-auto mt-14 w-full max-w-4xl pt-4">
          {ended ? (
            <div className="rounded-2xl border-2 border-[#0A146E]/15 bg-slate-50/80 p-8 text-center text-[#0A146E] shadow-sm">
              <p className="text-4xl">🏆</p>
              <h3 className="mt-3 text-2xl font-bold">Contest Has Concluded</h3>
              <p className="mt-2 text-sm text-slate-600 md:text-base">
                Code with S&amp;T 5.0 is officially over! Submissions are currently being evaluated for plagiarism and leaderboard standing. Results and certificates will be shared via WhatsApp.
              </p>
            </div>
          ) : showForm ? (
            <Suspense fallback={<div className="py-10 text-center text-base font-semibold text-[#0A146E]">Loading form...</div>}>
              <EventFormSwitcher
                event="a1sk5sn7"
                title="Code With S&T 5.0"
              />
            </Suspense>
          ) : (
            <div className="rounded-2xl border-2 border-amber-300 bg-amber-50/80 p-8 text-center text-[#0A146E] shadow-sm">
              <p className="text-4xl">🔒</p>
              <h3 className="mt-3 text-2xl font-bold">Registrations Are Closed</h3>
              <p className="mt-2 text-sm text-slate-700 md:text-base">
                Registrations for Code with S&amp;T 5.0 have ended. If you registered in time, please check your inbox for the official contest arena access link.
              </p>
            </div>
          )}
        </div>

      </div>
    </>
  );
}

export default CodeWithSntPage;