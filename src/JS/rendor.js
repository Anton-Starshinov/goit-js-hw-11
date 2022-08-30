const galeryEl = document.querySelector('.gallery');

export function rendorImagesGallery(img) {
  const markup = img
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
    <div class="photo-card">
    <a href="${largeImageURL}">
        <img class="img" src="${webformatURL}" alt="${tags}" loading="lazy"/>
    <div class="info">
    <p class="info-item">
      <b>Likes ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${downloads}</b>
    </p>
  </div>
</div>`;
      }
    )
    .join('');

  galeryEl.insertAdjacentHTML('beforeend', markup);
}
