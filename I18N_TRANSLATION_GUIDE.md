# i18n Translation Guide for AdamCAD

## Overview
This guide explains how to update React components to use the new internationalization (i18n) system for Chinese/English language support.

## Setup Complete ✓

The following have already been set up:
- ✅ i18next and react-i18next packages installed
- ✅ i18n configuration in `src/i18n.ts`
- ✅ English translation file: `src/locales/en/common.json`
- ✅ Chinese translation file: `src/locales/zh-CN/common.json`
- ✅ Language context in `src/contexts/LanguageContext.tsx`
- ✅ LanguageProvider added to App.tsx
- ✅ LanguageSelector component created
- ✅ Sidebar.tsx updated with translations
- ✅ SettingsView.tsx updated with language selector

## How to Translate Components

### Step 1: Import useTranslation Hook

Add this import to your component:

```typescript
import { useTranslation } from 'react-i18next';
```

### Step 2: Initialize the Hook

Inside your component function, add:

```typescript
const { t } = useTranslation();
```

### Step 3: Replace Hardcoded Strings

Replace hardcoded English strings with translation keys:

**Before:**
```tsx
<h1>Settings</h1>
<button>Save</button>
<p>You have {count} tokens remaining</p>
```

**After:**
```tsx
<h1>{t('settings.title')}</h1>
<button>{t('buttons.save')}</button>
<p>{t('home.tokensRemaining', { count })}</p>
```

### Step 4: Handle Variables with Interpolation

For strings that contain variables, use the interpolation syntax:

**Translation file:**
```json
{
  "tokensRemaining": "You have {{count}} token(s) remaining"
}
```

**Component:**
```tsx
{t('home.tokensRemaining', { count: tokenCount })}
```

## Translation Key Structure

Keys are organized by category:

- `app.*` - App name and tagline
- `navigation.*` - Navigation menu items
- `auth.*` - Authentication (sign in, sign up, etc.)
- `home.*` - Home page content
- `history.*` - Past creations/history page
- `settings.*` - Settings page
- `subscriptions.*` - Subscription/pricing page
- `editor.*` - Editor interface
- `download.*` - Download menu options
- `viewer.*` - 3D viewer controls
- `parameter.*` - Parameter panel
- `errors.*` - Error messages
- `legal.*` - Legal pages (privacy, terms)
- `loading.*` - Loading states
- `placeholders.*` - Input placeholders
- `buttons.*` - Button labels
- `misc.*` - Miscellaneous text

## Files That Need Translation

### Priority 1 - Core User Flows
1. `src/views/PromptView.tsx` - Home page
2. `src/views/SignInView.tsx` - Sign in
3. `src/views/SignUpView.tsx` - Sign up landing
4. `src/views/SignUpEmailView.tsx` - Email sign up
5. `src/views/HistoryView.tsx` - Past creations

### Priority 2 - Editor & Chat
6. `src/views/EditorView.tsx` - Editor router
7. `src/views/ParametricView.tsx` - Parametric editor
8. `src/views/CreativeEditorView.tsx` - Creative editor
9. `src/components/chat/ChatSection.tsx` - Chat messages
10. `src/components/chat/AssistantMessage.tsx` - AI responses
11. `src/components/TextAreaChat.tsx` - Chat input

### Priority 3 - Settings & Billing
12. `src/views/SettingsView.tsx` - ✅ Already updated
13. `src/views/SubscriptionView.tsx` - Pricing page
14. `src/components/Subscriptions.tsx` - Pricing tiers
15. `src/components/auth/DeleteAccountDialog.tsx` - Delete confirmation

### Priority 4 - Viewer & Parameters
16. `src/components/viewer/DownloadMenu.tsx` - Download options
17. `src/components/viewer/LightingControls.tsx` - Lighting settings
18. `src/components/parameter/ParameterSection.tsx` - Parameters
19. `src/components/parameter/ColorPicker.tsx` - Color selection

