import Modal from 'react-modal';

import css from './ImageModal.module.css';

export default function ImageModal({ image, isOpen, closeModal }) {
  return (
    <Modal
      style={{
        overlay: {
          backgroundColor: 'rgba(7, 11, 48, 0.8)',
        },
      }}
      isOpen={isOpen}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      onRequestClose={closeModal}
      className={css.modal}
    >
      <img
        src={image.urls.full}
        alt={image.alt_description}
        className={css.image}
      />
    </Modal>
  );
}
