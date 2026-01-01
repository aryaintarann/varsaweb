import { getAllReviews, approveReview, deleteReview } from "@/actions/review-actions";
import { Button } from "@/components/ui/button";
import { Star, Check, Trash2 } from "lucide-react";
import { ApproveButton, DeleteReviewButton } from "./review-buttons";

interface Review {
    id: string;
    name: string;
    company: string | null;
    rating: number;
    message: string;
    approved: boolean;
    createdAt: Date;
}

export default async function AdminReviewsPage() {
    const reviews: Review[] = await getAllReviews();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Reviews</h1>
                <div className="text-sm text-muted-foreground">
                    {reviews.filter(r => !r.approved).length} pending approval
                </div>
            </div>

            {reviews.length === 0 ? (
                <div className="border rounded-xl p-12 text-center bg-background">
                    <Star className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No reviews yet.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {reviews.map((review) => (
                        <div
                            key={review.id}
                            className={`border rounded-xl p-6 bg-background ${!review.approved ? 'border-yellow-500/50 bg-yellow-500/5' : ''}`}
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="font-semibold">{review.name}</h3>
                                        {review.company && (
                                            <span className="text-sm text-muted-foreground">• {review.company}</span>
                                        )}
                                        {!review.approved && (
                                            <span className="px-2 py-0.5 text-xs font-medium bg-yellow-500 text-yellow-950 rounded-full">
                                                Pending
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex gap-1 mb-3">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-sm text-muted-foreground">{review.message}</p>
                                    <p className="text-xs text-muted-foreground mt-3">
                                        {new Date(review.createdAt).toLocaleDateString('id-ID', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        })}
                                    </p>
                                </div>
                                <div className="flex gap-2 shrink-0">
                                    {!review.approved && (
                                        <ApproveButton id={review.id} onApprove={approveReview} />
                                    )}
                                    <DeleteReviewButton id={review.id} onDelete={deleteReview} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
