# Namecheap Deploy Instructions: AR_AI Personal AI Website

## Step 1: Prepare Your Website Files

1.  Ensure your AR_AI website files are ready for deployment. This includes all HTML, CSS, JavaScript, images, and any other necessary files.  Compress these files into a single zip archive (e.g., `ar_ai.zip`).

## Step 2: Access Your Namecheap cPanel

1.  Log in to your Namecheap account.
2.  Navigate to the cPanel interface for your hosting account.

## Step 3: Upload Files via FTP

1.  In cPanel, locate the "File Manager" or use an FTP client (like FileZilla) to connect to your server.  You'll need your FTP hostname, username, and password (found in your cPanel).
2.  Navigate to the `public_html` directory (or your website's root directory).
3.  Upload the `ar_ai.zip` archive to the `public_html` directory.
4.  Once uploaded, extract the `ar_ai.zip` archive within the `public_html` directory.  Most FTP clients allow for this directly, or you can use the cPanel File Manager's built-in extraction tool.

## Step 4: Set File Permissions

1.  After extracting, you need to set the correct file permissions.  This is crucial for security and functionality.
2.  Using your FTP client or cPanel File Manager, recursively change the permissions of all files and folders within the `public_html/ar_ai` (or your website's root folder) directory to `755` for directories and `644` for files.  Note that some FTP clients allow you to set these permissions during upload.

## Step 5: Database Setup (If Applicable)

1.  If your AR_AI website uses a database (e.g., MySQL), you'll need to create a database and user within cPanel's MySQL database interface.
2.  Import your database SQL file into the newly created database.
3.  Update your website's configuration files (e.g., `config.php`, `.env`) with the correct database credentials (hostname, username, password, database name).

## Step 6: Configure Website Settings (If Applicable)

1.  Check for any configuration files within your website's files (e.g., `.htaccess`, `config.php`, `settings.json`).  These files may require adjustments to match your Namecheap hosting environment.  Common adjustments include:
    *   Setting the correct paths to your files and directories.
    *   Configuring database connection details (if applicable).
    *   Adjusting URL settings.

## Step 7: Test Your Website

1.  Access your website using your domain name (e.g., `www.ar-ai.com`).
2.  Thoroughly test all aspects of your website to ensure everything is working correctly.

## Step 8: Troubleshooting

1.  If you encounter any issues, check the Namecheap support documentation or contact their support team.  Common issues include incorrect file permissions, database connection problems, and configuration errors.  Check your website's error logs for more detailed information.


## Step 9:  (Optional)  SSL Certificate Installation

1. If you purchased an SSL certificate, install it through cPanel's SSL/TLS manager.  This will enable HTTPS for your website.