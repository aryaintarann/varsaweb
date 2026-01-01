import { getSiteSettings } from "@/actions/settings-actions";
import { SettingsForm } from "./settings-form";

export default async function SettingsPage() {
    const settings = await getSiteSettings();

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Site Settings</h1>
            <p className="text-muted-foreground">
                Manage content for Hero, About, and Contact sections.
            </p>
            <SettingsForm settings={settings} />
        </div>
    );
}
