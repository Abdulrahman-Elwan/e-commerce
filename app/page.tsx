import MainBanner from "./_components/MainBanner/MainBanner";
import CategoriesSlider from "./_components/CategoriesSlider/CategoriesSlider";
import ProductsContainer from "./_components/productsContainer/ProductsContainer";

export default function Home() {
  return (
    <>
      <MainBanner />
      <CategoriesSlider />
      <div className="container md:w-[85%] mx-auto mt-7.5 pb-10">
        <ProductsContainer queryString={''} />
      </div>
    </>
  );
}
