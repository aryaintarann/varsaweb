import { getDashboardStats } from "@/actions/admin-actions";
import Link from "next/link";
import { FileText, Briefcase, Mail } from "lucide-react";

export default async function AdminDashboard() {
    const stats = await getDashboardStats();

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link
                    href="/admin/services"
                    className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md hover:border-primary/50 transition-all"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-blue-500/10 text-blue-500">
                            <FileText className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-sm font-medium text-muted-foreground">Total Services</div>
                            <div className="text-3xl font-bold mt-1">{stats.servicesCount}</div>
                        </div>
                    </div>
                </Link>

                <Link
                    href="/admin/portfolio"
                    className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md hover:border-primary/50 transition-all"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-purple-500/10 text-purple-500">
                            <Briefcase className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-sm font-medium text-muted-foreground">Portfolio Items</div>
                            <div className="text-3xl font-bold mt-1">{stats.portfolioCount}</div>
                        </div>
                    </div>
                </Link>

                <Link
                    href="/admin/inbox"
                    className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md hover:border-primary/50 transition-all"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-green-500/10 text-green-500">
                            <Mail className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-sm font-medium text-muted-foreground">Unread Messages</div>
                            <div className="text-3xl font-bold mt-1 text-primary">{stats.unreadCount}</div>
                        </div>
                    </div>
                </Link>
            </div>

            <div className="border rounded-xl p-6 bg-background">
                <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                <div className="flex flex-wrap gap-3">
                    <Link
                        href="/admin/services/create"
                        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                    >
                        + Add Service
                    </Link>
                    <Link
                        href="/admin/portfolio/create"
                        className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
                    >
                        + Add Portfolio
                    </Link>
                    <Link
                        href="/admin/inbox"
                        className="px-4 py-2 rounded-lg border text-sm font-medium hover:bg-muted transition-colors"
                    >
                        View Inbox
                    </Link>
                </div>
            </div>
        </div>
    );
}
