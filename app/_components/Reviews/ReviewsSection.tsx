'use client'

import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FaStar } from "react-icons/fa";
import getReviewsforProduct from "@/apis/getReviewsforProduct";
import { useEffect, useMemo, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { Review } from "@/types/review.type";
import { AddReviewButton } from "./addReviewButton";

export default function ReviewsSection({
    productId,
    token,
}: {
    productId: string;
    token?: string;
}) {
    
    const [reviews, setReviews] = useState<Review[]>([]);
    const [load, setLoad] = useState<boolean>(true);
    const totalRating = useMemo(() => {
        if (reviews.length === 0) return 0;
        return (
            reviews.reduce((sum, review) => sum + review.rating, 0) /
            reviews.length
        );
    }, [reviews]);

    function getRatingPercentage(stars: number) {
        const count = reviews.filter(
            (review) => review.rating === stars
        ).length;

        return reviews.length
            ? (count / reviews.length) * 100
            : 0;
    }

    useEffect(() => {
        const fetchReviewsForProduct = async () => {
            setLoad(true);
            const res = await getReviewsforProduct(productId);
            setReviews(res.data);
            setLoad(false);
        };
        fetchReviewsForProduct();
    }, [productId]);

    return (
        <section className="container mx-auto mt-20">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
                <div>
                    <span className="text-green-700 font-semibold uppercase tracking-widest text-sm">
                        Customer Feedback
                    </span>

                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-2">
                        Product Ratings & Reviews
                    </h2>

                    <p className="text-gray-500 mt-3">
                        See what customers think about this product.
                    </p>
                </div>

                {!load && reviews.length > 0 && (
                    <div className="mt-5 md:mt-0 rounded-xl bg-green-50 px-5 py-3 border border-green-100">
                        <span className="text-gray-500">
                            Total Reviews
                        </span>
                        <p className="font-bold text-2xl text-green-700">
                            {reviews.length}
                        </p>
                    </div>
                )}
            </div>

            {/* Loading */}
            {load ? (
                <div className="h-75 flex items-center justify-center">
                    <Spinner className="size-8" />
                </div>
            )
                :
                reviews.length > 0 ? (
                    <>
                        <div className="grid lg:grid-cols-3 gap-8 mb-3">
                            {/* Rating Summary */}
                            <div className="lg:sticky lg:top-28 h-fit">
                                <div className="bg-white rounded-3xl border border-gray-200 shadow-md p-8">
                                    <div className="text-center">
                                        <h3 className="text-6xl font-extrabold text-green-700">
                                            {totalRating.toFixed(1)}
                                        </h3>

                                        <div className="flex justify-center gap-1 text-xl my-3">
                                            {[...Array(5)].map((_, index) => (
                                                <FaStar key={index} className={index < Math.round(totalRating) ?
                                                    "text-yellow-400"
                                                    :
                                                    "text-gray-300"
                                                }
                                                />
                                            ))}
                                        </div>

                                        <p className="text-gray-500">
                                            Based on {reviews.length} Reviews
                                        </p>
                                    </div>

                                    <div className="space-y-5 mt-10">
                                        {[5, 4, 3, 2, 1].map((item) => {
                                            const percentage = getRatingPercentage(item);
                                            return (
                                                <div key={item} className="flex items-center gap-3" >
                                                    <div className="flex items-center gap-1 w-10">
                                                        <span>{item}</span>
                                                        <FaStar className="text-yellow-400 text-xs" />
                                                    </div>
                                                    <Progress value={percentage} className="flex-1 h-2" />
                                                    <span className="text-xs text-gray-500 w-12 text-right">
                                                        {percentage.toFixed(0)}%
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Reviews */}
                            <div className="lg:col-span-2 space-y-5 max-h-[calc(100vh-250px)] overflow-scroll">
                                {reviews.map((item) => (
                                    <div key={item._id} className="bg-white rounded-3xl border border-gray-200 p-6 hover:shadow-xl transition duration-300">
                                        <div className="flex justify-between items-start gap-5">
                                            <div className="flex gap-4">
                                                <Avatar className="h-14 w-14 ring-2 ring-green-300">
                                                    <AvatarFallback className="uppercase font-bold text-xl text-green-900">{item.user.name.slice(0, 2)}</AvatarFallback>
                                                </Avatar>

                                                <div>
                                                    <h3 className="font-semibold text-lg">
                                                        {item.user.name}
                                                    </h3>

                                                    <div className="flex gap-1 text-yellow-400">
                                                        {item.rating === 5 && <span className="flex items-center gap-0.5">{[1, 2, 3, 4, 5].map((star) => (<FaStar key={star} className="text-sm" />))}</span>}
                                                        {item.rating === 4 && <span className="flex items-center gap-0.5">{[1, 2, 3, 4].map((star) => (<FaStar key={star} className="text-sm" />))}</span>}
                                                        {item.rating === 3 && <span className="flex items-center gap-0.5">{[1, 2, 3].map((star) => (<FaStar key={star} className="text-sm" />))}</span>}
                                                        {item.rating === 2 && <span className="flex items-center gap-0.5">{[1, 2].map((star) => (<FaStar key={star} className="text-sm" />))}</span>}
                                                        {item.rating === 1 && <span className="flex items-center gap-0.5">{[1].map((star) => (<FaStar key={star} className="text-sm" />))}</span>}
                                                    </div>

                                                </div>

                                            </div>

                                            <span className="text-sm text-gray-400 whitespace-nowrap">
                                                {item.createdAt.slice(0, 10)}
                                            </span>

                                        </div>

                                        <p className="mt-3 leading-8 text-gray-600">
                                            {item.review}
                                        </p>
                                    </div>
                                ))}
                            </div>

                        </div>
                        {/* Add Review */}
                        {token && <AddReviewButton productId={productId} />}
                    </>
                ) : (
                    <>
                        <div className="rounded-3xl mb-3 border border-dashed border-gray-300 bg-gray-50 py-20 px-6 text-center">
                            <div className="text-6xl mb-5">
                                ⭐
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800">
                                No Reviews Yet
                            </h3>
                            <p className="text-gray-500 mt-3 max-w-md mx-auto">
                                This product hasn`&apos;`t received any reviews yet.
                                Be the first customer to share your experience.
                            </p>
                        </div>
                        {token&& <AddReviewButton productId={productId} />}
                    </>
                )}
        </section>
    );
}


