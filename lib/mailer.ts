import nodemailer from 'nodemailer';
import { generateIcsAttachment } from './calendar';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


/* ---------- OTP MAIL ---------- */
export async function sendOtpMail(to: string, otp: string) {
  const textContent = `Hi,\n\nYour confirmation code for Science & Technology Club (SKIT) is: ${otp}\n\nThis code is valid for 10 minutes.\n\nBest regards,\nScience & Technology Club, SKIT Jaipur\nhttps://snt-club.vercel.app`;

  const htmlContent = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="color-scheme" content="light" />
      <title>Your Access Code</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
      
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f1f5f9; width: 100%; margin: 0; padding: 32px 16px;">
        <tr>
          <td align="center">
            
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 480px; width: 100%; background-color: #ffffff; border: 1px solid #cbd5e1; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
              
              <!-- Club Header Banner -->
              <tr>
                <td style="background-color: #0A146E; padding: 22px 32px;">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                    <tr>
                      <td>
                        <span style="font-size: 16px; font-weight: 700; color: #ffffff; letter-spacing: 0.3px;">Science &amp; Technology Club</span>
                        <span style="font-size: 13px; color: #93c5fd; margin-left: 6px;">&bull; SKIT Jaipur</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Body Content -->
              <tr>
                <td style="padding: 32px 32px 24px 32px; background-color: #ffffff;">
                  <p style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600; color: #0f172a;">
                    Hello,
                  </p>
                  <p style="margin: 0 0 24px 0; font-size: 14px; line-height: 1.6; color: #475569;">
                    Here is your single-use code to complete your registration for the upcoming session:
                  </p>

                  <!-- Code Box -->
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 24px 0;">
                    <tr>
                      <td align="center" style="background-color: #eff6ff; border: 1.5px solid #bfdbfe; border-radius: 8px; padding: 18px 10px;">
                        <span style="font-family: 'SF Mono', Consolas, 'Courier New', monospace; font-size: 34px; font-weight: 800; color: #0A146E; letter-spacing: 6px; display: inline-block;">${otp}</span>
                      </td>
                    </tr>
                  </table>

                  <!-- Expiry Note -->
                  <p style="margin: 0; font-size: 13px; color: #64748b; line-height: 1.5;">
                    ⏱️ This code remains valid for <strong>10 minutes</strong>. If you did not make this request, you can safely ignore this message.
                  </p>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px 32px; text-align: left;">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                    <tr>
                      <td style="font-size: 12px; color: #94a3b8; line-height: 1.5;">
                        S&amp;T Club &bull; SKIT Jaipur
                      </td>
                      <td align="right" style="font-size: 12px;">
                        <a href="https://snt-club.vercel.app" target="_blank" style="color: #0A146E; font-weight: 600; text-decoration: underline;">snt-club.vercel.app</a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

            </table>

          </td>
        </tr>
      </table>

    </body>
    </html>
  `.trim();

  await transporter.sendMail({
    from: `"S&T Club, SKIT" <${process.env.EMAIL_USER}>`,
    to,
    replyTo: process.env.EMAIL_USER,
    subject: `${otp} — your S&T Club verification code`,
    text: textContent,
    html: htmlContent,
  });
}

/* ---------- REGISTRATION SUCCESS MAIL ---------- */
export async function sendRegistrationMail(to: string, name: string, username: string, password: string) {
  await transporter.sendMail({
    from: `"S&T Club, SKIT" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Welcome to S&T Club — Registration Confirmed',
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="color-scheme" content="light">
      </head>
      <body style="margin:0;padding:0;background-color:#eef0f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#eef0f8;padding:48px 16px;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:520px;">

                <!-- Logo bar -->
                <tr>
                  <td style="padding-bottom:20px;text-align:center;">
                    <div style="display:inline-block;background-color:#0A146E;border-radius:12px;padding:8px 20px;">
                      <span style="font-size:13px;font-weight:800;color:#ffffff;letter-spacing:2px;text-transform:uppercase;">S&amp;T CLUB</span>
                      <span style="font-size:13px;font-weight:400;color:rgba(255,255,255,0.6);margin-left:6px;letter-spacing:1px;">SKIT</span>
                    </div>
                  </td>
                </tr>

                <!-- Card -->
                <tr>
                  <td style="background-color:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(10,20,110,0.10);">

                    <!-- Header -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="background:linear-gradient(135deg,#0A146E 0%,#1a27b0 100%);padding:36px 40px 32px;">
                          <div style="font-size:11px;font-weight:700;color:#EE4B76;text-transform:uppercase;letter-spacing:2px;margin-bottom:6px;">Account Created</div>
                          <div style="font-size:26px;font-weight:800;color:#ffffff;line-height:1.2;">Welcome aboard! 🎉</div>
                        </td>
                      </tr>
                    </table>

                    <!-- Body -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding:36px 40px 28px;">

                          <p style="font-size:17px;font-weight:700;color:#0A146E;margin:0 0 8px 0;">Hi ${name},</p>
                          <p style="font-size:15px;color:#475569;margin:0 0 28px 0;line-height:1.7;">
                            Your registration with <strong style="color:#0A146E;">Science &amp; Technology Club (SNT Club)</strong> is confirmed. Here are your login credentials for the portal.
                          </p>

                          <!-- Credentials card -->
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:linear-gradient(135deg,#f0f3ff 0%,#e8ecff 100%);border:1px solid #c7d0f8;border-radius:14px;margin-bottom:28px;">
                            <tr>
                              <td style="padding:24px 28px;">
                                <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#64748b;margin-bottom:16px;">🔐 Login Credentials</div>
                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                                  <tr>
                                    <td style="padding-bottom:12px;">
                                      <div style="font-size:12px;color:#64748b;margin-bottom:4px;font-weight:600;">USERNAME</div>
                                      <div style="font-family:'Courier New',Courier,monospace;font-size:16px;font-weight:700;color:#0A146E;background-color:#ffffff;border:1px solid #c7d0f8;border-radius:8px;padding:10px 14px;">${username}</div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div style="font-size:12px;color:#64748b;margin-bottom:4px;font-weight:600;">PASSWORD</div>
                                      <div style="font-family:'Courier New',Courier,monospace;font-size:16px;font-weight:700;color:#0A146E;background-color:#ffffff;border:1px solid #c7d0f8;border-radius:8px;padding:10px 14px;">${password}</div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>

                          <!-- Divider -->
                          <div style="border-top:1px solid #f1f5f9;padding-top:24px;">
                            <p style="font-size:14px;font-weight:700;color:#0A146E;margin:0 0 4px 0;">All the best! 🚀</p>
                            <p style="font-size:13px;color:#64748b;margin:0;"><strong style="color:#0A146E;">SNT Club Team</strong> · Science &amp; Technology Club</p>
                          </div>

                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding:24px 0 0 0;text-align:center;">
                    <p style="font-size:12px;color:#94a3b8;margin:0;">
                      <strong style="color:#0A146E;">Science &amp; Technology Club</strong> · SKIT Jaipur
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
  });
}

