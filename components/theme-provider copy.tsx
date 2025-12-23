export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  // Force class strategy and disable transitions while theme changes
  return (
    <NextThemeProvider attribute="class" disableTransitionOnChange {...props}>
      {children}
    </NextThemeProvider>
  );
}
