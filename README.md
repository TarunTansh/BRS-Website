# Bharat Rojgar Sewa - Website

Modern, responsive static website for Bharat Rojgar Sewa (भारत रोज़गार सेवा) - WhatsApp-based employment platform for India.

## 🚀 Features

- **Fully Responsive** - Works perfectly on mobile, tablet, and desktop
- **Hindi + English** - Bilingual content for better reach
- **WhatsApp Integration** - Direct links to start conversations
- **Modern Design** - Clean, professional UI with smooth animations
- **SEO Optimized** - Meta tags, Open Graph, and semantic HTML
- **Fast Loading** - Pure HTML/CSS/JS with no frameworks
- **Zero Dependencies** - No build process required

## 📁 Structure

```
BRS-Website/
├── index.html          # Main landing page
├── styles.css          # All styles and responsive design
├── script.js           # Interactive features and animations
├── README.md           # This file
└── .gitignore         # Git ignore file
```

## 🎨 Design System

### Colors
- **Primary Green**: #25D366 (WhatsApp green)
- **Secondary**: #128C7E
- **Accent**: #FF6B35
- **Text**: #1a1a1a, #666

### Typography
- **Hindi**: Noto Sans Devanagari
- **English**: Inter
- **Fallback**: System fonts

## 📊 Current Stats (Live Data)

- **7,039** registered candidates
- **397** active jobs
- **3,442** successful connections
- **+135%** week-over-week growth

## 🚀 Deployment

### Option 1: GitHub Pages (Recommended)
1. Push to GitHub
2. Go to repository Settings
3. Navigate to Pages section
4. Select `main` branch
5. Website will be live at `https://tarunTansh.github.io/BRS-Website`

### Option 2: Netlify
1. Drag and drop the folder to [Netlify Drop](https://app.netlify.com/drop)
2. Or connect GitHub repo for automatic deployments

### Option 3: Vercel
```bash
npm i -g vercel
vercel
```

### Option 4: Any Static Host
Upload the files to any static hosting service:
- Firebase Hosting
- Surge.sh
- Render
- Cloudflare Pages

## 🛠️ Customization

### Update Contact Number
Find and replace `919993335498` with your WhatsApp number in:
- `index.html` (multiple locations)

### Update Stats
Edit the numbers in `index.html`:
- Line ~90: Hero stats
- Line ~220: Stats section

### Change Colors
Edit CSS variables in `styles.css` (lines 1-15):
```css
:root {
    --primary-color: #25D366;
    --secondary-color: #128C7E;
    /* ... */
}
```

### Add New Sections
Follow the existing HTML structure:
```html
<section class="section-name">
    <div class="container">
        <div class="section-header">
            <h2>Title</h2>
            <p>Description</p>
        </div>
        <!-- Content -->
    </div>
</section>
```

## 📱 WhatsApp Integration

All WhatsApp links use the format:
```
https://wa.me/919993335498
```

Users can start a conversation with one click from:
- Header button
- Hero section CTA
- Footer contact
- CTA section

## 🔧 Local Development

No build process required! Just open `index.html` in a browser:

```bash
# Option 1: Direct open
open index.html

# Option 2: Python server
python -m http.server 8000

# Option 3: PHP server
php -S localhost:8000

# Option 4: Node.js server
npx http-server
```

Then visit `http://localhost:8000`

## ✅ Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## 📈 Performance

- **Load Time**: < 1s on 3G
- **Size**: < 100KB total
- **No external dependencies** except Google Fonts
- **Optimized images**: Use WebP format for better compression

## 🎯 SEO

Included:
- Meta descriptions
- Open Graph tags
- Twitter Card tags
- Semantic HTML5
- Mobile-friendly viewport
- Proper heading hierarchy

To add sitemap:
1. Create `sitemap.xml`
2. Submit to Google Search Console

## 📄 License

Private - All rights reserved to Bharat Rojgar Sewa

## 🤝 Contributing

For updates or issues, contact via WhatsApp: +91 9993335498

## 🔗 Links

- **GitHub**: https://github.com/TarunTansh/BRS-Website
- **WhatsApp**: https://wa.me/919993335498
- **Backend API**: Ballia-Rozgar-Sewa repository

---

Made with ❤️ in India
