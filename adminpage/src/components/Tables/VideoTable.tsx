import { FaYoutube } from 'react-icons/fa';

export const VideoTable = ({ data }: any) => {
  return (
    <>
      <div className="pt-2 pb-4">
        <h4 className="text-xl font-semibold text-black">
          Top 5 Bookmarked Care Videos
        </h4>
      </div>

      <div className="grid grid-cols-9 border-t border-stroke py-2 px-2 sm:grid-cols-9 md:px-4">
        <div className="col-span-1 flex items-center">
          <p className="text-sm font-medium">Video</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="text-sm font-medium">Category</p>
        </div>
        <div className="col-span-3 flex items-center">
          <p className="text-sm font-medium">Care Sheet</p>
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
                  <a href={item?.video_id} target="_blank">
                    <FaYoutube size={36} className="text-[#FF0000]" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-span-2 hidden items-center sm:flex">
              <div className="flex flex-col">
                <p className="text-sm font-normal text-black">
                  {item?.video_category.charAt(0).toUpperCase() +
                    item?.video_category.slice(1)}
                </p>
                <p className="text-grey text-sm font-bold">
                  {item?.video_category.charAt(0).toUpperCase() +
                    item?.video_category.slice(1)}
                </p>
              </div>
            </div>
            <div className="col-span-3 flex items-center">
              <p className="inline-flex rounded-full bg-meta-5 bg-opacity-10 py-1 px-3 text-sm font-medium text-black">
                {item?.article_title.charAt(0).toUpperCase() +
                  item?.article_title.slice(1)}
              </p>
            </div>
            <div className="col-span-2 flex items-center">
              <p className="text-sm text-black antialiased">
                {item?.article_published_date}
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
