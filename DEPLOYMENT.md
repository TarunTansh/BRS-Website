# 🚀 Deployment Guide - FREE with GitHub Pages

## Cost: **₹0 (Completely FREE!)**

Your website is already on GitHub. Now enable GitHub Pages:

---

## Step 1: Enable GitHub Pages (2 minutes)

1. Go to: **https://github.com/TarunTansh/BRS-Website/settings/pages**

2. Under "Build and deployment":
   - **Source**: Deploy from a branch
   - **Branch**: `main` 
   - **Folder**: `/ (root)`

3. Click **Save**

4. Wait 1-2 minutes. Your site will be live at:
   ```
   https://taruntansh.github.io/BRS-Website/
   ```

---

## Step 2: Connect Your GoDaddy Domain (5 minutes)

### A. Add Custom Domain in GitHub

1. Go back to: **https://github.com/TarunTansh/BRS-Website/settings/pages**

2. Under "Custom domain", enter:
   ```
   bharatrojgarsewa.com
   ```

3. Click **Save** (ignore any DNS errors for now)

4. ✅ Check **Enforce HTTPS** (free SSL certificate!)

### B. Update DNS in GoDaddy

1. Login to **GoDaddy.com** → My Products → DNS

2. **Delete** any existing A records for `@` (root domain)

3. **Add these 4 A records** (point to GitHub):
   ```
   Type: A    Name: @    Value: 185.199.108.153
   Type: A    Name: @    Value: 185.199.109.153
   Type: A    Name: @    Value: 185.199.110.153
   Type: A    Name: @    Value: 185.199.111.153
   ```

4. **Add CNAME record** for www subdomain:
   ```
   Type: CNAME    Name: www    Value: taruntansh.github.io
   ```

5. **Save** all DNS records

6. Wait **10-30 minutes** for DNS propagation

---

## Step 3: Verify Deployment

After DNS propagates (10-30 minutes):

1. Visit: **https://bharatrojgarsewa.com** ✅
2. Visit: **https://www.bharatrojgarsewa.com** ✅

Both should show your website with FREE HTTPS!

---

## 💰 Cost Comparison

| Platform | Monthly Cost | SSL | Custom Domain |
|----------|-------------|-----|---------------|
| **GitHub Pages** | **₹0** | ✅ Free | ✅ Yes |
| GCP Storage | ₹50-200 | ❌ Extra | ✅ Yes |
| GCP Load Balancer | ₹1,500+ | ✅ Yes | ✅ Yes |
| Vercel | ₹0-₹1,600 | ✅ Free | ✅ Yes |

---

## 🔄 Future Updates

To update your website:

```bash
# 1. Make changes to your files
# 2. Commit and push
git add .
git commit -m "Update website"
git push origin main

# 3. Wait 1-2 minutes - automatically deployed!
```

---

## ✅ Advantages of GitHub Pages

- ✨ **100% FREE** (no hidden costs)
- 🔒 **Free SSL/HTTPS** certificate
- 🚀 **Fast CDN** (GitHub's global network)
- 🔄 **Auto-deploy** on every push
- 📊 **100GB bandwidth/month** FREE
- ⚡ **No maintenance** required

---

## 📞 Need Help?

If DNS doesn't work after 30 minutes, check:
1. GoDaddy DNS settings are saved correctly
2. Clear browser cache (Cmd+Shift+R)
3. Check DNS propagation: https://www.whatsmydns.net/#A/bharatrojgarsewa.com