/* ---------- EVENT CONFIRMATION MAIL ---------- */
export async function sendEventConfirmationMail(
  to: string,
  name: string,
  eventTitle: string,
  eventDate: string,
  eventTime: string,
  venue: string,
  startDateTime: string = '',
) {
  // Synchronized plain-text version for 100% multipart consistency
  const textContent =
    `Hi ${name},\n\n` +
    `Your registration for ${eventTitle} is confirmed.\n\n` +
    `Event Details:\n` +
    `• Event: ${eventTitle}\n` +
    `• Date: ${eventDate}\n` +
    `• Time: ${eventTime}\n` +
    `• Venue: ${venue}\n\n` +
    `No further action is required. Please arrive a few minutes early.\n\n` +
    `Regards,\n` +
    `Science & Technology Club, SKIT Jaipur\n` +
    `https://snt-club.vercel.app`;

  const htmlContent = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light" />
  <title>Registration Confirmed</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f2f3f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%;">
  
  <!-- Outer Background Container -->
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f2f3f5; width: 100%; margin: 0; padding: 40px 16px;">
    <tr>
      <td align="center">
        
        <!-- Main Card -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 560px; width: 100%; background-color: #ffffff; border: 1px solid #e4e7eb; border-radius: 10px; overflow: hidden;">
          
          <!-- Header Banner -->
          <tr>
            <td style="background-color: #0A146E; padding: 26px 36px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="vertical-align: middle;">
                    <span style="font-size: 16px; font-weight: 700; color: #ffffff; letter-spacing: 0.5px;">Science &amp; Technology Club</span>
                    <span style="font-size: 13px; color: rgba(255, 255, 255, 0.7); margin-left: 8px;">&bull; SKIT Jaipur</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Confirmation Title Strip -->
          <tr>
            <td style="padding: 32px 36px 8px 36px; background-color: #ffffff;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 8px;">
                <tr>
                  <td style="background-color: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 6px; padding: 4px 10px; font-size: 11px; font-weight: 700; color: #065f46; letter-spacing: 1px; text-transform: uppercase;">
                    &#10004; Registration Confirmed
                  </td>
                </tr>
              </table>
              <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #0A146E; line-height: 1.35;">${eventTitle}</h1>
            </td>
          </tr>

          <!-- Intro Message -->
          <tr>
            <td style="padding: 16px 36px; background-color: #ffffff;">
              <p style="margin: 0 0 14px 0; font-size: 15px; color: #334155; line-height: 1.6;">
                Hi <strong>${name}</strong>,
              </p>
              <p style="margin: 0; font-size: 15px; color: #334155; line-height: 1.6;">
                Your seat for <strong style="color: #0A146E;">${eventTitle}</strong> organized by the Science &amp; Technology Club has been confirmed. Below are your session details:
              </p>
            </td>
          </tr>

          <!-- Structured Details Table -->
          <tr>
            <td style="padding: 8px 36px 20px 36px; background-color: #ffffff;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
                <tr>
                  <td style="padding: 12px 18px; border-bottom: 1px solid #e2e8f0; width: 85px; font-size: 13px; color: #64748b; font-weight: 600;">Event</td>
                  <td style="padding: 12px 18px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #0f172a; font-weight: 600;">${eventTitle}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 18px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #64748b; font-weight: 600;">Date</td>
                  <td style="padding: 12px 18px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #0f172a;">${eventDate}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 18px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #64748b; font-weight: 600;">Time</td>
                  <td style="padding: 12px 18px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #0f172a;">${eventTime}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 18px; font-size: 13px; color: #64748b; font-weight: 600;">Venue</td>
                  <td style="padding: 12px 18px; font-size: 13px; color: #0f172a;">${venue}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Next Steps Note -->
          <tr>
            <td style="padding: 0 36px 28px 36px; background-color: #ffffff;">
              <p style="margin: 0 0 16px 0; font-size: 14px; color: #475569; line-height: 1.6;">
                Please arrive at the venue 10 minutes prior to the start time. Keep this email accessible on your device for check-in.
              </p>
              <p style="margin: 0; font-size: 14px; color: #475569; line-height: 1.6;">
                Regards,<br />
                <strong style="color: #0A146E;">Science &amp; Technology Club</strong>, SKIT Jaipur
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 18px 36px; text-align: left;">
              <p style="margin: 0; font-size: 12px; color: #94a3b8; line-height: 1.5;">
                This is an automated confirmation. Portal: <a href="https://snt-club.vercel.app" target="_blank" style="color: #0A146E; text-decoration: underline;">snt-club.vercel.app</a>
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
  `.trim();

  let icsContent: string | undefined;
  if (startDateTime) {
    try {
      icsContent = await generateIcsAttachment({
        title: eventTitle,
        description: `Your registration for ${eventTitle} organized by Science & Technology Club, SKIT is confirmed.`,
        startDateTime,
        durationMinutes: 90,
        venue,
      });
    } catch (err) {
      console.error('[ICS] Error generating invite:', err);
    }
  }

  await transporter.sendMail({
    from: `"S&T Club, SKIT" <${process.env.EMAIL_USER}>`,
    to,
    replyTo: process.env.EMAIL_USER,
    subject: `Registered: ${eventTitle} — See you there!`,
    text: textContent,
    html: htmlContent,
    // Native calendar invite payload
    ...(icsContent
      ? {
          icalEvent: {
            filename: 'invite.ics',
            method: 'REQUEST',
            content: icsContent,
          },
        }
      : {}),
  });
}

/* ---------- EVENT REMINDER MAIL ---------- */
export async function sendEventReminderMail(
  to: string,
  name: string,
  eventTitle: string,
  timeframeLabel: string, // e.g. "Starts in 3 Days", "Starts in 1 Hour"
  eventDate: string,
  eventTime: string,
  venue: string,
) {
  const textContent =
    `Hi ${name},\n\n` +
    `Reminder: ${eventTitle} is scheduled ${timeframeLabel.toLowerCase()}.\n\n` +
    `Details:\n` +
    `• Event: ${eventTitle}\n` +
    `• Date: ${eventDate}\n` +
    `• Time: ${eventTime}\n` +
    `• Venue: ${venue}\n\n` +
    `Please ensure you arrive 10 minutes early.\n\n` +
    `Science & Technology Club, SKIT Jaipur\n` +
    `https://snt-club.vercel.app`;

  const htmlContent = `
  <!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light" />
  <title>Event Reminder: ${eventTitle}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f1f5f9; width: 100%; margin: 0; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 560px; width: 100%; background-color: #ffffff; border: 1px solid #cbd5e1; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
          
          <!-- Club Header -->
          <tr>
            <td style="background-color: #0A146E; padding: 22px 32px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>
                    <span style="font-size: 16px; font-weight: 700; color: #ffffff; letter-spacing: 0.3px;">Science &amp; Technology Club</span>
                    <span style="font-size: 13px; color: #93c5fd; margin-left: 6px;">&bull; SKIT Jaipur</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- High-Visibility Reminder Banner -->
          <tr>
            <td style="padding: 24px 32px 0 32px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #eff6ff; border: 1.5px solid #bfdbfe; border-radius: 8px;">
                <tr>
                  <td style="padding: 16px 20px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="font-size: 12px; font-weight: 700; color: #1d4ed8; letter-spacing: 1px; text-transform: uppercase;">
                          ⚡ UPCOMING EVENT REMINDER
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: 20px; font-weight: 800; color: #1e3a8a; padding-top: 4px;">
                          ${timeframeLabel}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Title & Personalized Greeting -->
          <tr>
            <td style="padding: 24px 32px 12px 32px;">
              <h1 style="margin: 0 0 16px 0; font-size: 24px; font-weight: 700; color: #0f172a; line-height: 1.3;">
                ${eventTitle}
              </h1>
              <p style="margin: 0; font-size: 15px; color: #334155; line-height: 1.6;">
                Hi <strong>${name}</strong>,
              </p>
              <p style="margin: 8px 0 0 0; font-size: 15px; color: #475569; line-height: 1.6;">
                This is a friendly reminder for your upcoming registered session. Please make sure to be on time!
              </p>
            </td>
          </tr>

          <!-- Schedule & Venue Details Table -->
          <tr>
            <td style="padding: 12px 32px 24px 32px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
                <tr>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #e2e8f0; width: 90px; font-size: 13px; color: #64748b; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Date</td>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #e2e8f0; font-size: 14px; color: #0f172a; font-weight: 700;">${eventDate}</td>
                </tr>
                <tr>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #64748b; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Time</td>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #e2e8f0; font-size: 14px; color: #0f172a; font-weight: 700;">${eventTime}</td>
                </tr>
                <tr>
                  <td style="padding: 14px 18px; font-size: 13px; color: #64748b; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Venue</td>
                  <td style="padding: 14px 18px; font-size: 14px; color: #0f172a; font-weight: 600;">${venue}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Instructions & Signoff -->
          <tr>
            <td style="padding: 0 32px 28px 32px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 18px;">
                <tr>
                  <td style="border-left: 3px solid #0A146E; padding-left: 12px; font-size: 13px; color: #475569; line-height: 1.5;">
                    Please arrive at the venue <strong>10 minutes before the start time</strong> for smooth seating.
                  </td>
                </tr>
              </table>
              <p style="margin: 0; font-size: 14px; color: #475569; line-height: 1.5;">
                Best regards,<br />
                <strong style="color: #0A146E;">Science &amp; Technology Club</strong><br />
                Swami Keshvanand Institute of Technology (SKIT), Jaipur
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 18px 32px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="font-size: 12px; color: #94a3b8; line-height: 1.5;">
                    You are receiving this because you registered for an S&amp;T Club event.
                  </td>
                  <td align="right" style="font-size: 12px; white-space: nowrap;">
                    <a href="https://snt-club.vercel.app" target="_blank" style="color: #0A146E; font-weight: 600; text-decoration: underline;">snt-club.vercel.app</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  await transporter.sendMail({
    from: `"S&T Club, SKIT" <${process.env.EMAIL_USER}>`,
    to,
    replyTo: process.env.EMAIL_USER,
    subject: `Reminder: ${eventTitle} — ${timeframeLabel}`,
    headers: {
      'List-Unsubscribe': `<mailto:${process.env.EMAIL_USER}?subject=unsubscribe>`,
      'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
    },
    text: textContent,
    html: htmlContent,
  });
}

/* ---------- EVENT ANNOUNCEMENT MAIL ---------- */
export async function sendEventAnnouncementMail(
  to: string,
  name: string,
  eventTitle: string,
  eventDate: string,
  eventTime: string,
  venue: string,
  registerLink: string,
  description: string,
) {
  const fromAddress = process.env.EMAIL_USER;

  const textContent =
    `Hi ${name},\n\n` +
    `We're excited to announce a new event from Science & Technology Club, SKIT!\n\n` +
    `${eventTitle}\n\n` +
    `${description}\n\n` +
    `Event Details:\n` +
    `• Date: ${eventDate}\n` +
    `• Time: ${eventTime}\n` +
    `• Venue: ${venue}\n\n` +
    `Register here: ${registerLink}\n\n` +
    `Seats are limited — register early!\n\n` +
    `Regards,\n` +
    `Science & Technology Club, SKIT Jaipur\n` +
    `https://snt-club.vercel.app\n\n` +
    `---\n` +
    `You are receiving this because you previously registered for an S&T Club event.\n` +
    `To unsubscribe, reply with subject "unsubscribe".`;

  const htmlContent = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light" />
  <title>New Event: ${eventTitle}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">

  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f1f5f9; width: 100%; margin: 0; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 560px; width: 100%; background-color: #ffffff; border: 1px solid #cbd5e1; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.06);">

          <!-- Club Header -->
          <tr>
            <td style="background-color: #0A146E; padding: 22px 32px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>
                    <span style="font-size: 16px; font-weight: 700; color: #ffffff; letter-spacing: 0.3px;">Science &amp; Technology Club</span>
                    <span style="font-size: 13px; color: #93c5fd; margin-left: 6px;">&bull; SKIT Jaipur</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- NEW EVENT badge + title -->
          <tr>
            <td style="padding: 28px 32px 12px 32px; background-color: #ffffff;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 14px;">
                <tr>
                  <td style="background-color: #EE4B76; border-radius: 6px; padding: 4px 12px; font-size: 11px; font-weight: 800; color: #ffffff; letter-spacing: 1.5px; text-transform: uppercase;">
                    &#10022; New Event
                  </td>
                </tr>
              </table>
              <h1 style="margin: 0 0 10px 0; font-size: 24px; font-weight: 800; color: #0A146E; line-height: 1.25;">${eventTitle}</h1>
              <p style="margin: 0; font-size: 15px; color: #334155; line-height: 1.7;">
                Hi <strong>${name}</strong>, we have something exciting for you.
              </p>
            </td>
          </tr>

          <!-- Description -->
          <tr>
            <td style="padding: 4px 32px 20px 32px; background-color: #ffffff;">
              <p style="margin: 0; font-size: 15px; color: #475569; line-height: 1.75;">${description}</p>
            </td>
          </tr>

          <!-- Event Details Table -->
          <tr>
            <td style="padding: 0 32px 24px 32px; background-color: #ffffff;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
                <tr>
                  <td style="padding: 13px 18px; border-bottom: 1px solid #e2e8f0; width: 80px; font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.6px;">Date</td>
                  <td style="padding: 13px 18px; border-bottom: 1px solid #e2e8f0; font-size: 14px; font-weight: 700; color: #0f172a;">${eventDate}</td>
                </tr>
                <tr>
                  <td style="padding: 13px 18px; border-bottom: 1px solid #e2e8f0; font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.6px;">Time</td>
                  <td style="padding: 13px 18px; border-bottom: 1px solid #e2e8f0; font-size: 14px; font-weight: 700; color: #0f172a;">${eventTime}</td>
                </tr>
                <tr>
                  <td style="padding: 13px 18px; font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.6px;">Venue</td>
                  <td style="padding: 13px 18px; font-size: 14px; font-weight: 600; color: #0f172a;">${venue}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td style="padding: 0 32px 28px 32px; background-color: #ffffff; text-align: center;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;">
                <tr>
                  <td style="border-radius: 8px; background-color: #0A146E;">
                    <a href="${registerLink}" target="_blank" style="display: inline-block; padding: 14px 36px; font-size: 15px; font-weight: 700; color: #ffffff; text-decoration: none; letter-spacing: 0.3px; border-radius: 8px;">
                      Register Now &rarr;
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin: 14px 0 0 0; font-size: 13px; color: #94a3b8;">Seats are limited. Register early to secure your spot.</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px 32px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="font-size: 12px; color: #94a3b8; line-height: 1.6;">
                    You are receiving this because you previously registered for an S&amp;T Club event.
                    To unsubscribe, reply with subject <em>unsubscribe</em>.
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 6px; font-size: 12px;">
                    <a href="https://snt-club.vercel.app" target="_blank" style="color: #0A146E; font-weight: 600; text-decoration: underline;">snt-club.vercel.app</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
  `.trim();

  await transporter.sendMail({
    from: `"S&T Club, SKIT" <${fromAddress}>`,
    to,
    replyTo: fromAddress,
    subject: `New Event: ${eventTitle} — Register Now!`,
    headers: {
      'List-Unsubscribe': `<mailto:${fromAddress}?subject=unsubscribe>`,
      'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
      'Precedence': 'bulk',
      'X-Mailer': 'SNT-Club-Mailer',
    },
    text: textContent,
    html: htmlContent,
  });
}

export async function sendCodeWithSnTMail(
  to: string,
  name: string,
  accessLink: string
) {
  // Plain-text fallback for maximum inbox trust & accessibility
  const textContent = `Dear Participant,

Thank you for registering for Code with S&T 5.0, organized by the Science & Technology Club.

Your registration has been successfully verified. Please find your quiz access details and schedule for tonight’s session below:

• Event: Code with S&T 5.0
• Date: 20th September 2026
• Start Time: 04:00 PM
• End Time: 05:00 PM IST Sharp
• Access Link: ${accessLink}

Important Instructions:
• Identity Verification: Join using the exact name and email address/alias provided during registration so your score can be properly recorded on the official leaderboard.
• Format: The contest consists of coding problems designed to test your programming skills, problem-solving ability and logical thinking.
• Perks & Recognition: All verified participants who successfully complete the contest will receive a Participation Certificate.
• Dispute Resolution: In the event of any discrepancy, ambiguity, or dispute regarding scoring, participation, or prize distribution, the decision of the Science & Technology Club will be considered final and binding.

For any real-time technical queries, reach out in the official S&T Club groups.

Best of luck, and code your way to the top! 🚀💻

Warm regards,
Team S&T
Science & Technology Club, SKIT Jaipur
https://snt-club.vercel.app`;

  // Styled, deliverability-optimized HTML
  const htmlContent = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light" />
  <title>Access Details: Code with S&amp;T 5.0</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f1f5f9; width: 100%; margin: 0; padding: 28px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 580px; width: 100%; background-color: #ffffff; border: 1px solid #cbd5e1; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.06);">
          
          <!-- Club Header Bar -->
          <tr>
            <td style="background-color: #0A146E; padding: 20px 28px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>
                    <span style="font-size: 16px; font-weight: 700; color: #ffffff; letter-spacing: 0.3px;">Science &amp; Technology Club</span>
                    <span style="font-size: 13px; color: #93c5fd; margin-left: 6px;">&bull; SKIT Jaipur</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Greeting & Lead -->
          <tr>
            <td style="padding: 28px 28px 12px 28px;">
              <p style="margin: 0; font-size: 15px; color: #1e293b; line-height: 1.6;">
                Dear <strong>${name || 'Participant'}</strong>,
              </p>
              <p style="margin: 12px 0 0 0; font-size: 14px; color: #334155; line-height: 1.6;">
                Thank you for registering for <strong>Code with S&amp;T 5.0</strong>, organized by the <em>Science &amp; Technology Club</em>.
              </p>
              <p style="margin: 10px 0 0 0; font-size: 14px; color: #334155; line-height: 1.6;">
                Your registration has been successfully verified. Please find your quiz access details and schedule for today&apos;s session below:
              </p>
            </td>
          </tr>

          <!-- Schedule & Details Card -->
          <tr>
            <td style="padding: 8px 28px 20px 28px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 8px;">
                <tr>
                  <td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0; width: 110px; font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase;">Event</td>
                  <td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: 14px; font-weight: 700; color: #0A146E;">Code with S&amp;T 5.0</td>
                </tr>
                <tr>
                  <td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase;">Date</td>
                  <td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: 14px; font-weight: 600; color: #0f172a;">20th September 2026</td>
                </tr>
                <tr>
                  <td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase;">Start Time</td>
                  <td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: 14px; font-weight: 600; color: #0f172a;">04:00 PM</td>
                </tr>
                <tr>
                  <td style="padding: 10px 16px; font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase;">End Time</td>
                  <td style="padding: 10px 16px; font-size: 14px; font-weight: 700; color: #dc2626;">05:00 PM IST Sharp</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Primary Access Link CTA -->
          <tr>
            <td align="center" style="padding: 0 28px 24px 28px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="center" style="border-radius: 8px; background-color: #0A146E;">
                    <a href="${accessLink}" target="_blank" style="font-size: 15px; font-weight: 700; color: #ffffff; text-decoration: none; padding: 14px 32px; display: inline-block;">
                      Access Contest Arena &rarr;
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin: 10px 0 0 0; font-size: 12px; color: #64748b;">
                Or access directly via link: <br />
                <a href="${accessLink}" target="_blank" style="color: #0A146E; word-break: break-all; font-weight: 600;">${accessLink}</a>
              </p>
            </td>
          </tr>

          <!-- Important Instructions -->
          <tr>
            <td style="padding: 0 28px 20px 28px;">
              <div style="background-color: #fffbeb; border: 1.5px solid #fef3c7; border-radius: 8px; padding: 18px;">
                <p style="margin: 0 0 12px 0; font-size: 13px; font-weight: 800; color: #92400e; text-transform: uppercase; letter-spacing: 0.5px;">
                  ⚠️ Important Instructions:
                </p>
                
                <p style="margin: 0 0 8px 0; font-size: 13px; color: #78350f; line-height: 1.5;">
                  <strong>• Identity Verification:</strong> Join using the exact name and email address/alias provided during registration so your score can be properly recorded on the official leaderboard.
                </p>
                <p style="margin: 0 0 8px 0; font-size: 13px; color: #78350f; line-height: 1.5;">
                  <strong>• Format:</strong> The contest consists of coding problems designed to test your programming skills, problem-solving ability and logical thinking.
                </p>
                <p style="margin: 0 0 8px 0; font-size: 13px; color: #78350f; line-height: 1.5;">
                  <strong>• Perks &amp; Recognition:</strong> All verified participants who successfully complete the contest will receive a Participation Certificate.
                </p>
                <p style="margin: 0; font-size: 13px; color: #78350f; line-height: 1.5;">
                  <strong>• Dispute Resolution:</strong> In the event of any discrepancy, ambiguity, or dispute regarding scoring, participation, or prize distribution, the decision of the Science &amp; Technology Club will be considered final and binding.
                </p>
              </div>
            </td>
          </tr>

          <!-- Technical Queries & Sign-off -->
          <tr>
            <td style="padding: 0 28px 24px 28px;">
              <p style="margin: 0 0 16px 0; font-size: 13.5px; color: #475569; line-height: 1.6;">
                For any real-time technical queries, reach out in the official S&amp;T Club groups.
              </p>
              <p style="margin: 0 0 16px 0; font-size: 14.5px; font-weight: 600; color: #0A146E;">
                Best of luck, and code your way to the top! 🚀💻
              </p>
              <p style="margin: 0; font-size: 14px; color: #334155; line-height: 1.4;">
                <em>Warm regards,</em><br />
                <strong>Team S&amp;T</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px 28px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="font-size: 12px; color: #94a3b8;">
                    Science &amp; Technology Club &bull; SKIT Jaipur
                  </td>
                  <td align="right" style="font-size: 12px;">
                    <a href="https://snt-club.vercel.app" target="_blank" style="color: #0A146E; font-weight: 600; text-decoration: underline;">snt-club.vercel.app</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  await transporter.sendMail({
  from: `"S&T Club, SKIT" <${process.env.EMAIL_USER}>`,
  to,
  replyTo: process.env.EMAIL_USER,
  subject: `Code With S&T 5.0 — Contest Details & Access Link`,
  headers: {
    'List-Unsubscribe': `<mailto:${process.env.EMAIL_USER}?subject=unsubscribe>`,
    'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
    'Precedence': 'bulk',
    'X-Mailer': 'SNT-Club-Mailer',
  },
  text: textContent,
  html: htmlContent,
});
}
