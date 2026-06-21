import { UserButton, useUser } from "@clerk/tanstack-react-start"
import { Link, createFileRoute } from "@tanstack/react-router"
import { Button } from "@workspace/ui/components/button"

export const Route = createFileRoute("/")({ component: App })

function App() {
  const { isSignedIn } = useUser()

  return (
    <div className="min-h-svh bg-background">
      <header className="border-b">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <a href="/" className="text-sm font-semibold">
            Recipe App
          </a>
          <nav className="flex items-center gap-2">
            {isSignedIn ? (
              <UserButton />
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/sign-in/$" params={{ _splat: "" }}>
                    Sign in
                  </Link>
                </Button>
                <Button asChild>
                  <Link to="/sign-up/$" params={{ _splat: "" }}>
                    Sign up
                  </Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="mx-auto flex max-w-5xl px-6 py-12">
        <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
          <div>
            <h1 className="font-medium">Project ready!</h1>
            <p>You may now add components and start building.</p>
            <p>Use the navigation to create your first test account.</p>
          </div>
        </div>
      </main>
    </div>
  )
}
