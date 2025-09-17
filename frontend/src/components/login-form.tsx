import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router"
import { useAuthStore } from "@/store/useAuthStore"
import React from "react"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [formData, setFormData] = React.useState({
    email: "",
    password: ""
  })
  const {login, isLoggingIn} = useAuthStore()

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      await login(formData)
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  {/* <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a> */}
                </div>
                <Input id="password" type="password" required value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  {isLoggingIn ? "Logging in..." : "Login"}
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
           <Link to="/signup" className="underline underline-offset-4">
  Sign up
</Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
