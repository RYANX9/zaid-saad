@import "tailwindcss";

:root {
  --black: #0a0908;
  --white: #f6f1e9;
  --gray: #9c948a;
  --dim: rgba(246,241,233,0.07);
  --accent: #ff6b45;
  --accent-ink: #1a0f0a;
  --D: 'Unbounded', sans-serif;
  --M: 'Space Mono', monospace;
  --B: 'DM Sans', sans-serif;
  --ease: cubic-bezier(0.22, 1, 0.36, 1);
}

/* Light Mode Variables  */
.light {
  --black: #f4ede0;
  --white: #191410;
  --gray: #6e6459;
  --dim: rgba(25,20,16,0.07);
}

@theme inline {
  --color-background: var(--black);
  --color-foreground: var(--white);
  --font-sans: var(--B);
  --font-mono: var(--M);
}

body {
  background: var(--black);
  color: var(--white);
  font-family: var(--B);
  overflow-x: hidden;
}

/* Theme toggle: every element that reads a theme var fades together.
   Utilities like transition-colors / transition-all set their own
   transition-property + duration on the class itself, which has higher
   specificity than this rule and simply overrides it — so hover/scroll
   effects keep their own timing untouched. */
*, *::before, *::after {
  transition: background-color 0.5s var(--ease), color 0.5s var(--ease),
    border-color 0.5s var(--ease), fill 0.5s var(--ease), stroke 0.5s var(--ease);
}

a {
  text-decoration: none;
  color: inherit;
}

html {
  scroll-behavior: smooth;
}
