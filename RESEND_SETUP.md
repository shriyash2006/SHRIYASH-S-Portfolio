# 📧 Resend Email Setup Guide

Resend is a modern email API - **much easier than Gmail SMTP setup!**

## Why Resend?

- ✅ **Super Easy Setup** - Just need API key (no App Password nonsense)
- ✅ **Free Tier** - 100 emails/day, 3,000/month (perfect for portfolio)
- ✅ **Better Deliverability** - Professional email service
- ✅ **No 2FA Required** - Unlike Gmail
- ✅ **Developer Friendly** - Built for developers

---

## 🚀 Setup Steps (5 minutes)

### Step 1: Create Resend Account

1. Go to: **https://resend.com**
2. Click **"Start Building"** or **"Sign Up"**
3. Sign up with GitHub or Email
4. Verify your email

### Step 2: Get API Key

1. After login, you'll see the dashboard
2. Click **"API Keys"** in sidebar (or go to https://resend.com/api-keys)
3. Click **"Create API Key"**
4. Name: `Portfolio Contact Form`
5. Permission: **"Sending access"** (default)
6. Click **"Add"**
7. **Copy the API key** (starts with `re_`)
   - ⚠️ **Important:** You can only see this once!
   - Format: `re_123abc456def789...`

### Step 3: Update `.env.local`

Open your `.env.local` file and add:

```env
RESEND_API_KEY=re_your_actual_api_key_here
CONTACT_EMAIL=shriyashsahu2006@gmail.com
```

**Replace:**
- `re_your_actual_api_key_here` → Your actual Resend API key
- `shriyashsahu2006@gmail.com` → Your email (where you want to receive messages)

### Step 4: Test It!

```bash
# Verify the API key without sending an email
npm run resend:verify

# Send one test email to CONTACT_EMAIL
npm run email:test
```

Then:
1. Go to: http://localhost:3000/contact
2. Fill out the form
3. Submit
4. Check your email at `CONTACT_EMAIL`

---

## 📝 Example `.env.local`

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
GEMINI_MODEL=gemini-3.8-flash

# Resend Configuration
RESEND_API_KEY=re_AbCdEfGh123456789XyZ
CONTACT_EMAIL=shriyashsahu2006@gmail.com
# Optional after verifying your own domain:
# RESEND_FROM_EMAIL=hello@yourdomain.com
```

---

## 🎯 Free Tier Limits

Resend Free Plan includes:
- ✅ **100 emails per day**
- ✅ **3,000 emails per month**
- ✅ Unlimited API keys
- ✅ Email logs and analytics
- ✅ Webhook support

**More than enough for a portfolio contact form!** 🎉

---

## 🔐 Security

- ✅ API key is in `.env.local` (not committed to git)
- ✅ `.env.local` is in `.gitignore`
- ✅ Never share your API key publicly
- ✅ You can revoke/regenerate keys anytime

---

## 🌐 Production Deployment

### Vercel:
1. Go to your project on Vercel
2. Settings → Environment Variables
3. Add:
   - `RESEND_API_KEY` = `re_your_key`
   - `CONTACT_EMAIL` = `your@email.com`
4. Redeploy

### Netlify:
1. Site settings → Environment variables
2. Add same variables as above
3. Redeploy

---

## 📧 Email Features

When someone submits the contact form:

**From:** Portfolio Contact <onboarding@resend.dev>
**To:** Your email (CONTACT_EMAIL)
**Reply-To:** Visitor's email (you can reply directly!)
**Subject:** [Portfolio Inquiry] {Subject} - from {Name}

**HTML Email with:**
- Visitor's name
- Visitor's email (clickable)
- Subject
- Full message
- Timestamp

---

## 🐛 Troubleshooting

### Problem: "Email service not configured"
**Solution:** Add `RESEND_API_KEY` to `.env.local`

### Problem: "Failed to send message"
**Check:**
1. API key is correct (starts with `re_`)
2. No spaces in API key
3. File saved after editing
4. Dev server restarted: `npm run dev`

### Problem: "Emails not arriving"
**Check:**
1. Spam/junk folder
2. `CONTACT_EMAIL` is correct
3. Check Resend dashboard → Emails (see delivery status)
4. Free tier limits not exceeded (100/day)

### Problem: Rate limit exceeded
**Solution:** 
- Wait for reset (daily limit)
- Or upgrade plan (if needed)

---

## 📊 Monitor Emails

Resend Dashboard: https://resend.com/emails

Here you can see:
- ✅ All sent emails
- ✅ Delivery status
- ✅ Open rates
- ✅ Bounce rates
- ✅ Error logs

---

## 💡 Tips

1. **Test First:** Always test on localhost before deploying
2. **Check Dashboard:** Monitor email delivery in Resend dashboard
3. **Whitelist:** Add `onboarding@resend.dev` to contacts (avoid spam)
4. **Verify Domain (Optional):** For production, you can use your own domain

---

## 🔗 Useful Links

- **Resend Dashboard:** https://resend.com/home
- **API Keys:** https://resend.com/api-keys
- **Email Logs:** https://resend.com/emails
- **Documentation:** https://resend.com/docs
- **Pricing:** https://resend.com/pricing

---

## ✅ Quick Checklist

- [ ] Created Resend account
- [ ] Generated API key
- [ ] Added `RESEND_API_KEY` to `.env.local`
- [ ] Added `CONTACT_EMAIL` to `.env.local`
- [ ] Tested contact form (npm run dev)
- [ ] Received test email
- [ ] Ready for production!

---

**That's it! Much simpler than Gmail SMTP, right?** 🚀

If you have any issues, check the Resend dashboard for detailed logs and error messages.
