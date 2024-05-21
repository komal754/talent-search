import moment from 'moment';
import { IMAGE_ROUTE } from '../../api/constant';

export const ArticleTable = ({ data }: any) => {
  return (
    <>
      <div className="pt-2 pb-4">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Top 5 Bookmarked Care Sheets
        </h4>
      </div>

      <div className="grid grid-cols-9 border-t border-stroke py-2 px-2  sm:grid-cols-9 md:px-4">
        <div className="col-span-1 flex items-center">
          <p className="text-sm font-medium">Icon</p>
        </div>
        <div className="col-span-3 hidden items-center sm:flex">
          <p className="text-sm font-medium">Name</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="text-sm font-medium">Category</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="text-sm font-medium">Published Date</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="text-sm font-medium">Bookmarks</p>
        </div>
      </div>
      {data?.map((item: any) => {
        return (
          <div className="grid grid-cols-9 border-t border-stroke py-2 px-2  sm:grid-cols-9 md:px-4">
            <div className="col-span-1 flex items-center">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="rounded-md">
                  <img
                    className="h-[6] w-6"
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src =
                        IMAGE_ROUTE + '2023-9-15_16-55-0_419.png';
                    }}
                    src={IMAGE_ROUTE + item?.cover_image}
                  />
                </div>
              </div>
            </div>
            <div className="col-span-3 flex items-center">
              <p className="text-sm font-bold text-black dark:text-white">
                {item?.chapter_name.charAt(0).toUpperCase() +
                  item?.chapter_name.slice(1)}
              </p>
            </div>
            <div className="col-span-2 hidden items-center sm:flex">
              <div className="flex flex-col">
                <p className="text-sm font-normal text-black dark:text-white">
                  {item?.category.charAt(0).toUpperCase() +
                    item?.category.slice(1)}
                </p>
                <p className="text-grey text-sm font-bold dark:text-white">
                  {item?.subcategory.charAt(0).toUpperCase() +
                    item?.subcategory.slice(1)}
                </p>
              </div>
            </div>

            <div className="col-span-2 flex items-center">
              <p className="text-sm text-black antialiased dark:text-white ">
                {moment(item?.published_date).format('LL')}
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-xl font-bold text-meta-4">
                {item?.bookmark_count}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
};
