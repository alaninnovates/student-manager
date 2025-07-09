import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login as loginFn, signup as signupFn } from '@/lib/supabase/actions';

export function AuthForm({
    login,
    signup,
}: {
    login?: boolean;
    signup?: boolean;
}) {
    return (
        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="me@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                {login && (
                                    <>
                                        <Button
                                            formAction={loginFn}
                                            className="w-full"
                                        >
                                            Login
                                        </Button>
                                        <p className="text-sm text-muted-foreground text-center">
                                            Don&apos;t have an account?{' '}
                                            <a
                                                href="/auth/signup"
                                                className="text-blue-500 hover:underline"
                                            >
                                                Sign up
                                            </a>
                                        </p>
                                    </>
                                )}
                                {signup && (
                                    <>
                                        <Button
                                            formAction={signupFn}
                                            className="w-full"
                                        >
                                            Create Account
                                        </Button>
                                        <p className="text-sm text-muted-foreground text-center">
                                            Already have an account?{' '}
                                            <a
                                                href="/auth/login"
                                                className="text-blue-500 hover:underline"
                                            >
                                                Login
                                            </a>
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
