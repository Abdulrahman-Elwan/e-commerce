"use client"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import z from "zod";
import { Select, TextInput } from "flowbite-react"
import addReview from "@/apis/addReview"

export const AddReviewFormSchema = z.object({
    review: z
        .string()
        .trim()
        .min(10, "Review must be at least 10 characters.")
        .max(1000, "Review must not exceed 1000 characters."),

    rating: z
        .number({
            error: "Please select a rating."
        })
        .min(1, "Rating must be at least 1 star.")
        .max(5, "Rating cannot exceed 5 stars."),
});
export type AddReviewFormSchemaType = z.infer<typeof AddReviewFormSchema>

export default function AddReviewForm({ productId }: { productId: string }) {
    const ResetPassword = useForm({
        defaultValues: {
            "review": "",
            "rating": 0
        },
        resolver: zodResolver(AddReviewFormSchema),
    })
    const { register, handleSubmit, formState } = ResetPassword;

    async function handleAddReview(value: AddReviewFormSchemaType) {
        const res = await addReview(value, productId);
        console.log(res);
        if (res.data) {
            toast.success('The rating has been added successfully..', { position: "top-center", duration: 3000 });
            window.location.assign(`/products/${productId}`);
        } else if (res.message === "fail") {
            toast.success(res.errors.msg, { position: "top-center", duration: 3000 });
        }
    }
    return (
        <div>
            <div className="p-4">
                <form className="flex flex-col gap-2">
                    {/* review */}
                    <div className="w-full mx-auto">
                        <div className="mb-2 block">
                            <Label htmlFor="review">Your Review</Label>
                        </div>
                        <TextInput id="review" {...register('review')} type="text" placeholder="Your Review" />
                        {formState.errors.review && <p className="text-red-500 text-center w-full">{formState.errors.review.message}</p>}
                    </div>

                    <div className="w-full mx-auto">
                        <div className="mb-2 block">
                            <Label htmlFor="rating">Rating</Label>
                        </div>
                        <Select id="rating" {...register("rating", { valueAsNumber: true,})}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </Select>
                        {formState.errors.rating ? <p className="text-red-600 text-center my-1">{formState.errors.rating.message}</p> : ''}
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-center gap-3 pt-2">
                        <Button type="button"
                            onClick={handleSubmit(handleAddReview)}
                            className="bg-green-700 font-semibold text-xl py-3 px-7 hover:bg-green-800 cursor-pointer transition-colors delay-700">
                            Confirm Code
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
