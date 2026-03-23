# Fix: Domain Not Configured Error

## The error "Domain does not resolve to GitHub Pages server" is NORMAL at this stage.

You need to update DNS in GoDaddy first, then GitHub will verify it automatically.

---

## Step-by-Step Fix:

### 1. Login to GoDaddy
Go to: https://dcc.godaddy.com/control/bharatrojgarsewa.com/dns

### 2. Delete Existing Records (if any)
- Delete all A records for `@` (root)
- Delete any CNAME records pointing elsewhere

### 3. Add GitHub Pages A Records

Add these 4 A records (one by one):

```
Type: A
Name: @
Value: 185.199.108.153
TTL: 600 (or default)

Type: A
Name: @
Value: 185.199.109.153
TTL: 600

Type: A
Name: @
Value: 185.199.110.153
TTL: 600

Type: A
Name: @
Value: 185.199.111.153
TTL: 600
```

### 4. Add WWW CNAME Record

```
Type: CNAME
Name: www
Value: taruntansh.github.io
TTL: 600
```

### 5. Save All Changes in GoDaddy

Click "Save" or "Save All Changes"

---

## Verification Steps

### Wait 10-30 minutes for DNS propagation

Then check if DNS is working:

```bash
# Check if domain points to GitHub
dig bharatrojgarsewa.com +short
```

You should see the 4 GitHub IP addresses:
- 185.199.108.153
- 185.199.109.153
- 185.199.110.153
- 185.199.111.153

### Check DNS Propagation Globally
Visit: https://www.whatsmydns.net/#A/bharatrojgarsewa.com

### After DNS Propagates (Green checkmarks):

1. Go back to GitHub Pages settings:
   https://github.com/TarunTansh/BRS-Website/settings/pages

2. Re-enter your domain: `bharatrojgarsewa.com`

3. Click Save

4. The error should disappear!

5. Check "Enforce HTTPS" (will work after domain verifies)

---

## Timeline:

- **DNS Update in GoDaddy**: 2 minutes
- **DNS Propagation**: 10-30 minutes (sometimes up to 48 hours)
- **GitHub Domain Verification**: Automatic after DNS propagates
- **SSL Certificate**: 15 minutes after verification

---

## Troubleshooting

**If DNS doesn't propagate after 1 hour:**

1. Clear your browser cache
2. Try incognito mode
3. Check on mobile data (different DNS)
4. Verify GoDaddy changes were saved
5. Check for typos in IP addresses

**Common Issues:**

- **Typo in IP addresses**: Double-check all 4 IPs
- **Forgot to delete old A records**: Remove all conflicting records
- **TTL too high**: Use 600 seconds (10 minutes)
- **Changes not saved**: Click Save in GoDaddy

---

## Current Status:

✅ GitHub repository: Ready
✅ GitHub Pages: Enabled
⏳ DNS Configuration: **YOU NEED TO DO THIS NOW**
⏳ Domain Verification: Will work after DNS
⏳ HTTPS Certificate: Will work after verification

