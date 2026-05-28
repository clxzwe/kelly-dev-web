import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory sliding window rate limiter cache
type RequestLog = {
  timestamp: number;
};
const ipCache = new Map<string, RequestLog[]>();

export async function POST(req: NextRequest) {
  try {
    // 1. Payload Extraction and Parsing
    const body = await req.json();
    const { email, code, isFinalSubmit, ...registrationDetails } = body;

    // 2. IP-Based Rate Limiting
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const now = Date.now();
    const threeMinutes = 3 * 60 * 1000;

    const logs = ipCache.get(ip) || [];
    const recentLogs = logs.filter(log => now - log.timestamp < threeMinutes);

    if (recentLogs.length >= 5) {
      return NextResponse.json(
        { success: false, message: 'TOO MANY REQUESTS. PLEASE WAIT 5 MINUTES BEFORE RETRYING.' },
        { status: 429 }
      );
    }

    recentLogs.push({ timestamp: now });
    ipCache.set(ip, recentLogs);

    // 3. Payload Validation & Sanitization
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ success: false, message: 'Invalid or missing email' }, { status: 400 });
    }
    // Strict email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, message: 'Malformed email structure' }, { status: 400 });
    }

    if (!code || typeof code !== 'string') {
      return NextResponse.json({ success: false, message: 'Invalid or missing verification code' }, { status: 400 });
    }
    // Strict 6-digit code format validation
    const codeRegex = /^\d{6}$/;
    if (!codeRegex.test(code)) {
      return NextResponse.json({ success: false, message: 'Malformed code structure' }, { status: 400 });
    }

    // Server-side environment key check
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      return NextResponse.json({ success: false, message: 'Server configuration error' }, { status: 500 });
    }

    // 4. Web3Forms Payload Composition
    const web3Payload = new FormData();
    web3Payload.append('access_key', accessKey);

    if (isFinalSubmit) {
      // Package final registration data
      const { name, whatsapp, track, github, stack, additionalInfo, vibeCodeOption, aiToolsUsed, expYears, expMonths, roleBestFit, portfolio, strategy } = registrationDetails;
      
      // Strict inputs sanitization to prevent injected scripts
      const sanitize = (val: any) => typeof val === 'string' ? val.replace(/<[^>]*>/g, '') : '';

      web3Payload.append('email', email.trim().toLowerCase());
      web3Payload.append('name', sanitize(name));
      web3Payload.append('whatsapp', sanitize(whatsapp));
      web3Payload.append('track', sanitize(track));
      web3Payload.append('subject', `New Recruit Registration Secured (${String(track).toUpperCase()})`);
      web3Payload.append('from_name', 'Kelly Onboarding Proxy');

      if (track === 'dev') {
        web3Payload.append('github', sanitize(github));
        web3Payload.append('stack', sanitize(stack));
        web3Payload.append('additional_info', sanitize(additionalInfo));
        web3Payload.append('vibe_coding_option', sanitize(vibeCodeOption));
        web3Payload.append('ai_tools_deployed', sanitize(aiToolsUsed));
        web3Payload.append('experience_duration', `${sanitize(expYears)} Years, ${sanitize(expMonths)} Months`);
        web3Payload.append('profile_role', sanitize(roleBestFit));
      } else {
        web3Payload.append('portfolio', sanitize(portfolio));
        web3Payload.append('strategy', sanitize(strategy));
      }
    } else {
      // Package verification OTP send payload
      web3Payload.append('email', email.trim().toLowerCase());
      web3Payload.append('subject', 'KELLY NETWORK - Verification Action Required');
      web3Payload.append('from_name', 'Kelly Onboarding Proxy');
      web3Payload.append('message', `
ATTENTION RECRUIT OPERATOR,

Your dynamic 6-digit Kelly Network security verification pin code is:

[ ${code} ]

Enter this pin on the secure onboarding vector screen to unlock direct platform channel credentials.

- KELLY NETWORK CORE ARCHITECTURE
`);
    }

    // 5. Proxy POST request to Web3Forms API
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: web3Payload,
    });

    const result = await response.json();
    if (result.success) {
      // ── DISCORD WEBHOOK ALERT STREAM ────────────────────────────────────
      // Only fire on final registration submissions, not OTP dispatch calls
      if (isFinalSubmit) {
        const { name, track } = registrationDetails;
        const webhookUrl =
          track === 'dev'
            ? process.env.DISCORD_DEV_WEBHOOK_URL
            : process.env.DISCORD_GROWTH_WEBHOOK_URL;

        if (webhookUrl) {
          const trackLabel =
            track === 'dev' ? '⚙️ Developer Track' : '📈 Growth Agent Track';

          const discordPayload = {
            embeds: [
              {
                title: '🚨 NEW APPLICANT MANIFESTED',
                color: track === 'dev' ? 0x9b59b6 : 0xf1c40f, // purple for dev, yellow for growth
                description:
                  'A new member has completed the application processing verification gateway.',
                fields: [
                  {
                    name: '👤 Name/Handle',
                    value: String(name || 'Unknown').slice(0, 1024),
                    inline: true,
                  },
                  {
                    name: '📧 Email Coordinates',
                    value: String(email || 'Unknown').slice(0, 1024),
                    inline: true,
                  },
                  {
                    name: '🛠️ Selected Track Role',
                    value: trackLabel,
                    inline: false,
                  },
                ],
                timestamp: new Date().toISOString(),
                footer: {
                  text: 'Kelly Network Onboarding Matrix',
                },
              },
            ],
          };

          // Fire-and-forget — a failed Discord ping must never block the main submission
          fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(discordPayload),
          }).catch(() => {
            // Silently swallow — Discord outages should not surface to the applicant
          });
        }
      }
      // ── END DISCORD ALERT STREAM ─────────────────────────────────────────

      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      return NextResponse.json({ success: false, message: result.message || 'Web3Forms API rejected request' }, { status: 400 });
    }

  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
