import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, FileText, Briefcase, Mail, LogOut, Settings, HelpCircle, Star, DollarSign } from "lucide-react";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session) {
        redirect("/auth/login");
    }

    return (
        <div className="flex h-screen bg-muted/20">
            {/* Sidebar */}
            <aside className="w-64 bg-background border-r hidden md:flex flex-col">
                <div className="h-16 flex items-center px-6 border-b">
                    <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
                        <div className="relative w-8 h-8">
                            <Image
                                src="/logo-brand.png"
                                alt="VarsaWeb Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        Varsa<span className="text-primary">Admin</span>
                    </Link>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <Link href="/admin" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                    </Link>
                    <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                        <Settings className="w-4 h-4" />
                        Site Settings
                    </Link>
                    <Link href="/admin/services" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                        <FileText className="w-4 h-4" />
                        Services
                    </Link>
                    <Link href="/admin/portfolio" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                        <Briefcase className="w-4 h-4" />
                        Portfolio
                    </Link>
                    <Link href="/admin/pricing" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                        <DollarSign className="w-4 h-4" />
                        Pricing
                    </Link>
                    <Link href="/admin/faq" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                        <HelpCircle className="w-4 h-4" />
                        FAQ
                    </Link>
                    <Link href="/admin/inbox" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                        <Mail className="w-4 h-4" />
                        Inbox
                    </Link>
                    <Link href="/admin/reviews" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                        <Star className="w-4 h-4" />
                        Reviews
                    </Link>
                </nav>
                <div className="p-4 border-t">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold">
                            {session.user?.name?.[0] || "A"}
                        </div>
                        <div className="text-xs">
                            <div className="font-medium">{session.user?.name}</div>
                            <div className="text-muted-foreground truncate w-32">{session.user?.email}</div>
                        </div>
                    </div>
                    {/* Signout button usually needs client component or form action */}
                    <Button variant="outline" size="sm" className="w-full gap-2" asChild>
                        <Link href="/api/auth/signout">
                            <LogOut className="w-4 h-4" /> Sign Out
                        </Link>
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <header className="h-16 border-b bg-background flex items-center px-6 justify-between md:hidden">
                    <span className="font-bold">Admin Panel</span>
                    {/* Mobile toggle would go here */}
                </header>
                <div className="p-6 md:p-10">
                    {children}
                </div>
            </main>
        </div>
    );
}
