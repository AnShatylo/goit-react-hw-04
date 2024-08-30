import css from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';

export default function ImageGallery({ items, modalOpen }) {
  return (
    <ul className={css.galleryList}>
      {items.map(item => (
        <li key={item.id} onClick={() => modalOpen(item)}>
          <ImageCard src={item.urls.small} alt={item.alt_description} />
        </li>
      ))}
    </ul>
  );
}