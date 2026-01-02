"use client";

import { useState } from "react";
import { updateSiteSettings } from "@/actions/settings-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ui/image-upload";
import { Save, Loader2 } from "lucide-react";

interface SiteSettings {
    id: string;
    heroBadge: string;
    heroTitle: string;
    heroDescription: string;
    heroCta1: string;
    heroCta2: string;
    stat1Value: string;
    stat1Label: string;
    stat2Value: string;
    stat2Label: string;
    stat3Value: string;
    stat3Label: string;
    stat4Value: string;
    stat4Label: string;
    aboutImage: string | null;
    aboutTitle: string;
    aboutParagraph1: string;
    aboutParagraph2: string;
    aboutFeature1: string;
    aboutFeature1Desc: string;
    aboutFeature2: string;
    aboutFeature2Desc: string;
    contactEmail: string;
    contactPhone: string;
    contactAddress: string;
    footerDescription: string;
    footerInstagram: string;
    footerTiktok: string;
    footerLinkedin: string;
    footerCopyright: string;
}

const tabs = [
    { id: "hero", label: "Hero Section" },
    { id: "about", label: "About Section" },
    { id: "contact", label: "Contact Info" },
    { id: "footer", label: "Footer" },
];

export function SettingsForm({ settings }: { settings: SiteSettings | null }) {
    const [activeTab, setActiveTab] = useState("hero");
    const [loading, setLoading] = useState(false);
    const [aboutImage, setAboutImage] = useState(settings?.aboutImage || "");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        formData.set("aboutImage", aboutImage);

        const result = await updateSiteSettings(formData);

        if (result.success) {
            alert("Settings saved successfully!");
        } else {
            alert(result.error || "Failed to save settings");
        }
        setLoading(false);
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tabs */}
            <div className="flex gap-2 border-b">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === tab.id
                            ? "border-b-2 border-primary text-primary"
                            : "text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Hero Tab */}
            {activeTab === "hero" && (
                <div className="space-y-6 border rounded-xl p-6 bg-background">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Badge Text</label>
                        <Input name="heroBadge" defaultValue={settings?.heroBadge} />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Hero Title</label>
                        <Input name="heroTitle" defaultValue={settings?.heroTitle} />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Hero Description</label>
                        <Textarea name="heroDescription" defaultValue={settings?.heroDescription} rows={3} />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">CTA Button 1</label>
                            <Input name="heroCta1" defaultValue={settings?.heroCta1} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">CTA Button 2</label>
                            <Input name="heroCta2" defaultValue={settings?.heroCta2} />
                        </div>
                    </div>

                    <h3 className="font-semibold pt-4 border-t">Statistics</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Stat 1 Value</label>
                            <Input name="stat1Value" defaultValue={settings?.stat1Value} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Stat 1 Label</label>
                            <Input name="stat1Label" defaultValue={settings?.stat1Label} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Stat 2 Value</label>
                            <Input name="stat2Value" defaultValue={settings?.stat2Value} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Stat 2 Label</label>
                            <Input name="stat2Label" defaultValue={settings?.stat2Label} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Stat 3 Value</label>
                            <Input name="stat3Value" defaultValue={settings?.stat3Value} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Stat 3 Label</label>
                            <Input name="stat3Label" defaultValue={settings?.stat3Label} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Stat 4 Value</label>
                            <Input name="stat4Value" defaultValue={settings?.stat4Value} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Stat 4 Label</label>
                            <Input name="stat4Label" defaultValue={settings?.stat4Label} />
                        </div>
                    </div>
                </div>
            )}

            {/* About Tab */}
            {activeTab === "about" && (
                <div className="space-y-6 border rounded-xl p-6 bg-background">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">About Image</label>
                        <ImageUpload
                            value={aboutImage}
                            onChange={setAboutImage}
                            onRemove={() => setAboutImage("")}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">About Title</label>
                        <Input name="aboutTitle" defaultValue={settings?.aboutTitle} />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Paragraph 1</label>
                        <Textarea name="aboutParagraph1" defaultValue={settings?.aboutParagraph1} rows={3} />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Paragraph 2</label>
                        <Textarea name="aboutParagraph2" defaultValue={settings?.aboutParagraph2} rows={3} />
                    </div>

                    <h3 className="font-semibold pt-4 border-t">Features</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Feature 1 Title</label>
                            <Input name="aboutFeature1" defaultValue={settings?.aboutFeature1} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Feature 1 Description</label>
                            <Input name="aboutFeature1Desc" defaultValue={settings?.aboutFeature1Desc} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Feature 2 Title</label>
                            <Input name="aboutFeature2" defaultValue={settings?.aboutFeature2} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Feature 2 Description</label>
                            <Input name="aboutFeature2Desc" defaultValue={settings?.aboutFeature2Desc} />
                        </div>
                    </div>
                </div>
            )}

            {/* Contact Tab */}
            {activeTab === "contact" && (
                <div className="space-y-6 border rounded-xl p-6 bg-background">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <Input name="contactEmail" type="email" defaultValue={settings?.contactEmail} />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Phone</label>
                        <Input name="contactPhone" defaultValue={settings?.contactPhone} />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Address</label>
                        <Textarea name="contactAddress" defaultValue={settings?.contactAddress} rows={2} />
                    </div>
                </div>
            )}

            {/* Footer Tab */}
            {activeTab === "footer" && (
                <div className="space-y-6 border rounded-xl p-6 bg-background">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Footer Description</label>
                        <Textarea name="footerDescription" defaultValue={settings?.footerDescription} rows={3} />
                        <p className="text-xs text-muted-foreground">Short description about your company shown in footer.</p>
                    </div>

                    <h3 className="font-semibold pt-4 border-t">Social Media Links</h3>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Instagram URL</label>
                            <Input name="footerInstagram" placeholder="https://instagram.com/yourusername" defaultValue={settings?.footerInstagram} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">TikTok URL</label>
                            <Input name="footerTiktok" placeholder="https://tiktok.com/@yourusername" defaultValue={settings?.footerTiktok} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">LinkedIn URL</label>
                            <Input name="footerLinkedin" placeholder="https://linkedin.com/company/yourcompany" defaultValue={settings?.footerLinkedin} />
                        </div>
                    </div>

                    <h3 className="font-semibold pt-4 border-t">Copyright</h3>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Copyright Text</label>
                        <Input name="footerCopyright" defaultValue={settings?.footerCopyright} />
                        <p className="text-xs text-muted-foreground">E.g., © 2026 YourBrand. All rights reserved.</p>
                    </div>
                </div>
            )}

            <Button type="submit" disabled={loading} className="gap-2">
                {loading ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Saving...
                    </>
                ) : (
                    <>
                        <Save className="w-4 h-4" />
                        Save Settings
                    </>
                )}
            </Button>
        </form>
    );
}
