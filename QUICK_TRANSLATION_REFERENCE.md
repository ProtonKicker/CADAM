# Quick Translation Reference Card

## Basic Pattern (3 Steps)

```typescript
// Step 1: Import
import { useTranslation } from 'react-i18next';

// Step 2: Initialize
const { t } = useTranslation();

// Step 3: Use
<h1>{t('settings.title')}</h1>
```

## Common Replacements

### Buttons
```tsx
// Before
<button>Save</button>
<button>Cancel</button>
<button>Delete</button>

// After
<button>{t('buttons.save')}</button>
<button>{t('buttons.cancel')}</button>
<button>{t('buttons.delete')}</button>
```

### Navigation
```tsx
// Before
<Link to="/settings">Settings</Link>
<Link to="/subscription">Subscriptions</Link>

// After
<Link to="/settings">{t('navigation.settings')}</Link>
<Link to="/subscription">{t('navigation.subscriptions')}</Link>
```

### Forms
```tsx
// Before
<label>Email</label>
<input placeholder="Enter your email" />
<button>Sign In</button>

// After
<label>{t('auth.email')}</label>
<input placeholder={t('placeholders.enterEmail')} />
<button>{t('auth.signIn')}</button>
```

### With Variables
```tsx
// Translation file
{
  "tokensRemaining": "You have {{count}} token(s) remaining"
}

// Component
<p>{t('home.tokensRemaining', { count: tokenCount })}</p>
```

### Conditional Text
```tsx
// Before
{isLoggedIn ? 'Sign Out' : 'Sign In'}

// After
{isLoggedIn ? t('navigation.signOut') : t('auth.signIn')}
```

## Key Categories

```
auth.*          - Sign in, sign up, email, password
buttons.*       - Save, cancel, delete, edit, share
editor.*        - Share, retry, regenerate, version
viewer.*        - Lighting, wireframe, solid, camera views
download.*      - STL, OBJ, GLB, FBX, GIF
settings.*      - Account, notifications, billing
history.*       - Past creations, rename, search
subscriptions.* - Plans, pricing, features
errors.*        - Error messages
loading.*       - Loading states
```

## CAD Terms (Already Translated)

```
Quad topology     → 四元拓扑
Wireframe         → 线框
Solid             → 实体
Orthographic      → 正交
Perspective       → 透视
Brightness        → 亮度
Roughness         → 粗糙度
Normal Intensity  → 法线强度
Camera views      → 前/后/左/右/上/下
File formats      → Keep English (STL, OBJ, GLB, etc.)
```

## Testing Checklist

- [ ] Build passes: `npm run build`
- [ ] Language selector appears in Settings
- [ ] Can switch between EN/ZH
- [ ] Translations update immediately
- [ ] No console errors
- [ ] Language persists after refresh

## Need Help?

1. Check if key exists: Look in `src/locales/en/common.json`
2. Missing key? Add to both EN and ZH files
3. Not translating? Make sure component has `useTranslation()` hook
4. Type errors? Restart TypeScript server in IDE

## Example: Complete Component

```tsx
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

export function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div className="p-4">
      <h1>{t('settings.title')}</h1>
      <p>{t('settings.notificationsDescription')}</p>
      
      <Button onClick={handleSave}>
        {t('buttons.save')}
      </Button>
      
      <Button onClick={handleCancel}>
        {t('buttons.cancel')}
      </Button>
    </div>
  );
}
```
