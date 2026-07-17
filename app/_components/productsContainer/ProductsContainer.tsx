import getAllProducts from '@/apis/getAllProducts'
import ProductCard from '@/app/_components/productCard/page';
import { ProductType } from '@/types/product.type';

export default async function ProductsContainer({ queryString, }: { queryString: string; }) {
    const params = new URLSearchParams(queryString);
    // قيمة البحث اللي المستخدم كتبها
    const search = params.get("search")?.toLowerCase() || "";
    // نحذف search علشان الـ API مش بيدعمه
    params.delete("search");
    // نجيب المنتجات باستخدام باقي الفلاتر فقط
    const data = await getAllProducts(params.toString());
    // نفلتر محليًا لو فيه Search
    const filteredProducts = search? data.filter((product: ProductType) => product.title.toLowerCase().includes(search)) : data;

    return (
        <div className='container px-3'>
            <h2 className='text-xl md:text-3xl font-bold mb-2 text-green-900 w-full block'>
                Recommended for you
            </h2>
            <div className="container flex flex-wrap">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product: ProductType) => (
                        <div key={product.id} className=" w-1/2 md:min-w-3 lg:w-1/3 xl:w-1/5">
                            <ProductCard singleProduct={product} />
                        </div>
                    ))
                ) : (
                    <div className="mx-auto py-20 flex flex-col items-center justify-center">
                        <i className="fa-solid fa-box-open text-6xl text-gray-300 mb-4"></i>
                        <h3 className="text-2xl font-bold text-gray-700">
                            No products found
                        </h3>
                        <p className="mt-2 text-gray-500">
                            Try changing your filters or search for another product.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
