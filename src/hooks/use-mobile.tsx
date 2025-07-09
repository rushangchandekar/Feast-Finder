import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)

  React.useEffect(() => {
    // Prevent usage on the server (e.g., during SSR)
    if (typeof window === "undefined") return

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const updateMatch = () => setIsMobile(mql.matches)

    // Initial check
    updateMatch()

    // Add event listener
    mql.addEventListener("change", updateMatch)

    // Cleanup
    return () => mql.removeEventListener("change", updateMatch)
  }, [])

  return isMobile
}
