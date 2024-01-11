# Description

Automated WordPress Theme File Downloader: A Node.js-based crawler using Puppeteer to log in to WordPress, navigate the theme editor, and efficiently download theme files. Ideal for backup, migration, or development purposes.

# WHY?

No access to the WordPress server for FTP, thanks to external consultants or smth. Needed to dive into files, many of which had duplicate names or were useless. The goal: to export theme files for code editor searches. WordPress UI wasn't cutting it – no search through all file contents, no export option. This is one of the many reasons I don't like WordPress and don't use it.

Looked up solutions, found only WordPress plugins. Not about to load another plugin into this legacy system, basically run by consultants. So, the plan: download these files, but without the drag of manual saving and copying. Started with a browser script, ended up crawling the site. Way more efficient, and I could stash files exactly where and how I wanted.

# HOW?

1. Install Dependencies: Run `npm install`.
2. Environment Variables: Create a .env file in the root directory. Add `WP_URL`, `WP_USER`, and `WP_PASSWORD` variables for your WordPress credentials.
   > [!NOTE] >`WP_URL` should include the protocol (https://) and domain, but not any trailing slashes or paths (e.g., https://example.com).
3. Run the Script: Execute `npm run dev` to start the crawling process.

The script logs into the WP admin, accesses the theme editor, and downloads files, handling duplicates by versioning. Files are saved in a structured format for easy navigation and searchability in any code editor.
