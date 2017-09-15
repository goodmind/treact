// tslint:disable-next-line
const choosePhotoSize = (photo: any, width: number, height: number) => {
  let bestPhotoSize = {_: 'photoSizeEmpty'};
  let bestDiff = 0xFFFFFF;

  photo.sizes.forEach(photoSize => {
    const diff = Math.abs(photoSize.w * photoSize.h - width * height);
    if (diff < bestDiff) {
      bestPhotoSize = photoSize;
      bestDiff = diff;
    }
  });

  return bestPhotoSize;
};

// tslint:disable-next-line
const addThumbnail = (photo: any, isWebsite: boolean) => {
  const sizes = isWebsite ? {
    width: 100,
    height: 100,
  } : {
    width: Math.min(window.innerWidth - 80, 260),
    height: Math.min(window.innerHeight - 100, 260),
  };
  const thumbPhotoSize = choosePhotoSize(photo, sizes.width, sizes.height);
  const thumb = {
    sizes,
    id: thumbPhotoSize.location.local_id,
  };

  return {
    ...photo,
    thumb,
  };
};

// tslint:disable-next-line
export const processPhoto = (photo: any, parent: any) => {
  const isWebsite = parent._ === 'webPage'
    && parent.type !== 'photo'
    && parent.type !== 'video';

  console.debug('processPhoto', photo.sizes);
  console.debug('processPhoto', addThumbnail(photo, isWebsite), parent);
  return addThumbnail(photo, isWebsite);
};
