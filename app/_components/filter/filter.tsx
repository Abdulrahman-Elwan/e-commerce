'use client'

import { Label, Select, TextInput } from "flowbite-react";
import { FaRotateLeft } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import getAllCategories from "@/apis/getAllCategories";
import { useEffect, useState } from "react";
import { categoryType } from "@/types/category.type";
import getAllBrands from "@/apis/getAllBrands";
import { brandType } from "@/types/brand.type";
import { useRouter, useSearchParams, usePathname } from 'next/navigation';


export default function Filter() {
    const [categories, setCategories] = useState<categoryType[]>([]);
    const [brands, setBrands] = useState<brandType[]>([]);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [search, setSearch] = useState(searchParams.get("search") ?? "");
    const [sort, setSort] = useState(searchParams.get("sort") ?? "");
    const [brand, setBrand] = useState(searchParams.get("brand") ?? "");
    const [category, setCategory] = useState(searchParams.get("category") ?? "");
    const [minPrice, setMinPrice] = useState(searchParams.get("price[gte]") ?? "");
    const [maxPrice, setMaxPrice] = useState(searchParams.get("price[lte]") ?? "");

    async function Categories() {
        const res = await getAllCategories();
        setCategories(res)
    }

    const Brands = async () => {
        const res = await getAllBrands();
        setBrands(res);
    }

    function handleFilter(filter: string, value: string) {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set(filter, value);
        } else {
            params.delete(filter);
        }
        router.push(`${pathname}?${params.toString()}`);
    }

    function resetForm() {
        setSearch("");
        setSort("");
        setBrand("");
        setCategory("");
        setMinPrice("");
        setMaxPrice("");
    }

    function handleReset() {
        resetForm()
        router.push(pathname);
    }

    useEffect(() => {
        Categories();
        Brands();
    }, []);

    useEffect(() => {
        setSearch(searchParams.get("search") ?? "");
        setSort(searchParams.get("sort") ?? "");
        setBrand(searchParams.get("brand") ?? "");
        setCategory(searchParams.get("category") ?? "");
        setMinPrice(searchParams.get("price[gte]") ?? "");
        setMaxPrice(searchParams.get("price[lte]") ?? "");
    }, [searchParams]);

    return (
        <aside className="sticky rounded-2xl border border-gray-200 bg-white shadow-md p-5 container px-3">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-green-900">
                        Filter Options
                    </h2>
                </div>

                <button className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1 cursor-pointer" onClick={handleReset}>
                    <FaRotateLeft />
                    Reset
                </button>
            </div>
            <hr className="my-3" />

            <div className="space-y-6">

                {/* search */}
                <div className="max-w-md">
                    <TextInput id="search" type="text" rightIcon={FaSearch} placeholder="Search Product"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            handleFilter("search", e.target.value);
                        }}
                    />
                    <hr className="my-3" />
                </div>

                {/* Sort */}
                <div>
                    <Label htmlFor="sort" className="mb-2 block font-semibold">
                        Sort By
                    </Label>
                    <Select id="sort"
                        value={sort}
                        onChange={(e) => {
                            setSort(e.target.value);
                            handleFilter('sort', e.target.value);
                        }}
                    >
                        <option value="">Default</option>
                        <option value="-price">
                            Price: High to Low
                        </option>
                        <option value="price">
                            Price: Low to High
                        </option>
                        <option value="-ratingsAverage">
                            Top Rated
                        </option>
                        <option value="-sold">
                            Best Selling
                        </option>
                    </Select>
                </div>

                {/* Price */}
                <div>
                    <h3 className="font-semibold mb-3">
                        Price Range
                    </h3>
                    <div className="flex gap-2">
                        <TextInput
                            type="number"
                            value={minPrice}
                            placeholder="Min"
                            onChange={(e) => {
                                setMinPrice(e.target.value);
                                handleFilter("price[gte]", e.target.value);
                            }}
                        />

                        <TextInput
                            type="number"
                            value={maxPrice}
                            placeholder="Max"
                            onChange={(e) => {
                                setMaxPrice(e.target.value);
                                handleFilter("price[lte]", e.target.value)
                            }}
                        />
                    </div>
                </div>

                {/* Brand */}
                <div>
                    <Label htmlFor="brand" className="mb-2 block font-semibold">
                        Brand
                    </Label>
                    <Select id="brand"
                        value={brand}
                        onChange={(e) => {
                            setBrand(e.target.value);
                            handleFilter('brand', e.target.value)
                        }}
                    >
                        <option value=''>All Brands</option>

                        {brands ? <>
                            {brands.map((item) => <option value={item._id} key={item._id}>{item.name}</option>)}
                        </> : ''}
                    </Select>
                </div>

                {/* Category */}
                <div>
                    <Label htmlFor="category" className="mb-2 block font-semibold">
                        Category
                    </Label>
                    <Select id="category"
                        value={category}
                        onChange={(e) => {
                            setCategory(e.target.value);
                            handleFilter('category', e.target.value)
                        }}
                    >
                        <option>All Categories</option>
                        {categories ? <>
                            {categories.map((item) => <option value={item._id} key={item._id}>{item.name}</option>)}
                        </> : ''}
                    </Select>
                </div>

            </div>
        </aside>
    );
}