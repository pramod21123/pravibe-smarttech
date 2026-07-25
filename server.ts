import express from 'express';
import path from 'path';
import { google } from 'googleapis';
import { createServer as createViteServer } from 'vite';

const PORT = 3000;
let activeSpreadsheetId = process.env.SPREADSHEET_ID || '';

function getGoogleSheetsClient() {
  const clientId = process.env.PRIMARY_OAUTH_CLIENT_ID;
  const clientSecret = process.env.PRIMARY_OAUTH_CLIENT_SECRET;
  const refreshToken = process.env.PRIMARY_OAUTH_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return null;
  }

  const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
  oauth2Client.setCredentials({ refresh_token: refreshToken });

  return {
    sheets: google.sheets({ version: 'v4', auth: oauth2Client }),
    drive: google.drive({ version: 'v3', auth: oauth2Client }),
  };
}

async function getOrCreateSpreadsheet() {
  if (activeSpreadsheetId) {
    return activeSpreadsheetId;
  }

  const client = getGoogleSheetsClient();
  if (!client) {
    throw new Error('OAuth credentials are not configured in environment variables.');
  }

  // Search Drive for existing "Pravibe Website Leads" sheet
  try {
    const searchRes = await client.drive.files.list({
      q: "name = 'Pravibe Website Leads' and mimeType = 'application/vnd.google-apps.spreadsheet' and trashed = false",
      fields: 'files(id, name)',
    });

    if (searchRes.data.files && searchRes.data.files.length > 0) {
      activeSpreadsheetId = searchRes.data.files[0].id!;
      return activeSpreadsheetId;
    }
  } catch (e) {
    console.warn('Drive search failed, creating new sheet:', e);
  }

  // Create a new spreadsheet with header row
  const createRes = await client.sheets.spreadsheets.create({
    requestBody: {
      properties: {
        title: 'Pravibe Website Leads',
      },
      sheets: [
        {
          properties: {
            title: 'Leads',
          },
          data: [
            {
              startRow: 0,
              startColumn: 0,
              rowData: [
                {
                  values: [
                    { userEnteredValue: { stringValue: 'Timestamp' } },
                    { userEnteredValue: { stringValue: 'Name' } },
                    { userEnteredValue: { stringValue: 'Email' } },
                    { userEnteredValue: { stringValue: 'Phone' } },
                    { userEnteredValue: { stringValue: 'Company' } },
                    { userEnteredValue: { stringValue: 'Service' } },
                    { userEnteredValue: { stringValue: 'Message' } },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  });

  activeSpreadsheetId = createRes.data.spreadsheetId!;
  return activeSpreadsheetId;
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // Health check API
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  // Contact form submission -> Google Sheets
  app.post('/api/leads', async (req, res) => {
    try {
      const { name, email, phone, company, service, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({ success: false, error: 'Name, email, and message are required.' });
      }

      const client = getGoogleSheetsClient();
      if (!client) {
        console.warn('OAuth credentials pending. Form submit processed without Google Sheets log.');
        return res.status(200).json({
          success: true,
          loggedToSheets: false,
          message: 'Lead received. (OAuth setup pending)',
        });
      }

      const spreadsheetId = await getOrCreateSpreadsheet();
      const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });

      await client.sheets.spreadsheets.values.append({
        spreadsheetId,
        range: 'Leads!A:G',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [
            [
              timestamp,
              name || '',
              email || '',
              phone || '',
              company || '',
              service || '',
              message || '',
            ],
          ],
        },
      });

      return res.status(200).json({
        success: true,
        loggedToSheets: true,
        spreadsheetId,
        spreadsheetUrl: `https://docs.google.com/spreadsheets/d/${spreadsheetId}`,
      });
    } catch (error: any) {
      console.error('Error logging lead to Google Sheets:', error);
      return res.status(500).json({
        success: false,
        error: error.message || 'Failed to record lead in Google Sheets',
      });
    }
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
