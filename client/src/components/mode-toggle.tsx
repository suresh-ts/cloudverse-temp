import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-lg hover:bg-cv-surface2 transition-colors cursor-pointer"
      aria-label="Toggle theme"
      type="button"
    >
      <Sun className="h-5 w-5 transition-all dark:hidden text-cv-muted" />
      <Moon className="h-5 w-5 transition-all hidden dark:block text-cv-muted" />
    </button>
  )
}
