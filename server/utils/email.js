const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const sendBookingEmail = async (booking) => {
  const emailUser = process.env.EMAIL_USER || 'booking.poojatravel@gmail.com';
  const emailPass = process.env.EMAIL_PASS; // App Password

  console.log(`✉️ Preparing booking email for Ticket #${booking.id}...`);

  // Parse passenger details if stored as JSON string
  let passengers = [];
  try {
    passengers = typeof booking.passenger_details === 'string' 
      ? JSON.parse(booking.passenger_details) 
      : booking.passenger_details;
  } catch (e) {
    passengers = booking.passenger_details || [];
  }

  const firstPassenger = passengers[0] || {};
  const customerEmail = firstPassenger.email || '';
  const customerPhone = firstPassenger.phone || '';
  const pickupAddress = firstPassenger.pickup_address || '';
  const pickupTime = firstPassenger.pickup_time || '';
  const specialNotes = firstPassenger.special_notes || '';

  const emailSubject = `Booking Confirmation - Ticket #PJ-${booking.id} - Pooja Tours & Travels`;
  
  const formattedTravelDate = booking.travel_date 
    ? (typeof booking.travel_date === 'string' 
        ? booking.travel_date.split('T')[0] 
        : (booking.travel_date instanceof Date 
            ? booking.travel_date.toISOString().split('T')[0] 
            : String(booking.travel_date).split('T')[0]))
    : 'N/A';

  const emailBody = `
--------------------------------------------------
POOJA TOURS & TRAVELS - BOOKING CONFIRMATION RECEIPT
--------------------------------------------------
Ticket ID:      #PJ-${booking.id}
Route:          ${booking.route_from} to ${booking.route_to}
Vehicle Type:   ${booking.vehicle_name || (booking.booking_type === 'bus' ? 'Bus Seat(s)' : 'Assigned Cab')}
Travel Date:    ${formattedTravelDate}
Pickup Time:    ${pickupTime || 'N/A'}
Pickup Address: ${pickupAddress || 'N/A'}
Total Amount:   ₹${booking.amount}

PASSENGER DETAILS:
${passengers.map((p, i) => `${i + 1}. ${p.name} (Age: ${p.age}, Gender: ${p.gender})`).join('\n')}

CONTACT INFORMATION:
Primary Phone:  ${customerPhone}
Customer Email: ${customerEmail}
Special Notes:  ${specialNotes || 'None'}

Thank you for choosing Pooja Tours & Travels!
The owner will contact you shortly to coordinate your pickup details.
--------------------------------------------------
`;

  // Create HTML body for premium look
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 2px solid #0d3859; border-radius: 12px; background-color: #ffffff;">
      <div style="text-align: center; border-bottom: 2px solid #f1f5f9; padding-bottom: 15px; margin-bottom: 20px;">
        <h2 style="color: #0d3859; margin: 0; text-transform: uppercase; tracking: 1px;">Pooja Tours & Travels</h2>
        <p style="color: #00b4d8; margin: 5px 0 0 0; font-weight: bold; font-size: 14px;">Booking Confirmation Receipt</p>
      </div>

      <div style="margin-bottom: 25px; line-height: 1.6; color: #334155;">
        <p>Dear Customer,</p>
        <p>Thank you for contacting Pooja Tours & Travels! Your booking details have been successfully received and sent to the owner. Below is your confirmed booking ticket receipt:</p>
      </div>

      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; margin-bottom: 25px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #475569; width: 130px;">Ticket ID:</td>
            <td style="padding: 6px 0; font-weight: bold; color: #0f172a;">#PJ-${booking.id}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #475569;">Route:</td>
            <td style="padding: 6px 0; color: #0f172a;">${booking.route_from} to ${booking.route_to}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #475569;">Vehicle Type:</td>
            <td style="padding: 6px 0; color: #0f172a;">${booking.vehicle_name || (booking.booking_type === 'bus' ? 'Bus Seat(s)' : 'Assigned Cab')}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #475569;">Travel Date:</td>
            <td style="padding: 6px 0; color: #0f172a;">${formattedTravelDate}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #475569;">Pickup Time:</td>
            <td style="padding: 6px 0; color: #0f172a;">${pickupTime || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #475569;">Pickup Address:</td>
            <td style="padding: 6px 0; color: #0f172a;">${pickupAddress || 'N/A'}</td>
          </tr>
          <tr style="border-top: 1px solid #e2e8f0;">
            <td style="padding: 10px 0 0 0; font-weight: bold; color: #0d3859; font-size: 16px;">Total Fare:</td>
            <td style="padding: 10px 0 0 0; font-weight: bold; color: #10b981; font-size: 18px;">₹${booking.amount}</td>
          </tr>
        </table>
      </div>

      <div style="margin-bottom: 25px;">
        <h4 style="color: #0d3859; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; margin-bottom: 10px; font-size: 13px; text-transform: uppercase;">Passengers</h4>
        <ol style="margin: 0; padding-left: 20px; font-size: 13px; color: #475569;">
          ${passengers.map(p => `<li><strong>${p.name}</strong> (Age: ${p.age}, Gender: ${p.gender})</li>`).join('')}
        </ol>
      </div>

      <div style="margin-bottom: 25px;">
        <h4 style="color: #0d3859; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; margin-bottom: 10px; font-size: 13px; text-transform: uppercase;">Contact & Safety Info</h4>
        <p style="margin: 3px 0; font-size: 13px; color: #475569;"><strong>Phone:</strong> ${customerPhone}</p>
        <p style="margin: 3px 0; font-size: 13px; color: #475569;"><strong>Email:</strong> ${customerEmail}</p>
        ${specialNotes ? `<p style="margin: 3px 0; font-size: 13px; color: #475569;"><strong>Special Requests:</strong> ${specialNotes}</p>` : ''}
      </div>

      <div style="text-align: center; border-top: 1px solid #f1f5f9; padding-top: 15px; font-size: 12px; color: #94a3b8; line-height: 1.5;">
        <p style="margin: 0;">Pooja Tours & Travels | Pune, India</p>
        <p style="margin: 3px 0 0 0;">Support Email: <a href="mailto:booking.poojatravel@gmail.com" style="color: #00b4d8; text-decoration: none;">booking.poojatravel@gmail.com</a></p>
      </div>
    </div>
  `;

  // Write to local logs for immediate developer verification
  const logDir = path.join(__dirname, '..', 'logs');
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }
  const logPath = path.join(logDir, 'sent_emails.log');
  const logEntry = `\n==================================================\n` +
    `DATE: ${new Date().toISOString()}\n` +
    `FROM: ${emailUser}\n` +
    `TO: ${customerEmail || 'N/A'}\n` +
    `CC: ${emailUser}\n` +
    `SUBJECT: ${emailSubject}\n` +
    emailBody +
    `==================================================\n`;
  fs.appendFileSync(logPath, logEntry, 'utf-8');
  console.log(`📁 Booking ticket written to local server email log: server/logs/sent_emails.log`);

  // Check if SMTP credentials are set
  if (!emailPass) {
    console.warn(`⚠️ EMAIL_PASS is not configured in server/.env. Skipped actual SMTP dispatch. Check logs/sent_emails.log for details.`);
    return false;
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass
      }
    });

    const mailOptions = {
      from: `"Pooja Tours & Travels" <${emailUser}>`,
      to: customerEmail || emailUser,
      cc: emailUser, // Send copy to owner
      subject: emailSubject,
      text: emailBody,
      html: htmlBody
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email successfully dispatched via SMTP: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error(`❌ SMTP transport failed:`, error.message);
    return false;
  }
};

const sendInquiryEmail = async (inquiry) => {
  const emailUser = process.env.EMAIL_USER || 'booking.poojatravel@gmail.com';
  const emailPass = process.env.EMAIL_PASS; // App Password

  console.log(`✉️ Preparing inquiry email from ${inquiry.name}...`);

  const emailSubject = `New Booking Inquiry - From ${inquiry.name} - Pooja Tours & Travels`;
  
  const emailBody = `
--------------------------------------------------
POOJA TOURS & TRAVELS - NEW CUSTOMER INQUIRY ALERT
--------------------------------------------------
Customer Name:  ${inquiry.name}
Email Address:  ${inquiry.email}
Phone Number:   ${inquiry.phone || 'N/A'}

MESSAGE & TRIP DETAILS:
${inquiry.message}
--------------------------------------------------
`;

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 2px solid #00b4d8; border-radius: 12px; background-color: #ffffff;">
      <div style="text-align: center; border-bottom: 2px solid #f1f5f9; padding-bottom: 15px; margin-bottom: 20px;">
        <h2 style="color: #0d3859; margin: 0; text-transform: uppercase; tracking: 1px;">Pooja Tours & Travels</h2>
        <p style="color: #ea580c; margin: 5px 0 0 0; font-weight: bold; font-size: 14px;">New Customer Inquiry Alert</p>
      </div>

      <div style="margin-bottom: 25px; line-height: 1.6; color: #334155;">
        <p>Hello Ajay,</p>
        <p>You have received a new business booking enquiry from the website contact form. Below are the traveler details:</p>
      </div>

      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; margin-bottom: 25px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #475569; width: 130px;">Customer Name:</td>
            <td style="padding: 6px 0; font-weight: bold; color: #0f172a;">${inquiry.name}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #475569;">Email Address:</td>
            <td style="padding: 6px 0; color: #0f172a;"><a href="mailto:${inquiry.email}" style="color: #00b4d8; text-decoration: none;">${inquiry.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #475569;">Phone Number:</td>
            <td style="padding: 6px 0; color: #0f172a;">${inquiry.phone || 'N/A'}</td>
          </tr>
        </table>
      </div>

      <div style="margin-bottom: 25px; background-color: #fffaf0; border: 1px solid #ffd8a8; border-radius: 8px; padding: 15px;">
        <h4 style="color: #d9480f; margin: 0 0 10px 0; font-size: 13px; text-transform: uppercase;">Message & Journey Details</h4>
        <p style="margin: 0; font-size: 13.5px; color: #495057; line-height: 1.6; white-space: pre-line;">
          ${inquiry.message}
        </p>
      </div>

      <div style="text-align: center; border-top: 1px solid #f1f5f9; padding-top: 15px; font-size: 12px; color: #94a3b8; line-height: 1.5;">
        <p style="margin: 0;">Pooja Tours & Travels | System Notification</p>
      </div>
    </div>
  `;

  // Write to local logs
  const logDir = path.join(__dirname, '..', 'logs');
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }
  const logPath = path.join(logDir, 'sent_emails.log');
  const logEntry = `\n==================================================\n` +
    `INQUIRY EMAIL DATE: ${new Date().toISOString()}\n` +
    `FROM: website_inquiry@poojatravels.com\n` +
    `TO: ${emailUser}\n` +
    `SUBJECT: ${emailSubject}\n` +
    emailBody +
    `==================================================\n`;
  fs.appendFileSync(logPath, logEntry, 'utf-8');

  if (!emailPass) {
    console.warn(`⚠️ EMAIL_PASS is not configured in server/.env. Skipped actual SMTP dispatch.`);
    return false;
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass
      }
    });

    const mailOptions = {
      from: `"Pooja Travels Website" <${emailUser}>`,
      to: emailUser, // Sent directly to the owner
      subject: emailSubject,
      text: emailBody,
      html: htmlBody
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Inquiry Email successfully dispatched via SMTP: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error(`❌ SMTP transport failed:`, error.message);
    return false;
  }
};

module.exports = { sendBookingEmail, sendInquiryEmail };
