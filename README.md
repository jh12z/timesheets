# Timesheets application

<p>
<a href="https://github.com/jh12z/timesheets/blob/master/LICENSE"><img src="https://img.shields.io/github/license/jh12z/timesheets.svg" alt="License" height="18"></a>
<a href="https://github.com/jh12z/timesheets/actions/workflows/build.yml"><img src="https://github.com/jh12z/timesheets/actions/workflows/build.yml/badge.svg" alt="Build" height="18"></a>
</p>

Single-page application (SPA) using Svelte 5 / SvelteKit for managing your timesheets.

Designed to run entirely on the client side, without any server-side dependencies.

No styles at the moment (looks very ugly) but will be using [Tabler](https://github.com/tabler/tabler) once functionality is implemented.

Intention to make it a PWA (Progressive Web Application) so once downloaded, the app will be cached for offline use, ensuring it works seamlessly without an internet connection.

All data is stored in the browser using local storage (evaluating between a simple self-contained option or something more sophisticated), accessible only to you or others with access to your device.

## Features

- SPA application
- <del>PWA application</del>
- Client-side only application (there is no server-side component)
- <del>Application is downloaded on first usage and cached so no need to have internet connection for it to work</del>
- Data is stored in the browser (Local storage currently) and nobody but you or whoever has access to your browser has access to it

## Pending

- Provide a nice stylesheet
- Add offline caching
- Mark weekends differently
- Allow to dynamically add more attributes for each project
- Add a settings page so things like min hours per day can be added
- Add a holidays page or a way to download and maintain holidays
- Allow exporting/saving one month
- Register link and file handlers to open the saved files
- Integrate with notifications. Reminder to fill the spreadsheet every day
- Export to CSV/TSV, excel
- Generate a PDF with marked records
- Backup to Dropbox, Google Drive
- Keyboard shortcuts and keyboard shortcuts popup
- Provide a changelog page
- Reports screen (per month, per year)
- Keyboard friendly navigation in the timesheet, up/down/left/right, auto select cells, click F to fill the rest of the hours to make up to the 7.5 per day