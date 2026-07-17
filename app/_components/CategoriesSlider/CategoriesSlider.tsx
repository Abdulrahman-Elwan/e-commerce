import getAllCategories from '@/apis/getAllCategories';
import CategoriesSwiper from '../CategoriesSwiper/CategoriesSwiper';

export default async function CategoriesSlider() {
    const data = await getAllCategories()

    return (
        <CategoriesSwiper data={data} />
    )
}
