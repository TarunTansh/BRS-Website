# 🔧 DNS Setup for bharatrojgarsewa.com

## ⚠️ Current Problem

Your domain points to **AWS servers** instead of **GitHub Pages**:

```
Current DNS:
❌ 15.197.148.33 (AWS)
❌ 3.33.130.190 (AWS)

Should be:
✅ 185.199.108.153 (GitHub)
✅ 185.199.109.153 (GitHub)
✅ 185.199.110.153 (GitHub)
✅ 185.199.111.153 (GitHub)
```

---

## 🚀 Quick Fix (5 minutes)

### Step 1: Open GoDaddy DNS Manager

**Direct link:** https://dcc.godaddy.com/control/bharatrojgarsewa.com/dns

(Or: GoDaddy.com → My Products → DNS)

---

### Step 2: DELETE These Records

Find and **DELETE** all A records showing:
- `15.197.148.33`
- `3.33.130.190`

Click the **trash/delete icon** next to each one.

---

### Step 3: ADD GitHub Pages A Records

Click **"ADD"** button and add these 4 records:

#### Record 1:
```
Type: A
Name: @
Value: 185.199.108.153
TTL: 600 seconds
```

#### Record 2:
```
Type: A
Name: @
Value: 185.199.109.153
TTL: 600 seconds
```

#### Record 3:
```
Type: A
Name: @
Value: 185.199.110.153
TTL: 600 seconds
```

#### Record 4:
```
Type: A
Name: @
Value: 185.199.111.153
TTL: 600 seconds
```

---

### Step 4: UPDATE WWW CNAME

Find the CNAME record for `www` and update it to:

```
Type: CNAME
Name: www
Value: taruntansh.github.io
TTL: 600 seconds
```

---

### Step 5: SAVE Changes

Click **"Save"** or **"Save All Changes"** at the bottom.

---

## ⏱️ Wait for DNS Propagation

**Time:** 10-30 minutes (sometimes up to 2 hours)

### Check Progress:

```bash
# Run this command to check DNS
dig bharatrojgarsewa.com +short
```

**When it shows these 4 IPs, you're ready:**
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

### Online DNS Checker:
👉 https://www.whatsmydns.net/#A/bharatrojgarsewa.com

Look for green checkmarks showing GitHub IPs worldwide.

---

## ✅ Final Step (After DNS Works)

1. Go to: https://github.com/TarunTansh/BRS-Website/settings/pages

2. Under "Custom domain", the error should be gone!

3. If error still shows, click **"Remove"** then re-enter: `bharatrojgarsewa.com`

4. Check **"Enforce HTTPS"** ✅

5. Done! 🎉

---

## 🌐 Your Live URLs (after setup)

- https://bharatrojgarsewa.com ✅
- https://www.bharatrojgarsewa.com ✅
- https://taruntansh.github.io/BRS-Website/ ✅

All will show the same website with FREE SSL!

---

## 📞 Need Help?

If stuck, share a screenshot of your GoDaddy DNS page.

**Expected final DNS records:**
```
Type    Name    Value                      TTL
A       @       185.199.108.153           600
A       @       185.199.109.153           600
A       @       185.199.110.153           600
A       @       185.199.111.153           600
CNAME   www     taruntansh.github.io      600
```
