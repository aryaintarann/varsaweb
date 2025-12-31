export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm">
                    <div className="text-sm font-medium text-muted-foreground">Total Services</div>
                    <div className="text-3xl font-bold mt-2">4</div>
                </div>
                <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm">
                    <div className="text-sm font-medium text-muted-foreground">Portfolio Items</div>
                    <div className="text-3xl font-bold mt-2">12</div>
                </div>
                <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm">
                    <div className="text-sm font-medium text-muted-foreground">Unread Messages</div>
                    <div className="text-3xl font-bold mt-2 text-primary">3</div>
                </div>
            </div>

            <div className="border rounded-xl p-6 bg-background">
                <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
                <p className="text-muted-foreground text-sm">No recent activity.</p>
            </div>
        </div>
    );
}
