import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, organization, email, message } = req.body || {};

  if (!name || !organization || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const toEmail = process.env.CONTACT_EMAIL || 'spv@sovereignaicorridor.ca';

  try {
    if (!smtpHost || !smtpUser || !smtpPass) {
      console.log('SMTP not configured. Form submission logged:');
      console.log({ name, organization, email, message, toEmail });
      return res.status(200).json({
        success: true,
        message: 'Form received. SMTP not configured — email logged to console.',
      });
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: `"Sovereign AI Corridor Website" <${smtpUser}>`,
      to: toEmail,
      replyTo: email,
      subject: `New Briefing Request from ${name} — ${organization}`,
      text: `Name: ${name}\nOrganization: ${organization}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h2>New Briefing Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Organization:</strong> ${organization}</p>
        <p><strong>Email:</strong> ${email}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
    });

    return res.status(200).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Email send error:', error);
    return res.status(500).json({ error: 'Failed to send message. Please try again later.' });
  }
}
