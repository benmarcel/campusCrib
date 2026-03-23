export function RoommateRequestEmail({
  receiverName,
  senderName,
  senderSchool,
  senderDepartment,
  senderBio,
  requestsUrl,
}: {
  receiverName: string
  senderName: string
  senderSchool: string
  senderDepartment?: string
  senderBio?: string
  requestsUrl: string
}) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>New Roommate Request</title>
      </head>
      <body style="margin:0;padding:0;background:#F8FAFC;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
        
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8FAFC;padding:40px 16px;">
          <tr>
            <td align="center">
              <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
                
                <!-- Logo / Brand -->
                <tr>
                  <td style="padding-bottom:32px;text-align:center;">
                    <span style="font-size:22px;font-weight:900;color:#1a6b4a;letter-spacing:-0.5px;">
                      Campus Crib
                    </span>
                  </td>
                </tr>

                <!-- Card -->
                <tr>
                  <td style="background:#ffffff;border-radius:24px;border:1px solid #e8f0ec;overflow:hidden;">
                    
                    <!-- Green top bar -->
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="background:#1a6b4a;padding:28px 36px;">
                          <p style="margin:0;font-size:13px;color:#9fe1cb;font-weight:600;text-transform:uppercase;letter-spacing:1px;">
                            Find Roomie
                          </p>
                          <h1 style="margin:8px 0 0;font-size:24px;font-weight:900;color:#ffffff;line-height:1.2;">
                            Someone wants to room with you
                          </h1>
                        </td>
                      </tr>
                    </table>

                    <!-- Body -->
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:32px 36px;">
                          
                          <p style="margin:0 0 24px;font-size:15px;color:#475569;line-height:1.6;">
                            Hi <strong style="color:#1e293b;">${receiverName}</strong>, 
                            <strong style="color:#1a6b4a;">${senderName}</strong> has sent you 
                            a connect request on Campus Crib.
                          </p>

                          <!-- Sender info card -->
                          <table width="100%" cellpadding="0" cellspacing="0" 
                            style="background:#f0f7f4;border-radius:16px;border:1px solid #d1e8dc;margin-bottom:28px;">
                            <tr>
                              <td style="padding:20px 24px;">
                                <p style="margin:0 0 4px;font-size:17px;font-weight:900;color:#1e293b;">
                                  ${senderName}
                                </p>
                                <p style="margin:0 0 12px;font-size:13px;color:#64748b;">
                                  📍 ${senderSchool}${senderDepartment ? ` · ${senderDepartment}` : ''}
                                </p>
                                ${senderBio ? `
                                <p style="margin:0;font-size:14px;color:#475569;line-height:1.6;font-style:italic;border-top:1px solid #d1e8dc;padding-top:12px;">
                                  "${senderBio}"
                                </p>` : ''}
                              </td>
                            </tr>
                          </table>

                          <p style="margin:0 0 24px;font-size:14px;color:#64748b;line-height:1.6;">
                            They paid a ₦200 connect fee to reach you. 
                            Head to your requests page to accept or decline.
                          </p>

                          <!-- CTA Button -->
                          <table cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="background:#1a6b4a;border-radius:12px;">
                                <a href="${requestsUrl}" 
                                  style="display:inline-block;padding:14px 28px;font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;">
                                  View Request →
                                </a>
                              </td>
                            </tr>
                          </table>

                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding:24px 0;text-align:center;">
                    <p style="margin:0;font-size:12px;color:#94a3b8;">
                      Campus Crib · Verified student housing in Nigeria
                    </p>
                    <p style="margin:4px 0 0;font-size:12px;color:#cbd5e1;">
                      You received this because you have an active roommate profile.
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>

      </body>
    </html>
  `
}