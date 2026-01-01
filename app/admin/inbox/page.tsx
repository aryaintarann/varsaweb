import { getContactSubmissions, markAsRead, deleteContactSubmission } from "@/actions/admin-actions";
import { Button } from "@/components/ui/button";
import { Check, Mail, MailOpen, Trash2 } from "lucide-react";
import { MarkReadButton, DeleteInboxButton } from "./inbox-buttons";

interface ContactSubmission {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    service: string | null;
    preferredContact: string | null;
    message: string;
    read: boolean;
    createdAt: Date;
}

export default async function InboxPage() {
    const submissions: ContactSubmission[] = await getContactSubmissions();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Inbox</h1>
                <div className="text-sm text-muted-foreground">
                    {submissions.filter(s => !s.read).length} unread messages
                </div>
            </div>

            {submissions.length === 0 ? (
                <div className="border rounded-xl p-12 text-center bg-background">
                    <Mail className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No messages yet.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {submissions.map((submission) => (
                        <div
                            key={submission.id}
                            className={`border rounded-xl p-6 bg-background ${!submission.read ? 'border-primary/50 bg-primary/5' : ''}`}
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-4">
                                    <div className={`p-2 rounded-full ${submission.read ? 'bg-muted' : 'bg-primary/10'}`}>
                                        {submission.read ? (
                                            <MailOpen className="w-5 h-5 text-muted-foreground" />
                                        ) : (
                                            <Mail className="w-5 h-5 text-primary" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-semibold">{submission.name}</h3>
                                            {!submission.read && (
                                                <span className="px-2 py-0.5 text-xs font-medium bg-primary text-primary-foreground rounded-full">
                                                    New
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-muted-foreground mb-1">
                                            {submission.email}
                                            {submission.preferredContact === "Email" && (
                                                <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                                    Preferred
                                                </span>
                                            )}
                                        </p>
                                        {submission.phone && (
                                            <p className="text-sm text-muted-foreground mb-2">
                                                <a
                                                    href={`https://wa.me/${submission.phone.replace(/\D/g, '')}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-green-500 hover:underline"
                                                >
                                                    {submission.phone}
                                                </a>
                                                {submission.preferredContact === "WhatsApp" && (
                                                    <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                                        Preferred
                                                    </span>
                                                )}
                                            </p>
                                        )}
                                        {submission.service && (
                                            <p className="text-sm font-medium text-slate-700 mb-2">
                                                Interested in: {submission.service}
                                            </p>
                                        )}
                                        <p className="text-sm whitespace-pre-wrap">{submission.message}</p>
                                        <p className="text-xs text-muted-foreground mt-3">
                                            {new Date(submission.createdAt).toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2 shrink-0">
                                    {!submission.read && (
                                        <MarkReadButton id={submission.id} onMarkRead={markAsRead} />
                                    )}
                                    <DeleteInboxButton id={submission.id} onDelete={deleteContactSubmission} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
