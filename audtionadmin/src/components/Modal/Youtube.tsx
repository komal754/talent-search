export function YoutubeVideo({ youtubeLink }: any) {
  return (
    <div>
      <div className="text-left">
        <iframe
          width="70%"
          className="rounded-md md:h-[200px]"
          src={youtubeLink}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      </div>
    </div>
  );
}
