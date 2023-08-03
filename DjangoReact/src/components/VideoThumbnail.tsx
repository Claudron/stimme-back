import React, { useEffect, useState } from 'react';

interface Props {
    videoId: number;
}



const VideoThumbnail = ({ videoId }: Props) => {
  const [thumbnailUrl, setThumbnailUrl] = useState(null);

  useEffect(() => {
    fetch(`https://vimeo.com/api/oembed.json?url=https://vimeo.com/${videoId}`)
      .then((response) => response.json())
      .then((data) => {
        setThumbnailUrl(data.thumbnail_url);
      });
  }, [videoId]);

  return (
    <div>
      {thumbnailUrl ? (
        <img src={thumbnailUrl} alt="Video Thumbnail" />
      ) : (
        'Loading thumbnail...'
      )}
    </div>
  );
};

export default VideoThumbnail;
