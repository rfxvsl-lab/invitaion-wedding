/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://undangkankita.web.id',
    generateRobotsTxt: true, // Otomatis bikin robots.txt
    // Opsional: Jika ingin exclude halaman admin/dashboard
    exclude: ['/admin/*', '/dashboard/*'],
}
