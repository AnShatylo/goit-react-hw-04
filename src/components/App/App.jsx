import SearchBar from '../SearchBar/SearchBar';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import ImageGallery from '../ImageGallery/ImageGallery';
import ImageModal from '../ImageModal/ImageModal';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import { fetchPhotos } from '../../services/gallery-api';

import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Modal from 'react-modal';

import css from './App.module.css';

Modal.setAppElement('#root');

export default function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(900);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (query === '') {
      return;
    }

    async function getPhotos() {
      try {
        setLoading(true);
        setError(false);
        const res = await fetchPhotos(query, page);
        setPhotos(prevState => [...prevState, ...res.photos]);
        setTotalPages(res.totalPages);
        if (page >= res.totalPages) {
          toast('You have reached the last page');
        }
      } catch (error) {
        console.error('Error fetching photos:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getPhotos();
  }, [page, query]);

  const handleSearch = newQuery => {
    if (newQuery === '') {
      toast.error('Please write something');
      return;
    }
    setQuery(newQuery);
    setPage(1);
    setPhotos([]);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const modalOpen = image => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const modalClose = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className={css.appBg}>
      <SearchBar onSearch={handleSearch} />
      <Toaster position="top-right" reverseOrder={false} />
      {error && <ErrorMessage />}
      {photos.length > 0 && (
        <ImageGallery items={photos} modalOpen={modalOpen} />
      )}
      {isModalOpen && selectedImage && (
        <ImageModal
          isOpen={isModalOpen}
          closeModal={modalClose}
          image={selectedImage}
        />
      )}
      {loading && <Loader />}
      {photos.length > 0 && !loading && page < totalPages && (
        <LoadMoreBtn loadMore={handleLoadMore} />
      )}
    </div>
  );
}