### Priority 5 - Additional Views
20. `src/views/ShareView.tsx`, `src/views/ParametricShareView.tsx`, `src/views/CreativeShareView.tsx`
21. `src/views/PrivacyPolicyView.tsx` - Privacy policy
22. `src/views/TermsOfServiceView.tsx` - Terms of service
23. `src/views/ResetPasswordView.tsx` - Password reset
24. `src/views/ErrorView.tsx` - Error page

## Example Component Translation

Here's a complete example showing before and after:

### Before (No Translation)
```tsx
import { Button } from '@/components/ui/button';

export function MyComponent() {
  return (
    <div>
      <h1>Welcome</h1>
      <p>This is a sample application</p>
      <Button>Click Me</Button>
    </div>
  );
}
```

### After (With Translation)
```tsx
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

export function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('misc.welcome')}</h1>
      <p>{t('misc.sampleApplication')}</p>
      <Button>{t('buttons.clickMe')}</Button>
    </div>
  );
}
```

## Adding New Translation Keys

If you need a translation key that doesn't exist:

1. **Add to English file** (`src/locales/en/common.json`):
```json
{
  "myNewKey": "English text here"
}
```

2. **Add to Chinese file** (`src/locales/zh-CN/common.json`):
```json
{
  "myNewKey": "中文翻译在这里"
}
```

3. **Use in component**:
```tsx
{t('myNewKey')}
```

## Special Cases

### Conditional Text
**Before:**
```tsx
{isLoggedIn ? 'Sign Out' : 'Sign In'}
```

**After:**
```tsx
{isLoggedIn ? t('navigation.signOut') : t('auth.signIn')}
```

### Dynamic Content
For content that changes based on state, use interpolation:

```tsx
// Translation file
{
  "version": "Version {{number}}"
}

// Component
{t('editor.version', { number: versionNumber })}
```

### Plurals
i18next supports plurals automatically:

```tsx
// Translation file
{
  "tokensRemaining": "You have {{count}} token(s) remaining"
}

// Component works for singular and plural
{t('home.tokensRemaining', { count: 0 })} // "You have 0 token(s) remaining"
{t('home.tokensRemaining', { count: 1 })} // "You have 1 token(s) remaining"
{t('home.tokensRemaining', { count: 5 })} // "You have 5 token(s) remaining"
```

## Testing Translations

1. **Run the app:**
```bash
npm run dev
```

2. **Change language:**
   - Go to Settings page
   - Click the language selector (globe icon)
   - Choose 简体中文 (Chinese) or English

3. **Check all pages:**
   - Navigate through all views
   - Verify text displays correctly in both languages
   - Look for any missed hardcoded strings

## Common Issues & Solutions

### Issue: "t is not defined"
**Solution:** Make sure you called `const { t } = useTranslation();` inside your component.

### Issue: Translation shows key instead of text
**Solution:** Check that the key exists in both translation files and is spelled correctly.

### Issue: Variables not showing
**Solution:** Make sure you're passing the variables as the second parameter: `t('key', { varName })`

### Issue: Type errors with translation keys
**Solution:** TypeScript should infer types automatically. If issues persist, try restarting the TypeScript server in your IDE.

## CAD/3D Printing Terminology Reference

These terms have been translated according to user specifications:

- **Quad topology** → 四元拓扑 (sì yuán tuò pū)
- **Wireframe** → 线框 (xiàn kuāng)
- **Solid** → 实体 (shí tǐ)
- **Orthographic** → 正交 (zhèng jiāo)
- **Perspective** → 透视 (tòu shì)
- **Brightness** → 亮度 (liàng dù)
- **Roughness** → 粗糙度 (cū cāo dù)
- **Normal Intensity** → 法线强度 (fǎ xiàn qiáng dù)
- **Camera views:** 前/后/左/右/上/下 (Front/Back/Left/Right/Top/Bottom)

## Next Steps

1. Update remaining priority 1-3 files first
2. Test thoroughly in both languages
3. Add any missing translation keys as needed
4. Consider adding more languages in the future by creating new locale folders

## Questions?

If you encounter issues or need clarification on translation choices, refer back to the translation files or ask for specific term preferences.
