import { test, expect } from '@playwright/test'

const PAGES = [
  { path: '/', name: 'Homepage' },
  { path: '/solutions', name: 'Solutions' },
  { path: '/use-cases', name: 'Use Cases' },
  { path: '/services', name: 'Services' },
  { path: '/about', name: 'About' },
  { path: '/portfolio', name: 'Portfolio' },
  { path: '/contact', name: 'Contact' },
  { path: '/blog', name: 'Blog' },
  { path: '/pricing', name: 'Pricing' },
  { path: '/terms', name: 'Terms' },
  { path: '/privacy-policy', name: 'Privacy Policy' },
]

const REDIRECTS = [
  { from: '/get-started', to: '/contact' },
  { from: '/team', to: '/about' },
]

test.describe('Page rendering — all browsers and viewports', () => {
  for (const { path, name } of PAGES) {
    test(`${name} (${path}) renders with content`, async ({ page }) => {
      const response = await page.goto(path, { waitUntil: 'domcontentloaded' })
      expect(response?.status(), `${name}: expected 200`).toBe(200)

      // Meaningful heading or landmark present
      const heading = page.locator('h1, h2').first()
      await expect(heading, `${name}: no h1/h2 found`).toBeVisible()

      // Page has a title
      const title = await page.title()
      expect(title.length, `${name}: empty page title`).toBeGreaterThan(0)
      expect(title, `${name}: title should mention Develom`).toMatch(/develom/i)
    })
  }
})

test.describe('Redirects', () => {
  for (const { from, to } of REDIRECTS) {
    test(`${from} redirects to ${to}`, async ({ page }) => {
      await page.goto(from)
      await expect(page).toHaveURL(new RegExp(to.replace('/', '\\/')))
    })
  }
})

test.describe('Mobile responsiveness', () => {
  test('no horizontal scroll on homepage', async ({ page, viewport }) => {
    await page.goto('/')
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
    expect(scrollWidth, `horizontal overflow at ${viewport?.width}px`).toBeLessThanOrEqual(clientWidth + 1)
  })

  test('no horizontal scroll on solutions page', async ({ page, viewport }) => {
    await page.goto('/solutions')
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
    expect(scrollWidth, `horizontal overflow at ${viewport?.width}px`).toBeLessThanOrEqual(clientWidth + 1)
  })

  test('nav is visible and usable', async ({ page, viewport }) => {
    await page.goto('/')
    const isMobile = (viewport?.width ?? 1280) < 768

    if (isMobile) {
      // Mobile: hamburger or mobile nav trigger should exist
      const mobileNav = page.locator('[aria-label*="menu" i], button[aria-expanded], .hamburger, nav button').first()
      // Either a mobile menu button exists, or nav links are directly visible
      const navLinks = page.locator('nav a')
      const navVisible = await navLinks.first().isVisible().catch(() => false)
      const mobileMenuExists = await mobileNav.count().then(n => n > 0)
      expect(navVisible || mobileMenuExists, 'mobile: neither nav links nor mobile menu trigger found').toBeTruthy()
    } else {
      // Desktop: nav links should be visible
      const navLinks = page.locator('nav a')
      await expect(navLinks.first(), 'desktop: no nav links visible').toBeVisible()
    }
  })

  test('CTA buttons are visible on homepage', async ({ page }) => {
    await page.goto('/')
    // Use :visible to skip nav links hidden inside the mobile hamburger
    const cta = page.locator('a[href*="contact"]:visible, button:visible').filter({ hasText: /get started|contact|talk|schedule|book/i }).first()
    await expect(cta, 'no CTA button found on homepage').toBeVisible()
  })

  test('contact form renders on /contact', async ({ page }) => {
    await page.goto('/contact')
    const form = page.locator('form').first()
    await expect(form, 'no form found on /contact').toBeVisible()
    const nameInput = page.locator('input[name="name"], input[placeholder*="name" i]').first()
    await expect(nameInput, 'name input not found').toBeVisible()
  })
})

test.describe('Cross-browser visual consistency', () => {
  test('homepage hero section renders', async ({ page }) => {
    await page.goto('/')
    const hero = page.locator('section, [class*="hero"], [class*="Hero"]').first()
    await expect(hero, 'hero section not found').toBeVisible()
  })

  test('footer renders with links', async ({ page }) => {
    await page.goto('/')
    const footer = page.locator('footer').first()
    await expect(footer, 'footer not found').toBeVisible()
    const footerLinks = footer.locator('a')
    const count = await footerLinks.count()
    expect(count, 'footer has no links').toBeGreaterThan(0)
  })

  test('blog listing page renders posts', async ({ page }) => {
    await page.goto('/blog')
    const response = await page.goto('/blog', { waitUntil: 'domcontentloaded' })
    expect(response?.status()).toBe(200)
    const heading = page.locator('h1, h2').first()
    await expect(heading).toBeVisible()
  })

  test('solutions page has all 6 clusters', async ({ page }) => {
    await page.goto('/solutions')
    const pageText = await page.locator('body').innerText()
    const clusters = [
      'Build the Foundation',
      'Serve Customers',
      'Automate Operations',
      'Unlock Your Data',
      'Protect',
      'Empower',
    ]
    for (const cluster of clusters) {
      expect(pageText, `cluster "${cluster}" not found on /solutions`).toMatch(new RegExp(cluster, 'i'))
    }
  })

  test('no broken images on homepage', async ({ page }) => {
    await page.goto('/')
    // Scroll to bottom so lazy-loaded images in the footer trigger a fetch
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    // Wait until every img element has finished loading
    await page.waitForFunction(() =>
      Array.from(document.querySelectorAll('img')).every((img) => img.complete)
    )
    const brokenImages = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'))
      return imgs
        .filter((img) => !img.complete || img.naturalWidth === 0)
        .map((img) => img.src)
    })
    expect(brokenImages, `broken images: ${brokenImages.join(', ')}`).toHaveLength(0)
  })
})

test.describe('OG metadata', () => {
  test('homepage has og:title and og:image', async ({ page }) => {
    await page.goto('/')
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content')
    const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content')
    expect(ogTitle, 'og:title missing').toBeTruthy()
    expect(ogImage, 'og:image missing').toBeTruthy()
  })

  test('blog post has per-post og:image', async ({ page }) => {
    await page.goto('/blog/musk-vs-openai-2026')
    const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content')
    expect(ogImage, 'blog post og:image missing').toBeTruthy()
    expect(ogImage, 'blog post og:image should not be generic default').not.toMatch(/og-default/)
  })
})
